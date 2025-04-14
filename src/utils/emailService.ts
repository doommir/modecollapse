import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Use environment variables for email configuration
const EMAIL_USER = process.env.EMAIL_USER || '';
const EMAIL_PASS = process.env.EMAIL_PASS || '';
const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com';
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || '587', 10);
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@modecollapse.io';

// Check if email configuration is available
export const isEmailConfigured = (): boolean => {
  return Boolean(EMAIL_USER && EMAIL_PASS);
};

// Create a transporter for sending emails
const createTransporter = () => {
  if (!isEmailConfigured()) {
    return null;
  }

  return nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_PORT === 465, // true for 465, false for other ports
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
};

// Send an email
export const sendEmail = async ({ to, subject, html }: EmailOptions): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    
    // If transporter is not configured, return false
    if (!transporter) {
      console.warn('Email service not configured. Set EMAIL_USER and EMAIL_PASS environment variables.');
      return false;
    }
    
    // Send email
    const info = await transporter.sendMail({
      from: EMAIL_FROM,
      to,
      subject,
      html,
    });
    
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

// Function to generate thank you email for newsletter subscription
export const sendNewsletterThankYouEmail = async (email: string): Promise<boolean> => {
  const subject = 'Welcome to Mode Collapse Newsletter';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #64ffda; margin-bottom: 1rem;">Thank You for Subscribing!</h1>
      
      <p style="margin-bottom: 1rem; color: #8892b0;">
        We're excited to have you join the Mode Collapse community. You'll now receive our latest articles, updates, and resources straight to your inbox.
      </p>
      
      <p style="margin-bottom: 1rem; color: #8892b0;">
        Our goal is to help you navigate the intersection of education, AI, and consciousness engineering to create more meaningful learning experiences.
      </p>
      
      <div style="margin: 2rem 0; padding: 1rem; background-color: rgba(100, 255, 218, 0.1); border-left: 3px solid #64ffda;">
        <p style="margin: 0; color: #ccd6f6;">
          "Education is not the filling of a pail, but the lighting of a fire." — W.B. Yeats
        </p>
      </div>
      
      <p style="margin-bottom: 1rem; color: #8892b0;">
        If you have any questions or topics you'd like us to cover, feel free to reply to this email.
      </p>
      
      <p style="margin-bottom: 1rem; color: #8892b0;">
        Best regards,<br>
        The Mode Collapse Team
      </p>
      
      <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #2d3748; font-size: 0.8rem; color: #8892b0;">
        <p>
          You're receiving this email because you signed up for the Mode Collapse newsletter.
          If you'd like to unsubscribe, please click <a href="#" style="color: #64ffda;">here</a>.
        </p>
      </div>
    </div>
  `;
  
  return sendEmail({ to: email, subject, html });
}; 