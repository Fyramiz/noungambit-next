import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NounGambit Association - Chess Organization Guelmim",
  
  description:
    "Premier chess organization in Guelmim city, Morocco. Join our community for tournaments, training, and competitive play.",
  authors: [{ name: "Mbark Draoui" }],
  keywords: [
    "chess",
    "Guelmim",
    "chess tournaments",
    "chess training",
    "competitive chess",
    "NounGambit Association",
    "Morocco chess",
    "Guelmim Chess Club"
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
