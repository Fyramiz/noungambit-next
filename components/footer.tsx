import Link from "next/link"
import { Crown, Mail, Phone, MapPin, Instagram } from "lucide-react"
import { Love_Light } from "next/font/google"

export function Footer() {
  return (
    <footer className="bg-amber-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/noungambit.png" alt="Noungambit Logo" className="w-40" />
            </div>
            <p className="text-amber-100 mb-4">جمعية نون جامبيت للشطرنج - كلميم</p>
            <p className="text-amber-200 text-sm leading-relaxed">
              Promoting chess excellence in Guelmim through competitive play, education, and community building. Join us
              in advancing the royal game.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-300">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/leaderboard" className="text-amber-200 hover:text-white transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/tournaments" className="text-amber-200 hover:text-white transition-colors">
                  Tournaments
                </Link>
              </li>
              <li>
                <Link href="/" className="text-amber-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-300">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-amber-300" />
                <span className="text-amber-200 text-sm">Guelmim, Morocco</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-amber-300" />
                <span className="text-amber-200 text-sm">+212 636-390421</span>
              </li>
              <li className="flex items-center space-x-2">
                <Instagram className="h-4 w-4 text-amber-300" />
                <Link href="https://instagram.com/a.noungambit" className="text-amber-200 hover:text-white transition-colors">
                  a.noungambit
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-800 mt-8 pt-8 text-center">
          <p className="text-amber-200 text-sm">
            Made With Love By <Link href="https://instagram.com/fyramiz" className="text-amber-200 hover:text-white transition-colors">
                  Fyramiz (Mbark Draoui)
                </Link> for © {new Date().getFullYear()} Noungambit Association. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
