document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
        alert('Login successful');
        // Redirect to user dashboard or home page
    } else {
        alert(data.message || 'An error occurred');
    }
});

document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    console.log('Attempting to sign up with:', { username, password }); // Log the input values

    const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log('Signup response:', data); // Log the response from the server

    if (response.ok) {
        alert('User created successfully');
        // Redirect to login page
        window.location.href = 'index.html';
    } else {
        alert(data.message || 'An error occurred');
    }
});
