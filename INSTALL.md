# 🚀 API Boilerplate Generator - FREE Version

## Installation

### Option 1: Global Installation (Recommended)
```bash
npm install -g api-boilerplate-generator
api-gen --help
```

### Option 2: Run from Source
```bash
git clone https://github.com/kasbahcode/api-boilerplate-generator.git
cd api-boilerplate-generator
npm install
node bin/cli.js --help
```

## Quick Start

### 1. Create a Basic API
```bash
api-gen create my-awesome-api
cd my-awesome-api
npm install
cp .env.example .env
npm run dev
```

### 2. Create API with Authentication
```bash
api-gen create my-secure-api -t auth
cd my-secure-api
npm install
cp .env.example .env
npm run dev
```

## Available Commands

- `api-gen create <name>` - Create basic API
- `api-gen create <name> -t auth` - Create API with authentication
- `api-gen status` - Check usage (3 projects max in FREE version)
- `api-gen upgrade` - Get PRO version info

## Generated Project Structure

```
your-api/
├── src/
│   ├── app.js           # Main Express app
│   ├── routes/          # API routes
│   │   ├── items.js     # Basic CRUD example
│   │   └── auth.js      # Auth routes (if auth template)
│   ├── middleware/      # Custom middleware
│   │   └── auth.js      # JWT authentication (if auth template)
│   ├── controllers/     # Route controllers
│   ├── models/          # Database models
│   ├── services/        # Business logic
│   └── utils/           # Helper functions
├── tests/               # Test files
├── package.json         # Dependencies
├── .env.example         # Environment variables template
├── .gitignore          # Git ignore file
└── README.md           # Project documentation
```

## What You Get (FREE Version)

### ✅ Basic Template
- Express.js server setup
- CORS & security headers (Helmet)
- Request logging (Morgan)
- JSON parsing middleware
- Error handling
- Health check endpoint
- Basic CRUD example with in-memory storage

### ✅ Auth Template
- Everything in Basic +
- JWT authentication system
- User registration & login
- Password hashing (bcrypt)
- Input validation (Joi)
- Protected routes middleware
- Profile management

## Generated API Endpoints

### Basic Template
- `GET /` - Welcome message
- `GET /health` - Health check
- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get single item
- `POST /api/items` - Create item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

### Auth Template (includes all basic endpoints +)
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

## Example Usage

### Test Basic API
```bash
# Start the server
npm run dev

# Test endpoints
curl http://localhost:3000/
curl http://localhost:3000/health
curl http://localhost:3000/api/items
```

### Test Auth API
```bash
# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'

# Login user
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "password123"}'

# Access protected route (use token from login response)
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Limitations (FREE Version)

- ⚠️ **3 project limit** - Can only generate 3 API projects
- ⚠️ **Basic templates only** - No advanced templates (e-commerce, microservices)
- ⚠️ **No database integration** - Uses in-memory storage for demo
- ⚠️ **No support** - You're on your own!

## Upgrade to PRO ($49)

- ✅ **Unlimited project generation**
- ✅ **Advanced templates** (e-commerce, microservices, blog/CMS)
- ✅ **Database integration** (MongoDB, PostgreSQL, MySQL)
- ✅ **Migration scripts**
- ✅ **6 months email support**
- ✅ **All future updates for 1 year**

**Contact:** contact@kasbahcode.com

## Troubleshooting

### Permission Errors (macOS/Linux)
```bash
sudo npm install -g api-boilerplate-generator
```

### Cannot find module errors
```bash
cd your-generated-project
npm install
```

### Port already in use
Change the PORT in `.env` file:
```
PORT=3001
```

### Clear usage counter (for testing)
```bash
rm ~/.api-generator-usage.json
```

---

**Built with ❤️ by [Mouad @ KasbahCode](https://kasbahcode.com)** 