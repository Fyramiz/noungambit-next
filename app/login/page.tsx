import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";
import { Users, Search, User, Lock, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function LoginPage() {
    return (
        <Card className="mb-8 border-amber-200">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-900">
                    <Users className="h-5 w-5" />
                    Login Page
                </CardTitle>
                <CardDescription>
                    Enter The Required Information to Login To your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-4"> {/* Added space-y-4 for vertical spacing between input groups */}
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <Input
                                placeholder="Username"
                                className="pl-10" // Padding to make space for the icon
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <Input
                                placeholder="Password"
                                type="password" // Good practice for password fields
                                className="pl-10" // Padding to make space for the icon
                            />
                        </div>
                        <Button variant={"secondary"}>
                            <Link href={"/bud_things_there_is_a_login"} className="flex items-center gap-1" />
                            <LogIn ></LogIn>
                            Login
                        </Button>
                    </div>


                    <div className="text-sm text-gray-600 flex items-center">


                    </div>
                </div>
            </CardContent>
        </Card>

    )
}