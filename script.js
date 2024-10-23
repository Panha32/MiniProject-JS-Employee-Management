let selectedRow = null;

let fullName = document.getElementById("fullName");
let email = document.getElementById("email");
let salary = document.getElementById("salary");
let city = document.getElementById("city");

function validateInput(inputId, errorId) {
    let inputValue = document.getElementById(inputId).value;
    let messageError = document.getElementById(errorId);
    
    if (inputValue === "") {
        messageError.innerHTML = "Please enter data";
        messageError.style.display = "inline-block";
        return false;
    } else {
        messageError.style.display = "none";
    }

    if (inputId === "fullName") {
        const hasNumber = /\d/;
        const isLowerCase = /^[^a-z]/;
        if (hasNumber.test(inputValue)) {   
            messageError.innerHTML = "*Name must not have numbers";
            messageError.style.display = "inline-block";
            return false;
        }
        if (!isLowerCase.test(inputValue)) {
            messageError.innerHTML = "*Name must start with uppercase";
            messageError.style.display = "inline-block";
            return false;
        }
    }

    if (inputId === "email") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(inputValue)) {
            messageError.innerHTML = "*Please enter a valid Email ID";
            messageError.style.display = "inline-block";
            return false;
        }
    }

    if (inputId === "salary") {
        const isNumber = /^\d+$/;
        const startByZero = /^0/;
        if (!isNumber.test(inputValue)) {
            messageError.innerHTML = "*Salary must be numbers that greater than zero";
            messageError.style.display = "inline-block";
            return false;
        }
        if (startByZero.test(inputValue)) {
            messageError.innerHTML = "*Salary can not or start with zero";
            messageError.style.display = "inline-block";
            return false;
        }
    }

    return true;
}

function onFormSubmit() {
    let isFullNameValid = validateInput("fullName", "fullNameValidationError");
    let isEmailValid = validateInput("email", "emailValidationError");
    let isSalaryValid = validateInput("salary", "salaryValidationError");
    let isCityValid = validateInput("city", "cityValidationError");

    if (!isFullNameValid || !isEmailValid || !isSalaryValid || !isCityValid) {
        return;
    }

    if (selectedRow === null) {
        insertNewRecord(fullName.value, email.value, salary.value, city.value);
    } else {
        updateRecord(fullName.value, email.value, salary.value, city.value);
    }

    resetForm();
}

function insertNewRecord(fullName, email, salary, city) {
    let tbody = document.getElementById('tbody');
    let row = tbody.insertRow(0);

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);

    cell1.innerHTML = fullName;
    cell2.innerHTML = email;
    cell3.innerHTML = '$' + salary;
    cell4.innerHTML = city;
    cell5.innerHTML = `
        <a onClick="onEdit(this)"><i class="fa-regular fa-pen-to-square"></i></a>
        <a onClick="onPrint()"><i class="fa-solid fa-print"></i></a>
        <a onClick="onDelete(this)"><i class="fa-regular fa-trash-can"></i></a>
    `;
}

function resetForm() {
    fullName.value = "";
    email.value = "";
    salary.value = "";
    city.value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;

    fullName.value = selectedRow.cells[0].innerHTML;
    email.value = selectedRow.cells[1].innerHTML;
    salary.value = selectedRow.cells[2].innerHTML.replace('$', '');
    city.value = selectedRow.cells[3].innerHTML;
}

function updateRecord(fullName, email, salary, city) {
    selectedRow.cells[0].innerHTML = fullName;
    selectedRow.cells[1].innerHTML = email;
    selectedRow.cells[2].innerHTML = '$' + salary;
    selectedRow.cells[3].innerHTML = city;
}

function onDelete(td) {
    if (confirm('Are you sure you want to delete this record?')) {
        let row = td.parentElement.parentElement;
        row.remove(); 
        resetForm();
    }
}

function onPrint() {
    alert("Sorry, this feature is not available yet");
}

document.querySelector(".form-action-buttons input").addEventListener("click", onFormSubmit);