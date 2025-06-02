"use client"

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Space } from "lucide-react";


export default function ProfilePage() {
    return (<div className="flex flex-col items-center justify-center h-screen">
        <Card>
                <CardHeader>
                        <CardTitle>Chess Mastery Book</CardTitle>
                        <CardDescription>A chess Learning book for Mastering chess</CardDescription>
                </CardHeader>
                <CardFooter>
                        <Label>Made By the GM Mbark Draoui</Label>
                        
                        <div className="ml-4"> {/* Added margin-left spacing */}
                                <Button>
                                        Buy Now for only 1000$
                                </Button>
                        </div>
                </CardFooter>
        </Card>
    </div>)
    }
