'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import ScrollRevealSection from '@/components/ScrollRevealSection'
import SectionDivider from '@/components/SectionDivider'
import Link from 'next/link'

type FlashcardType = {
  id: string;
  term: string;
  definition: string;
}

type QuizQuestionType = {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  type: 'multiple' | 'short';
}

type ConceptType = {
  id: string;
  title: string;
  summary: string;
}

export default function StudyCrafterPage() {
  const [file, setFile] = useState<File | null>(null)
  const [content, setContent] = useState<string>('')
  const [processedContent, setProcessedContent] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [generatedTools, setGeneratedTools] = useState<{
    flashcards: FlashcardType[];
    quiz: QuizQuestionType[];
    concepts: ConceptType[];
  } | null>(null)
  const [activeTab, setActiveTab] = useState<'upload' | 'flashcards' | 'quiz' | 'concepts' | 'chat'>('upload')
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [chatInput, setChatInput] = useState('')
  const [chatMode, setChatMode] = useState<'ask' | 'quiz' | 'explain'>('ask')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [studySession, setStudySession] = useState<{
    id: string;
    title: string;
    content: string;
    createdAt: Date;
  } | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const chatInputRef = useRef<HTMLInputElement>(null)
  
  // Check for existing study session in localStorage
  useEffect(() => {
    const savedSession = localStorage.getItem('studySession')
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession)
        setStudySession(session)
        setProcessedContent(session.content)
        
        // If we have a saved session but no tools yet, generate them
        if (!generatedTools) {
          setTimeout(() => {
            generateStudyTools(session.content)
          }, 500)
        }
      } catch (error) {
        console.error('Error loading saved study session:', error)
      }
    }
  }, [])
  
  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const base64String = reader.result as string
        // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64Content = base64String.split(',')[1]
        resolve(base64Content)
      }
      reader.onerror = error => reject(error)
    })
  }
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFile(file)
      setContent('')
      setGeneratedTools(null)
      setError(null)
      setIsProcessing(true)
      
      try {
        // For text files, read directly
        if (file.type === 'text/plain') {
          const reader = new FileReader()
          reader.onload = (e) => {
            const text = e.target?.result as string
            setContent(text)
            setProcessedContent(text)
            setIsProcessing(false)
          }
          reader.onerror = () => {
            setError('Failed to read file')
            setIsProcessing(false)
          }
          reader.readAsText(file)
        } 
        // For images, use GPT-4o OCR capabilities
        else if (file.type.startsWith('image/')) {
          try {
            // Convert file to base64
            const base64Data = await fileToBase64(file)
            
            // Call our API to extract text
            const response = await fetch('/api/openai', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                action: 'extractText',
                fileData: base64Data,
                fileType: file.type
              })
            })
            
            if (!response.ok) {
              throw new Error(`Server responded with ${response.status}: ${response.statusText}`)
            }
            
            const data = await response.json()
            if (data.error) {
              throw new Error(data.error)
            }
            
            setContent(data.text)
            setProcessedContent(data.text)
          } catch (err: any) {
            console.error('Error processing image:', err)
            setError(`Failed to process image: ${err.message || 'Unknown error'}`)
          }
        }
        // For PDFs or other files, send to API but handle differently
        else if (file.type === 'application/pdf') {
          try {
            // Convert file to base64
            const base64Data = await fileToBase64(file)
            
            // Call our API to extract text
            const response = await fetch('/api/openai', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                action: 'extractText',
                fileData: base64Data,
                fileType: file.type
              })
            })
            
            if (!response.ok) {
              throw new Error(`Server responded with ${response.status}: ${response.statusText}`)
            }
            
            const data = await response.json()
            if (data.error) {
              throw new Error(data.error)
            }
            
            setContent(data.text)
            setProcessedContent(data.text)
          } catch (err: any) {
            console.error('Error processing PDF:', err)
            setError(`Failed to process PDF: ${err.message || 'Unknown error'}`)
          }
        }
        else {
          setError('Unsupported file type. Please upload a text, PDF, or image file.')
        }
      } catch (error: any) {
        console.error('Error processing file:', error)
        setError(`Failed to process file: ${error.message || 'Unknown error'}`)
      } finally {
        setIsProcessing(false)
      }
    }
  }
  
  const handleTextInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setContent(text)
    setProcessedContent(text)
    setFile(null)
    setError(null)
  }
  
  const generateStudyTools = async (contentToProcess = processedContent) => {
    if (!contentToProcess) return
    
    setIsGenerating(true)
    setError(null)
    
    // Create a new study session
    const sessionId = `session-${Date.now()}`
    const newSession = {
      id: sessionId,
      title: file ? file.name : `Study Session ${new Date().toLocaleDateString()}`,
      content: contentToProcess,
      createdAt: new Date()
    }
    
    // Save to localStorage for persistence
    localStorage.setItem('studySession', JSON.stringify(newSession))
    setStudySession(newSession)
    
    try {
      // Call our API to generate study tools
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generateTools',
          content: contentToProcess
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate study tools')
      }
      
      const toolsData = await response.json()
      setGeneratedTools(toolsData)
      setActiveTab('flashcards')
    } catch (error) {
      console.error('Error generating study tools:', error)
      setError('Failed to generate study tools. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }
  
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim() || !processedContent) return
    
    const newMessage = { role: 'user' as const, content: chatInput }
    setChatMessages(prev => [...prev, newMessage])
    setChatInput('')
    setIsLoading(true)
    setError(null)
    
    try {
      // Call our API to get a response from the AI
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'chat',
          content: processedContent,
          chatHistory: [...chatMessages, newMessage],
          mode: chatMode
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to get response from study buddy')
      }
      
      const data = await response.json()
      
      // Add assistant's response to chat
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.message
      }])
    } catch (error) {
      console.error('Error in chat:', error)
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, I encountered an error. Please try again."
      }])
      setError('Failed to communicate with study buddy. Please try again.')
    } finally {
      setIsLoading(false)
      if (chatInputRef.current) {
        chatInputRef.current.focus()
      }
    }
  }
  
  const resetStudySession = () => {
    setFile(null)
    setContent('')
    setProcessedContent('')
    setGeneratedTools(null)
    setActiveTab('upload')
    setChatMessages([])
    setChatInput('')
    setStudySession(null)
    setError(null)
    localStorage.removeItem('studySession')
  }
  
  // Render UI based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'upload':
        return (
          <div className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-lg">
                {error}
              </div>
            )}
            
            <div className="border-2 border-dashed border-primary/30 rounded-lg p-8">
              <div className="max-w-lg mx-auto text-center">
                <svg 
                  className="h-14 w-14 mx-auto text-primary/50 mb-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
                
                <h3 className="text-xl font-bold text-textPrimary mb-2">Upload Your Study Material</h3>
                <p className="text-textSecondary mb-6">
                  Upload PDF, image, or text files with your notes to generate study tools.
                </p>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.txt,.jpg,.jpeg,.png"
                  className="hidden"
                  id="studyFileUpload"
                />
                
                <label 
                  htmlFor="studyFileUpload"
                  className={`inline-block px-6 py-3 ${isProcessing ? 'bg-primary/60' : 'bg-primary'} text-darkBg rounded-md font-medium cursor-pointer hover:bg-primary/90 transition-colors`}
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle 
                          className="opacity-25" 
                          cx="12" cy="12" r="10" 
                          stroke="currentColor" 
                          strokeWidth="4" 
                          fill="none" 
                        />
                        <path 
                          className="opacity-75" 
                          fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
                        />
                      </svg>
                      Processing...
                    </div>
                  ) : "Choose File"}
                </label>
                
                {file && !isProcessing && (
                  <div className="mt-4 text-textPrimary">
                    Selected: <span className="font-semibold">{file.name}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-textPrimary">Or Paste Your Content Here</h3>
              <textarea 
                value={content} 
                onChange={handleTextInput}
                className="w-full h-64 bg-darkBg/40 border border-textSecondary/20 rounded-md p-4 text-textPrimary focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                placeholder="Paste your study notes, definitions, or content here..."
                disabled={isProcessing}
              />
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => generateStudyTools()}
                disabled={!content || isGenerating || isProcessing}
                className={`px-6 py-3 bg-primary text-darkBg rounded-md font-medium 
                          ${(!content || isGenerating || isProcessing) ? 'opacity-70' : 'hover:bg-primary/90'} transition-colors`}
              >
                {isGenerating ? (
                  <div className="flex items-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle 
                        className="opacity-25" 
                        cx="12" cy="12" r="10" 
                        stroke="currentColor" 
                        strokeWidth="4" 
                        fill="none" 
                      />
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
                      />
                    </svg>
                    Generating Study Tools...
                  </div>
                ) : "Generate Study Tools"}
              </button>
            </div>
          </div>
        )
      
      case 'flashcards':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary">Flashcards</h3>
            <p className="text-textSecondary">Review these flashcards to test your knowledge of key terms and concepts.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generatedTools?.flashcards.map(card => (
                <div 
                  key={card.id} 
                  className="bg-darkBg/30 border border-textSecondary/10 rounded-lg overflow-hidden h-full"
                >
                  <div className="bg-primary/10 p-4 border-b border-textSecondary/10">
                    <h4 className="font-bold text-primary">{card.term}</h4>
                  </div>
                  <div className="p-4">
                    <p className="text-textSecondary">{card.definition}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 'quiz':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary">Practice Quiz</h3>
            <p className="text-textSecondary">Test your understanding with these automatically generated questions.</p>
            
            <div className="space-y-6">
              {generatedTools?.quiz.map(question => (
                <div 
                  key={question.id} 
                  className="bg-darkBg/30 border border-textSecondary/10 rounded-lg p-5"
                >
                  <h4 className="font-bold text-textPrimary mb-3">{question.question}</h4>
                  
                  {question.type === 'multiple' ? (
                    <div className="space-y-2">
                      {question.options?.map((option, index) => (
                        <div key={index} className="flex items-center">
                          <input 
                            type="radio" 
                            id={`q${question.id}_opt${index}`}
                            name={`question_${question.id}`}
                            className="h-4 w-4 text-primary border-textSecondary/30 bg-darkBg/50 focus:ring-primary"
                          />
                          <label 
                            htmlFor={`q${question.id}_opt${index}`}
                            className="ml-2 text-textSecondary"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                      
                      <div className="mt-3 pt-3 border-t border-textSecondary/10">
                        <details className="text-textSecondary">
                          <summary className="cursor-pointer text-primary hover:underline">Show Answer</summary>
                          <p className="mt-2 pl-2 border-l-2 border-primary/50">{question.correctAnswer}</p>
                        </details>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <textarea 
                        className="w-full h-24 bg-darkBg/40 border border-textSecondary/20 rounded-md p-3 text-textPrimary focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        placeholder="Type your answer here..."
                      />
                      
                      <details className="text-textSecondary">
                        <summary className="cursor-pointer text-primary hover:underline">Show Sample Answer</summary>
                        <p className="mt-2 pl-2 border-l-2 border-primary/50">{question.correctAnswer}</p>
                      </details>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      
      case 'concepts':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary">Concept Summaries</h3>
            <p className="text-textSecondary">Quick recap of the main concepts from your study material.</p>
            
            <div className="space-y-4">
              {generatedTools?.concepts.map(concept => (
                <div 
                  key={concept.id} 
                  className="bg-darkBg/30 border border-textSecondary/10 rounded-lg p-5"
                >
                  <h4 className="font-bold text-textPrimary mb-2">{concept.title}</h4>
                  <p className="text-textSecondary">{concept.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 'chat':
        return (
          <div className="flex flex-col h-[500px]">
            <div className="flex space-x-2 mb-4">
              <button
                onClick={() => setChatMode('ask')}
                className={`px-3 py-1 rounded-md text-sm ${chatMode === 'ask' ? 'bg-primary text-darkBg' : 'bg-darkBg/30 text-textSecondary hover:bg-darkBg/50'}`}
              >
                Ask Anything
              </button>
              <button
                onClick={() => setChatMode('quiz')}
                className={`px-3 py-1 rounded-md text-sm ${chatMode === 'quiz' ? 'bg-primary text-darkBg' : 'bg-darkBg/30 text-textSecondary hover:bg-darkBg/50'}`}
              >
                Quiz Me
              </button>
              <button
                onClick={() => setChatMode('explain')}
                className={`px-3 py-1 rounded-md text-sm ${chatMode === 'explain' ? 'bg-primary text-darkBg' : 'bg-darkBg/30 text-textSecondary hover:bg-darkBg/50'}`}
              >
                Explain This
              </button>
            </div>
          
            <div className="flex-grow overflow-y-auto bg-darkBg/20 rounded-lg border border-textSecondary/10 p-4 mb-4">
              {chatMessages.length === 0 ? (
                <div className="text-center text-textSecondary my-10">
                  <svg className="h-12 w-12 mx-auto text-primary/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <p>AI Study Buddy is ready to help!</p>
                  <p className="text-sm mt-2">
                    {chatMode === 'ask' && "Ask any question about your study material."}
                    {chatMode === 'quiz' && "I'll quiz you on your study material."}
                    {chatMode === 'explain' && "Ask me to explain concepts from your notes."}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {chatMessages.map((message, index) => (
                    <div 
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.role === 'user' 
                            ? 'bg-primary/20 text-textPrimary' 
                            : 'bg-darkBg/40 border border-textSecondary/10 text-textSecondary'
                        }`}
                      >
                        <p style={{ whiteSpace: 'pre-wrap' }}>{message.content}</p>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-darkBg/40 border border-textSecondary/10 rounded-lg px-4 py-3 max-w-[80%]">
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="h-2 w-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="h-2 w-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <form onSubmit={handleChatSubmit} className="flex">
              <input
                type="text"
                ref={chatInputRef}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-grow bg-darkBg/40 border border-textSecondary/20 rounded-l-md px-4 py-2 text-textPrimary focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                placeholder={`${
                  chatMode === 'ask' ? "Ask anything about your notes..." : 
                  chatMode === 'quiz' ? "Ready for a question? Type 'quiz me'..." : 
                  "Ask me to explain a concept..."
                }`}
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || isLoading}
                className="bg-primary text-darkBg rounded-r-md px-4 hover:bg-primary/90 disabled:opacity-70"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        )
        
      default:
        return null
    }
  }
  
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollRevealSection className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/portfolio" 
              className="inline-flex items-center text-primary mb-6 hover:underline"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Portfolio
            </Link>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading mb-4 text-primary">
              StudyCrafter
            </h1>
            
            <p className="text-textSecondary dark:text-textSecondary text-lg max-w-3xl mb-8">
              Transform your notes and study materials into interactive flashcards, quizzes, and an 
              AI-powered study buddy. Upload content once, study smarter with personalized tools.
            </p>
          </motion.div>
        </ScrollRevealSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left sidebar - only shown when tools are generated */}
          {generatedTools && (
            <div className="lg:col-span-1">
              <div className="bg-darkBg/30 dark:bg-darkBg/30 rounded-lg border border-textSecondary/10 overflow-hidden">
                <div className="p-4 border-b border-textSecondary/10">
                  <h2 className="font-bold text-textPrimary">Study Tools</h2>
                </div>
                
                <nav className="p-2">
                  <button 
                    onClick={() => setActiveTab('upload')}
                    className={`w-full text-left px-3 py-2 rounded-md mb-1 ${activeTab === 'upload' ? 'bg-primary/20 text-primary' : 'text-textSecondary hover:bg-darkBg/50'}`}
                  >
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Study Material
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('flashcards')}
                    className={`w-full text-left px-3 py-2 rounded-md mb-1 ${activeTab === 'flashcards' ? 'bg-primary/20 text-primary' : 'text-textSecondary hover:bg-darkBg/50'}`}
                  >
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                      Flashcards ({generatedTools.flashcards.length})
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('quiz')}
                    className={`w-full text-left px-3 py-2 rounded-md mb-1 ${activeTab === 'quiz' ? 'bg-primary/20 text-primary' : 'text-textSecondary hover:bg-darkBg/50'}`}
                  >
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Quiz ({generatedTools.quiz.length})
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('concepts')}
                    className={`w-full text-left px-3 py-2 rounded-md mb-1 ${activeTab === 'concepts' ? 'bg-primary/20 text-primary' : 'text-textSecondary hover:bg-darkBg/50'}`}
                  >
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Concepts ({generatedTools.concepts.length})
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('chat')}
                    className={`w-full text-left px-3 py-2 rounded-md mb-1 ${activeTab === 'chat' ? 'bg-primary/20 text-primary' : 'text-textSecondary hover:bg-darkBg/50'}`}
                  >
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      AI Study Buddy
                    </div>
                  </button>
                </nav>
                
                <div className="p-4 border-t border-textSecondary/10">
                  <button 
                    onClick={resetStudySession}
                    className="w-full px-3 py-2 bg-darkBg/40 text-textSecondary rounded-md hover:bg-darkBg/60"
                  >
                    <div className="flex items-center justify-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Reset Session
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Main content area */}
          <div className={`${generatedTools ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            <ScrollRevealSection className="bg-darkBg/30 dark:bg-darkBg/30 rounded-lg p-6 mb-12 border border-textSecondary/10">
              <div className="w-full">
                {renderTabContent()}
              </div>
            </ScrollRevealSection>
          </div>
        </div>
        
        <SectionDivider />
        
        <ScrollRevealSection className="my-12">
          <h2 className="text-2xl font-bold text-textPrimary mb-6">How StudyCrafter Works</h2>
          
          <div className="space-y-4 text-textSecondary">
            <p>
              1. Upload your PDF, document, or paste text from your study materials
            </p>
            <p>
              2. Our AI analyzes your content to create flashcards, quizzes, and concept summaries
            </p>
            <p>
              3. Use the AI Study Buddy to ask questions or get quizzed on the material
            </p>
            <p>
              4. Track your study sessions and improve retention with active recall techniques
            </p>
          </div>
        </ScrollRevealSection>
        
        <ScrollRevealSection className="bg-primary/5 p-6 rounded-lg border border-primary/20 my-12">
          <h2 className="text-2xl font-bold text-primary mb-4">Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-primary mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-textPrimary">Active Recall</h3>
                <p className="text-textSecondary">Generate tools that help you actively retrieve information, proven to improve retention</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-primary mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-textPrimary">Private & Personalized</h3>
                <p className="text-textSecondary">Your AI study buddy only knows what you're studying, providing focused, relevant assistance</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-primary mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-textPrimary">Time-Saving</h3>
                <p className="text-textSecondary">Transform raw notes into structured study materials in seconds, not hours</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-primary mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-textPrimary">Focused Learning</h3>
                <p className="text-textSecondary">Stay on topic with content that only covers what you need to learn</p>
              </div>
            </div>
          </div>
        </ScrollRevealSection>
      </div>
    </div>
  )
} 