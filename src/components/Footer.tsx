import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="glass-dark border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="gradient-text font-bold text-lg mb-2">OMINOUS</h3>
            <p className="text-slate-400 text-sm">The Future of Intelligent Learning</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="/" className="hover:text-purple-400">Home</a></li>
              <li><a href="/chat" className="hover:text-purple-400">Chat</a></li>
              <li><a href="/features" className="hover:text-purple-400">Features</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <Github size={20} className="text-slate-400 hover:text-purple-400 cursor-pointer" />
              <Linkedin size={20} className="text-slate-400 hover:text-purple-400 cursor-pointer" />
              <Mail size={20} className="text-slate-400 hover:text-purple-400 cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-slate-400 text-sm">
          <p>OMINOUS by Vedant Nalawade | Powered by Groq AI</p>
          <p>© 2024 All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}