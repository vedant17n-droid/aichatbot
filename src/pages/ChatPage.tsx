import { useState, useRef, useEffect } from 'react'
import { Groq } from 'groq-sdk'
import { Send, Trash2, Plus, Menu, X, Copy } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface Chat {
  id: string
  title: string
  messages: Message[]
}

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  })

  useEffect(() => {
    const saved = localStorage.getItem('chats')
    if (saved) {
      setChats(JSON.parse(saved))
      const parsed = JSON.parse(saved)
      if (parsed.length > 0) setCurrentChatId(parsed[0].id)
    } else {
      createNewChat()
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats))
  }, [chats])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chats, loading])

  const currentChat = chats.find(c => c.id === currentChatId)
  const messages = currentChat?.messages || []

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
    }
    setChats(prev => [newChat, ...prev])
    setCurrentChatId(newChat.id)
  }

  const sendMessage = async () => {
    if (!input.trim() || !currentChatId || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    }

    setChats(prev =>
      prev.map(chat =>
        chat.id === currentChatId
          ? {
              ...chat,
              title: chat.messages.length === 0 ? input.substring(0, 30) : chat.title,
              messages: [...chat.messages, userMessage],
            }
          : chat
      )
    )

    setInput('')
    setLoading(true)

    try {
      const response = await groq.chat.completions.create({
        messages: [
          ...messages,
          { role: 'user', content: input },
        ] as Array<{role: 'user' | 'assistant', content: string}>,
        model: 'mixtral-8x7b-32768',
        max_tokens: 1024,
      })

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.choices[0].message.content || 'No response',
      }

      setChats(prev =>
        prev.map(chat =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, assistantMessage] }
            : chat
        )
      )
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const copyMessage = (id: string) => {
    const msg = messages.find(m => m.id === id)
    if (msg) {
      navigator.clipboard.writeText(msg.content)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} glass-dark border-r transition-all duration-300 overflow-hidden flex flex-col`}>
        <div className="p-4">
          <button onClick={createNewChat} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg">
            <Plus size={20} />
            New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-2 px-2">
          {chats.map(chat => (
            <div
              key={chat.id}
              onClick={() => setCurrentChatId(chat.id)}
              className={`p-3 rounded-lg cursor-pointer ${
                chat.id === currentChatId ? 'bg-purple-600/30 border border-purple-500/50' : 'hover:bg-white/10'
              }`}
            >
              <p className="text-sm text-white truncate">{chat.title}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setChats(prev => prev.filter(c => c.id !== chat.id))
                }}
                className="mt-2 text-red-400 hover:text-red-300"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="glass-dark border-b px-4 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h2 className="gradient-text font-bold text-lg">{currentChat?.title}</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-900 to-slate-950">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <div className="text-5xl mb-4">🤖</div>
                <h3 className="text-xl font-bold text-white mb-2">Welcome to OMINOUS</h3>
              </div>
            </div>
          ) : (
            messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl group ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'glass-dark'
                }`}>
                  <div className="prose prose-invert max-w-none text-sm">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                  <button
                    onClick={() => copyMessage(msg.id)}
                    className="mt-2 text-xs px-2 py-1 rounded hover:bg-white/20"
                  >
                    {copiedId === msg.id ? '✓ Copied' : <Copy size={14} />}
                  </button>
                </div>
              </div>
            ))
          )}
          {loading && <div className="text-center text-slate-400">⏳ Thinking...</div>}
          <div ref={messagesEndRef} />
        </div>

        <div className="glass-dark border-t p-4">
          <div className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Ask OMINOUS..."
              disabled={loading}
              className="flex-1 bg-slate-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}