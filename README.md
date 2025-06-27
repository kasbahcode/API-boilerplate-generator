# 🚀 API Boilerplate Generator

**Generate production-ready Node.js/Express API boilerplates in seconds**

[![Made by KasbahCode](https://img.shields.io/badge/Made%20by-KasbahCode-blue)](https://kasbahcode.com)
[![Commercial License](https://img.shields.io/badge/License-Commercial-red.svg)](https://kasbahcode.com)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4+-lightgrey.svg)](https://expressjs.com/)

## 🎯 Hey Developer! 👋

I'm Mouad, and I got tired of setting up the same damn API structure every single time I started a new project. You know the drill - authentication, validation, error handling, database setup... the same boring stuff over and over.

So I built this **API Boilerplate Generator** to save myself (and you) hours of repetitive setup. It spits out production-ready Node.js/Express APIs with all the good stuff already configured.

### ✨ **Start FREE** - I've got your back!

---

## 🛠️ Technologies Stack

<div align="center">

| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime Environment | v18+ |
| **Express** | Web Framework | v4+ |
| **MongoDB** | Database | v6+ |
| **JWT** | Authentication | Latest |
| **Mongoose** | ODM | v7+ |
| **Joi/Yup** | Validation | Latest |

</div>

---

## 🔥 What You Get (FREE Version)

### ✅ **Basic Template**
- **Express.js** server with clean structure
- **CORS** and **Helmet** security headers
- **Morgan** request logging
- **Error handling** middleware
- **Health check** endpoints
- **Basic CRUD** operations (in-memory storage)
- **Environment** configuration ready

### 🔐 **Auth Template** (Basic + Authentication)
- **JWT authentication** system
- **User registration & login**
- **Password hashing** with bcrypt
- **Input validation** with Joi
- **Protected routes** middleware
- **Profile management**

### 🚀 **PRO Version Features** ($49)
- **Database Integration**: MongoDB, PostgreSQL, MySQL
- **API Documentation**: Auto-generated Swagger/OpenAPI
- **Rate Limiting**: Advanced rate limiting middleware
- **Testing Setup**: Jest/Mocha test configuration
- **Docker Support**: Containerization ready
- **CI/CD Templates**: GitHub Actions workflows
- **Advanced Templates**: E-commerce, Microservices, GraphQL
- **Migration Scripts**: Database schema management
- **6 Months Support**: Direct email support from me

---

## 🎨 Generated Project Structure

```
your-api/
├── src/
│   ├── app.js               # Main Express application
│   ├── routes/              # API routes
│   │   ├── items.js         # Basic CRUD operations
│   │   └── auth.js          # Authentication routes (auth template)
│   ├── middleware/          # Custom middleware
│   │   └── auth.js          # JWT authentication (auth template)
│   ├── controllers/         # Route controllers (empty, ready for use)
│   ├── models/              # Database models (empty, ready for use)
│   ├── services/            # Business logic (empty, ready for use)
│   └── utils/               # Utility functions (empty, ready for use)
├── tests/                   # Test files (empty, ready for use)
├── package.json             # Dependencies and scripts
├── .env.example             # Environment variables template
├── .gitignore              # Git ignore configuration
└── README.md               # Project documentation with examples
```

### 📁 **What's Actually Generated**
- ✅ **Working Express server** with security middleware
- ✅ **CRUD example** with in-memory storage  
- ✅ **Authentication system** (auth template only)
- ✅ **Proper folder structure** ready for expansion
- ✅ **Environment setup** with .env.example

### 🧪 **Test the Generated API**

After creating and running your API:

```bash
# Basic endpoints available in both templates
curl http://localhost:3000/                    # Welcome message
curl http://localhost:3000/health              # Health check
curl http://localhost:3000/api/items           # Get all items

# Create new item
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Item", "description": "This is a test"}'

# Auth endpoints (auth template only)
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'
```

---

## 🚀 Getting Started

### 📦 Installation

#### Option 1: Run from Source (Current)
```bash
git clone https://github.com/kasbahcode/api-boilerplate-generator.git
cd api-boilerplate-generator
npm install
```

#### Option 2: Global Install (Coming Soon to NPM)
```bash
# Will be available soon:
npm install -g api-boilerplate-generator
```

### ⚡ Quick Start
```bash
# Generate your API boilerplate
node bin/cli.js create my-awesome-api

# Navigate to your project
cd my-awesome-api

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Start development server
npm run dev
```

Your API will be running at `http://localhost:3000` 🎉

### 🔧 Prerequisites
- Node.js v18 or higher
- npm or yarn

### 📋 Available Commands

```bash
# Create basic API
node bin/cli.js create my-api

# Create API with authentication
node bin/cli.js create my-secure-api -t auth

# Check your usage status (FREE = 3 projects max)
node bin/cli.js status

# Get upgrade information
node bin/cli.js upgrade

# Show help
node bin/cli.js --help
```

---

## 📋 Available Templates (FREE Version)

| Template | Command | Description | What You Get |
|----------|---------|-------------|--------------|
| **Basic** | `create my-api` | Simple REST API | Express + CORS + Security + CRUD example |
| **Auth** | `create my-api -t auth` | API with Authentication | Basic + JWT auth + User registration/login |

### 🚀 **PRO Templates** (Available in $49 version)
- **E-commerce** - Products, Orders, Payments, Stripe integration
- **Microservice** - Docker + API Gateway + Service mesh ready  
- **Blog/CMS** - Posts, Categories, Comments, Media uploads
- **Real-time** - WebSocket + Socket.io + Live updates
- **GraphQL** - GraphQL API with Apollo Server

---

## 🌟 Why I Built This (And Why You'll Love It)

### ⚡ **I Hate Repetitive Work**
Look, I've been coding for years and setting up the same auth system for the 100th time made me want to scream. This generator skips 2-3 days of boring setup so you can jump straight to building cool stuff.

### 🔒 **Security That Actually Works**
I've seen too many APIs get hacked because of basic security mistakes. Everything here follows OWASP guidelines and gets regular updates. Your API won't be the next data breach headline.

### 📈 **Built for Real Projects**
This isn't some toy project. I use this for my own client work. It's scalable, performant, and has proper monitoring because I need APIs that don't break at 3 AM.

### 🎯 **No BS, Just Clean Code**
I write code like I'll have to debug it at midnight (because I usually do). Everything is readable, well-documented, and easy to customize without breaking stuff.

---

## 💰 Alright, Let's Talk Money

I'm selling the actual generator tool - you download it, you own it. No bullshit subscriptions.

### 🆓 **FREE Version** - $0
**Just to let you test drive this thing**
- Basic generator with simple templates
- Generate up to 3 projects (enough to see if you like it)
- Basic auth & validation templates
- No support (you're on your own)

### ⚡ **PRO Version** - $49
**The full thing - pay once, use forever**
- Complete generator with ALL templates
- Unlimited project generation
- Advanced templates (e-commerce, microservices, blog/CMS)
- Database migration scripts included
- 6 months email support from me
- All future updates for 1 year

### 🚀 **BUSINESS License** - $149  
**For teams and agencies**
- Everything in PRO
- Use on unlimited team projects
- Client project rights included
- Priority support (I'll actually prioritize your emails)
- Custom template requests
- Lifetime updates

### 🏢 **ENTERPRISE License** - Let's Talk
**For big companies who want everything**
- Full source code access
- Modify and customize however you want
- White-label rights (remove my branding)
- Unlimited team/client usage
- Custom development if needed
- My phone number for emergencies



Look, if this saves you even 4 hours of setup work, the PRO version already paid for itself.

[**Buy Now →**](mailto:contact@kasbahcode.com?subject=API%20Generator%20-%20Purchase)

---

## 📞 Need Something Custom?

Hey, sometimes the generator isn't enough and you need someone to actually build the thing. I do custom work too:

- **Custom API Development** - I'll build your entire API from scratch (starts at $2,500)
- **Legacy System Integration** - Make your old systems talk to new ones ($1,500+)
- **API Consulting** - I'll review your architecture and fix the mess ($150/hour)
- **Performance Optimization** - Make your slow API fast again ($800+)
- **Security Audits** - Find holes before the hackers do ($1,200+)

### 🤝 Want to Chat?

Just email me directly - I actually read and respond to every message.

**Email:** [contact@kasbahcode.com](mailto:contact@kasbahcode.com)  
**Website:** [kasbahcode.com](https://kasbahcode.com)

I'm based in France but work with clients worldwide. Usually respond within 24 hours.

---


## 📄 License & Terms

This is a **commercial product** owned by KasbahCode. All rights reserved.

### 🔒 **Commercial License Terms**
- ✅ **Paid customers** get full usage rights for their projects
- ✅ **Generate unlimited APIs** with your purchased version
- ❌ **No redistribution** or resale of the generator itself
- ❌ **No reverse engineering** or code extraction
- ✅ **Generated code** belongs to you - use commercially

### 📋 **Usage Rights**
- **FREE Version**: Generate up to 3 API projects
- **PRO Version**: Unlimited API generation + advanced features  
- **BUSINESS License**: Everything + team usage rights
- **ENTERPRISE License**: Full source code + custom licensing

For full terms of service, visit: [kasbahcode.com/terms](https://kasbahcode.com/terms)

---

## ⭐ Help Me Out?

If this generator saves you time and sanity:
- ⭐ Star this repo (it makes me happy)
- 🔄 Tell your dev friends about it
- 🐛 Email me bugs or feature ideas
- 💝 Upgrade to a paid plan (keeps me caffeinated)

Seriously though, every star and share helps me know this is actually useful to people.

---

<div align="center">

**Built with ❤️ (and lots of coffee) by [Mouad @ KasbahCode](https://kasbahcode.com)**

*Just a dev trying to make other devs' lives easier*

</div>
# API-boilerplate-generator
