# 🚀 Petabyte Tech - Complete Web Platform

> **A comprehensive technology services platform for PC building, PS5 controller customization, repair services, and more - Built for Kosovo's tech enthusiasts**

![Petabyte Tech Platform](https://img.shields.io/badge/Platform-Next.js%2014-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🌟 Project Overview

Petabyte Tech is a full-stack web platform designed for a technology services company in Kosovo, offering PC configuration, PS5 controller customization, repair services, and comprehensive client management. The platform features a complete admin panel, client dashboard, bilingual support (Albanian/English), and advanced notification systems.

## ✨ Key Features

### 🖥️ **PC Configurator**
- **3 Customizable Builds**: Gaming Beast Pro, Balanced Performance, Budget Champion
- **Step-by-step Configuration**: Interactive component selection process
- **Performance Targeting**: Optimized for specific games (Valorant, CS2, Fortnite, etc.)
- **Real-time Pricing**: Dynamic price calculation with VAT
- **Compatibility Checking**: Ensures component compatibility
- **Save & Share Configurations**: Bookmark builds and share with friends

### 🎮 **PS5 Controller Configurator**
- **Custom Color Options**: Personalized controller designs
- **Component Selection**: Choose specific parts and modifications
- **Visual Preview**: See your custom controller before ordering
- **Step-by-step Customization**: Guided configuration process

### 🔧 **Repair Services**
- **EasyMail-In Service**: Automated shipping box delivery system
- **Device Diagnostics**: Comprehensive issue assessment
- **Timeline Tracking**: Real-time repair progress updates
- **Multiple Device Types**: Support for PCs, laptops, consoles, and more
- **Urgency Levels**: Priority handling for urgent repairs

### 🏪 **E-commerce Store**
- **Product Catalog**: Gaming accessories, gift cards, and more
- **Inventory Management**: Real-time stock tracking
- **Order Processing**: Complete order lifecycle management
- **Invoice System**: Automated billing and payment tracking

### 👥 **Client Management**
- **User Dashboard**: Personal order and repair tracking
- **Profile Management**: Account settings and preferences
- **Order History**: Complete transaction records
- **Support Tickets**: Direct communication with support team

### 🛠️ **Admin Panel**
- **Comprehensive Dashboard**: Real-time analytics and metrics
- **Order Management**: Process and track all orders
- **Repair Tracking**: Monitor repair progress and timelines
- **User Management**: Client account administration
- **Product Management**: Inventory and catalog control
- **Analytics & Reporting**: Detailed business insights

### 🌐 **Bilingual Support**
- **Albanian Primary**: Native language support for Kosovo
- **English Secondary**: International accessibility
- **Dynamic Switching**: Real-time language toggle
- **Complete Translation**: All UI elements and content

### 📧 **Notification Systems**
- **Email Notifications**: Customer updates and confirmations
- **Telegram Alerts**: Admin notifications for new orders/repairs
- **Timeline Updates**: Real-time progress tracking
- **Automated Messaging**: Template-based communications

## 🏗️ Technical Architecture

### **Frontend**
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations and transitions
- **Radix UI**: Accessible component primitives
- **React Hook Form**: Form validation and management
- **Zustand**: State management

### **Backend**
- **Next.js API Routes**: Serverless API endpoints
- **Prisma ORM**: Database management and queries
- **NextAuth.js**: Authentication and session management
- **Zod**: Schema validation
- **PostgreSQL**: Primary database

### **Infrastructure**
- **Nodemailer**: Email service integration
- **Telegram Bot API**: Admin notifications
- **File Upload**: Image and document handling
- **Rate Limiting**: API protection
- **Error Handling**: Comprehensive error management

## 📊 Database Schema

The platform uses a comprehensive database schema with 45+ models including:

- **User Management**: Roles (CLIENT, ADMIN, TECHNICIAN, SUPPORT)
- **Product Catalog**: Bilingual product information
- **Configuration Systems**: PC and PS5 build management
- **Order Processing**: Complete order lifecycle
- **Repair Tracking**: Timeline-based progress tracking
- **Support System**: Tickets and forum management
- **Content Management**: Blog, news, and tutorials
- **Analytics**: Performance metrics and reporting

## 🎨 Design System

### **Brand Colors**
- **Midnight Blue**: `#171542` - Primary brand color
- **Royal Purple**: `#7C56A3` - Accent and highlights
- **Light Blue**: `#072E32` - Supporting elements
- **Red Orange**: `#105663` - Call-to-action buttons
- **Lime Green**: `#ACD036` - Success states
- **Mint Cyan**: `#A4D8CE` - Subtle accents

### **Visual Effects**
- **Color Changing Gradients**: Dynamic brand colors
- **Glow Effects**: Interactive button states
- **Floating Animations**: Hero section elements
- **Smooth Transitions**: Page and component animations
- **Responsive Design**: Mobile-first approach

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Email service provider
- Telegram Bot Token

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd petabyte-tech-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Set up the database**
```bash
npm run db:generate
npm run db:migrate
npm run db:seed  # Optional: seed with sample data
```

5. **Start development server**
```bash
npm run dev
```

6. **Open in browser**
```
http://localhost:3000
```

## 📁 Project Structure

```
petabyte-tech-platform/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── admin/             # Admin panel
│   │   ├── client/            # Client dashboard
│   │   ├── services/          # Service pages
│   │   ├── store/             # E-commerce pages
│   │   └── api/               # API routes
│   ├── components/            # Reusable React components
│   │   ├── ui/                # Base UI components
│   │   ├── layout/            # Layout components
│   │   └── features/          # Feature-specific components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries
│   │   ├── auth.ts            # Authentication config
│   │   ├── email.ts           # Email service
│   │   ├── telegram.ts        # Telegram notifications
│   │   └── prisma.ts          # Database client
│   └── translations/          # i18n translation files
├── prisma/                    # Database schema and migrations
├── public/                    # Static assets
├── docs/                      # Documentation
└── README.md                  # This file
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with sample data

## 🌟 Features Breakdown

### **Menu Structure Implementation**

#### M1. Services
- ✅ PC Configurator (3 builds with step-by-step process)
- ✅ PS5 Controller Configurator
- ✅ Gaming Center Solutions
- ✅ AI Enhanced Web & Mobile Development
- ✅ 3D Printing Studio
- ✅ PC Optimization
- ✅ Fix Your Stuff (repair tutorials)
- ✅ Store integration

#### M2. Store
- ✅ EasyMail-In repair service
- ✅ Gift Cards (Steam/PSN)
- ✅ Account Opening services
- ✅ Product catalog

#### M3. Gaming Zone
- ✅ Duplicate PC/PS5 configurators
- ✅ Gaming Center Solutions
- ✅ PC Optimization
- ✅ Fix Your Stuff
- ✅ Esports page

#### M4. Portfolio
- ✅ Work Done showcase
- ✅ Petabyte Certified trust mark
- ✅ Before and After gallery

#### M5. About Us
- ✅ Our Team section
- ✅ Hiring form
- ✅ Contact page
- ✅ Blog (SEO optimized for Albanian)
- ✅ News system

#### M6. Support
- ✅ Petabyte Certified
- ✅ 24/7 Support packages
- ✅ Forum system
- ✅ Events management

#### M7. Fix Your Stuff
- ✅ Tutorials system
- ✅ Disassembly Guides
- ✅ Product Reviews

## 📱 Platform Features

### **Client Dashboard**
- Order tracking and history
- Repair request management
- PC/PS5 configuration saves
- Profile management
- Support ticket system
- Timeline tracking for repairs

### **Admin Panel**
- Real-time analytics dashboard
- Order management system
- Repair tracking with timeline
- User management
- Product catalog management
- Content management system
- Support ticket handling
- Financial reporting

### **Notification System**
- Email notifications for clients
- Telegram notifications for admins
- Real-time timeline updates
- Automated status changes
- Custom message templates

## 🔐 Security Features

- JWT-based authentication
- Role-based access control
- Input validation with Zod
- SQL injection prevention
- XSS protection
- Rate limiting
- Secure password hashing
- Environment variable protection

## 📈 Analytics & Reporting

- Real-time dashboard metrics
- Sales performance tracking
- Client behavior analysis
- Service performance metrics
- Financial reporting
- Export capabilities (3/6/12/24 months)
- Custom date range filtering

## 🌍 Internationalization

- Albanian (sq) as primary language
- English (en) as secondary language
- Complete UI translation
- Dynamic language switching
- SEO-optimized for Albanian market
- Cultural considerations for Kosovo

## 🚀 Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Deploy Options:
- **Vercel** (Recommended): One-click deployment
- **Netlify**: Git-based deployment
- **Railway**: Database + app hosting
- **DigitalOcean**: App Platform deployment
- **Self-hosted**: VPS with PM2 and Nginx

## 🤝 Contributing

This is a proprietary project for Petabyte Tech. For internal development:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

- **Technical Support**: tech@petabyte-tech.com
- **Business Inquiries**: info@petabyte-tech.com
- **Emergency Contact**: +383 XX XXX XXX

## � License

This project is proprietary and confidential. All rights reserved by Petabyte Tech.

## 🏆 Project Status

**Status**: ✅ **Production Ready**

### Completed Features:
- ✅ Complete authentication system
- ✅ PC configurator with 3 builds
- ✅ PS5 controller configurator
- ✅ Admin panel with full management
- ✅ Client dashboard
- ✅ Order management system
- ✅ Repair tracking with timeline
- ✅ Email & Telegram notifications
- ✅ Bilingual support (Albanian/English)
- ✅ Database schema with 45+ models
- ✅ API endpoints for all features
- ✅ UI component library
- ✅ Responsive design
- ✅ Brand styling and animations

### Ready for Deployment:
- Database setup and migrations
- Environment configuration
- Production build optimization
- Security implementation
- Performance optimization
- SEO optimization for Kosovo market

---

**Built with ❤️ for Petabyte Tech and the Kosovo tech community**

*Empowering gamers and tech enthusiasts across Kosovo with premium PC builds, custom PS5 controllers, and reliable repair services.* 