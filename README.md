# JWT Authentication Project (Frontend + Express Backend)

This project demonstrates how to implement JSON Web Token (JWT) authentication using an Express.js backend and a simple frontend.  
The application allows users to log in, receive a JWT token, and access protected routes using that token.

---

## 1. Overview

The project consists of two parts:
1. **Frontend:** HTML, CSS, and JavaScript (Fetch API)
2. **Backend:** Node.js and Express.js for handling authentication and JWT verification

---

## 2. Features

- User login and token generation using JWT  
- Secure token verification on protected routes  
- Frontend stores token in local storage  
- Middleware for verifying tokens before accessing protected routes  
- Simple and clean user interface

---

## 3. Technologies Used

- Node.js  
- Express.js  
- JSON Web Token (jsonwebtoken)  
- dotenv     
- HTML, CSS, JavaScript

---


---

## 4. Installation Steps

### Step 1: Clone the Repository
### Step 2:npm init -y
### Step 3:npm install express  dotenv 
### Step 4:PORT=5000
### JWT_SECRET=your_secret_key
### Step 5:users.json File
### Step 6:Run the Backend Server
### Step 7:Frontend Setup
### Step 8:How the Application Works
1.The user enters their username and password on the login page.

2.The frontend sends a POST request to the backend (/login) with these credentials.

3.The backend checks the credentials from users.json.

4.If valid, it generates a JWT token and returns it to the frontend.

5.The frontend stores the token in localStorage.

6.When accessing protected routes, the frontend includes this token in the Authorization header.

7.The backend verifies the token and returns protected content.


