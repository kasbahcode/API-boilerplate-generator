const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

const TEMPLATES = {
  basic: 'Basic REST API with CRUD operations',
  auth: 'API with authentication system'
};

async function createProject(projectName, templateType = 'basic') {
  const spinner = ora('Generating API boilerplate...').start();
  
  try {
    // Validate project name
    if (!projectName || projectName.trim() === '') {
      throw new Error('Project name is required');
    }
    
    // Clean project name
    const cleanName = projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const projectPath = path.join(process.cwd(), cleanName);
    
    // Check if directory already exists
    if (await fs.pathExists(projectPath)) {
      throw new Error(`Directory "${cleanName}" already exists`);
    }
    
    // Validate template type
    if (!TEMPLATES[templateType]) {
      throw new Error(`Invalid template type. Available: ${Object.keys(TEMPLATES).join(', ')}`);
    }
    
    spinner.text = `Creating ${templateType} template...`;
    
    // Create project directory
    await fs.ensureDir(projectPath);
    
    // Generate template based on type
    switch (templateType) {
      case 'basic':
        await generateBasicTemplate(projectPath, cleanName);
        break;
      case 'auth':
        await generateAuthTemplate(projectPath, cleanName);
        break;
      default:
        await generateBasicTemplate(projectPath, cleanName);
    }
    
    spinner.succeed(`Project "${cleanName}" created successfully!`);
    
  } catch (error) {
    spinner.fail('Failed to create project');
    throw error;
  }
}

async function generateBasicTemplate(projectPath, projectName) {
  // Create directory structure
  const dirs = [
    'src/controllers',
    'src/middleware',
    'src/models',
    'src/routes',
    'src/services',
    'src/utils',
    'tests'
  ];
  
  for (const dir of dirs) {
    await fs.ensureDir(path.join(projectPath, dir));
  }
  
  // Generate package.json
  const packageJson = {
    name: projectName,
    version: '1.0.0',
    description: 'Generated API boilerplate',
    main: 'src/app.js',
    scripts: {
      start: 'node src/app.js',
      dev: 'nodemon src/app.js',
      test: 'jest'
    },
    dependencies: {
      express: '^4.18.2',
      cors: '^2.8.5',
      helmet: '^7.0.0',
      morgan: '^1.10.0',
      dotenv: '^16.0.3'
    },
    devDependencies: {
      nodemon: '^2.0.22',
      jest: '^29.5.0'
    }
  };
  
  await fs.writeJson(path.join(projectPath, 'package.json'), packageJson, { spaces: 2 });
  
  // Generate main app.js
  const appJs = `const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to ${projectName} API',
    version: '1.0.0',
    status: 'active'
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Basic CRUD routes example
const itemsRouter = require('./routes/items');
app.use('/api/items', itemsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(\`🚀 Server running on port \${PORT}\`);
  console.log(\`📱 Health check: http://localhost:\${PORT}/health\`);
});

module.exports = app;`;
  
  await fs.writeFile(path.join(projectPath, 'src/app.js'), appJs);
  
  // Generate items routes (basic CRUD example)
  const itemsRouter = `const express = require('express');
const router = express.Router();

// In-memory storage for demo (use database in production)
let items = [
  { id: 1, name: 'Sample Item 1', description: 'This is a sample item' },
  { id: 2, name: 'Sample Item 2', description: 'Another sample item' }
];

// GET all items
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: items,
    count: items.length
  });
});

// GET single item
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(item => item.id === id);
  
  if (!item) {
    return res.status(404).json({
      success: false,
      error: 'Item not found'
    });
  }
  
  res.json({
    success: true,
    data: item
  });
});

// POST create item
router.post('/', (req, res) => {
  const { name, description } = req.body;
  
  if (!name) {
    return res.status(400).json({
      success: false,
      error: 'Name is required'
    });
  }
  
  const newItem = {
    id: Math.max(...items.map(i => i.id)) + 1,
    name,
    description: description || ''
  };
  
  items.push(newItem);
  
  res.status(201).json({
    success: true,
    data: newItem
  });
});

// PUT update item
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Item not found'
    });
  }
  
  const { name, description } = req.body;
  
  items[itemIndex] = {
    ...items[itemIndex],
    name: name || items[itemIndex].name,
    description: description !== undefined ? description : items[itemIndex].description
  };
  
  res.json({
    success: true,
    data: items[itemIndex]
  });
});

// DELETE item
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Item not found'
    });
  }
  
  items.splice(itemIndex, 1);
  
  res.json({
    success: true,
    message: 'Item deleted successfully'
  });
});

module.exports = router;`;
  
  await fs.writeFile(path.join(projectPath, 'src/routes/items.js'), itemsRouter);
  
  // Generate .env.example
  const envExample = `# Server Configuration
PORT=3000

# Database (add your database URL when ready)
# DATABASE_URL=mongodb://localhost:27017/${projectName}

# API Keys (add your keys here)
# JWT_SECRET=your-secret-key-here
# API_KEY=your-api-key-here
`;
  
  await fs.writeFile(path.join(projectPath, '.env.example'), envExample);
  
  // Generate README
  const readme = `# ${projectName}

Generated with API Boilerplate Generator by KasbahCode

## Quick Start

\`\`\`bash
npm install
cp .env.example .env
npm run dev
\`\`\`

Your API will be running at http://localhost:3000

## Available Endpoints

- \`GET /\` - Welcome message
- \`GET /health\` - Health check
- \`GET /api/items\` - Get all items
- \`GET /api/items/:id\` - Get single item
- \`POST /api/items\` - Create new item
- \`PUT /api/items/:id\` - Update item
- \`DELETE /api/items/:id\` - Delete item

## Scripts

- \`npm start\` - Start production server
- \`npm run dev\` - Start development server
- \`npm test\` - Run tests

---
Generated with ❤️ by [KasbahCode API Generator](https://kasbahcode.com)
`;
  
  await fs.writeFile(path.join(projectPath, 'README.md'), readme);
  
  // Generate .gitignore
  const gitignore = `# Dependencies
node_modules/

# Environment variables
.env
.env.local
.env.production

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
`;
  
  await fs.writeFile(path.join(projectPath, '.gitignore'), gitignore);
}

