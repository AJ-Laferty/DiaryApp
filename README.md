# ThoughtStream - Diary App

A playful, digital journal designed with a mobile first approach that looks great on phones and desktops.

## Group Members

- Emma Eccles
- Aaron Laferty

## Component Overview

- **Header** – Displays the app title, user’s name, and a logout button
- **WeatherWidget** – Renders animated weather icons for a user’s location
- **LoginButton** – Google OAuth login trigger
- **Modal** – Reusable popup overlay for confirming deletes and editing entries
- **NewEntryForm** – Form to add diary entries, including optional image and location
- **DiaryList** – Displays all diary entries; entries can be tapped to expand and edit
- **DiaryEntryCard** – Shows individual diary entry with title, timestamp, and weather
- **Login** – Public login view with Google sign-in
- **Dashboard** – Private dashboard for authenticated users

## Setup Instructions

### Backend Setup

1. Navigate to backend folder and install dependencies.
   ```
    cd thoughtstream-backend
    npm install
   ```
2. Create a .env file, use `.env.example` as an example.
3. Start the backend server.
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend folder and install dependencies.

```
cd thoughtstream-frontend
npm install
```

2. Create a .env file from .env.example
3. Start the frontend server

```
npm run dev
```

4. ThoughtStream should now be running at http://localhost:5173/

## Screenshots

### Login Page (Desktop)

<img src="frontend-images\LoginPage.png" alt="Login Page - Desktop" width="500"/>

### Login Page (Mobile)

<img src="frontend-images\LoginPageMobile.png" alt="Login Page - Mobile" width="250"/>

### Dashboard (Desktop)

<img src="frontend-images\DesktopDashboard.png" alt="Dashboard - Desktop View" width="500"/>

### Entries View (Desktop)

<img src="frontend-images\Entries.png" alt="Expanded Entries - Desktop View" width="500"/>

### Reflection View (Desktop)

<img src="frontend-images\Reflection.png" alt="Reflection Section - Desktop View" width="500"/>

### New Entry Form (Mobile)

<img src="frontend-images\MobileDashboardNewEntry.png" alt="New Entry Form - Mobile View" width="250"/>

### Entry Edit View (Mobile)

<img src="frontend-images\MobileEdit.png" alt="Entry Editing - Mobile View" width="250"/>

### Compact Entries View (Mobile)

<img src="frontend-images\MobileEntriesClosed.png" alt="Compact Entries - Mobile View" width="250"/>

### Image Entry (Mobile)

<img src="frontend-images\MobileImage.png" alt="Image Preview - Mobile View" width="250"/>

## Extra Credit

1. Mobile Responsive Design

- Full responsiveness across screen sizes

2. Image Upload

- The user may attach images to their diary entry via URL
- The image URL undergoes basic validation before being accepted

3. Animated Custom Weather SVGs

- Weather data is displayed with a custom SVG
- The custom weather icons are animated
- If the weather is not supported, the icon defaults to the image from OpenWeather API
- Shadow effect on default images to enhance contrast

4. Custom SVG Favicon

- We designed a cartoon pencil favicon, to reflect the digital journal theme of ThoughtStream

5. Hover Animations

- Subtle animations such as those on hover cards improve interactivity

6. Enhanced Client Side Error Handling

- User-friendly error messages for invalid inputs or failed requests

7. Popup overlay for editing entries

- Editing menu overlay for modifying entries.
