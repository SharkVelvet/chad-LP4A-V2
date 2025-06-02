import nodemailer from 'nodemailer';

// Create transporter using your SMTP settings
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false // Allow self-signed certificates for custom mail servers
  }
});

interface CustomerData {
  email: string;
  customerName?: string;
  templateSelected?: string;
  domainPreferences?: string[];
  paymentAmount: number;
  subscriptionId?: string;
  customerInfo?: any;
}

export async function sendCustomerReceipt(customerData: CustomerData) {
  const {
    email,
    customerName,
    templateSelected,
    domainPreferences,
    paymentAmount,
    subscriptionId
  } = customerData;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
        Payment Confirmation - Welcome to Planright!
      </h2>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Thank you for your purchase!</h3>
        <p style="color: #6b7280;">Your website setup is now in progress. Here are your order details:</p>
      </div>

      <div style="background-color: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <h4 style="color: #374151; margin-top: 0;">Order Summary</h4>
        <p><strong>Customer:</strong> ${customerName || 'N/A'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Template Selected:</strong> ${templateSelected || 'N/A'}</p>
        <p><strong>Domain Preferences:</strong> ${domainPreferences?.join(', ') || 'N/A'}</p>
        <p><strong>Amount Paid:</strong> $${paymentAmount}</p>
        ${subscriptionId ? `<p><strong>Subscription ID:</strong> ${subscriptionId}</p>` : ''}
      </div>

      <div style="background-color: #dcfce7; border: 1px solid #16a34a; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <h4 style="color: #15803d; margin-top: 0;">What happens next?</h4>
        <ul style="color: #374151; margin: 10px 0; padding-left: 20px;">
          <li>Our team will review your requirements</li>
          <li>Your website will be set up using your selected template</li>
          <li>You'll receive updates on the progress</li>
          <li>Your website will be ready within 1-2 business days</li>
        </ul>
      </div>

      <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 14px;">
        <p>Questions? Reply to this email or contact our support team.</p>
        <p>Thank you for choosing Planright!</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Payment Confirmation - Your Website Setup is Starting!',
      html: htmlContent,
    });

    console.log('Customer receipt sent successfully to:', email);
    return true;
  } catch (error) {
    console.error('Error sending customer receipt:', error);
    return false;
  }
}

export async function sendCustomerNotification(customerData: CustomerData) {
  if (!process.env.NOTIFICATION_EMAIL) {
    console.error('NOTIFICATION_EMAIL not configured');
    return false;
  }

  const {
    email,
    customerName,
    templateSelected,
    domainPreferences,
    paymentAmount,
    subscriptionId,
    customerInfo
  } = customerData;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
        New Customer Onboarding Completed
      </h2>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Customer Information</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
            <td style="padding: 8px 0;">${email}</td>
          </tr>
          ${customerName ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Name:</td>
            <td style="padding: 8px 0;">${customerName}</td>
          </tr>
          ` : ''}
        </table>
      </div>

      ${templateSelected ? `
      <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Template Selection</h3>
        <p style="margin: 0; font-size: 16px; color: #1e40af;">
          <strong>${templateSelected}</strong>
        </p>
      </div>
      ` : ''}

      ${domainPreferences && domainPreferences.length > 0 ? `
      <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Domain Preferences</h3>
        <ul style="margin: 0; padding-left: 20px;">
          ${domainPreferences.map(domain => `<li style="margin: 5px 0;">${domain}</li>`).join('')}
        </ul>
      </div>
      ` : ''}

      <div style="background-color: #fef7ed; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Payment Information</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Amount Paid:</td>
            <td style="padding: 8px 0; color: #059669; font-weight: bold;">$${(paymentAmount / 100).toFixed(2)}</td>
          </tr>
          ${subscriptionId ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Subscription ID:</td>
            <td style="padding: 8px 0; font-family: monospace; font-size: 12px;">${subscriptionId}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Plan:</td>
            <td style="padding: 8px 0;">$38 first month, then $18/month</td>
          </tr>
        </table>
      </div>

      <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
        <p style="margin: 0; color: #6b7280; font-size: 14px;">
          <strong>Next Steps:</strong> Set up their website with the selected template and contact them about domain setup.
        </p>
      </div>

      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
      
      <p style="color: #6b7280; font-size: 12px; text-align: center; margin: 0;">
        This notification was sent from your Planright onboarding system.
      </p>
    </div>
  `;

  const textContent = `
New Customer Onboarding Completed

Customer Information:
- Email: ${email}
${customerName ? `- Name: ${customerName}` : ''}

${templateSelected ? `Template Selected: ${templateSelected}` : ''}

${domainPreferences && domainPreferences.length > 0 ? `
Domain Preferences:
${domainPreferences.map(domain => `- ${domain}`).join('\n')}
` : ''}

Payment Information:
- Amount Paid: $${(paymentAmount / 100).toFixed(2)}
${subscriptionId ? `- Subscription ID: ${subscriptionId}` : ''}
- Plan: $38 first month, then $18/month

Next Steps: Set up their website with the selected template and contact them about domain setup.
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Planright Notifications" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `New Customer: ${customerName || email} - ${templateSelected || 'Template Selected'}`,
      text: textContent,
      html: htmlContent,
    });

    console.log('Customer notification sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send customer notification:', error);
    return false;
  }
}

// Test email function
export async function testEmailConnection() {
  try {
    await transporter.verify();
    console.log('Email server connection verified');
    return true;
  } catch (error) {
    console.error('Email server connection failed:', error);
    return false;
  }
}