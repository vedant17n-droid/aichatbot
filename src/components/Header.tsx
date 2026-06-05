import { Link } from 'react-router-dom'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  darkMode: boolean
  setDarkMode: (dark: boolean) => void
}

export default function Header({ darkMode, setDarkMode }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const links = [
    { path: '/', label: 'Home' },
    { path: '/chat', label: 'Chat' },
    { path: '/features', label: 'Features' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 glass-dark border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="gradient-text font-bold text-lg">OMINOUS</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map(({ path, label }) => (
              <Link key={path} to={path} className="text-slate-300 hover:text-purple-400 font-medium">
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg hover:bg-white/10">
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {links.map(({ path, label }) => (
              <Link key={path} to={path} onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-slate-300 hover:bg-white/5 rounded-lg">
                {label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}