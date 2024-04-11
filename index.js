//login form
let loginform = document.querySelector('.login-form');
let navbar = document.querySelector('.navbar');


document.querySelector('#login-btn').onclick = () =>{
    loginform.classList.toggle('active');
    navbar.classList.remove('active');
}

document.querySelector('#menu').onclick = () =>{
    navbar.classList.toggle('active');
    loginform.classList.remove('active');
}


// Function to handle adding exercise
function addExercise() {
    const exerciseInput = document.getElementById("exercise");
    const durationInput = document.getElementById("duration");

    const exerciseValue = exerciseInput.value.trim();
    const durationValue = durationInput.value.trim();

    if (!exerciseValue.match(/^[a-zA-Z\s]+$/)) {
        alert("Exercise must contain only letters.");
        return;
    }

    if (exerciseValue === "" || durationValue === "") {
        alert("Please enter both exercise and duration.");
        return;
    }

    const formData = {
        exercise: exerciseValue,
        duration: durationValue
    };

    const configurationObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(formData)
    };

    fetch("http://localhost:3000/logs", configurationObject)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(function(data) {
            console.log("Exercise added successfully:", data);
            updateExerciseLog(formData); // Update exercise log on success
        })
        .catch(function(error) {
            console.error("Error adding exercise:", error);
            alert("Failed to add exercise. Please try again later.");
        });
}

// Function to update the exercise log displayed on the page
function updateExerciseLog(formData) {
    const exerciseLog = document.getElementById("exerciseLog");
    const listItem = document.createElement("li");
    listItem.textContent = formData.exercise + " - " + formData.duration + " minutes";
    exerciseLog.appendChild(listItem);

    // Clear the input fields after adding exercise
    document.getElementById("exercise").value = "";
    document.getElementById("duration").value = "";
}

// Add event listener to the "Add Exercise" button
document.getElementById("addExerciseButton").addEventListener("click", addExercise);



