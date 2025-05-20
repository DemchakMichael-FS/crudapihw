# Inventory Manager

This is my MERN stack inventory management app that I built for my class project. I used MongoDB, Express, React, and Node.js to create a simple but functional CRUD application.

## What I Built

- A React frontend with custom CSS
- A RESTful API with Express
- MongoDB database integration
- Full CRUD operations (Create, Read, Update, Delete)
- Mobile-friendly responsive design

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

2. Install everything
   ```
   npm install
   ```

3. Set up your database
   Create a `.env` file with:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```

4. Start it up
   ```
   npm run dev
   ```

## API Routes

| Method | Route          | What it does       |
|--------|----------------|-------------------|
| GET    | /api/items     | Gets all items    |
| GET    | /api/items/:id | Gets one item     |
| POST   | /api/items     | Creates an item   |
| PUT    | /api/items/:id | Updates an item   |
| DELETE | /api/items/:id | Deletes an item   |

## How I Organized My Code

I kept the frontend (React) and backend (Express) in the same repository but separated them clearly:

- `client/` folder has all the React code
- `src/` folder has all the Express API code
- I used a model-view-controller pattern for the backend

## Deployment

I deployed this app on Vercel. Here's how I did it:

1. Connected my GitHub repo to Vercel
2. Added my MongoDB Atlas connection string as an environment variable
3. Set NODE_ENV to "production"

The app automatically deploys whenever I push changes to GitHub.

## Future Plans

I'd like to add:
- User login and authentication
- Better filtering and search
- Pagination for when the list gets long
- More comprehensive testing

## License

This project is under the ISC License.
