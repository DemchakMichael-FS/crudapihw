# Inventory Manager

This is my MERN stack inventory management app that I built for my class project. I used MongoDB, Express, React, and Node.js to create a simple but functional CRUD application.

## What I Built

- A React frontend with custom CSS
- A RESTful API with Express
- MongoDB database integration
- Full CRUD operations (Create, Read, Update, Delete)
- Mobile-friendly responsive design

## Features

- View all inventory items on the home page
- Add new items with name, description, quantity, price, and category
- View detailed information about each item
- Edit existing items
- Delete items from the inventory

## How to Run It

### What You Need

- Node.js
- MongoDB (or MongoDB Atlas account)
- Git

### Setup Steps

1. Clone my repo
   ```
   git clone https://github.com/DemchakMichael-FS/CRUD-API-Deployment.git
   cd CRUD-API-Deployment
   ```

2. Install backend dependencies
   ```
   cd vercel-mern-app/api
   npm install
   ```

3. Install frontend dependencies
   ```
   cd ../client
   npm install
   ```

4. Set up your database
   Create a `.env` file in the api directory with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

5. Start the backend
   ```
   cd ../api
   node index.js
   ```

6. Start the frontend
   ```
   cd ../client
   npm run dev
   ```

## Deployment

I deployed this app on Vercel:

1. Frontend: https://inventory-manager.vercel.app
2. Backend API: https://inventory-manager-api.vercel.app

## License

This project is under the ISC License.
