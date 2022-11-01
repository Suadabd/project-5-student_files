/*
 * Treehouse Techdegree:
 * FSJS Project 5 - Public API Requests
 * script js */

/// var I'm working with.
let employees = [];
const gallery = document.querySelector("#gallery");
const body = document.querySelector("body");
const url = "https://randomuser.me/api/?results=12&nat=us";

//Getting and displaying 12 random users. 
fetch(url)
  .then((response) => response.json()) ///reads res and returns promise that resolves the json 
  .then((response) => {
    buildEmployees(response.results);
    employees = response.results;
    // console.log(employees);
});


// displays employee information.
// html is appended to gallery Div.
function displayCard(name, email, location, picture, index) {
    // console.log(index);
  const ehtml = `
        <div class="card" data-index = ${index}>
            <div class="card-img-container">
                <img class="card-img" src=${picture} alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${name}</h3>
                <p class="card-text">${email}</p>
                <p class="card-text cap">${location}</p>
            </div>
        </div>
     `;
  gallery.insertAdjacentHTML("beforeend", ehtml);
}


// Modal to display when employee is selected.--
// employee (e)html string is appended to the body element. 
function displayModal(index, employees) {
    const data = employees[index];
    console.log(data);
  const ehtml = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src=${data.picture.medium} alt="profile picture">
                    <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                    <p class="modal-text">${data.email}</p>
                    <p class="modal-text cap">${data.location.city}</p>
                    <hr>
                    <p class="modal-text">${data.cell}</p>
                    <p class="modal-text"> ${data.location.street.number} ${data.location.street.name}</p>
                    <p class="modal-text">${data.dob.date.substring(0, 10)}</p>
                </div>
            </div>
        </div>
    `;

  body.insertAdjacentHTML("beforeend", ehtml);
}


function buildEmployees(employeeData){
    let counter = 0;
    // console.log(employeeData);
    employeeData.forEach(aEmployee => {
        displayCard(`${aEmployee.name.first} ${aEmployee.name.last}`, aEmployee.email, aEmployee.location.city , aEmployee.picture.medium, counter);  
        counter++;
        // console.log(displayCard);
    });
    // employees = employeeData;
    // console.log(employees);
 }
 

 ///Setup- Modal Elements 
 const card = document.querySelector(".card");

 
 gallery.addEventListener("click",(e) => {
        // console.log("clicked");
    if (e.target.closest(".card")){
       const card =  e.target.closest(".card");
       const index = Number(card.getAttribute("data-index"));
    //    console.log(card.getAttribute("data-index"));
    //    console.log(index);
       displayModal(index, employees);
    }        
 });

// Event listener for the close button
body.addEventListener("click", (e) => {
    if (e.target.textContent === "X") {
        const modalDiv = document.querySelector(".modal-container");
        // console.log(modalDiv);
     modalDiv.parentNode.removeChild(modalDiv);
    }
    });

