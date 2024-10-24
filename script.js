document.addEventListener('DOMContentLoaded', () => {
    // Show sign-up form
    document.getElementById('show-signup').addEventListener('click', () => {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('signup-container').style.display = 'block';
    });

    // Show login form
    document.getElementById('show-login').addEventListener('click', () => {
        document.getElementById('signup-container').style.display = 'none';
        document.getElementById('login-container').style.display = 'block';
    });

    // Handle login
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        loginUser(username, password);
    });

    // Handle sign-up
    document.getElementById('signup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;
        signupUser(username, password);
    });
});

async function loginUser(username, password) {
    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            loadMainContent();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Error logging in');
    }
}

async function signupUser(username, password) {
    try {
        const response = await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Sign-up successful! You can now log in.');
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error signing up:', error);
        alert('Error signing up');
    }
}

function loadMainContent() {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('main-container').style.display = 'block';
    loadMealAndWorkout();
}

function getCurrentDay() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    return days[today.getDay()];
}

async function loadMealAndWorkout() {
    const day = getCurrentDay();
    const token = localStorage.getItem('token');

    if (!token) {
        alert('You must be logged in to view this content.');
        return;
    }

    try {
        const mealResponse = await fetch(`http://localhost:5000/api/meals/${day}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const mealData = await mealResponse.json();

        const workoutResponse = await fetch(`http://localhost:5000/api/workouts/${day}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const workoutData = await workoutResponse.json();

        displayMeals(mealData.meals);
        displayWorkouts(workoutData.workouts);

    } catch (error) {
        console.error('Error loading data:', error);
        alert('Error loading meal and workout plans');
    }
}

function displayMeals(meals) {
    const mealContainer = document.getElementById('meal-plan-content');
    mealContainer.innerHTML = `
        <h3>Today's Meals</h3>
        <ul>
            ${meals.map(meal => `<li>${meal}</li>`).join('')}
        </ul>
    `;
}

function displayWorkouts(workouts) {
    const workoutContainer = document.getElementById('workout-plan-content');
    workoutContainer.innerHTML = `
        <h3>Today's Workouts</h3>
        <ul>
            ${workouts.map(workout => `<li>${workout}</li>`).join('')}
        </ul>
    `;
}
