import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'Petabyte Tech <noreply@petabyte.al>',
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML tags for text version
    });

    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}

// Email templates
export const emailTemplates = {
  welcome: (name: string, language: 'sq' | 'en' = 'sq') => {
    const templates = {
      sq: {
        subject: 'Mirësevini në Petabyte Tech!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #171542 0%, #7C56A3 50%, #ACD036 100%); padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0;">Petabyte Tech</h1>
            </div>
            <div style="padding: 40px; background: #f5f5f5;">
              <h2 style="color: #171542;">Mirësevini, ${name}!</h2>
              <p style="color: #333; line-height: 1.6;">
                Ju falënderojmë që u regjistruat në Petabyte Tech. Ne jemi të lumtur t'ju kemi si pjesë të komunitetit tonë.
              </p>
              <p style="color: #333; line-height: 1.6;">
                Tani mund të:
              </p>
              <ul style="color: #333; line-height: 1.6;">
                <li>Konfiguroni PC-në tuaj të personalizuar</li>
                <li>Personalizoni kontrollerin tuaj PS5</li>
                <li>Dërgoni pajisjet për riparim</li>
                <li>Aksesoni mbështetjen 24/7</li>
              </ul>
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.APP_URL}/dashboard" 
                   style="background: #7C56A3; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Hyni në Panel
                </a>
              </div>
            </div>
            <div style="padding: 20px; text-align: center; color: #666;">
              <p>&copy; 2024 Petabyte Tech. Të gjitha të drejtat e rezervuara.</p>
            </div>
          </div>
        `,
      },
      en: {
        subject: 'Welcome to Petabyte Tech!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #171542 0%, #7C56A3 50%, #ACD036 100%); padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0;">Petabyte Tech</h1>
            </div>
            <div style="padding: 40px; background: #f5f5f5;">
              <h2 style="color: #171542;">Welcome, ${name}!</h2>
              <p style="color: #333; line-height: 1.6;">
                Thank you for registering with Petabyte Tech. We're excited to have you as part of our community.
              </p>
              <p style="color: #333; line-height: 1.6;">
                You can now:
              </p>
              <ul style="color: #333; line-height: 1.6;">
                <li>Configure your custom PC</li>
                <li>Customize your PS5 controller</li>
                <li>Send devices for repair</li>
                <li>Access 24/7 support</li>
              </ul>
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.APP_URL}/dashboard" 
                   style="background: #7C56A3; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Go to Dashboard
                </a>
              </div>
            </div>
            <div style="padding: 20px; text-align: center; color: #666;">
              <p>&copy; 2024 Petabyte Tech. All rights reserved.</p>
            </div>
          </div>
        `,
      },
    };

    return templates[language];
  },

  orderConfirmation: (orderNumber: string, total: number, language: 'sq' | 'en' = 'sq') => {
    const templates = {
      sq: {
        subject: `Konfirmim Porosie #${orderNumber}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #171542 0%, #7C56A3 50%, #ACD036 100%); padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0;">Petabyte Tech</h1>
            </div>
            <div style="padding: 40px; background: #f5f5f5;">
              <h2 style="color: #171542;">Porosia juaj është konfirmuar!</h2>
              <p style="color: #333; line-height: 1.6;">
                Numri i porosisë: <strong>#${orderNumber}</strong>
              </p>
              <p style="color: #333; line-height: 1.6;">
                Totali: <strong>€${total.toFixed(2)}</strong>
              </p>
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.APP_URL}/dashboard/orders/${orderNumber}" 
                   style="background: #7C56A3; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Shiko Porosinë
                </a>
              </div>
            </div>
          </div>
        `,
      },
      en: {
        subject: `Order Confirmation #${orderNumber}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #171542 0%, #7C56A3 50%, #ACD036 100%); padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0;">Petabyte Tech</h1>
            </div>
            <div style="padding: 40px; background: #f5f5f5;">
              <h2 style="color: #171542;">Your order is confirmed!</h2>
              <p style="color: #333; line-height: 1.6;">
                Order number: <strong>#${orderNumber}</strong>
              </p>
              <p style="color: #333; line-height: 1.6;">
                Total: <strong>€${total.toFixed(2)}</strong>
              </p>
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.APP_URL}/dashboard/orders/${orderNumber}" 
                   style="background: #7C56A3; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  View Order
                </a>
              </div>
            </div>
          </div>
        `,
      },
    };

    return templates[language];
  },

  repairUpdate: (repairNumber: string, status: string, language: 'sq' | 'en' = 'sq') => {
    const templates = {
      sq: {
        subject: `Përditësim për Riparimin #${repairNumber}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #171542 0%, #7C56A3 50%, #ACD036 100%); padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0;">Petabyte Tech</h1>
            </div>
            <div style="padding: 40px; background: #f5f5f5;">
              <h2 style="color: #171542;">Përditësim për riparimin tuaj</h2>
              <p style="color: #333; line-height: 1.6;">
                Numri i riparimit: <strong>#${repairNumber}</strong>
              </p>
              <p style="color: #333; line-height: 1.6;">
                Statusi i ri: <strong>${status}</strong>
              </p>
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.APP_URL}/timeline/${repairNumber}" 
                   style="background: #7C56A3; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Shiko Timeline
                </a>
              </div>
            </div>
          </div>
        `,
      },
      en: {
        subject: `Repair Update #${repairNumber}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #171542 0%, #7C56A3 50%, #ACD036 100%); padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0;">Petabyte Tech</h1>
            </div>
            <div style="padding: 40px; background: #f5f5f5;">
              <h2 style="color: #171542;">Update on your repair</h2>
              <p style="color: #333; line-height: 1.6;">
                Repair number: <strong>#${repairNumber}</strong>
              </p>
              <p style="color: #333; line-height: 1.6;">
                New status: <strong>${status}</strong>
              </p>
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.APP_URL}/timeline/${repairNumber}" 
                   style="background: #7C56A3; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  View Timeline
                </a>
              </div>
            </div>
          </div>
        `,
      },
    };

    return templates[language];
  },
};