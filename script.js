// User data simulation
let users = JSON.parse(localStorage.getItem('users')) || [];

function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

// Login functionality
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                console.log('Login successful, redirecting to main page.');
                window.location.href = 'main.html';
            } else {
                console.log('Login failed: incorrect username or password.');
                document.getElementById('login-error').textContent = 'Incorrect username or password.';
            }
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            const username = document.getElementById('signup-username').value;
            const password = document.getElementById('signup-password').value;

            if (username && password) {
                if (users.some(user => user.username === username)) {
                    console.log('Signup failed: username already taken.');
                    document.getElementById('signup-error').textContent = 'Username already taken.';
                } else {
                    users.push({ username, password });
                    saveUsers();
                    console.log('Signup successful.');
                    document.getElementById('signup-success').textContent = 'Signup successful! You can now log in.';
                }
            } else {
                console.log('Signup failed: missing username or password.');
                document.getElementById('signup-error').textContent = 'Please fill out both fields.';
            }
        });
    }

    // Display plans if we're on the main page
    if (document.getElementById('meals') && document.getElementById('workouts')) {
        console.log('Loading meal and workout plans...');
        displayPlans();
    }
});

// Meal and workout data simulation
const mealPlans = {
    Monday: ["Oatmeal with fruits", "Chicken salad", "Grilled salmon with veggies"],
    Tuesday: ["Smoothie bowl", "Quinoa salad", "Turkey wrap"],
    Wednesday: ["Avocado toast", "Veggie wrap", "Chicken stir-fry"],
    Thursday: ["Yogurt and granola", "Pasta with pesto", "Baked chicken with sweet potato"],
    Friday: ["Fruit salad", "Caesar salad", "Beef tacos"],
    Saturday: ["Egg omelet", "Sushi", "Roasted vegetables with tofu"],
    Sunday: ["Pancakes", "Couscous salad", "Homemade pizza"]
};

const workoutPlans = {
    Monday: ["30 min jogging", "20 push-ups", "15 squats"],
    Tuesday: ["Yoga session", "Plank for 1 min", "10 burpees"],
    Wednesday: ["HIIT workout", "30 sec mountain climbers", "20 lunges"],
    Thursday: ["Pilates", "15 tricep dips", "25 crunches"],
    Friday: ["Cycling", "Jumping jacks for 2 min", "15 leg raises"],
    Saturday: ["Strength training", "Deadlifts", "15 bicep curls"],
    Sunday: ["Rest day", "Gentle stretching", "Meditation"]
};

// Function to display the meal and workout plans for the current day
function displayPlans() {
    const dayOfWeek = new Date().toLocaleString('en-US', { weekday: 'long' });
    console.log(`Today is: ${dayOfWeek}`);

    // Get today's meal and workout plans
    const todaysMeals = mealPlans[dayOfWeek];
    const todaysWorkouts = workoutPlans[dayOfWeek];

    if (todaysMeals && todaysWorkouts) {
        console.log('Displaying meal and workout plans...');
        
        // Display meal plans
        const mealsContainer = document.getElementById('meals');
        mealsContainer.innerHTML = `
            <h3>Meals for ${dayOfWeek}</h3>
            <ul>
                <li>Breakfast: ${todaysMeals[0]}</li>
                <li>Lunch: ${todaysMeals[1]}</li>
                <li>Dinner: ${todaysMeals[2]}</li>
            </ul>
        `;

        // Display workout plans
        const workoutsContainer = document.getElementById('workouts');
        workoutsContainer.innerHTML = `
            <h3>Workouts for ${dayOfWeek}</h3>
            <ul>
                ${todaysWorkouts.map(workout => `<li>${workout}</li>`).join('')}
            </ul>
        `;
    } else {
        console.error('Meal or workout plans not found for today.');
    }
}
