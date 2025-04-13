'use client'

import { motion } from 'framer-motion'
import ScrollRevealSection from '@/components/ScrollRevealSection'
import SectionDivider from '@/components/SectionDivider'
import Link from 'next/link'

export default function AssignmentGeneratorPage() {
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
              AI Restorative Assignment Generator
            </h1>
            
            <p className="text-textSecondary dark:text-textSecondary text-lg max-w-3xl mb-8">
              Our AI-powered tool helps educators create restorative assignments for students. 
              This generator produces thoughtful, personalized assignments that encourage 
              reflection and growth after behavioral incidents.
            </p>
          </motion.div>
        </ScrollRevealSection>
        
        <ScrollRevealSection className="bg-darkBg/30 dark:bg-darkBg/30 rounded-lg p-6 mb-12 border border-textSecondary/10">
          <div className="w-full">
            <iframe 
              src="https://www.playlab.ai/embedded/cm3nh08q31kk9uvnl54ozct6s" 
              className="w-full"
              height="700px" 
              frameBorder="0" 
              allow="clipboard-write"
            />
          </div>
        </ScrollRevealSection>
        
        <SectionDivider />
        
        <ScrollRevealSection className="my-12">
          <h2 className="text-2xl font-bold text-textPrimary mb-6">How to Use This Tool</h2>
          
          <div className="space-y-4 text-textSecondary">
            <p>
              1. Enter details about the student&apos;s situation and the incident
            </p>
            <p>
              2. Specify educational goals and desired learning outcomes
            </p>
            <p>
              3. Generate a personalized assignment that addresses the behavior
            </p>
            <p>
              4. Customize the results to fit your educational context
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
                <h3 className="font-bold text-textPrimary">Personalized Learning</h3>
                <p className="text-textSecondary">Tailored to each student&apos;s specific situation and needs</p>
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
                <p className="text-textSecondary">Create meaningful assignments in seconds instead of hours</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-primary mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-textPrimary">Restorative Focus</h3>
                <p className="text-textSecondary">Emphasizes reflection, growth, and community repair</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-primary mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-textPrimary">Educational Alignment</h3>
                <p className="text-textSecondary">Designed to meet curriculum standards while addressing behavior</p>
              </div>
            </div>
          </div>
        </ScrollRevealSection>
      </div>
    </div>
  )
} 