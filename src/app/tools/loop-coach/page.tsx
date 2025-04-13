'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import ScrollRevealSection from '@/components/ScrollRevealSection'
import SectionDivider from '@/components/SectionDivider'
import Link from 'next/link'

export default function LoopCoachPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [feedback, setFeedback] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file)
      setFeedback(null)
    }
  }
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file)
      setFeedback(null)
    }
  }
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }
  
  const analyzeVideo = () => {
    setIsAnalyzing(true)
    
    // In an actual implementation, this would call an API to process the video
    // For the MVP demo, we'll simulate a response after a delay
    setTimeout(() => {
      const mockFeedback = {
        clarity: {
          score: 8.5,
          feedback: "Your explanations are generally clear. Try to reduce jargon when explaining complex concepts."
        },
        pace: {
          wordsPerMinute: 165,
          feedback: "Your speaking pace is good - neither too fast nor too slow. Occasional pauses for emphasis could enhance your delivery."
        },
        fillerWords: {
          count: 12,
          words: ["um", "like", "you know"],
          feedback: "You used filler words 12 times in your 3-minute clip. Practicing with more preparation can help reduce these."
        },
        engagement: {
          score: 7.2,
          feedback: "Your tone shows good engagement but could use more variety. Consider using more questions and emphasis on key points."
        },
        facial: {
          score: 6.8,
          feedback: "You maintain a pleasant expression but could benefit from more animated facial expressions to emphasize important points."
        },
        summary: {
          strengths: [
            "Clear articulation of main concepts",
            "Good speaking pace",
            "Confident stance and posture"
          ],
          improvements: [
            "Reduce filler words",
            "Incorporate more tonal variety",
            "Increase facial expressiveness"
          ]
        }
      }
      
      setFeedback(mockFeedback)
      setIsAnalyzing(false)
    }, 3000)
  }
  
  const resetForm = () => {
    setVideoFile(null)
    setFeedback(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
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
              LoopCoach
            </h1>
            
            <p className="text-textSecondary dark:text-textSecondary text-lg max-w-3xl mb-8">
              Your personal AI speech coach — powered by microfeedback loops. Upload a 1–3 min video 
              of yourself teaching. In under 2 minutes, get targeted feedback on delivery — clarity, 
              pacing, filler words, engagement tone, and facial expressiveness.
            </p>
          </motion.div>
        </ScrollRevealSection>
        
        <ScrollRevealSection className="bg-darkBg/30 dark:bg-darkBg/30 rounded-lg p-6 mb-12 border border-textSecondary/10">
          <div className="w-full">
            {!videoFile && !feedback ? (
              <div 
                className="border-2 border-dashed border-primary/30 rounded-lg p-10 text-center"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="max-w-md mx-auto">
                  <svg 
                    className="h-16 w-16 mx-auto text-primary/50 mb-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                    />
                  </svg>
                  
                  <h3 className="text-xl font-bold text-textPrimary mb-2">Upload Your Teaching Video</h3>
                  <p className="text-textSecondary mb-6">
                    Drag and drop your video file here, or click to browse. 
                    Videos should be 1-3 minutes for best results.
                  </p>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="video/*"
                    className="hidden"
                    id="videoUpload"
                  />
                  
                  <label 
                    htmlFor="videoUpload"
                    className="inline-block px-6 py-3 bg-primary text-darkBg rounded-md font-medium cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    Select Video
                  </label>
                </div>
              </div>
            ) : videoFile && !feedback ? (
              <div className="p-4">
                <div className="flex items-center mb-6">
                  <div className="flex-grow">
                    <h3 className="font-bold text-textPrimary">{videoFile.name}</h3>
                    <p className="text-textSecondary text-sm">
                      {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <button 
                    onClick={resetForm}
                    className="text-textSecondary hover:text-primary"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                <video 
                  src={URL.createObjectURL(videoFile)} 
                  controls
                  className="w-full rounded-lg mb-6 max-h-96 object-contain bg-black"
                />
                
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 border border-textSecondary/20 rounded-md text-textPrimary hover:bg-textSecondary/5"
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={analyzeVideo}
                    disabled={isAnalyzing}
                    className={`px-6 py-2 bg-primary text-darkBg rounded-md font-medium 
                              ${isAnalyzing ? 'opacity-70' : 'hover:bg-primary/90'} transition-colors`}
                  >
                    {isAnalyzing ? (
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
                        Analyzing Video...
                      </div>
                    ) : "Analyze My Teaching"}
                  </button>
                </div>
              </div>
            ) : feedback ? (
              <div className="p-4">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold text-primary">Your Feedback</h3>
                  <button 
                    onClick={resetForm}
                    className="px-4 py-2 text-sm border border-primary/20 text-primary rounded-md hover:bg-primary/5"
                  >
                    Record New Video
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Clarity */}
                  <div className="bg-darkBg/20 p-4 rounded-lg border border-textSecondary/10">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-textPrimary">Clarity</h4>
                      <div className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
                        {feedback.clarity.score}/10
                      </div>
                    </div>
                    <p className="text-textSecondary text-sm">{feedback.clarity.feedback}</p>
                  </div>
                  
                  {/* Pace */}
                  <div className="bg-darkBg/20 p-4 rounded-lg border border-textSecondary/10">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-textPrimary">Speaking Pace</h4>
                      <div className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
                        {feedback.pace.wordsPerMinute} WPM
                      </div>
                    </div>
                    <p className="text-textSecondary text-sm">{feedback.pace.feedback}</p>
                  </div>
                  
                  {/* Filler Words */}
                  <div className="bg-darkBg/20 p-4 rounded-lg border border-textSecondary/10">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-textPrimary">Filler Words</h4>
                      <div className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
                        {feedback.fillerWords.count} detected
                      </div>
                    </div>
                    <p className="text-textSecondary text-sm mb-2">{feedback.fillerWords.feedback}</p>
                    <div className="flex flex-wrap gap-2">
                      {feedback.fillerWords.words.map((word: string, index: number) => (
                        <span key={index} className="text-xs px-2 py-1 bg-textSecondary/10 rounded-full">
                          "{word}"
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Engagement */}
                  <div className="bg-darkBg/20 p-4 rounded-lg border border-textSecondary/10">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-textPrimary">Engagement</h4>
                      <div className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
                        {feedback.engagement.score}/10
                      </div>
                    </div>
                    <p className="text-textSecondary text-sm">{feedback.engagement.feedback}</p>
                  </div>
                  
                  {/* Facial Expression */}
                  <div className="bg-darkBg/20 p-4 rounded-lg border border-textSecondary/10 md:col-span-2">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-textPrimary">Facial Expressiveness</h4>
                      <div className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
                        {feedback.facial.score}/10
                      </div>
                    </div>
                    <p className="text-textSecondary text-sm">{feedback.facial.feedback}</p>
                  </div>
                </div>
                
                {/* Summary */}
                <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-4">Summary</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-textPrimary mb-3 flex items-center">
                        <svg className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        What You Did Well
                      </h4>
                      <ul className="space-y-2 text-textSecondary">
                        {feedback.summary.strengths.map((strength: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-textPrimary mb-3 flex items-center">
                        <svg className="h-5 w-5 mr-2 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        What To Improve
                      </h4>
                      <ul className="space-y-2 text-textSecondary">
                        {feedback.summary.improvements.map((improvement: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </ScrollRevealSection>
        
        <SectionDivider />
        
        <ScrollRevealSection className="my-12">
          <h2 className="text-2xl font-bold text-textPrimary mb-6">How LoopCoach Works</h2>
          
          <div className="space-y-4 text-textSecondary">
            <p>
              1. Upload a short video (1-3 minutes) of yourself teaching or presenting
            </p>
            <p>
              2. Our AI analyzes your delivery, including clarity, pacing, filler words, and expressiveness
            </p>
            <p>
              3. Receive detailed feedback with actionable suggestions to improve
            </p>
            <p>
              4. Record a new video and continue the feedback loop to track your improvement
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
                <h3 className="font-bold text-textPrimary">Targeted Feedback</h3>
                <p className="text-textSecondary">Get specific, actionable advice on how to improve your delivery</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-primary mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-textPrimary">Rapid Improvement</h3>
                <p className="text-textSecondary">See measurable progress with each practice session</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-primary mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-textPrimary">Private Practice</h3>
                <p className="text-textSecondary">Improve your skills in a safe, judgment-free environment</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-primary mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-textPrimary">Data-Driven Insights</h3>
                <p className="text-textSecondary">Analyze specific metrics like pace, clarity, and engagement</p>
              </div>
            </div>
          </div>
        </ScrollRevealSection>
      </div>
    </div>
  )
} 