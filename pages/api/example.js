// A simple serverless API endpoint for Vercel

export default function handler(req, res) {
  // Access environment variables
  const apiKey = process.env.VERCEL_API_KEY || 'not-set'
  
  // Don't expose sensitive information in production
  const isProduction = process.env.NODE_ENV === 'production'
  
  res.status(200).json({ 
    message: 'Hello from modecollapse.io API!',
    environment: isProduction ? 'production' : 'development',
    // Only include this in development for debugging
    envStatus: isProduction ? 'hidden in production' : 'API keys configured'
  })
} 