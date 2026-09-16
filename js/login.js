// =========================================
// PowerWise Login Page
// login.js
// =========================================

// ---------- Show / Hide Password ----------

const password = document.getElementById("password");
const toggleBtn = document.getElementById("togglePassword");

toggleBtn.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";

        toggleBtn.innerHTML =
            '<i class="bi bi-eye-slash-fill"></i>';

    }

    else {

        password.type = "password";

        toggleBtn.innerHTML =
            '<i class="bi bi-eye-fill"></i>';

    }

});

// ---------- Load Remembered Email ----------

window.addEventListener("load", function () {

    const rememberedEmail =
        localStorage.getItem("rememberEmail");

    if (rememberedEmail) {

        document.getElementById("email").value =
            rememberedEmail;

        document.getElementById("remember").checked = true;

    }

});

// ---------- Login ----------

document.getElementById("loginForm")
.addEventListener("submit", function (e) {

    e.preventDefault();

    let email =
        document.getElementById("email").value.trim();

    let password =
        document.getElementById("password").value.trim();

    let remember =
        document.getElementById("remember").checked;

    // Validation

    if (email === "" || password === "") {

        alert("Please fill all fields.");

        return;

    }

    // Get Registered User

    let user =
        JSON.parse(localStorage.getItem("powerwiseUser"));

    if (!user) {

        alert("No account found.\nPlease register first.");

        window.location.href = "register.html";

        return;

    }

    // Check Login

    if (
        email === user.email &&
        password === user.password
    ) {

        if (remember) {

            localStorage.setItem(
                "rememberEmail",
                email
            );

        }

        else {

            localStorage.removeItem(
                "rememberEmail"
            );

        }

        // Current Logged User

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
        );

        alert("Login Successful!");

        window.location.href = "index.html";

    }

    else {

        alert("Invalid Email or Password!");

    }

});