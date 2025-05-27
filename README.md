# Inventory Manager

This is my MERN stack inventory management app that I built for my class project. I used MongoDB, Express, React, and Node.js to create a simple but functional CRUD application with mobile support.

## What I Built

- A React frontend with custom CSS and Vite
- A RESTful API with Express.js
- MongoDB database integration
- Full CRUD operations (Create, Read, Update, Delete)
- Mobile-friendly responsive design
- React Native mobile applications (CLI & Expo versions)

## Features

- View all inventory items on the home page
- Search and filter items by category
- Add new items with name, description, quantity, price, and category
- View detailed information about each item
- Edit existing items
- Delete items from the inventory
- Mobile applications that use the same API

## Tech Stack

- **Frontend**: React 18, Vite, Custom CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Mobile**: React Native (CLI & Expo versions)
- **Deployment**: Vercel
- **Database**: MongoDB Atlas

## How to Run It

### What You Need

- Node.js (18+)
- MongoDB Atlas account (or local MongoDB)
- Git

### Quick Start

1. Clone my repo
   ```bash
   git clone https://github.com/DemchakMichael-FS/crudapihw.git
   cd crudapihw
   ```

2. Install all dependencies
   ```bash
   npm run install-all
   ```

3. Set up your database
   Create a `.env` file in the api directory:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=3456
   ```

4. Start both frontend and backend
   ```bash
   npm run dev
   ```

   Or run them separately:
   ```bash
   # Terminal 1 - Backend
   npm run dev:api

   # Terminal 2 - Frontend
   npm run dev:client
   ```

5. Open http://localhost:3456 in your browser

### Mobile Applications

#### React Native CLI Version
```bash
cd InventoryMobile
npm install
npm run android  # or npm run ios
```

#### Expo Version
```bash
cd InventoryMobileExpo
npm install
npx expo start
```

## API Endpoints

- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get a specific item
- `POST /api/items` - Create a new item
- `PUT /api/items/:id` - Update an item
- `DELETE /api/items/:id` - Delete an item

## Deployment

I deployed this app on Vercel with both frontend and backend working seamlessly. The project is structured for easy Vercel deployment with automatic builds.

**Live Demo**: [https://crudapihw-git-production-michaels-projects-3fc8909e.vercel.app](https://crudapihw-git-production-michaels-projects-3fc8909e.vercel.app)

## Project Structure

```
├── api/                 # Backend Express.js API
├── client/              # Frontend React application
├── InventoryMobile/     # React Native CLI app
├── InventoryMobileExpo/ # Expo React Native app
├── vercel.json         # Vercel deployment config
└── package.json        # Root package with scripts
```

## License

This project is under the ISC License.
