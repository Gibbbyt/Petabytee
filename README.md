# Petabyte Tech - Full Stack E-Commerce & Service Platform

A comprehensive web application for Petabyte Tech, offering PC configuration, PS5 controller customization, repair services, and more. Built with Next.js 14, TypeScript, Tailwind CSS, and PostgreSQL.

## 🚀 Features

### Frontend (Albanian & English)
- **PC Configurator**: 3 main builds with customizable components
- **PS5 Controller Configurator**: Step-by-step customization tool
- **Gaming Center Solutions**: Complete gaming center setup services
- **AI Enhanced Development**: Web & mobile development services
- **3D Printing Studio**: Showcase and business inquiry form
- **PC Optimization**: Tips and paid optimization services
- **Fix Your Stuff**: Electronics repair tutorials
- **Store**: Complete e-commerce functionality
- **EasyMail-In**: Repair service with shipping box provision
- **Gift Cards**: Steam and PSN gift card sales
- **Account Sales**: Gaming account marketplace

### Client Dashboard
- Order tracking
- Repair status timeline
- PC/PS5 configurations
- Support ticket system

### Admin Panel
- Full frontend content control
- Client management by service type
- Analytics and reporting
- Data exports (3/6/12/24 months)
- Invoice generation
- Timeline management

### Notification System
- Email notifications for clients (Nodemailer)
- Telegram notifications for admins

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, React
- **Styling**: Tailwind CSS with custom animations
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **UI Components**: Radix UI
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: Zustand
- **Charts**: Recharts

## 🎨 Brand Colors

- Midnight Blue: #171542
- Royal Purple: #7C56A3
- Light Blue: #072E32
- Red Orange: #105663
- Lime Green: #ACD036
- Mint Cyan: #A4D8CE

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/petabyte-tech.git
cd petabyte-tech
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/petabyte_tech"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
EMAIL_FROM="Petabyte Tech <noreply@petabyte.al>"
TELEGRAM_BOT_TOKEN="your-telegram-bot-token"
TELEGRAM_ADMIN_CHAT_ID="your-admin-chat-id"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
petabyte-tech/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   ├── admin/          # Admin panel pages
│   │   ├── client/         # Client dashboard pages
│   │   └── auth/           # Authentication pages
│   ├── components/         # React components
│   │   ├── ui/            # UI components
│   │   └── layout/        # Layout components
│   ├── lib/               # Utilities and configurations
│   ├── hooks/             # Custom React hooks
│   ├── translations/      # i18n translations (Albanian/English)
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── prisma/
│   └── schema.prisma      # Database schema
├── public/                # Static assets
└── ...config files
```

## 🔑 Key Features Implementation

### Multi-language Support
The application supports Albanian (primary) and English languages with a custom translation system.

### Notification System
- **Client Notifications**: Email only via Nodemailer
- **Admin Notifications**: Telegram only via Telegram Bot API

### Timeline Feature
Beautiful timeline visualization for repair and order tracking with real-time updates.

### Petabyte Certified
Trust mark system implemented throughout the platform for quality assurance.

### Analytics Dashboard
Comprehensive analytics for:
- Service performance
- Order analysis
- Financial reports
- Client demographics

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Database Migration
```bash
npx prisma migrate deploy
```

## 📝 License

This project is proprietary software for Petabyte Tech.

## 🤝 Contributing

Please contact the development team for contribution guidelines.

## 📞 Support

For technical support, contact: support@petabyte.al 