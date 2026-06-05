export default function FeaturesPage() {
  const features = [
    { icon: '⚡', title: 'Lightning Fast', desc: 'Powered by Groq' },
    { icon: '📚', title: 'Homework Helper', desc: 'Get help with assignments' },
    { icon: '🧮', title: 'Math Solver', desc: 'Step-by-step solutions' },
    { icon: '🔬', title: 'Science Explanations', desc: 'Complex concepts made simple' },
    { icon: '📝', title: 'Study Notes', desc: 'Generate comprehensive notes' },
    { icon: '🎓', title: 'Quiz Generator', desc: 'Test your knowledge' },
    { icon: '💡', title: 'Project Ideas', desc: 'Creative project suggestions' },
    { icon: '📋', title: 'Copy & Share', desc: 'Easy message sharing' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          <span className="gradient-text">Powerful Features</span>
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="glass-dark p-6 hover:bg-white/20 transition-all text-center">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}