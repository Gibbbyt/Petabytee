# Petabyte Tech Platform - Deployment Guide

## 🚀 Complete Production Deployment Guide

This guide covers the complete deployment process for the Petabyte Tech web platform, including database setup, environment configuration, and production optimization.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [Environment Configuration](#environment-configuration)
4. [Email & Notifications Setup](#email--notifications-setup)
5. [Production Build](#production-build)
6. [Deployment Platforms](#deployment-platforms)
7. [Post-Deployment Configuration](#post-deployment-configuration)
8. [Monitoring & Maintenance](#monitoring--maintenance)
9. [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Email service provider (Gmail, SendGrid, etc.)
- Telegram Bot Token (for admin notifications)
- Domain name and SSL certificate
- Git repository access

## Database Setup

### 1. PostgreSQL Database

#### Option A: Local PostgreSQL
```bash
# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
CREATE DATABASE petabyte_tech;
CREATE USER petabyte_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE petabyte_tech TO petabyte_user;
\q
```

#### Option B: Cloud Database (Recommended)
- **Supabase**: Free tier available, PostgreSQL-compatible
- **PlanetScale**: MySQL-compatible alternative
- **Railway**: PostgreSQL with automatic backups
- **Neon**: Serverless PostgreSQL

### 2. Database Migration
```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# (Optional) Seed initial data
npm run db:seed
```

## Environment Configuration

### 1. Copy Environment Template
```bash
cp .env.example .env
```

### 2. Configure Required Variables

#### Database
```env
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"
```

#### Authentication
```env
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="super-secret-key-minimum-32-characters-long"
```

#### Email Configuration
```env
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-business-email@gmail.com"
EMAIL_PASS="your-app-password"
EMAIL_FROM="noreply@your-domain.com"
```

#### Telegram Bot
```env
TELEGRAM_BOT_TOKEN="123456789:ABCdefGhIJklMnOpQrStUvWxYz"
TELEGRAM_CHAT_ID="-1001234567890"
```

## Email & Notifications Setup

### 1. Gmail Setup
1. Enable 2-Factor Authentication
2. Generate App Password:
   - Google Account → Security → 2-Step Verification → App passwords
3. Use App Password in `EMAIL_PASS`

### 2. Telegram Bot Setup
1. Message @BotFather on Telegram
2. Send `/newbot` and follow instructions
3. Save the bot token
4. Add bot to admin group and get chat ID

### 3. SendGrid Alternative
```env
EMAIL_HOST="smtp.sendgrid.net"
EMAIL_PORT=587
EMAIL_USER="apikey"
EMAIL_PASS="your-sendgrid-api-key"
```

## Production Build

### 1. Install Dependencies
```bash
npm install --production
```

### 2. Build Application
```bash
npm run build
```

### 3. Optimize Performance
```bash
# Enable TypeScript checking
npm run type-check

# Run linting
npm run lint:fix
```

## Deployment Platforms

### Option 1: Vercel (Recommended)

#### Automatic Deployment
1. Connect GitHub repository to Vercel
2. Import project
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on git push

#### Manual Commands
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=.next
```

### Option 3: Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

### Option 4: DigitalOcean App Platform

1. Connect GitHub repository
2. Configure build settings:
   - Build Command: `npm run build`
   - Run Command: `npm start`
3. Add environment variables
4. Deploy

### Option 5: Self-Hosted VPS

#### Using PM2
```bash
# Install PM2
npm install -g pm2

# Create ecosystem file
cat > ecosystem.config.js << EOL
module.exports = {
  apps: [{
    name: 'petabyte-tech',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/petabyte-tech',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOL

# Start application
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Post-Deployment Configuration

### 1. Domain Setup
- Configure DNS records
- Set up SSL certificate (Let's Encrypt recommended)
- Update NEXTAUTH_URL in environment variables

### 2. Create Admin User
```bash
# Access your production database
npm run db:studio

# Or use direct SQL
UPDATE users SET role = 'ADMIN' WHERE email = 'admin@your-domain.com';
```

### 3. Configure Initial Data
- Add initial PC components
- Set up PS5 controller options
- Create service packages
- Configure shipping zones

### 4. Test Core Features
- [ ] User registration and login
- [ ] PC configurator functionality
- [ ] PS5 configurator functionality
- [ ] Order creation and management
- [ ] Repair request system
- [ ] Email notifications
- [ ] Telegram notifications
- [ ] Admin panel access
- [ ] Timeline system
- [ ] Invoice generation

## Monitoring & Maintenance

### 1. Health Checks
```javascript
// pages/api/health.js
export default function handler(req, res) {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version 
  });
}
```

### 2. Database Monitoring
```bash
# Check database connections
npm run db:studio

# Monitor query performance
SELECT * FROM pg_stat_activity;
```

### 3. Log Monitoring
```bash
# PM2 logs
pm2 logs petabyte-tech

# Application logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### 4. Backup Strategy
```bash
# Database backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > backup_$DATE.sql
```

### 5. Performance Monitoring
- Set up Vercel Analytics
- Configure Google Analytics
- Monitor Core Web Vitals
- Set up error tracking (Sentry)

## Troubleshooting

### Common Issues

#### 1. Database Connection Errors
```bash
# Check database connection
psql $DATABASE_URL

# Verify environment variables
echo $DATABASE_URL
```

#### 2. Build Failures
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### 3. Authentication Issues
```bash
# Verify NEXTAUTH_SECRET is set
echo $NEXTAUTH_SECRET

# Check callback URLs in OAuth providers
```

#### 4. Email Delivery Issues
```bash
# Test email configuration
node -e "
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
transporter.verify(console.log);
"
```

### Support Contacts

- **Technical Issues**: tech@petabyte-tech.com
- **Deployment Help**: deploy@petabyte-tech.com
- **Emergency Contact**: +383 XX XXX XXX

## Security Checklist

- [ ] Environment variables secured
- [ ] Database access restricted
- [ ] SSL certificate installed
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Input validation active
- [ ] Error messages don't expose sensitive data
- [ ] Regular security updates scheduled
- [ ] Backup system tested
- [ ] Admin access secured

## Performance Optimization

### 1. Image Optimization
- Use Next.js Image component
- Configure image domains in next.config.js
- Set up CDN for static assets

### 2. Database Optimization
- Add database indexes
- Use connection pooling
- Monitor slow queries

### 3. Caching Strategy
- Enable Next.js static generation
- Configure Redis for session storage
- Set up CDN for global content delivery

---

## 🎉 Deployment Complete!

Your Petabyte Tech platform is now live and ready to serve customers across Kosovo and beyond. Monitor the system closely in the first few days and be prepared to scale resources based on traffic patterns.

For ongoing support and feature development, refer to the main README.md file or contact the development team.