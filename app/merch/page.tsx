"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { WhatsAppIcon } from "@/components/icons/whatsapp"; // Ensure this path is correct

// ✅ Set up Supabase client
const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Book = {
        id: number;
        title: string;
        description: string;
        price: number;
        author: string;
};

export default function ProfilePage() {
        const [books, setBooks] = useState<Book[]>([]);

        useEffect(() => {
                const fetchBooks = async () => {
                        const { data, error } = await supabase.from("merch").select("*");
                        if (error) {
                                console.error("Error fetching books:", error.message);
                        } else {
                                setBooks(data as Book[]);
                        }
                };
                fetchBooks();
        }, []);

        return (
  <div className="flex flex-col items-center justify-center min-h-screen space-y-6 p-4">
    {books.map((book) => (
      <Card key={book.id} className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{book.title}</CardTitle>
          <CardDescription>{book.description}</CardDescription>
        </CardHeader>

        <CardFooter className="flex flex-col items-start gap-2">
          <Label className="text-sm text-muted-foreground">
            Made by {book.author}
          </Label>
          <Button
            className="gap-2 bg-green-600 hover:bg-green-700 text-white"
            onClick={() => {
              const message = `Salam, bghit information 3la lktab "${book.title}"`;
              const whatsappUrl = `https://wa.me/212636390421?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, "_blank");
            }}
          >
            <span className="flex items-center">
              <WhatsAppIcon className="w-5 h-5 text-white" />
            </span>
            Buy for {book.price} DH
          </Button>
        </CardFooter>
      </Card>
    ))}
  </div>
);


}
