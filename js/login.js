// src/js/login.js

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 1. Fetch users from LocalStorage
    const users = JSON.parse(localStorage.getItem('temp_users')) || [];

    // 2. Find matching user
    const user = users.find(u => u.email === email && u.password === password);

    // Inside your loginForm submit event listener in js/login.js
if (user) {
    localStorage.setItem('isLoggedIn', 'true');
    // Save the specific user who logged in!
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    alert(`Welcome back, ${user.name}!`);
    window.location.href = "dashboard.html"; 
} else {
        alert("Invalid Email or Password. Please try again.");
    }
});

// Mock Google Login for UI testing
function handleGoogleLogin() {
    alert("Google OAuth UI Triggered (Mock). This will be connected to Backend in React Phase.");
}