import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

// Initialize OpenAI with API key if available
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(request: Request) {
  try {
    // Check if OpenAI client is initialized
    if (!openai) {
      return NextResponse.json({ 
        error: 'OpenAI API key is not configured. Please add OPENAI_API_KEY to your environment variables.' 
      }, { status: 503 });
    }

    const body = await request.json();
    const { action, content, fileData, fileType, chatHistory, mode } = body;

    // Handle different actions
    switch (action) {
      case 'extractText':
        // Extract text from an image or document using GPT-4o
        if (!fileData) {
          return NextResponse.json({ error: 'No file data provided' }, { status: 400 });
        }

        // For image files, use GPT-4o vision capabilities
        if (fileType.startsWith('image/')) {
          const extractResponse = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: "You are an expert at extracting and organizing study content. Extract all readable text from the image in a well-structured format, preserving the original organization and hierarchy."
              },
              {
                role: "user",
                content: [
                  { type: "text", text: "Extract all the text content from this study material and organize it in a clear format with appropriate headings, bullet points, and paragraphs." },
                  { 
                    type: "image_url", 
                    image_url: {
                      url: `data:${fileType};base64,${fileData}`,
                      detail: "high"
                    } 
                  }
                ]
              }
            ],
            max_tokens: 4000
          });

          return NextResponse.json({ 
            text: extractResponse.choices[0].message.content
          });
        } 
        // For PDF files, use GPT-4o directly (it can handle PDFs with base64)
        else if (fileType === 'application/pdf') {
          try {
            // For PDFs, we'll return a clearer message about limitations
            // This prevents the AI from generating study materials about PDF parsing itself
            return NextResponse.json({ 
              text: `# Please paste your study content directly\n\nIn this demo version, PDF content extraction is limited. For the best experience, please copy and paste your study content directly into the text box.\n\nAlternatively, you can upload image files (.jpg, .png) which will be processed with OCR.`
            });
          } catch (error: unknown) {
            console.error("PDF processing error:", error);
            const message = error instanceof Error ? error.message : 'Unknown error';
            return NextResponse.json({ 
              error: `Failed to process PDF: ${message}` 
            }, { status: 500 });
          }
        }
        // For other file types
        else {
          return NextResponse.json({
            text: `### Content extracted from uploaded file\n\nThis file type (${fileType}) is not supported for automatic text extraction. Please upload a PDF or image file, or paste your study content directly in the text area.`
          });
        }

      case 'generateTools':
        // Generate study tools from content
        if (!content) {
          return NextResponse.json({ error: 'No content provided' }, { status: 400 });
        }

        try {
          const toolsResponse = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: `You are an expert educational content creator. Create study tools from the provided content.
                Format your response as valid JSON with the following structure:
                {
                  "flashcards": [{"id": "card1", "term": "term", "definition": "definition"}],
                  "quiz": [{"id": "quiz1", "question": "question", "options": ["option1", "option2", "option3", "option4"], "correctAnswer": "correct", "type": "multiple"}],
                  "concepts": [{"id": "concept1", "title": "title", "summary": "summary"}]
                }
                
                Create at least 5 flashcards, 4 quiz questions (mix of multiple choice and short answer), and 3 concept summaries.
                For multiple choice questions, make sure the options array contains 4 items with the correct answer included.
                For short answer questions, omit the options array.`
              },
              {
                role: "user",
                content: `Generate study tools from this content:\n\n${content}`
              }
            ],
            response_format: { type: "json_object" }
          });

          // Parse the JSON response
          const toolsData = JSON.parse(toolsResponse.choices[0].message.content || "{}");
          return NextResponse.json(toolsData);
        } catch (error: unknown) {
          console.error("Error generating study tools:", error);
          const message = error instanceof Error ? error.message : 'Unknown error';
          return NextResponse.json({ 
            error: `Failed to generate study tools: ${message}` 
          }, { status: 500 });
        }

      case 'chat':
        // Handle chat with the study buddy
        if (!content || !chatHistory) {
          return NextResponse.json({ error: 'Missing content or chat history' }, { status: 400 });
        }

        // Prepare system message based on chat mode
        let systemPrompt = "You are an AI study assistant. ";
        
        switch (mode) {
          case 'ask':
            systemPrompt += "Answer questions based ONLY on the provided study content. If the answer isn't in the content, say that you don't have that information in the notes.";
            break;
          case 'quiz':
            systemPrompt += "Generate quiz questions based on the study content to test the user's knowledge. Ask one question at a time and wait for their response.";
            break;
          case 'explain':
            systemPrompt += "Explain concepts from the study content in a clear, educational way. If the concept isn't in the content, say so.";
            break;
          default:
            systemPrompt += "Answer questions based only on the provided study content.";
        }

        try {
          // Format chat history for API call
          const formattedHistory: ChatCompletionMessageParam[] = chatHistory.map((msg: { role: 'user' | 'assistant'; content: string }) => ({
            role: msg.role,
            content: msg.content
          }));

          const chatResponse = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
              { role: "system", content: systemPrompt },
              // Add study content as context
              { role: "system", content: `Study content: ${content}` },
              ...formattedHistory
            ],
            max_tokens: 1000
          });

          return NextResponse.json({ 
            message: chatResponse.choices[0].message.content 
          });
        } catch (error: unknown) {
          console.error("Error in chat:", error);
          const message = error instanceof Error ? error.message : 'Unknown error';
          return NextResponse.json({ 
            error: `Chat error: ${message}` 
          }, { status: 500 });
        }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error: unknown) {
    console.error('OpenAI API error:', error);
    const message = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
} 