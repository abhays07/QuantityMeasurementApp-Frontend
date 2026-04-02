# Quantity Measurement App – Frontend

**Branch:** `feature/frontend-react`
**Code Link:**
[https://github.com/abhays07/QuantityMeasurementApp-Frontend/tree/feature/frontend-react](https://github.com/abhays07/QuantityMeasurementApp-Frontend/tree/feature/frontend-react)

---

# React Frontend with Authentication & Dashboard (UC-FE-React)

## Overview

This branch implements the **React + TypeScript frontend** for the Quantity Measurement Application.
It integrates with the **Spring Boot backend (UC18)** and supports:

* JWT Authentication
* Google OAuth Login
* Protected Routes
* Quantity Measurement Dashboard
* Operation History
* Reusable UI Components
* Global Notification System
* Form Validation
* Context-based State Management

The frontend is built using **React + TypeScript + Vite + TailwindCSS**.

---

# Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS
* Axios
* React Context API
* JWT Authentication
* Google OAuth Integration
* React Hooks
* Modular Folder Structure

---

# Project Structure

```
frontend
│
├── src
│   ├── components
│   │   ├── auth
│   │   ├── common
│   │   └── dashboard
│   │
│   ├── contexts
│   ├── hooks
│   ├── layouts
│   ├── pages
│   ├── services
│   ├── types
│   ├── utils
│   ├── constants
│   ├── App.tsx
│   └── main.tsx
│
├── public
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

---

# Components

## Auth Components

```
components/auth
```

* AuthContainer.tsx
* AuthTabs.tsx

Handles:

* Login UI
* Signup UI
* OAuth Login
* Form switching

---

## Common Components

```
components/common
```

Reusable UI:

* Button.tsx
* Input.tsx
* Select.tsx
* Card.tsx
* Alert.tsx
* LoadingSpinner.tsx
* NotificationContainer.tsx
* ProtectedRoute.tsx
* ErrorBoundary.tsx

---

## Dashboard Components

```
components/dashboard
```

* CalculatorCard.tsx
* CategoryPicker.tsx
* QuantityInput.tsx
* ResultDisplay.tsx
* HistorySection.tsx

Features:

* Unit selection
* Quantity input
* Result display
* Operation history

---

# Pages

```
pages
```

* Home.tsx
* Login.tsx
* Signup.tsx
* Dashboard.tsx
* OAuthCallback.tsx

---

# Contexts

```
contexts
```

* AuthContext.tsx
* NotificationContext.tsx

Handles:

* Authentication state
* User session
* Global alerts
* Toast notifications

---

# Hooks

```
hooks
```

* useAuth.ts
* useApi.ts
* useForm.ts
* useNotification.ts

Provides:

* API abstraction
* Form handling
* Auth management
* Notification handling

---

# Services

```
services
```

* api.ts

Handles:

* Axios instance
* API calls
* JWT token injection
* Backend communication

---

# Utils

```
utils
```

* jwt.ts
* validation.ts
* formValidation.ts
* errors.ts

Responsibilities:

* Token storage
* Form validation
* Error formatting

---

# Authentication Flow

```
User Login
   ↓
AuthContext
   ↓
JWT Token Stored
   ↓
ProtectedRoute
   ↓
Dashboard Access
```

---

# Google OAuth Flow

```
User clicks Google Login
        ↓
Backend OAuth
        ↓
OAuthCallback.tsx
        ↓
JWT Token stored
        ↓
Redirect to Dashboard
```

---

# Features Implemented

* React + TypeScript frontend
* JWT Authentication
* Google OAuth Login
* Protected Routes
* Quantity Calculator UI
* Unit Category Selection
* Operation History UI
* Reusable component architecture
* Context-based auth state
* Notification system
* Form validation
* Axios API service
* Error handling
* Tailwind responsive UI

---

# API Integration

Frontend connects to backend:

```
/api/v1/quantities/compare
/api/v1/quantities/convert
/api/v1/quantities/add
/api/v1/quantities/subtract
/api/v1/quantities/history
```

JWT automatically attached via Axios interceptor.

---

# Protected Routes

```
/dashboard
```

Requires authentication using:

```
ProtectedRoute.tsx
```

---

# Example UI Flow

### Login

```
Login Page → JWT → Dashboard
```

### Google Login

```
Google OAuth → Callback → Token → Dashboard
```

### Calculator

```
Select Category → Input Quantity → Calculate → Show Result
```

---

# Environment Variables

Create `.env` file:

```
VITE_API_BASE_URL=http://localhost:8080
```

---

# Run Locally

Install dependencies

```
npm install
```

Run frontend

```
npm run dev
```

Build

```
npm run build
```

---

# Folder Responsibilities

| Folder     | Purpose          |
| ---------- | ---------------- |
| components | Reusable UI      |
| pages      | Route pages      |
| contexts   | Global state     |
| hooks      | Custom hooks     |
| services   | API calls        |
| utils      | Helper functions |
| types      | TypeScript types |

---

# Authentication Handling

JWT stored in:

```
localStorage
```

Injected into headers:

```
Authorization: Bearer <token>
```

---

# Key Features

### Authentication

JWT + Google OAuth

### Dashboard

Quantity measurement UI

### History

User operation history

### Notifications

Global alert system

### Protected Routes

Secure dashboard access

---

# Future Improvements

* Refresh token support
* Role-based UI
* Dark mode
* Charts for history
* Mobile optimization

---
