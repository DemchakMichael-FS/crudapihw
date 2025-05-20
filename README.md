# Inventory Manager - MERN CRUD Application

A full-stack inventory management application built with the MERN stack (MongoDB, Express, React, Node.js). This project demonstrates how to create a fully functional CRUD (Create, Read, Update, Delete) application with a modern React frontend and a robust Express backend.

## Features

- Modern React frontend with custom styling
- RESTful API design
- MongoDB integration with Mongoose
- Full CRUD operations
- Responsive design that works on mobile and desktop
- Error handling and form validation
- Environment variable configuration
- Scalable project structure

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. Clone the repository
   ```
   git clone https://github.com/DemchakMichael-FS/CRUD-API-Deployment.git
   cd CRUD-API-Deployment
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/crudapi
   NODE_ENV=development
   ```

4. Start the development environment
   ```
   # Run backend only
   npm run server

   # Run frontend only
   npm run client

   # Run both frontend and backend
   npm run dev
   ```

## API Endpoints

| Method | Endpoint      | Description         |
|--------|---------------|---------------------|
| GET    | /api/items    | Get all items       |
| GET    | /api/items/:id| Get a specific item |
| POST   | /api/items    | Create a new item   |
| PUT    | /api/items/:id| Update an item      |
| DELETE | /api/items/:id| Delete an item      |

## Project Structure

```
crudapi/
├── client/                  # React frontend
│   ├── public/              # Static files
│   ├── src/                 # React source code
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── App.jsx          # Main App component
│   │   ├── App.css          # Global styles
│   │   └── main.jsx         # Entry point
│   ├── index.html           # HTML template
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
├── config/                  # Backend configuration
│   └── db.js                # Database connection
├── src/                     # Backend source code
│   ├── controllers/         # Route controllers
│   │   └── itemController.js
│   ├── models/              # Database models
│   │   └── Item.js
│   ├── routes/              # API routes
│   │   └── items.js
│   └── server.js            # Express server
├── .env                     # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Backend dependencies
├── Procfile                 # Heroku deployment
└── README.md                # Documentation
```

## Deployment

This application can be deployed to various platforms. Here's how to deploy it to Heroku:

1. Create a Heroku account and install the Heroku CLI
2. Login to Heroku CLI:
   ```
   heroku login
   ```

3. Create a new Heroku app:
   ```
   heroku create your-app-name
   ```

4. Add MongoDB Atlas as your database:
   - Create a MongoDB Atlas account
   - Create a new cluster
   - Get your connection string
   - Add it to Heroku config vars:
     ```
     heroku config:set MONGO_URI=your_mongodb_connection_string
     ```

5. Set the Node environment to production:
   ```
   heroku config:set NODE_ENV=production
   ```

6. Push to Heroku:
   ```
   git push heroku main
   ```

7. Open your deployed application:
   ```
   heroku open
   ```

The application is now deployed and accessible online!

## Future Improvements

- Add authentication and authorization
- Implement pagination for large datasets
- Add more advanced filtering options
- Create comprehensive test suite
- Add Swagger documentation

## Contributing

Feel free to fork this repository and submit pull requests. Any contributions, big or small, are greatly appreciated!

## License

This project is licensed under the ISC License.
