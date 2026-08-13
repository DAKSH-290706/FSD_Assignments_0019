// DOM MANIPULATION
const form = document.getElementById("studentForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const courseInput = document.getElementById("course");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const courseError = document.getElementById("courseError");

const successMessage = document.getElementById("successMessage");

const studentList = document.getElementById("studentList");


// EVENT HANDLING
form.addEventListener("submit", function(event) {

    // Prevent page refresh
    event.preventDefault();

    // Clear previous errors
    nameError.textContent = "";
    emailError.textContent = "";
    courseError.textContent = "";

    successMessage.style.display = "none";

    let valid = true;


    // FORM VALIDATION

    if (nameInput.value.trim() === "") {

        nameError.textContent = "Please enter your name.";

        valid = false;
    }


    if (emailInput.value.trim() === "") {

        emailError.textContent = "Please enter your email.";

        valid = false;

    } else if (!emailInput.value.includes("@")) {

        emailError.textContent = "Please enter a valid email.";

        valid = false;
    }


    if (courseInput.value === "") {

        courseError.textContent = "Please select a course.";

        valid = false;
    }


    // Stop if validation failed

    if (!valid) {
        return;
    }


    // DYNAMIC UPDATE

    const student = document.createElement("div");

    student.className = "student";

    student.innerHTML = `
        <strong>${nameInput.value}</strong>
        <br>
        ${emailInput.value}
        <br>
        Course: ${courseInput.value}
    `;


    // Add student to the page

    studentList.appendChild(student);


    // Show success message

    successMessage.style.display = "block";


    // Clear form

    form.reset();

});
