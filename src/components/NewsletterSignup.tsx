'use client'

import { useState } from 'react'

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  buttonText?: string;
  className?: string;
}

export default function NewsletterSignup({
  title = "Subscribe to Our Newsletter",
  description = "Stay up to date with our latest blog posts, tools, and resources.",
  buttonText = "Subscribe",
  className = "",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }
    
    setStatus('loading');
    setMessage('');
    setEmailSent(false);
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      setStatus('success');
      setMessage(data.message || 'Successfully subscribed to newsletter');
      setEmailSent(!!data.emailSent);
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to subscribe');
    }
  };

  return (
    <div className={`bg-primary/5 p-6 rounded-lg border border-primary/20 ${className}`}>
      <h2 className="text-2xl font-bold text-primary mb-4">{title}</h2>
      <p className="text-textSecondary mb-6">
        {description}
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="flex-grow bg-darkBg/40 border border-textSecondary/20 rounded-md px-4 py-2 text-textPrimary focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`px-6 py-2 bg-primary text-darkBg rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          {status === 'loading' ? 'Subscribing...' : buttonText}
        </button>
      </form>
      
      {message && (
        <div className="mt-4">
          <p className={`text-sm ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
            {message}
          </p>
          {status === 'success' && (
            <p className="text-sm text-textSecondary mt-1">
              {emailSent 
                ? 'A welcome email has been sent to your inbox.' 
                : 'Welcome email delivery is not configured. Contact the site admin for details.'}
            </p>
          )}
        </div>
      )}
    </div>
  );
} 