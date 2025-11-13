import { google } from 'googleapis';
import nodemailer from 'nodemailer';

let connectionSettings: any;

function isReplitEnvironment(): boolean {
  return !!process.env.REPLIT_CONNECTORS_HOSTNAME;
}

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-mail',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Gmail not connected');
  }
  return accessToken;
}

async function getUncachableGmailClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.gmail({ version: 'v1', auth: oauth2Client });
}

async function getGmailClientFromOAuth() {
  const user = process.env.GMAIL_USER;
  const clientId = process.env.GMAIL_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GMAIL_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GMAIL_OAUTH_REFRESH_TOKEN;

  if (!user || !clientId || !clientSecret || !refreshToken) {
    throw new Error('Gmail OAuth credentials required: GMAIL_USER, GMAIL_OAUTH_CLIENT_ID, GMAIL_OAUTH_CLIENT_SECRET, GMAIL_OAUTH_REFRESH_TOKEN');
  }

  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refresh_token: refreshToken
  });

  return google.gmail({ version: 'v1', auth: oauth2Client });
}

export function generateOTP(): string {
  // Generate 7-digit OTP
  return Math.floor(1000000 + Math.random() * 9000000).toString();
}

export function getOTPExpiry(): Date {
  // 5 minutes from now
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + 5);
  return expiry;
}

export async function sendOTPEmail(to: string, otpCode: string, type: 'signup' | 'login'): Promise<void> {
  try {
    const subject = type === 'signup' 
      ? 'Verify Your Email - Landing Pages for Agents' 
      : 'Login Verification Code - Landing Pages for Agents';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #000; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 5px; margin-top: 20px; }
            .otp-code { font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #000; text-align: center; padding: 20px; background: white; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Landing Pages for Agents</h1>
            </div>
            <div class="content">
              <h2>${type === 'signup' ? 'Welcome!' : 'Login Verification'}</h2>
              <p>Your verification code is:</p>
              <div class="otp-code">${otpCode}</div>
              <p>This code will expire in <strong>5 minutes</strong>.</p>
              <p>If you didn't request this code, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Landing Pages for Agents. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const textContent = `
Your ${type === 'signup' ? 'signup' : 'login'} verification code is: ${otpCode}

This code will expire in 5 minutes.

If you didn't request this code, please ignore this email.

Landing Pages for Agents
    `;

    // Prioritize OAuth SMTP if credentials are available (Railway, production)
    // Fall back to Replit connector only if OAuth credentials are not set
    const hasOAuthCreds = process.env.GMAIL_USER && 
                          process.env.GMAIL_OAUTH_CLIENT_ID && 
                          process.env.GMAIL_OAUTH_CLIENT_SECRET && 
                          process.env.GMAIL_OAUTH_REFRESH_TOKEN;

    if (hasOAuthCreds) {
      const gmail = await getGmailClientFromOAuth();

      const message = [
        `To: ${to}`,
        `From: ${process.env.GMAIL_USER}`,
        `Subject: ${subject}`,
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=utf-8',
        '',
        htmlContent
      ].join('\n');

      const encodedMessage = Buffer.from(message)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: encodedMessage,
        },
      });

      console.log(`[Gmail API OAuth] OTP email sent to ${to}`);
    } else if (isReplitEnvironment()) {
      const gmail = await getUncachableGmailClient();

      const message = [
        `To: ${to}`,
        `Subject: ${subject}`,
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=utf-8',
        '',
        htmlContent
      ].join('\n');

      const encodedMessage = Buffer.from(message)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: encodedMessage,
        },
      });

      console.log(`[Replit Gmail API] OTP email sent to ${to}`);
    } else {
      throw new Error('No email service configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD or use Replit connector.');
    }
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send verification email');
  }
}

export async function sendAccountSuspensionEmail(to: string, firstName: string | null): Promise<void> {
  try {
    const subject = 'Account Suspended - Payment Required';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #d32f2f; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 5px; margin-top: 20px; }
            .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
            .cta-button { display: inline-block; background-color: #000; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>⚠️ Account Suspended</h1>
            </div>
            <div class="content">
              <h2>Hello${firstName ? ` ${firstName}` : ''},</h2>
              <p>Your Landing Pages for Agents account has been temporarily suspended due to an outstanding payment.</p>
              
              <div class="warning">
                <strong>Action Required:</strong> Your account and all associated landing pages are currently inaccessible until your payment is processed.
              </div>

              <p><strong>What this means:</strong></p>
              <ul>
                <li>All your landing pages are currently offline</li>
                <li>Your custom domains will show a suspension notice</li>
                <li>You cannot access your dashboard</li>
              </ul>

              <p><strong>How to resolve this:</strong></p>
              <p>Please contact us immediately at <a href="https://LandingPagesforAgents.com">LandingPagesforAgents.com</a> to update your payment information and restore your account.</p>

              <a href="https://LandingPagesforAgents.com" class="cta-button">Contact Support</a>

              <p style="margin-top: 30px;">We're here to help get your account back up and running as quickly as possible.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Landing Pages for Agents. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const hasOAuthCreds = process.env.GMAIL_USER && 
                          process.env.GMAIL_OAUTH_CLIENT_ID && 
                          process.env.GMAIL_OAUTH_CLIENT_SECRET && 
                          process.env.GMAIL_OAUTH_REFRESH_TOKEN;

    if (hasOAuthCreds) {
      const gmail = await getGmailClientFromOAuth();

      const message = [
        `To: ${to}`,
        `From: ${process.env.GMAIL_USER}`,
        `Subject: ${subject}`,
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=utf-8',
        '',
        htmlContent
      ].join('\n');

      const encodedMessage = Buffer.from(message)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: encodedMessage,
        },
      });

      console.log(`[Gmail API OAuth] Account suspension email sent to ${to}`);
    } else if (isReplitEnvironment()) {
      const gmail = await getUncachableGmailClient();

      const message = [
        `To: ${to}`,
        `Subject: ${subject}`,
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=utf-8',
        '',
        htmlContent
      ].join('\n');

      const encodedMessage = Buffer.from(message)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: encodedMessage,
        },
      });

      console.log(`[Replit Gmail API] Account suspension email sent to ${to}`);
    } else {
      throw new Error('No email service configured.');
    }
  } catch (error) {
    console.error('Error sending account suspension email:', error);
    throw new Error('Failed to send account suspension email');
  }
}
