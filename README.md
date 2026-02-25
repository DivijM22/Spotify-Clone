# Spotify Dashboard – OAuth Login, Access Token Refresh, and Track Search

This project is a full-stack Spotify integration built with React and Node.js. It allows users to authenticate with their Spotify account, automatically refresh expired access tokens, and search for tracks using the Spotify Web API. It demonstrates the complete OAuth 2.0 Authorization Code Flow, along with real-time token handling on the frontend and secure credential management on the backend.

> **Note:** This is a learning/demo project. It does not use a database and stores tokens in `localStorage`, which is not secure for production environments.

---

## Features

### **Spotify OAuth Login**
The user is redirected to Spotify’s login page and grants permissions defined by the application scopes.  
The backend then exchanges the authorization code for:

- `accessToken`
- `refreshToken`
- `expiresIn` (validity period)

---

### **Automatic Access Token Refresh**
- The frontend stores the token expiration timestamp and refresh token.
- A timer refreshes the access token **60 seconds before expiration**.
- The refresh mechanism works even after page reloads.
- Users remain logged in until they choose to log out.

---

### **Track Search**
- Debounced search (250ms) to prevent unnecessary requests.
- Uses Spotify’s `/search` endpoint.
- Displays track results in an interactive dashboard interface.

---

### **Node.js Backend**
Handles Spotify OAuth and all sensitive operations.  
Key responsibilities:

- Redirect users to Spotify (`/login`)
- Exchange authorization code for tokens (`/callback`)
- Refresh access tokens (`/refresh`)
- Search for tracks (`/search`)

Technologies used:

- `express`
- `spotify-web-api-node`
- `dotenv`
- `cors`

Sensitive Spotify credentials are kept in environment variables.

---

### **React Frontend**
Manages application state and communication with the backend:

- Stores and updates access tokens, refresh tokens, and expiration times.
- Implements automatic token refresh with React hooks.
- Uses `localStorage` to persist session data.
- Handles errors gracefully and logs the user out on refresh failure.

Technologies used:

- React (Vite)
- Axios
- React Hooks (`useState`, `useEffect`)

---

## Tech Stack

**Frontend**
- React (Vite)
- Axios
- React Hooks

**Backend**
- Node.js
- Express.js
- spotify-web-api-node
- dotenv
- CORS

---

## What I learned From This Project

- How to implement OAuth 2.0 Authorization Code Flow  
- How to exchange authorization codes for tokens  
- How to refresh access tokens programmatically  
- How to manage token expiration on the frontend  
- How to secure sensitive backend credentials with environment variables  
- How to structure a full-stack JavaScript application  
- How to interact with a third-party API (Spotify Web API)

## Project Structure

  ```
  project/
   ├── client/         # React frontend
   ├── server/         # Express backend
   │   ├── server.js
   │   ├── .env
   │   └── package.json
   ├── README.md
   └── .gitignore
  ```


