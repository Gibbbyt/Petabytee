import TelegramBot from 'node-telegram-bot-api';

// Create bot instance (polling disabled for serverless environment)
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN || '', { polling: false });

export interface TelegramNotification {
  message: string;
  parseMode?: 'HTML' | 'Markdown';
}

export async function sendTelegramNotification({ message, parseMode = 'HTML' }: TelegramNotification) {
  try {
    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_ADMIN_CHAT_ID) {
      console.error('Telegram configuration missing');
      return { success: false, error: 'Configuration missing' };
    }

    await bot.sendMessage(process.env.TELEGRAM_ADMIN_CHAT_ID, message, {
      parse_mode: parseMode,
    });

    return { success: true };
  } catch (error) {
    console.error('Telegram notification error:', error);
    return { success: false, error };
  }
}

// Notification templates
export const telegramTemplates = {
  newOrder: (orderNumber: string, customerName: string, total: number) => {
    return `
🛒 <b>New Order Received!</b>

Order Number: <code>#${orderNumber}</code>
Customer: ${customerName}
Total: €${total.toFixed(2)}

<a href="${process.env.APP_URL}/admin/orders/${orderNumber}">View Order</a>
    `.trim();
  },

  newRepair: (repairNumber: string, customerName: string, device: string) => {
    return `
🔧 <b>New Repair Request!</b>

Repair Number: <code>#${repairNumber}</code>
Customer: ${customerName}
Device: ${device}

<a href="${process.env.APP_URL}/admin/repairs/${repairNumber}">View Repair</a>
    `.trim();
  },

  easyMailIn: (repairNumber: string, customerName: string) => {
    return `
📦 <b>New EasyMail-In Request!</b>

Repair Number: <code>#${repairNumber}</code>
Customer: ${customerName}

Action Required: Send shipping box to customer

<a href="${process.env.APP_URL}/admin/repairs/${repairNumber}">Process Request</a>
    `.trim();
  },

  supportTicket: (ticketNumber: string, subject: string, priority: string) => {
    const priorityEmoji = {
      LOW: '🟢',
      MEDIUM: '🟡',
      HIGH: '🟠',
      URGENT: '🔴',
    };

    return `
${priorityEmoji[priority as keyof typeof priorityEmoji] || '⚪'} <b>New Support Ticket!</b>

Ticket: <code>#${ticketNumber}</code>
Subject: ${subject}
Priority: ${priority}

<a href="${process.env.APP_URL}/admin/support/${ticketNumber}">View Ticket</a>
    `.trim();
  },

  lowStock: (productName: string, currentStock: number) => {
    return `
⚠️ <b>Low Stock Alert!</b>

Product: ${productName}
Current Stock: ${currentStock}

Please restock soon!
    `.trim();
  },

  dailyReport: (stats: {
    orders: number;
    revenue: number;
    repairs: number;
    tickets: number;
  }) => {
    return `
📊 <b>Daily Report</b>

📅 Date: ${new Date().toLocaleDateString()}

📦 New Orders: ${stats.orders}
💰 Revenue: €${stats.revenue.toFixed(2)}
🔧 Repairs: ${stats.repairs}
🎫 Support Tickets: ${stats.tickets}

<a href="${process.env.APP_URL}/admin/analytics">View Full Analytics</a>
    `.trim();
  },
};