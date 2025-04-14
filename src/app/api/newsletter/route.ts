import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { isEmailConfigured, sendNewsletterThankYouEmail } from '@/utils/emailService';

// Path to store emails
const EMAILS_FILE_PATH = path.join(process.cwd(), 'data', 'newsletter-emails.json');

// Ensure the data directory exists
const ensureDirectoryExists = (filePath: string) => {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
};

// Load existing emails
const loadEmails = (): string[] => {
  try {
    if (!fs.existsSync(EMAILS_FILE_PATH)) {
      return [];
    }
    const data = fs.readFileSync(EMAILS_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading emails:', error);
    return [];
  }
};

// Save emails to file
const saveEmails = (emails: string[]) => {
  try {
    ensureDirectoryExists(EMAILS_FILE_PATH);
    fs.writeFileSync(EMAILS_FILE_PATH, JSON.stringify(emails, null, 2));
  } catch (error) {
    console.error('Error saving emails:', error);
  }
};

// Validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// GET handler - Retrieve all subscribed emails
export async function GET() {
  try {
    const emails = loadEmails();
    return NextResponse.json({ emails });
  } catch (error) {
    console.error('Error retrieving emails:', error);
    return NextResponse.json({ error: 'Failed to retrieve subscriber list' }, { status: 500 });
  }
}

// POST handler - Add a new subscriber
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Load existing emails
    const emails = loadEmails();

    // Check if email already exists
    if (emails.includes(email)) {
      return NextResponse.json({ message: 'Email already subscribed' }, { status: 200 });
    }

    // Add new email and save
    emails.push(email);
    saveEmails(emails);

    // Send thank you email
    const emailConfigured = isEmailConfigured();
    if (emailConfigured) {
      try {
        await sendNewsletterThankYouEmail(email);
      } catch (emailError) {
        console.error('Failed to send thank you email:', emailError);
        // Continue anyway, we've already saved the subscription
      }
    } else {
      console.warn('Email sending is not configured. Set EMAIL_USER and EMAIL_PASS environment variables to enable it.');
    }

    return NextResponse.json({ 
      message: 'Successfully subscribed to newsletter',
      emailSent: emailConfigured 
    }, { status: 201 });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ error: 'Failed to process your request' }, { status: 500 });
  }
}

// DELETE handler - Remove a subscriber
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Load existing emails
    const emails = loadEmails();

    // Check if email exists
    if (!emails.includes(email)) {
      return NextResponse.json({ error: 'Email not found in subscriber list' }, { status: 404 });
    }

    // Remove email and save
    const updatedEmails = emails.filter(e => e !== email);
    saveEmails(updatedEmails);

    return NextResponse.json({ message: 'Successfully removed from newsletter' }, { status: 200 });
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json({ error: 'Failed to process your request' }, { status: 500 });
  }
} 