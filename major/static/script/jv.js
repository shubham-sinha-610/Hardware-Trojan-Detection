document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginContainer = document.querySelector('.login-container');
    const mainContainer = document.getElementById('mainContainer');
    const loginMessage = document.getElementById('loginMessage');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = loginForm.elements.username.value;
        const password = loginForm.elements.password.value;

        // For demonstration purposes, simply check if username and password are not empty
        if (username && password) {
            // Hide login container and display main content
            loginMessage.textContent = '';
            loginForm.reset();
            loginContainer.style.display = 'none';
            mainContainer.style.display = 'block';
        } else {
            // Display error message if username or password is empty
            loginMessage.textContent = 'Please enter both username and password.';
        }
    });

    // Rest of the code remains the same...

});