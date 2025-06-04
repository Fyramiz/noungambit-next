"use client"
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import {
    User,
    Lock,
    Mail,
    Phone,
    Calendar,
    Home,
    GraduationCap,
    Trophy,
    Handshake,
    Users,
    LogIn
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignUpPage() {
    const router = useRouter();
    const supabase = createClient();
    
    // Form state
    const [formData, setFormData] = useState({
        name: "",
        birth: "",
        who: "",
        number: "",
        email: "",
        address: "",
        education: "",
        experience: "",
        intrested: false,
        password: ""
    });

    // State variables for each Select component
    const [registeringFor, setRegisteringFor] = useState("");
    const [educationalLevel, setEducationalLevel] = useState("");
    const [chessExperience, setChessExperience] = useState("");
    const [helpTeam, setHelpTeam] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Update form data with select values
        const updatedFormData = {
            ...formData,
            who: registeringFor,
            education: educationalLevel,
            experience: chessExperience,
            intrested: helpTeam === "yes"
        };

        try {
            const { data, error } = await supabase
                .from('users')
                .insert([updatedFormData])
                .select();

            if (error) throw error;

            // Redirect to login page on success
            router.push('/login');
        } catch (error) {
            console.error('Error signing up:', error);
            // Handle error (you might want to show an error message to the user)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card className="mb-8 border-amber-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-amber-900">
                        <User className="h-5 w-5" />
                        Create Your Account
                    </CardTitle>
                    <CardDescription>
                        Enter the required information to create your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <Input
                                    placeholder="Full Name"
                                    className="pl-10"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <Input
                                    type="date"
                                    placeholder="Date of Birth"
                                    className="pl-10"
                                    id="birth"
                                    name="birth"
                                    value={formData.birth}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <Select
                                    value={registeringFor}
                                    onValueChange={setRegisteringFor}
                                >
                                    <SelectTrigger
                                        id="who"
                                        name="who"
                                        className="pl-10 flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                    >
                                        <SelectValue placeholder="Registering for..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="owner">Myself</SelectItem>
                                        <SelectItem value="kid">My Kid</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <Input
                                    type="tel"
                                    placeholder="Phone Number"
                                    className="pl-10"
                                    id="number"
                                    name="number"
                                    value={formData.number}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <Input
                                    type="email"
                                    placeholder="Email Address"
                                    className="pl-10"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <Input
                                    placeholder="Address"
                                    className="pl-10"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="relative">
                                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <Select
                                    value={educationalLevel}
                                    onValueChange={setEducationalLevel}
                                >
                                    <SelectTrigger
                                        id="education"
                                        name="education"
                                        className="pl-10 flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                    >
                                        <SelectValue placeholder="Educational Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="student">Student</SelectItem>
                                        <SelectItem value="university">University</SelectItem>
                                        <SelectItem value="working">Working</SelectItem>
                                        <SelectItem value="unemployed">Unemployed</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="relative">
                                <Trophy className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <Select
                                    value={chessExperience}
                                    onValueChange={setChessExperience}
                                >
                                    <SelectTrigger
                                        id="experience"
                                        name="experience"
                                        className="pl-10 flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                    >
                                        <SelectValue placeholder="Chess Experience" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Beginner">Never played</SelectItem>
                                        <SelectItem value="Intermediate">I play a little</SelectItem>
                                        <SelectItem value="Advanced">Professional</SelectItem>
                                        <SelectItem value="Parent">I'm here for my kid</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="relative">
                                <Handshake className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <Select
                                    value={helpTeam}
                                    onValueChange={setHelpTeam}
                                >
                                    <SelectTrigger
                                        id="intrested"
                                        name="intrested"
                                        className="pl-10 flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                    >
                                        <SelectValue placeholder="Interested in helping the team?" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="yes">Yes</SelectItem>
                                        <SelectItem value="no">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <Input
                                    placeholder="Password"
                                    type="password"
                                    className="pl-10"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <Button type="submit" className="w-full mt-6">
                        <User className="mr-2 h-4 w-4" />
                        Sign Up
                    </Button>

                    <div className="text-sm text-gray-600 text-center mt-4">
                        Already have an account?{" "}
                        <Link href="/login" className="text-amber-700 hover:underline">
                            Log In
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}