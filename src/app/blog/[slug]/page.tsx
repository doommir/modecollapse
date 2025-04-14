'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ScrollRevealSection from '@/components/ScrollRevealSection'
import SectionDivider from '@/components/SectionDivider'

// Mock data for blog posts - in a real app, you would fetch this from an API or CMS
const blogPosts = [
  {
    id: '0',
    slug: 'youre-not-broken-the-system-is-optimized-for-collapse',
    title: 'You\'re Not Broken — The System Is Optimized for Collapse',
    excerpt: 'Welcome to Mode Collapse: A Digital Lab for Upgrading Consciousness',
    date: '2024-05-22',
    author: 'Matt',
    category: 'Education',
    thumbnail: '/blog/mode-collapse.jpg',
    content: `
# **🧠 You're Not Broken — The System Is Optimized for Collapse**

**Welcome to Mode Collapse: A Digital Lab for Upgrading Consciousness**

---

In the world of AI, there's a failure pattern called **mode collapse**.

It happens when a generative model, instead of producing diverse, creative outputs, begins repeating itself.

The longer it trains on feedback loops, the worse it gets.

Everything starts to look the same.

It gets stuck.

It forgets how to explore.

Sound familiar?

That's not just a machine problem.

That's a human problem.

---

## **📚 The Education System Has a Mode Collapse Problem**

We ask kids to be creative—then measure them by how closely they match a rubric.

We teach critical thinking—but punish those who ask disruptive questions.

We claim to prepare students for the future—while rewarding them for memorizing the past.

In this system, learning isn't about expansion.

It's about repetition.

Like an AI trained on the same dataset over and over, our students—and often, our educators—start to collapse.

Not physically, but cognitively.

**The outputs narrow. The curiosity fades. The spark dies.**

---

## **💡 What If Getting Smarter Isn't About Input, But Escape?**

We're told to "consume more," "read more," "keep up."

But if you're trapped in a loop—consuming more only reinforces it.

Real learning begins when we interrupt the loop.

When we stop optimizing for performance, and start optimizing for **perspective**.

When we stop playing to the algorithm and start asking:

> _What else could this be?_

This blog, Mode Collapse, is dedicated to that question.

---

## **🧠 What You'll Find Here**

Mode Collapse is a lab. A dojo. A resistance.

It's where educators, technologists, and lifelong learners come to:
- Explore how **AI metaphors** can reshape how we teach and learn
- Understand the **psychology of algorithms**—and how they train us
- Build **new systems for thinking** that don't burn us out
- Reclaim **deep work, creativity, and meaning** in a distracted age

This isn't productivity porn.

It's consciousness engineering.

---

## **🛠️ Why This Matters for Teachers and Learners**

If you're an educator, you're already a system designer.

You shape how kids think.

And yet, most of us were never taught to recognize the hidden algorithms shaping us.

You don't need to teach AI to use Mode Collapse.

You just need to teach like a conscious creator—one who knows how loops form and how to break them.

> Because the real upgrade isn't in the tech.
>
> It's in how we _think_ about thinking.

---

## **🚪 Ready to Get Smarter by Getting Freer?**

Here's how to start:
1. **Follow the blog** — we'll be posting weekly essays + resources
2. **Sign up for the newsletter** for tools, templates, and community invites
3. **Share this post** with a fellow educator, creative, or curious friend
4. **Ask yourself:**
   > Where am I repeating myself?
   > 
   > What might it look like to think differently—on purpose?

---

This is just Day One.

But if you've made it here, you've already begun.

Welcome to the experiment.

Welcome to Mode Collapse.

🧠📡

—Matt
    `,
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
    thumbnail: '/blog/viral-vital.jpg',
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
- **Scheduling and planning**: Tools that can optimize schedules and planning based on various factors.

## Getting Started with AI Tools

### 1. Identify Your Needs
Before choosing AI tools, clearly identify the problems you're trying to solve or tasks you want to optimize. This will help you select the most appropriate tools for your specific needs.

### 2. Start Small
Begin with one or two AI tools that address your most pressing needs. Trying to implement too many tools at once can be overwhelming and counterproductive.

### 3. Learn the Basics
Take time to understand how each tool works, its capabilities, and limitations. Many AI tools have tutorials, documentation, or community forums that can be valuable resources.

### 4. Experiment and Iterate
AI tools often require experimentation to get the best results. Try different approaches, prompts, or settings to see what works best for your specific use case.

### 5. Integrate with Existing Workflows
Look for ways to integrate AI tools with your existing workflows rather than completely overhauling your processes. This incremental approach tends to be more sustainable.

## Ethical Considerations

When using AI tools, keep these ethical considerations in mind:

1. **Data privacy**: Be mindful of the data you're sharing with AI tools, especially if it contains sensitive or personal information.
2. **Bias awareness**: AI systems can inherit biases from their training data. Be critical of outputs and verify accuracy.
3. **Attribution**: When using AI-generated content, be transparent about its origin when appropriate.
4. **Overreliance**: Avoid becoming too dependent on AI tools. They should complement human skills, not replace critical thinking.

## Popular AI Tools for Beginners

Here are some user-friendly AI tools to consider:

- **ChatGPT**: A versatile tool for text generation, brainstorming, and problem-solving.
- **DALL-E or Midjourney**: For creating images from text descriptions.
- **Grammarly**: An AI writing assistant that helps improve writing quality.
- **Notion AI**: Integrated AI features within the Notion workspace tool.
- **Zapier**: Automation tool with AI capabilities to connect different apps and services.

## Conclusion

AI tools can significantly enhance your productivity and creative capabilities when used thoughtfully. By starting with a clear understanding of your needs, learning the basics, and gradually integrating these tools into your workflow, you can leverage the power of AI without feeling overwhelmed.

Remember that AI tools are most effective when they complement human skills rather than replace them. Use these tools to handle routine tasks or provide inspiration, allowing you to focus on activities that require human creativity, critical thinking, and emotional intelligence.
    `,
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
Headless content management systems separate content creation from presentation, allowing developers to use any front-end technology while content editors work in a familiar environment. This decoupling provides greater flexibility and enables omnichannel content delivery.

### 4. WebAssembly (WASM)
WebAssembly allows code written in languages like C, C++, and Rust to run in the browser at near-native speed. This technology opens doors for bringing desktop-quality applications to the web, including games, video editing tools, and complex data visualization.

## Emerging Technologies

### 1. AI-Powered Development
Artificial intelligence is revolutionizing web development through:
- **Code generation**: AI tools can generate boilerplate code or suggest completions.
- **Automated testing**: AI can help identify bugs and test edge cases more efficiently.
- **Design to code**: Converting design mockups directly to functional HTML/CSS.
- **Personalization**: Creating highly personalized user experiences based on behavior.

### 2. Low-Code and No-Code Platforms
These platforms empower non-developers to build web applications through visual interfaces and pre-built components. While they won't replace professional developers, they will reshape the landscape by handling simpler use cases and allowing developers to focus on more complex challenges.

### 3. Web3 and Decentralized Applications
Blockchain technology and the concept of Web3 promote decentralized applications that give users more control over their data. This paradigm shift could fundamentally change how web applications handle user data, authentication, and transactions.

### 4. Extended Reality (XR) on the Web
WebXR brings virtual and augmented reality experiences to the browser without requiring special apps. As XR hardware becomes more accessible, we'll see a proliferation of immersive web experiences for shopping, education, entertainment, and collaboration.

## Future Development Practices

### 1. Microservices and Micro-Frontends
Breaking applications into smaller, independently deployable services will become standard practice, extending the microservices concept to frontend development through micro-frontends. This approach enhances scalability and enables specialized teams to work more efficiently.

### 2. Edge Computing
Moving processing closer to users through edge computing will improve performance by reducing latency. Edge functions and CDN-based computing will become integral to web application architecture.

### 3. DevOps and GitOps Evolution
Automated CI/CD pipelines will become even more sophisticated, with infrastructure as code and GitOps practices becoming standard. These approaches ensure consistent environments and deployment processes.

### 4. Accessibility-First Development
Accessibility will shift from an afterthought to a fundamental development principle, with tools and frameworks incorporating accessibility features by default. This shift reflects both ethical considerations and regulatory requirements.

## Skills for Future Web Developers

To stay relevant in the evolving web development landscape, developers should focus on:

1. **JavaScript fundamentals**: Despite framework changes, strong JavaScript knowledge remains essential.
2. **Performance optimization**: Understanding how to build fast, efficient applications across devices.
3. **API design**: Creating robust, scalable APIs that connect various services.
4. **Security practices**: Protecting applications from increasingly sophisticated threats.
5. **Cross-platform development**: Building experiences that work seamlessly across devices.
6. **AI and machine learning basics**: Leveraging AI capabilities in web applications.

## Conclusion

The future of web development points toward more immersive, personalized, and decentralized applications built with increasingly sophisticated tools and approaches. While the specific technologies will evolve, the core principles of creating accessible, performant, and user-focused web experiences will remain constant.

Developers who stay curious, embrace continuous learning, and focus on solving user problems rather than just chasing the latest frameworks will be well-positioned to thrive in this exciting future. The web platform continues to be one of the most powerful and accessible technologies for creating applications that reach billions of users worldwide.
    `,
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
- **Concept Summaries**: Concise explanations of main ideas

### 3. AI Study Buddy
The interactive AI assistant can:
- Answer questions about your study material
- Quiz you on the content
- Explain difficult concepts in different ways

## Strategies for Maximizing StudyCrafter

### Preparation Phase

#### 1. Select Quality Study Material
The better your input, the better your results. Consider these tips:
- Choose comprehensive but focused content
- Break large subjects into manageable chunks
- Ensure images are clear and text is readable

#### 2. Organize Before Uploading
For best results:
- Group related concepts together
- Prioritize the most important information first
- Remove unnecessary content that might distract from key concepts

#### 3. Prepare Specific Questions
Before starting a study session, write down specific questions you want to address. This helps you focus your interaction with the AI Study Buddy.

### Usage Strategies

#### 1. Active Study Cycle
For maximum retention, follow this cycle:
1. **Review** the original content
2. **Test** yourself with flashcards
3. **Apply** knowledge by taking quizzes
4. **Explain** concepts in your own words to the AI Study Buddy
5. **Revisit** areas where you struggled

#### 2. Spaced Repetition
Instead of cramming:
- Use StudyCrafter for short, focused sessions (25-30 minutes)
- Schedule regular review sessions over time
- Gradually increase the interval between reviews as your confidence grows

#### 3. Multi-Modal Learning
Engage different learning styles:
- **Visual**: Study the organized notes and concept maps
- **Verbal**: Discuss concepts with the AI Study Buddy
- **Written**: Type out explanations and answers
- **Auditory**: Read important concepts aloud

### Advanced Techniques

#### 1. Question Upgrading
Progress through increasingly complex questions:
- Start with basic recall questions
- Move to "how" and "why" questions
- Advance to questions that require application and analysis
- Culminate with questions that require synthesis of multiple concepts

#### 2. Concept Connection
Use the AI Study Buddy to help you:
- Identify relationships between different concepts
- Create mental models that connect ideas
- Apply concepts to real-world scenarios
- Compare and contrast related ideas

#### 3. Error Analysis
When you get something wrong:
- Ask the AI to explain the correct answer
- Identify patterns in your mistakes
- Create additional flashcards focused on troublesome areas
- Revisit difficult concepts more frequently

## Best Practices for Different Subjects

### STEM Subjects
- Upload formulas and equations as images
- Ask the AI to walk through step-by-step problem-solving approaches
- Create flashcards for formulas and their applications
- Use the quiz feature to practice problem-solving

### Humanities and Social Sciences
- Focus on organizing chronologies, themes, and key figures
- Use the AI to discuss different interpretations of texts or events
- Create concept summaries for major theories or movements
- Practice constructing arguments with the AI Study Buddy

### Language Learning
- Upload vocabulary lists and grammar rules
- Create flashcards for vocabulary and common phrases
- Use the AI to practice sentence construction
- Quiz yourself on grammar applications

## Measuring Your Progress

Track these indicators to assess your improvement:
1. **Quiz performance**: Monitor your scores over time
2. **Recall speed**: Note how quickly you can answer flashcards
3. **Explanation quality**: Assess how clearly you can explain concepts
4. **Connection depth**: Evaluate how well you can relate different concepts
5. **Application ability**: Test your skill at applying knowledge to new situations

## Conclusion

StudyCrafter transforms studying from a passive activity into an interactive, personalized experience. By thoughtfully preparing your study materials, following effective study strategies, and regularly measuring your progress, you can significantly enhance your learning efficiency and knowledge retention.

Remember that StudyCrafter is a tool to augment your learning, not replace the important cognitive work of studying. The most effective approach combines the AI's capabilities with your own active engagement with the material. With consistent use and the strategies outlined above, you'll be able to master complex subjects more efficiently than ever before.
    `,
    relatedPosts: ['1', '6']
  },
]

export default function BlogPost() {
  const params = useParams()
  const { slug } = params
  
  // Find the current post by slug
  const post = blogPosts.find(post => post.slug === slug)
  
  // Get related posts
  const relatedPosts = post?.relatedPosts 
    ? blogPosts.filter(p => post.relatedPosts?.includes(p.id))
    : []
  
  if (!post) {
    return (
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-darkBg/30 rounded-lg p-10 text-center">
            <h1 className="text-2xl font-bold text-textPrimary mb-4">Blog Post Not Found</h1>
            <p className="text-textSecondary mb-6">
              Sorry, the blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              href="/blog"
              className="px-6 py-2 bg-primary text-darkBg rounded-md font-medium hover:bg-primary/90 inline-block"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollRevealSection className="mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/blog" 
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
              Back to Blog
            </Link>
            
            <div className="flex items-center mb-4 space-x-2">
              <span className="text-sm text-primary bg-primary/10 px-2 py-1 rounded-md">
                {post.category}
              </span>
              <span className="text-sm text-textSecondary">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading mb-4 text-primary">
              {post.title}
            </h1>
            
            <p className="text-textSecondary text-lg max-w-3xl mb-8">
              {post.excerpt}
            </p>
            
            <div className="text-textSecondary mb-8">
              By <span className="text-textPrimary">{post.author}</span>
            </div>
          </motion.div>
        </ScrollRevealSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main blog content */}
          <div className="lg:col-span-3">
            <ScrollRevealSection className="bg-darkBg/30 dark:bg-darkBg/30 rounded-lg p-6 mb-12 border border-textSecondary/10">
              <article className="prose prose-invert max-w-none">
                {post.id === '0' ? (
                  <div className="w-full h-72 bg-darkBg/50 rounded-lg mb-8 relative overflow-hidden">
                    <img 
                      src="/blog/optimizedcollapse.png" 
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ) : post.id === '7' ? (
                  <div className="w-full h-72 bg-darkBg/50 rounded-lg mb-8 relative overflow-hidden">
                    <img 
                      src="/blog/viitalbeatsviral.png" 
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-56 bg-darkBg/50 rounded-lg mb-8 flex items-center justify-center text-primary/30">
                    {/* In a real app, you would use an actual image */}
                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                
                <div 
                  className="text-textPrimary blog-content"
                  dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
                />
              </article>
            </ScrollRevealSection>
          </div>
          
          {/* Sidebar with related posts and share options */}
          <div className="lg:col-span-1">
            <div className="bg-darkBg/30 rounded-lg border border-textSecondary/10 overflow-hidden sticky top-20">
              <div className="p-4 border-b border-textSecondary/10">
                <h2 className="font-bold text-textPrimary">Related Posts</h2>
              </div>
              
              <div className="p-4">
                {relatedPosts.length > 0 ? (
                  <div className="space-y-4">
                    {relatedPosts.map(related => (
                      <Link 
                        href={`/blog/${related.slug}`} 
                        key={related.id}
                        className="block"
                      >
                        <div className="group">
                          <h3 className="text-textPrimary font-medium group-hover:text-primary transition-colors">
                            {related.title}
                          </h3>
                          <p className="text-sm text-textSecondary truncate">
                            {related.excerpt}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-textSecondary text-sm">
                    No related posts available.
                  </p>
                )}
              </div>
              
              <div className="p-4 border-t border-textSecondary/10">
                <h2 className="font-bold text-textPrimary mb-3">Share This Post</h2>
                <div className="flex space-x-2">
                  <button className="p-2 bg-darkBg/50 text-textSecondary rounded-md hover:bg-darkBg/70">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-darkBg/50 text-textSecondary rounded-md hover:bg-darkBg/70">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-darkBg/50 text-textSecondary rounded-md hover:bg-darkBg/70">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-darkBg/50 text-textSecondary rounded-md hover:bg-darkBg/70">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <SectionDivider />
        
        <ScrollRevealSection className="my-12">
          <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
            <h2 className="text-2xl font-bold text-primary mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-textSecondary mb-6">
              Stay up to date with our latest blog posts, tools, and resources.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow bg-darkBg/40 border border-textSecondary/20 rounded-md px-4 py-2 text-textPrimary focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
              <button
                type="button"
                className="px-6 py-2 bg-primary text-darkBg rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </ScrollRevealSection>
      </div>
    </div>
  )
}

// Simple markdown to HTML converter (in a real app, you'd use a proper markdown library)
function markdownToHtml(markdown: string): string {
  let html = markdown
    // Headers
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Lists
    .replace(/^\- (.*$)/gm, '<li>$1</li>')
    // Paragraphs
    .replace(/^\s*$/gm, '</ul><p></p>')
  
  // Wrap list items in ul tags
  html = html.replace(/<li>(.*?)<\/li>/g, function(match) {
    if (html.indexOf('</ul><li>') < 0) {
      return '<ul>' + match + '</ul>';
    }
    return match;
  });
  
  // Clean up empty paragraphs and fix lists
  html = html
    .replace(/<\/ul><p><\/p><ul>/g, '')
    .replace(/<\/ul><p><\/p>/g, '')
    .replace(/<p><\/p>/g, '<p><br></p>')
    .replace(/^\s/, '<br/>')
  
  // Wrap non-tagged text in paragraph tags
  const lines = html.split('\n')
  let inList = false
  let result = ''
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line === '') continue
    
    if (line.startsWith('<h') || line.startsWith('<ul') || line.startsWith('<li') || line.startsWith('<p')) {
      result += line + '\n'
      if (line.startsWith('<ul')) inList = true
      if (line.startsWith('</ul')) inList = false
    } else if (!inList) {
      result += '<p>' + line + '</p>\n'
    } else {
      result += line + '\n'
    }
  }
  
  return result
} 