// app.js - General application logic for the Quiz Generator

// Function to handle the login process
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple admin authentication (for demo purposes only)
    if (username.toLowerCase() === 'admin' && password === 'admin123') {
        // Redirect to admin page
        window.location.href = 'admin.html';
    } else {
        // Store the username for the user experience
        localStorage.setItem('currentUser', username);
        localStorage.setItem('isLoggedIn', 'true');

        // If we're already on the user page, just refresh the UI
        if (window.location.pathname.includes('user.html')) {
            updateUserUI();
            closeModal();
        } else {
            // Redirect to user page
            window.location.href = 'user.html';
        }
    }
}

// Function to handle anonymous access
function handleAnonymousAccess() {
    // Clear any existing user data
    localStorage.removeItem('currentUser');
    localStorage.setItem('isLoggedIn', 'false');

    // Redirect to user page
    window.location.href = 'user.html';
}

// Function to handle logout
function handleLogout() {
    // Clear user data
    localStorage.removeItem('currentUser');
    localStorage.setItem('isLoggedIn', 'false');

    // Redirect to home page
    window.location.href = 'index.html';
}

// Function to update the user interface based on login status
function updateUserUI() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentUser = localStorage.getItem('currentUser');

    const userDisplay = document.getElementById('userDisplay');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (userDisplay && loginBtn && logoutBtn) {
        if (isLoggedIn && currentUser) {
            // User is logged in
            userDisplay.textContent = currentUser;
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
        } else {
            // User is anonymous
            userDisplay.textContent = getTranslation('anonymous-user') || 'Anonymous';
            loginBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
        }
    }
}

// Function to open the login modal
function openModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Function to close the login modal
function closeModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Handle anonymous access button
    const startAnonymousBtn = document.getElementById('startAnonymousBtn');
    if (startAnonymousBtn) {
        startAnonymousBtn.addEventListener('click', handleAnonymousAccess);
    }

    // Handle login button click
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', openModal);
    }

    // Handle logout button click
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Handle modal close button click
    const closeModalBtn = document.querySelector('.close-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('loginModal');
        if (event.target === modal) {
            closeModal();
        }
    });

    // Update UI based on login status
    updateUserUI();
});
