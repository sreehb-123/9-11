PROECT:This project is a Library Management System built with the MERN (MongoDB, Express, React, Node.js) stack. It includes functionalities for searching books, issuing books to users, returning books, and sending notifications for overdue books.

DESCRIPTION:
1)One can access the app only with the users specified in a JSON file named user.
2)The user can search for the books and explore the database.
3)User can see the number of books available.
3)The app allows to issue a book through the platform.
4)User can give review/ratings to a particular book.
5)One can explore books by Deaprtment or Subject as per their need.
6)The app sends alerts if a due date is behind.

TECH STACK:
The project uses the famous MERN stack.This project includes a frontend built with React.js and a backend built with Node.js, Express.js, and MongoDB.

CODE AND FILE STRUCTURE:
**mern-backend/**: contains files for server backend
  `server.js`: server file (using express)
  `package.json`: backend dependencies
  `users.json` : allowed usernames and passwords
**email-validation/**: contains files for frontend 
  `src/`: source code directory
    `componenets/` : website components
        `BookDetails.js` : Displays detailed information about a book.
        `BookDisplay.js` : Displays popular books.
        `DeptBooks.js` : Displays books filtered by department.
        `Deptbox.js` : UI component for selecting departments.
        `IssuedBook.js` : Shows books that have been issued by users.
        `main.css` : Global CSS styling for the components.
        `Menu.js` : Component for the website's menu.
        `Navbar.css` : CSS styling for the navigation bar.
        `Navbar.js` : Component for the navigation bar.
        `popular.json` : contains popular books 
        `Search.js` : Search functionality component.
        `searchResults.js` : Displays the search results.
      `pages/` :
        `Homepage.css` : CSS styling for the homepage.
        `Homepage.js` : Homepage component.
        `Notifications.js` : Displays notifications to the user.
    `App.js`: application component
    `Login.js`:  React code for login
    `Login.css`:  CSS styling for login
    `index.js`: entry point for frontend
  `public/`: public directory
  `package.json`: frontend dependencies

HOW TO RUN THE PROJECT:
  1)Prerequisites:-
    a)Node.js and npm
    b)MongoDB  
    
  <!-- Run the following codes in your Command Prompt/Terminal -->
  
  2)Clone the repository:-
    git clone https://github.com/sreehb-123/9-11.git
    cd 9-11
  3)Install backend dependencies:-
    git checkout master
    cd mern-backend
    npm install
    npm install express mongoose cors fs node-schedule
  4)Install frontend dependencies:-  
    cd ../email-validation
    npm install
    npm install react-router-dom
    npm install boxicons
    npm install axios
    npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
    npm install react-slick slick-carousel
  5)Start MongoDB (mongod):
    cd ../
    mongod
  6)Start the backend server:-
    <!-- open new terminal window or tab -->
    cd mern-backend
    npm start
  7)Start the frontend server:-
    <!-- open the other terminal window, in email-validation directory -->
    npm start

This command will start the frontend development server and automatically open the web application in your default web browser. If it doesn't open automatically, you can access it at `http://localhost:3000`.

API Endpoints 

  1)User Authentication 
      POST `/validate-email`: Validate user email and password.
  2)Book Management
      GET `/search`: Search for books by title, author, or genre.
      GET `/book/:id`: Get details of a book by ID
      GET `/department/:dept`: Get books by department
      GET `/issue-book/:id`: Issue a book to a user.
      POST `/return-book/:id`:Return an issued book. 
  3)Issued Books
      GET `/issued-books/:id`: Return an issued book.
  4)Notifications
      GET `/notifications/:email`: Get notification for a specific user.
  5)Rating and Reviews
      POST `/add-rating/:id`:Enables users to provide feedback on books.
      GET /book-reviews/:id : Fetches user reviews and ratings for a book.
  6)Other
      DELETE `/clear-issued-books`:Clear all issued books(for testing purposes)

Scheduling Notifications
  The application uses `node-schedule` to check for overdue books and send notifications. The scheduler runs daily at midnight for testing purposes, you can change the schedule to run more frequetly.

License
  This project is licensed under the MIT License.
