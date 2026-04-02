# Quantity Measurement App – Frontend (Vanilla)

**Branch:** `feature/frontend-vanilla-html-css-js`
**Code Link:**
[https://github.com/abhays07/QuantityMeasurementApp-Frontend/tree/feature/frontend-vanilla-html-css-js](https://github.com/abhays07/QuantityMeasurementApp-Frontend/tree/feature/frontend-vanilla-html-css-js)

---

# Vanilla HTML/CSS/JavaScript UI (Frontend Prototype)

## Overview

This branch implements a **pure frontend UI prototype** for the Quantity Measurement Application using **Vanilla HTML, CSS, and JavaScript**.

This version focuses only on:

* UI design
* Client-side functionality
* Static routing
* Interactive calculator
* Form handling with JavaScript

⚠️ This branch **does not connect to backend APIs**.
All logic is handled using **JavaScript on the client side**.

---

# Tech Stack

* HTML5
* CSS3
* Vanilla JavaScript
* SVG Icons
* Modular CSS
* Component-based HTML structure

---

# Project Structure

```
assets
 └── images
      ├── length-icon.svg
      ├── temperature-icon.svg
      ├── volume-icon.svg
      ├── weight-icon.svg
      └── signup-illustrations.svg

components
 └── navbar.html

css
 ├── global.css
 ├── home.css
 ├── login.css
 ├── signup.css
 └── dashboard.css

js
 ├── login.js
 ├── signup.js
 └── dashboard.js

pages
 ├── login.html
 ├── signup.html
 └── dashboard.html

index.html
README.md
```

---

# Pages

## Home Page

```
index.html
```

Features:

* Landing UI
* Navigation to login/signup
* Intro to Quantity Measurement App

---

## Login Page

```
pages/login.html
```

Features:

* Email input
* Password input
* Login validation
* Redirect to dashboard
* JavaScript-based authentication

Handled by:

```
js/login.js
```

---

## Signup Page

```
pages/signup.html
```

Features:

* User registration form
* Input validation
* Password confirmation
* Navigation to login

Handled by:

```
js/signup.js
```

---

## Dashboard Page

```
pages/dashboard.html
```

Features:

* Category selection
* Unit selection
* Quantity input
* Conversion result display
* Operation history UI
* Responsive layout

Handled by:

```
js/dashboard.js
```

---

# Components

Reusable component:

```
components/navbar.html
```

Used for:

* Navigation
* Page linking
* UI consistency

---

# CSS Structure

### Global Styles

```
css/global.css
```

Defines:

* Typography
* Colors
* Layout utilities
* Buttons

---

### Page-specific Styles

```
css/home.css
css/login.css
css/signup.css
css/dashboard.css
```

Each page styled independently for modular design.

---

# JavaScript Functionality

All features handled **client-side**:

### Login Logic

```
js/login.js
```

* Form validation
* Mock authentication
* Redirect to dashboard

---

### Signup Logic

```
js/signup.js
```

* Input validation
* Password matching
* Mock user creation

---

### Dashboard Logic

```
js/dashboard.js
```

* Category selection
* Unit conversion
* Input handling
* Result display
* Operation history

---

# Features Implemented

* Pure HTML/CSS UI
* JavaScript-based logic
* Multi-page navigation
* Login UI
* Signup UI
* Dashboard UI
* Quantity calculator
* Unit category selection
* SVG icon support
* Responsive layout
* Modular CSS architecture
* Component-based navbar
* Client-side validation

---

# Icons

SVG icons stored in:

```
assets/images
```

Icons:

* length-icon.svg
* temperature-icon.svg
* volume-icon.svg
* weight-icon.svg

---

# Functionality (Client-Side Only)

### Login

```
Email + Password → Redirect to Dashboard
```

### Signup

```
Form validation → Redirect to Login
```

### Dashboard

```
Select Category → Enter Value → Show Result
```

---

# Limitations

⚠️ This version:

* No backend integration
* No database
* No real authentication
* No JWT support
* No API calls

This branch is **UI prototype only**.

---

# Future Improvements

* Connect Spring Boot backend
* Add JWT authentication
* Add Google OAuth
* Add API integration
* Add persistent history
* Convert to React (implemented in next branch)

---

# Run Locally

Simply open:

```
index.html
```

or use VS Code Live Server.

---

# Purpose of This Branch

This branch was created to:

* Design UI layout
* Prototype frontend
* Test UX flow
* Build base components
* Prepare for React migration

---
