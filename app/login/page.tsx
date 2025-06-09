// app/login/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Session } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';

// Minimal Card components for usage in login page.
// Ensure these are correctly imported from your UI library.
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
    )

    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Manages overall loading state for this page

    useEffect(() => {
        let isMounted = true; // Flag to prevent state updates on unmounted component

        const handleAuthStateChange = async (event: string, currentSession: Session | null) => {
            if (!isMounted) return;

            setSession(currentSession);

            if (currentSession) {
                // User is authenticated. Now check their profile completion.
                try {
                    const { data: profile, error } = await supabase
                        .from('user_profiles') // Your profile table name
                        .select('name, birth, who, number, address, education, experience')
                        .eq('userid', currentSession.user.id)
                        .single();

                    if (error && error.code === 'PGRST116') {
                        // Profile does not exist (new signup). Redirect to signup.
                        console.log('Profile not found, redirecting to /signup');
                        router.replace('/signup');
                    } else if (error) {
                        // Other error fetching profile. Log and potentially show error.
                        console.error('Error fetching profile:', error.message);
                        // Optional: Display an error message to the user
                        // setIsLoading(false); // Stop loading if error prevents redirection
                        // router.replace('/error?message=Failed to load profile data.');
                    } else if (profile && (!profile.name || !profile.birth || !profile.who || !profile.number || !profile.address || !profile.education || !profile.experience)) {
                        // Profile exists but is incomplete. Redirect to signup.
                        console.log('Profile exists but incomplete, redirecting to /signup');
                        router.replace('/signup');
                    } else {
                        // Profile exists and is complete. Redirect to dashboard.
                        console.log('Profile complete, redirecting to /dashboard');
                        router.replace('/profile');
                    }
                } catch (profileCheckError) {
                    console.error('Unexpected error during profile check:', profileCheckError);
                    router.replace('/error?message=An unexpected error occurred.');
                }
            } else {
                // No session. User needs to log in/sign up.
                setIsLoading(false); // Stop loading, show Auth UI
            }
        };

        // Initial session check
        supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
            if (isMounted) {
                handleAuthStateChange("INITIAL_LOAD", initialSession);
            }
        });

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
            if (isMounted) {
                handleAuthStateChange(event, currentSession);
            }
        });

        return () => {
            isMounted = false; // Cleanup: Mark component as unmounted
            subscription.unsubscribe(); // Unsubscribe from auth state changes
        };
    }, [router, supabase]); // Dependencies

    if (isLoading) {
        return (
            <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
        );
    }

    // If session is null (after loading), show the Auth UI
    if (!session) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
                <Card className="w-full max-w-md border-amber-200 shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-amber-900 text-2xl font-bold">Welcome!</CardTitle>
                        <CardDescription className="text-md text-gray-600 mt-2">
                            Sign in to your account to access Features that require accounts
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Auth
                            supabaseClient={supabase}
                            providers={[]} // Add or remove providers as needed
                            appearance={{ theme: ThemeSupa }}
                            showLinks={false}
                            socialLayout="horizontal"
                            localization={{
                                variables: {
                                    sign_in: {
                                        email_label: 'Your Email',
                                        password_label: 'Your Password',
                                        button_label: 'Sign In',
                                        
                                        
                                    },
                                },
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
        );
    }

    // This state should theoretically not be reached often if redirects work,
    // but it's a fallback or indicates a brief moment before redirection.
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <p className="text-lg text-gray-700">Redirecting to dashboard or profile setup...</p>
        </div>
    );
}