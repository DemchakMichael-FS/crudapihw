# Deployment Guide

## Vercel Deployment

This project is configured for easy deployment on Vercel with both frontend and backend.

### Prerequisites

1. MongoDB Atlas account with a database set up
2. Vercel account
3. GitHub repository connected to Vercel

### Environment Variables

Set these environment variables in your Vercel dashboard:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/inventory?retryWrites=true&w=majority
```

### Deployment Steps

1. **Connect Repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect the configuration

2. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add your `MONGODB_URI` with your actual MongoDB connection string

3. **Deploy**
   - Vercel will automatically build and deploy both frontend and backend
   - The `vercel.json` configuration handles routing between frontend and API

### Project Structure for Vercel

```
├── api/                 # Backend (Serverless Functions)
│   ├── index.js        # Main API file
│   └── package.json    # Backend dependencies
├── client/             # Frontend (Static Build)
│   ├── src/           # React source code
│   ├── package.json   # Frontend dependencies
│   └── vite.config.js # Build configuration
├── vercel.json        # Vercel deployment config
└── package.json       # Root package with scripts
```

### API Endpoints

Once deployed, your API will be available at:
- `https://your-app.vercel.app/api` - API info
- `https://your-app.vercel.app/api/items` - Items CRUD operations

### Frontend

Your React app will be available at:
- `https://your-app.vercel.app` - Main application

### Local Development

1. Install dependencies: `npm run install-all`
2. Set up environment: Copy `api/.env.example` to `api/.env` and add your MongoDB URI
3. Start development: `npm run dev` (runs both frontend and backend)

### Troubleshooting

- **Build Errors**: Check that all dependencies are properly listed in package.json files
- **API Errors**: Verify MongoDB connection string in environment variables
- **Routing Issues**: Ensure `vercel.json` configuration is correct
- **CORS Issues**: API includes CORS middleware for cross-origin requests
- **JSON BOM Errors**: If you see "Unexpected token" errors, ensure JSON files don't have BOM characters
- **Output Directory Errors**: Verify that the client build creates a `dist` directory with `npm run build`

### Common Fixes

1. **BOM Character Issues**:
   ```bash
   # Recreate JSON files using Node.js to avoid BOM
   node -e "const fs = require('fs'); const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8')); fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2), 'utf8');"
   ```

2. **Build Directory Issues**:
   ```bash
   # Test local build
   cd client && npm run build
   # Should create client/dist directory
   ```
