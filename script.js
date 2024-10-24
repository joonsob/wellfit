// Meal and workout options for each part of the day
const schedule = {
  monday: {
    breakfast: ["Oatmeal with fruits", "Greek yogurt with granola", "Smoothie bowl"],
    lunch: ["Grilled chicken salad", "Turkey wrap", "Quinoa and veggie bowl"],
    dinner: ["Baked salmon with veggies", "Stir-fried tofu with rice", "Spaghetti with tomato sauce"],
    workout: ["Morning Yoga", "Cardio (30 minutes)", "Strength Training (Upper Body)"]
  },
  tuesday: {
    breakfast: ["Scrambled eggs with avocado", "Banana pancakes", "Fruit and nut parfait"],
    lunch: ["Veggie sandwich", "Chicken Caesar salad", "Lentil soup"],
    dinner: ["Stuffed bell peppers", "Roast chicken with potatoes", "Pasta primavera"],
    workout: ["HIIT Workout", "Cycling (45 minutes)", "Pilates"]
  },
  wednesday: {
    breakfast: ["Chia seed pudding", "Whole grain toast with peanut butter", "Fruit smoothie"],
    lunch: ["Black bean burger", "Caprese salad", "Zucchini noodles"],
    dinner: ["Grilled shrimp tacos", "Vegetable stir-fry", "Beef stew"],
    workout: ["Zumba", "Swimming (30 minutes)", "Full-body workout"]
  },
  thursday: {
    breakfast: ["Avocado toast with eggs", "Breakfast burrito", "Cottage cheese with berries"],
    lunch: ["Spinach salad with feta", "Turkey and cheese sandwich", "Minestrone soup"],
    dinner: ["Lemon herb chicken", "Stuffed mushrooms", "Baked tilapia"],
    workout: ["Kickboxing", "Running (3 miles)", "Yoga"]
  },
  friday: {
    breakfast: ["Fruit and yogurt parfait", "Overnight oats", "Egg white omelet"],
    lunch: ["Asian chicken salad", "Tuna salad", "Pasta salad"],
    dinner: ["Grilled steak with asparagus", "Vegetable curry", "Mushroom risotto"],
    workout: ["Dance class", "HIIT training", "Core workout"]
  },
  saturday: {
    breakfast: ["Pancakes with syrup", "Smoothie bowl", "Egg and veggie scramble"],
    lunch: ["Grilled veggie wrap", "Chicken quinoa salad", "Caprese sandwich"],
    dinner: ["BBQ chicken with corn", "Fish tacos", "Vegetable paella"],
    workout: ["Cycling (60 minutes)", "Outdoor hiking", "Bodyweight exercises"]
  },
  sunday: {
    breakfast: ["French toast", "Breakfast smoothie", "Yogurt with granola"],
    lunch: ["Mediterranean salad", "Roasted vegetable sandwich", "Chicken soup"],
    dinner: ["Roast beef with veggies", "Vegetable stir-fry with tofu", "Spaghetti Bolognese"],
    workout: ["Rest day", "Light stretching", "Walk in the park"]
  }
};

// Function to get the current day
function getCurrentDay() {
  const now = new Date();
  const dayIndex = now.getDay(); // Sunday - 0, Monday - 1, ..., Saturday - 6
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  return days[dayIndex];
}

// Function to select a random item from a list
function getRandomItem(list) {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

// Function to get random meals and workout for the current day
function getRandomPlan() {
  const currentDay = getCurrentDay();
  const dailySchedule = schedule[currentDay];

  if (dailySchedule) {
    const breakfast = getRandomItem(dailySchedule.breakfast);
    const lunch = getRandomItem(dailySchedule.lunch);
    const dinner = getRandomItem(dailySchedule.dinner);
    const workout = getRandomItem(dailySchedule.workout);

    return { breakfast, lunch, dinner, workout };
  } else {
    return null;
  }
}

// Function to display current meals and workout
function showCurrentPlan() {
  const currentPlan = getRandomPlan();
  const mealPlanContent = document.getElementById('meal-plan-content');
  const workoutPlanContent = document.getElementById('workout-plan-content');

  if (currentPlan) {
    mealPlanContent.innerHTML = `
      <h3>Today's Meals</h3>
      <p><strong>Breakfast:</strong> ${currentPlan.breakfast}</p>
      <p><strong>Lunch:</strong> ${currentPlan.lunch}</p>
      <p><strong>Dinner:</strong> ${currentPlan.dinner}</p>
    `;

    workoutPlanContent.innerHTML = `
      <h3>Today's Workout</h3>
      <p>${currentPlan.workout}</p>
    `;
  } else {
    mealPlanContent.innerHTML = `<p>No meal plan available for today.</p>`;
    workoutPlanContent.innerHTML = `<p>No workout plan available for today.</p>`;
  }
}

// Function to display the meal and workout plans after login
function displayPlans() {
  document.getElementById('login-container').style.display = 'none';
  document.getElementById('signup-container').style.display = 'none';
  document.getElementById('meal-plans').style.display = 'block';
  document.getElementById('workouts').style.display = 'block';
  showCurrentPlan();
}

// Event listener for the login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Check if user exists
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    displayPlans();
  } else {
    alert('Invalid username or password');
  }
});

// Event listener for the signup button
document.getElementById('signup-button').addEventListener('click', function() {
  document.getElementById('login-container').style.display = 'none';
  document.getElementById('signup-container').style.display = 'block';
});

// Event listener for the signup form submission
document.getElementById('signup-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const newUsername = document.getElementById('new-username').value;
  const newPassword = document.getElementById('new-password').value;

  // Check if username already exists
  const users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.find(user => user.username === newUsername)) {
    alert('Username already exists');
  } else {
    users.push({ username: newUsername, password: newPassword });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created successfully. You can now log in.');
    document.getElementById('signup-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
  }
});

// Function to call when the page loads
window.onload = function() {
  // Check if user is already logged in (optional: implement session persistence)
  const username = localStorage.getItem('loggedInUser');
  if (username) {
    displayPlans();
  }
};
