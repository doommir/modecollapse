export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  thumbnail: string;
  content: string;
  relatedPosts?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '0',
    slug: 'youre-not-broken-the-system-is-optimized-for-collapse',
    title: 'You\'re Not Broken — The System Is Optimized for Collapse',
    excerpt: 'Welcome to Mode Collapse: A Digital Lab for Upgrading Consciousness',
    date: '2024-05-22',
    author: 'Matt',
    category: 'Education',
    thumbnail: '/blog/mode-collapse.png',
    content: `
    <p>What a strange moment to be alive.</p>
    
    <p>Every day, I talk to smart, capable, earnest people who feel:</p>
    
    <ul>
      <li>Lost in their careers</li>
      <li>Anxious about the future</li>
      <li>Paralyzed by information overload</li>
      <li>Inadequate compared to peers</li>
      <li>Unable to focus on what matters</li>
    </ul>
    
    <p>And here's the thing: <strong>they're not broken</strong>.</p>
    
    <p>They're responding normally to a system optimized for collapse - an education and career landscape that:</p>
    
    <ul>
      <li>Trains them for jobs that won't exist</li>
      <li>Prioritizes credentials over capabilities</li>
      <li>Rewards conformity over curiosity</li>
      <li>Values information over transformation</li>
      <li>Separates learning from living</li>
    </ul>
    
    <h2>The system isn't just broken - it's actively harmful</h2>
    
    <p>Our education system was designed for an industrial era that's long gone. Today it's:</p>
    
    <ul>
      <li>Killing creativity</li>
      <li>Disconnecting us from ourselves</li>
      <li>Creating dependency instead of autonomy</li>
      <li>Teaching compliance instead of critical thinking</li>
      <li>Normalizing anxiety and burnout</li>
    </ul>
    
    <p>But here's the good news:</p>
    
    <h2>We don't need to fix the system. We need to create a new one.</h2>
    
    <p>That's what Mode Collapse is about.</p>
    
    <p>It's a digital laboratory for:</p>
    
    <ul>
      <li>Dismantling outdated approaches to learning</li>
      <li>Designing tools that enhance rather than replace human intelligence</li>
      <li>Building new pathways to meaningful work and contribution</li>
      <li>Connecting people who want to learn differently</li>
    </ul>
    
    <p>In machine learning, "mode collapse" happens when an AI gets stuck generating the same limited outputs over and over, missing the full spectrum of possibilities.</p>
    
    <p>Our education system has experienced its own mode collapse—recycling the same approaches despite diminishing returns.</p>
    
    <p>I'm creating this space to explore what becomes possible when we break out of that loop.</p>
    
    <h2>Here's what you'll find here:</h2>
    
    <ul>
      <li>Tools for thinking better and learning faster</li>
      <li>Frameworks for navigating information overload</li>
      <li>Experiments in collaborative sense-making</li>
      <li>Conversations with people exploring the frontiers of learning and work</li>
    </ul>
    
    <p>If you're feeling stuck, overwhelmed, or unsure where to focus your energy—welcome. You're not broken. And you're not alone.</p>
    
    <p>The world is full of people ready to learn differently and build something better.</p>
    
    <p>Let's connect.</p>`,
    relatedPosts: ['7', '3']
  },
  {
    id: '7',
    slug: 'viral-is-easy-vital-is-everything',
    title: 'Viral Is Easy. Vital Is Everything.',
    excerpt: 'Why Content That Changes Lives > Content That Changes Your Follower Count',
    date: '2024-05-25',
    author: 'Matt',
    category: 'Content Creation',
    thumbnail: '/blog/vitalviralsquare.png',
    content: `
    <p>I've been thinking a lot about what matters on social media lately.</p>
    
    <p>There's an overwhelming amount of content creation advice focused on going viral. We're told to follow strict formulas: hook viewers in the first 3 seconds, create artificial stakes, use specific keywords and hashtags.</p>
    
    <p>And look—some of it works! I've seen creators implement these tactics and watch their numbers shoot up.</p>
    
    <p>But I've been wondering: what's the cost?</p>
    
    <p>When we optimize solely for views and engagement, are we creating content that improves lives? Or are we just contributing to the noise?</p>
    
    <p>Here's what I've decided:</p>
    
    <h2>Viral is easy. Vital is everything.</h2>
    
    <p>When we create content that's vital—that genuinely helps people solve problems, gain new perspectives, or feel less alone—we're doing something that matters.</p>
    
    <p>Vital content might not always hit the algorithm jackpot, but it creates real impact. And that impact compounds over time.</p>
    
    <p>I want to challenge you to ask yourself: "Am I creating content that could genuinely change someone's life for the better?"</p>
    
    <p>If the answer is yes, you're on the right track—regardless of what the numbers say.</p>`,
    relatedPosts: ['0', '3']
  },
  {
    id: '8',
    slug: 'the-system-is-already-dead',
    title: 'The System Is Already Dead',
    excerpt: 'Why Education As We Know It Will Collapse—and What Comes Next',
    date: '2024-05-30',
    author: 'Matt',
    category: 'Education',
    thumbnail: '/blog/system-already-dead.png',
    content: `
    <p>The current education system is on life support—and we all know it.</p>
    
    <p>The signs are everywhere:</p>
    
    <ul>
      <li>Skyrocketing student debt with diminishing returns</li>
      <li>Curriculums teaching skills already automated by AI</li>
      <li>Employers increasingly valuing portfolios over degrees</li>
      <li>A growing mental health crisis among students</li>
    </ul>
    
    <p>We're witnessing the slow-motion collapse of a system designed for the industrial age trying to operate in a digital, AI-powered world.</p>
    
    <h2>The problems are structural</h2>
    
    <p>Our education system was built to create compliant factory workers. Sit in rows. Follow instructions. Memorize information. Complete standardized tests.</p>
    
    <p>But today's world demands creativity, critical thinking, and the ability to collaborate with both humans and AI tools—precisely the skills traditional education often suppresses.</p>
    
    <h2>What's coming next</h2>
    
    <p>I believe we'll see a massive shift toward personalized, project-based learning. Students will build portfolios demonstrating their abilities rather than collecting degrees. Learning will become lifelong, not limited to young adulthood.</p>
    
    <p>Most importantly, education will focus on teaching humans to do what only humans can do—think critically, create meaningfully, and connect deeply with others.</p>
    
    <p>The system may be dying, but what replaces it will be extraordinary.</p>`,
    relatedPosts: ['0', '7']
  },
  {
    id: '1',
    slug: 'getting-started-with-ai-tools',
    title: 'Getting Started with AI Tools',
    excerpt: 'A beginner-friendly guide to integrating AI tools into your workflow.',
    date: '2023-10-15',
    author: 'Jane Doe',
    category: 'AI',
    thumbnail: '/blog/ai-tools.jpg',
    content: `
# Getting Started with AI Tools

Artificial Intelligence (AI) tools have become increasingly accessible and powerful, offering incredible capabilities to enhance productivity, creativity, and problem-solving. This guide aims to help beginners understand how to integrate AI tools into their workflows effectively.

## Understanding AI Tool Categories

Before diving in, it's helpful to understand the different categories of AI tools available:

### 1. Content Generation
- **Text generation**: Tools like GPT models can write articles, summarize text, and create various forms of written content.
- **Image generation**: DALL-E, Midjourney, and Stable Diffusion can create images from text descriptions.
- **Audio/Video generation**: Tools that can generate audio, music, or even video content based on prompts.

### 2. Analysis and Insights
- **Data analysis**: AI tools that can process large datasets and extract meaningful insights.
- **Sentiment analysis**: Tools that can analyze text to determine emotional tone and sentiment.
- **Trend prediction**: AI systems that can identify patterns and predict future trends.

### 3. Automation
- **Workflow automation**: Tools that can automate repetitive tasks in your workflow.
- **Email and communication**: AI assistants that can draft emails or responses based on context.
- **Scheduling and planning**: Tools that can optimize schedules and planning based on various factors.`,
    relatedPosts: ['2', '6']
  },
  {
    id: '2',
    slug: 'the-future-of-web-development',
    title: 'The Future of Web Development',
    excerpt: 'Exploring trends and technologies shaping the next generation of web applications.',
    date: '2023-09-28',
    author: 'John Smith',
    category: 'Web Development',
    thumbnail: '/blog/web-dev.jpg',
    content: `
# The Future of Web Development

Web development continues to evolve at a rapid pace, with new technologies, frameworks, and methodologies emerging regularly. As we look to the future, several key trends and technologies are poised to shape the next generation of web applications.

## Current Trends Shaping the Future

### 1. Progressive Web Apps (PWAs)
Progressive Web Apps combine the best of web and mobile apps, offering offline functionality, push notifications, and app-like experiences without requiring users to visit an app store. As mobile usage continues to dominate, PWAs represent a significant evolution in how we build web applications.

### 2. Jamstack Architecture
The Jamstack approach (JavaScript, APIs, and Markup) separates the front-end from the backend services, pre-rendering pages for better performance. This architecture offers improved security, scalability, and developer experience, making it increasingly popular for modern web projects.

### 3. Headless CMSs
Headless content management systems separate content creation from presentation, allowing developers to use any front-end technology while content editors work in a familiar environment. This decoupling provides greater flexibility and enables omnichannel content delivery.`,
    relatedPosts: ['3', '5']
  },
  {
    id: '3',
    slug: 'maximizing-productivity-with-studycrafter',
    title: 'Maximizing Productivity with StudyCrafter',
    excerpt: 'Tips and tricks to get the most out of the StudyCrafter tool for effective learning.',
    date: '2023-09-10',
    author: 'Alex Johnson',
    category: 'Productivity',
    thumbnail: '/blog/productivity.jpg',
    content: `
# Maximizing Productivity with StudyCrafter

StudyCrafter is a powerful AI-driven study tool designed to transform your learning experience. Whether you're a student preparing for exams, a professional acquiring new skills, or a lifelong learner, StudyCrafter can help you study more effectively and efficiently. This guide will show you how to get the most out of this innovative tool.

## Understanding StudyCrafter's Core Features

### 1. Content Extraction and Organization
StudyCrafter can extract text from various sources, including:
- Images of notes or textbooks
- PDF documents
- Plain text

The AI organizes this information into a structured format, making it easier to process and study.

### 2. Automated Study Materials
Once your content is processed, StudyCrafter automatically generates:
- **Flashcards**: For quick review of key terms and concepts
- **Quizzes**: To test your understanding with multiple-choice and short-answer questions
- **Concept Summaries**: Concise explanations of main ideas`,
    relatedPosts: ['0', '7']
  }
]; 