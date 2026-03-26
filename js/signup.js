document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Capture Data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const mobile = document.getElementById('mobile').value.trim();

    // 2. Validation Rules
    if (!validateSignup(name, email, password, mobile)) {
        return; // Stop if validation fails
    }

    // 3. Create User Object
    const newUser = {
        name,
        email,
        password, // In real apps, we never store plain text, but okay for this UI phase
        mobile
    };

    // 4. Temporary Local Storage Logic
    let users = JSON.parse(localStorage.getItem('temp_users')) || [];
    
    const exists = users.find(u => u.email === email);
    if(exists) {
        alert("This email is already registered! Please go to Login.");
        return;
    }

    users.push(newUser);
    localStorage.setItem('temp_users', JSON.stringify(users));

    alert("Registration Successful! Redirecting to Login...");
    window.location.href = "login.html";
});

/**
 * Validation Logic Function
 */
function validateSignup(name, email, password, mobile) {
    // Name Validation
    if (name.length < 3) {
        alert("Name must be at least 3 characters long.");
        return false;
    }

    // Email Regex Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // PASSWORD RULES:
    // 1. Minimum 8 characters
    // 2. At least one uppercase letter
    // 3. At least one number
    // 4. At least one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!passwordRegex.test(password)) {
        alert("Password Requirements:\n- Minimum 8 characters\n- One uppercase letter\n- One number\n- One special character (@$!%*?&)");
        return false;
    }

    // Mobile Validation (Basic 10 digit check)
    if (mobile !== "" && !/^\d{10}$/.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        return false;
    }

    return true;
}