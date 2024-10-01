# Todo List Application

This project is a simple Todo List application built with authentication and task management functionality. Users can register, log in, manage their todos, and view their profile.

## Features

### 1. User Authentication
- **Registration:**
  - Users can create an account by providing their first name, last name, email, and password.
  - Passwords are validated to match and meet security standards.
  - On successful registration, users are redirected to the login page.
  
- **Login:**
  - Users can log in with their registered email and password.
  - Input validation ensures correct credentials are provided.
  - After logging in, users are redirected to the dashboard.
  
### 2. Route Protection
- **Protected Routes:**
  - Non-authenticated users cannot access protected pages such as the dashboard or profile.
  - Attempting to access these routes will redirect users to the login page.
  
- **Restricted Routes:**
  - Once logged in, users cannot access the login or register pages. These routes become unavailable.
  
### 3. Todo List Management
- **Add Todo:**
  - Users can create new todos with a title and description.
  
- **Update Todo:**
  - Users can update the status of their todos (completed/incomplete).
  
- **Delete Todo:**
  - Users can delete any of their todos.
  
### 4. Profile Page
- Users can view their profile information, including their name, email, and the date their account was created.

### 5. Logout
- Users can log out of the application. Once logged out, they are redirected to the login page.
- Logging out ensures users cannot access protected routes like the dashboard or profile.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sitaramxcube/todo-list.git
   cd todo-list



to create react with typescript
npx create-react-app todo-list --template typescript

to install MUI
npm install @mui/material @emotion/react @emotion/styled

form validation
npm install react-hook-form 

for routing installed react-router-dom latest V-6
npm install react-router-dom

to store the data we used redux
npm install react-redux
npm install @reduxjs/toolkit