async function generateAuthTemplate(projectPath, projectName) {
  // First generate basic template
  await generateBasicTemplate(projectPath, projectName);
  
  // Add auth-specific dependencies
  const packageJsonPath = path.join(projectPath, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);
  
  packageJson.dependencies = {
    ...packageJson.dependencies,
    bcryptjs: '^2.4.3',
    jsonwebtoken: '^9.0.0',
    joi: '^17.9.2'
  };
  
  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
  
  // Generate auth middleware
  const authMiddleware = `const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access token required'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: 'Invalid or expired token'
      });
    }
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };`;
  
  await fs.writeFile(path.join(projectPath, 'src/middleware/auth.js'), authMiddleware);
  
  // Generate auth routes
  const authRoutes = `const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// In-memory user storage for demo (use database in production)
let users = [];

// Validation schemas
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Register user
router.post('/register', async (req, res) => {
  try {
    // Validate input
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    const { email, password, name } = value;

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email'
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = {
      id: users.length + 1,
      email,
      name,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name
        },
        token
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error during registration'
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    // Validate input
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    const { email, password } = value;

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        },
        token
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error during login'
    });
  }
});

// Get user profile (protected route)
router.get('/profile', require('../middleware/auth').authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.userId);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  res.json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt
    }
  });
});

module.exports = router;`;
  
  await fs.writeFile(path.join(projectPath, 'src/routes/auth.js'), authRoutes);
  
  // Update main app.js to include auth routes
  const appJsPath = path.join(projectPath, 'src/app.js');
  let appJs = await fs.readFile(appJsPath, 'utf8');
  
  // Add auth routes
  appJs = appJs.replace(
    'const itemsRouter = require(\'./routes/items\');',
    `const itemsRouter = require('./routes/items');
const authRouter = require('./routes/auth');`
  );
  
  appJs = appJs.replace(
    'app.use(\'/api/items\', itemsRouter);',
    `app.use('/api/items', itemsRouter);
app.use('/api/auth', authRouter);`
  );
  
  await fs.writeFile(appJsPath, appJs);
  
  // Update .env.example with JWT secret
  const envPath = path.join(projectPath, '.env.example');
  let envExample = await fs.readFile(envPath, 'utf8');
  envExample += `
# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
`;
  
  await fs.writeFile(envPath, envExample);
  
  // Update README with auth endpoints
  const readmePath = path.join(projectPath, 'README.md');
  let readme = await fs.readFile(readmePath, 'utf8');
  
  readme = readme.replace(
    '## Available Endpoints',
    `## Available Endpoints

### Authentication
- \`POST /api/auth/register\` - Register new user
- \`POST /api/auth/login\` - Login user
- \`GET /api/auth/profile\` - Get user profile (requires token)

### Items (Basic CRUD)`
  );
  
  readme += `

## Authentication Usage

### Register a new user:
\`\`\`bash
curl -X POST http://localhost:3000/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'
\`\`\`

### Login:
\`\`\`bash
curl -X POST http://localhost:3000/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email": "john@example.com", "password": "password123"}'
\`\`\`

### Access protected routes:
\`\`\`bash
curl -X GET http://localhost:3000/api/auth/profile \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
\`\`\`
`;
  
  await fs.writeFile(readmePath, readme);
}

module.exports = {
  createProject,
  TEMPLATES
}; 