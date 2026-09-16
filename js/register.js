// ==========================================
// PowerWise Register Page
// register.js
// ==========================================

// ---------- Elements ----------

const registerForm = document.getElementById("registerForm");

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const togglePassword = document.getElementById("togglePassword");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

// ==========================================
// Show / Hide Password
// ==========================================

togglePassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.innerHTML =
            '<i class="bi bi-eye-slash-fill"></i>';

    } else {

        password.type = "password";

        togglePassword.innerHTML =
            '<i class="bi bi-eye-fill"></i>';

    }

});

// ==========================================
// Password Strength
// ==========================================

password.addEventListener("input", function () {

    let value = password.value;

    let strength = 0;

    if (value.length >= 8) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[a-z]/.test(value)) strength++;
    if (/[0-9]/.test(value)) strength++;
    if (/[^A-Za-z0-9]/.test(value)) strength++;

    switch (strength) {

        case 0:
        case 1:
            strengthBar.style.width = "20%";
            strengthBar.className = "progress-bar bg-danger";
            strengthText.innerHTML = "Weak Password";
            break;

        case 2:
            strengthBar.style.width = "40%";
            strengthBar.className = "progress-bar bg-warning";
            strengthText.innerHTML = "Fair Password";
            break;

        case 3:
            strengthBar.style.width = "60%";
            strengthBar.className = "progress-bar bg-info";
            strengthText.innerHTML = "Good Password";
            break;

        case 4:
            strengthBar.style.width = "80%";
            strengthBar.className = "progress-bar bg-primary";
            strengthText.innerHTML = "Strong Password";
            break;

        case 5:
            strengthBar.style.width = "100%";
            strengthBar.className = "progress-bar bg-success";
            strengthText.innerHTML = "Very Strong Password";
            break;

    }

});

// ==========================================
// Register
// ==========================================

registerForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let name = document.getElementById("name").value.trim();

    let email = document.getElementById("email").value.trim();

    let phone = document.getElementById("phone").value.trim();

    let pass = password.value.trim();

    let confirm = confirmPassword.value.trim();

    let terms = document.getElementById("terms").checked;

    // Name

    if (name.length < 3) {

        alert("Enter a valid name.");

        return;

    }

    // Email

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        alert("Enter a valid email.");

        return;

    }

    // Phone

    if (!/^[0-9]{10}$/.test(phone)) {

        alert("Phone number must contain exactly 10 digits.");

        return;

    }

    // Password Length

    if (pass.length < 8) {

        alert("Password must contain at least 8 characters.");

        return;

    }

    // Confirm Password

    if (pass !== confirm) {

        alert("Passwords do not match.");

        return;

    }

    // Terms

    if (!terms) {

        alert("Please accept the Terms & Conditions.");

        return;

    }

    // Existing User

    let existingUser =
        JSON.parse(localStorage.getItem("powerwiseUser"));

    if (existingUser && existingUser.email === email) {

        alert("Email already registered.");

        return;

    }

    // Save User

    const user = {

        name: name,

        email: email,

        phone: phone,

        password: pass,

        budget: 3000

    };

    localStorage.setItem(
        "powerwiseUser",
        JSON.stringify(user)
    );

    alert("Registration Successful!");

    window.location.href = "login.html";

});