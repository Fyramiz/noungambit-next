"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Crown, Menu, ShoppingBag, Users, User, LogIn, Flag, BarChart, LogOut } from "lucide-react" // Added LogOut icon
import { useState, useEffect } from 'react'
import { createClient, Session } from '@supabase/supabase-js'
// import { Auth } from '@supabase/auth-ui-react' // Not directly used in this component's rendering
// import { ThemeSupa } from '@supabase/auth-ui-shared' // Not directly used in this component's rendering

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
) // Use environment variables for safety

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    // Fetch initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null) // Clear session state
    setIsOpen(false) // Close mobile menu after logout
  }

  const navItems = [
    { href: "/", label: "Home", icon: Crown },
    { href: "/leaderboard", label: "Leaderboard", icon: BarChart },
    { href: "/tournaments", label: "Events", icon: Flag },
    { href: "/merch", label: "Merch", icon: ShoppingBag },
    { href: "/players", label: "Players", icon: Users },
    { href: "/profile", label: "Profile", icon: User },
  ]
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
          <img src="/noungambit.png" alt="Noungambit Logo" className="w-20" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors"
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Desktop Auth Buttons/Message */}
        {session ? (
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-2">
            <Link href={"/login"}>
              <Button variant="ghost" size="sm">
                <LogIn className="h-4 w-4 mr-1" />
                Login
              </Button>
            </Link>
            <Link href={"/signup"}>
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                Register
              </Button>
            </Link>
          </div>
        )}

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 text-lg font-medium text-gray-700 hover:text-amber-600 transition-colors"
                    onClick={() => setIsOpen(false)} // Close sheet on navigation
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              <div className="pt-4 border-t space-y-2">
                {session ? (
                  <>
                    <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href={"/login"}>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                    </Link>

                    <Link href={"/signup"}>
                      <Button className="w-full bg-amber-600 hover:bg-amber-700" onClick={() => setIsOpen(false)}>
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}