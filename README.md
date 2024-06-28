PROECT: Building an user-friendly LMS (Library Management System) web application
DESCRIPTION:
1)One can access the app only with iitdh e-mails.
2)The user can search for the books and explore the database.
3)User can see the number of books available.
3)The app allows to issue a book through the platform.
4)User can give review/ratings to a particular book.
5)One can explore books by Deaprtment or Subject as per their need.
6)The app sends alerts if a due date is behind.
7)One can save books for later.
8)The app also provides stats of the books requested.

TECH STACK:
The project uses the famous MERN stack.This project includes a frontend built with React.js and a backend built with Node.js, Express.js, and MongoDB.

CODE AND FILE STRUCTURE:
**mern-backend/**: contains files for server backend
  `server.js`: server file (using express)
  `package.json`: backend dependencies
**email-validation/**: contains files for frontend 
  `src/`: source code directory
    `App.js`: application component
    `Login.js`:  React code for login
    `Login.css`:  CSS styling for login
    `index.js`: entry point for frontend
  `public/`: public directory
  `package.json`: frontend dependencies

HOW TO RUN THE PROJECT:
  1)Prerequisites:-
    a)Node.js and npm
    b)MongoDB  <!-- no need for now :) -->
    
  <!-- Run the following codes in your Command Prompt/Terminal -->
  
  2)Clone the repository:-
    git clone https://github.com/sreehb-123/9-11.git
    cd 9-11
  3)Install backend dependencies:-
    git checkout master
    cd mern-backend
    npm install
  4)Install frontend dependencies:-  
    cd ../email-validation
    npm install
  5)Set up Environment variables:-
    <!-- no need for now :) -->
  6)Start the backend server:-
    <!-- open new terminal window or tab -->
    cd mern-backend
    npm start
  7)Start the frontend server:-
    <!-- open the other terminal window, in email-validation directory -->
    npm start

This command will start the frontend development server and automatically open the web application in your default web browser. If it doesn't open automatically, you can access it at `http://localhost:3000`.
