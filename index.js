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


// Function to handle removal of exercise log
function removeExercise(event) {
    const listItem = event.target.closest("li");
    if (listItem) {
        listItem.remove();
       
        const logId = listItem.dataset.logId; 
        deleteExerciseLog(logId); 
    }
}

// Function to delete exercise log from the server
function deleteExerciseLog(logId) {
    const configurationObject = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    };

    fetch(`http://localhost:3000/exercise-log/${logId}`, configurationObject)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to delete exercise log.");
            }
            console.log("Exercise log deleted successfully.");
        })
        .catch(error => {
            console.error("Error deleting exercise log:", error);
            alert("Failed to delete exercise log. Please try again later.");
        });
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

    // Update exercise log on the frontend
    updateExerciseLog(formData);

    // Save exercise log to the server
    saveExerciseLog(formData);
}

// Function to update the exercise log displayed on the page
function updateExerciseLog(formData) {
    const exerciseLog = document.getElementById("exerciseLog");
    const listItem = document.createElement("li");
    listItem.textContent = formData.exercise + " - " + formData.duration + " minutes";
    listItem.dataset.logId = formData.id; 
    // Add event listener to handle removal of exercise log
    listItem.addEventListener("click", removeExercise);
    exerciseLog.appendChild(listItem);

    // Clear the input fields after adding exercise
    document.getElementById("exercise").value = "";
    document.getElementById("duration").value = "";
}

// Function to save exercise log to the server
function saveExerciseLog(formData) {
    const configurationObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(formData)
    };

    fetch("http://localhost:3000/exercise-log", configurationObject)
        .then(response => {
            
            return response.json();
        })
        .then(data => {
            console.log("Exercise log saved successfully:", data);
        })
        
}

// Function to fetch exercise log from the server
function fetchExerciseLog() {
    fetch("http://localhost:3000/exercise-log")
        .then(response => response.json())
        .then(exerciseLog => {
            exerciseLog.forEach(log => {
                updateExerciseLog(log);
            });
        })
        .catch(error => {
            console.error("Error fetching exercise log:", error);
        });
}

// Add event listener to the "Add Exercise" button
document.getElementById("addExerciseButton").addEventListener("click", addExercise);

// Fetch exercise log when the page is loaded
document.addEventListener("DOMContentLoaded", fetchExerciseLog);





