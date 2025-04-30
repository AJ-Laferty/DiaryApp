/**
* Entry point for the ThoughtStream React frontend
*
* - Initializes and mounts the root React component (<App />) into the DOM
* - Wraps the app in:
* 1. <BrowserRouter> for client-side routing
* 2. <AuthProvider> for global authentication context
* 3. <React.StrictMode> for highlighting potential problems in development
*/
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import "./index.css"; // Global CSS styles
// Select the root DOM node from index.html (must match <div id="root">)
const rootElement = document.getElementById("root");
// Create a root rendering context (React 18+ API)
const root = ReactDOM.createRoot(rootElement);
/**
* The clientId in <GoogleOAuthProvider> is loaded from VITE_GOOGLE_CLIENT_ID
* in your .env file at the root of your frontend project.
* Vite automatically injects env variables during build and development.
*/
// Render the application
root.render(
<React.StrictMode>
<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
{/* Enables route-based navigation without full page reload */}
<BrowserRouter>
{/* Provides authentication context to all components in the app */}
<AuthProvider>
{/* Main application component */}
<App />
</AuthProvider>
</BrowserRouter>
</GoogleOAuthProvider>
</React.StrictMode>
);