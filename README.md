# Express.js API Collection

This repository contains a collection of Node.js and Express.js RESTful APIs. It serves as a showcase of various backend development concepts, including routing, CRUD operations, authentication, and database interactions.

## Projects Included

The repository contains several independent API projects:

*   **College API (`server.js`)**: A simple REST API built in the root directory that manages a list of colleges. It features user registration, password hashing using `bcrypt`, and route protection using `passport-local` authentication.
*   **Hotel API (`HotelApi/`)**: Backend service for hotel management.
*   **Auth API (`authapi/`)**: Project focusing on user authentication flows.
*   **Chat App (`chatapp/`)**: Backend for a real-time chat application.
*   **Employee CRUD API (`crude-employ-api/` / `employ/`)**: APIs for managing employee records.
*   **Hospital API (`hosptilapi/`)**: Backend service for hospital management.
*   **Library Management (`labirymanagement/`)**: API for managing books and library operations.
*   **Login App (`loginapp/`)**: Application demonstrating login functionality.
*   **Restaurant API (`restaurantapi/`)**: Backend service for a restaurant.
*   **Supabase Project (`superbase/`)**: Project integrating with Supabase.
*   **User CRUD App (`usercrudeappusingscoate/`)**: Another user management API.

## Features Demonstrated

Across these projects, various backend skills are demonstrated:
*   **RESTful Routing**: Handling GET, POST, PUT, and DELETE requests.
*   **Authentication**: Implementing local strategy authentication using Passport.js and JWT.
*   **Security**: Password hashing with bcrypt.
*   **Middleware**: Custom request logging and route protection middleware.
*   **In-Memory & Persistent Storage**: Working with arrays for quick prototyping and external databases.

## Getting Started

To run any of the projects, you generally need to:

1.  Navigate to the specific project directory (or stay in the root for the College API).
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    node server.js 
    # or npm start / npm run dev depending on the project setup
    ```

For the root College API, it runs on port `4000` by default.

## Note
This repository is a great collection of learning projects demonstrating fundamental and intermediate backend development skills using the Express.js framework.
