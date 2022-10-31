/*
 * Treehouse Techdegree:
 * FSJS Project 5 - Public API Requests
 * script js */

/// var I'm working with.
let employees = [];
const gallery = document.querySelector("#gallery");
const body = document.querySelector("body");
const url = "https://randomuser.me/api/?results=12&nat=us";


fetch(url)
  .then((response) => response.json()) ///reads res and returns promise that resolves the json 
  .then((response) => buildEmployees(response.results));
 /// 1 func for card and one for model



// helper function 
// displays employee information
function displayCard(name, email, location, picture) {
  const ehtml = `
        <div class="card">
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
// employee (e)html string is added to the <body><body>
function displayModal(picture, name, email, city, number, address, birthday) {
  const ehtml = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src=${picture} alt="profile picture">
                    <h3 id="name" class="modal-name cap">${name}</h3>
                    <p class="modal-text">${email}</p>
                    <p class="modal-text cap">${city}</p>
                    <hr>
                    <p class="modal-text">${number}</p>
                    <p class="modal-text">${address}</p>
                    <p class="modal-text">${birthday}</p>
                </div>
            </div>
        </div>
    `;

  body.insertAdjacentHTML("beforeend", ehtml);
}

function buildEmployees(employeeData){
    // console.log(employeeData);
    employeeData.forEach(aEmployee => {
        displayCard(`${aEmployee.name.first} ${aEmployee.name.last}`, aEmployee.email, aEmployee.location.city , aEmployee.picture.medium);  
        // console.log(displayCard);
    });
 }
 

 ///Setup- Modal Elements 
//  const modelButton = getElementById("modal-close-btn");
 const modalDiv = document.getElementsByClassName(".modal");
 const card = document.querySelector(".card");




//  function todo (){
//    gallery.addEventListener("click", (e) => {
//     card.style.display = "block";
//    }

//    );
//  }






//  //listen for open 
//  modelButton.addEventListener('click', (e) 
//  function c displayCard(){
//     modalDiv.style.display = "block";}
//  )

//  gallery.addEventListener("click",(e) => {
//     const card = document.querySelector(".card");
//     console.log();
//         if (card.clicked === true) {
           
//         }
        
       
       













        // const modal = document.querySelector(".modal-container");
        // modal.style.display = 'none';
        // // if (card === 'X'){
    
    
 
 
//  gallery.addEventListener("click",(e) =>{
//     if (e.target !== gallery)
//     // const modal = document.querySelector(".modal-container");
//     // modal.style.display = 'none';
//     // // if (card === 'X'){

//     }

//  );
// gallery.addEventListener("click",(e) =>{
//     const card = document.querySelector(".card");
// if (con) {
//     displayCard();

// }
// console.log(con);
// });


// // Event listener for the close button
// body.addEventListener("click", (e) => {
//   if (e.target.textContent === "X") {
//     var modalContainer = document.querySelector(".modal-container");
//     modalContainer.parentNode.removeChild(modalContainer);
//   }
// });

// //mine
// // Event listener for the close button
// const x = body.addEventListener("click", (e) => {
//     if ('click' === card) {
//       var modalContainer = document.querySelector(".modal-container");
//       modalContainer.parentNode.removeChild(modalContainer);
//     }
//   });
//   console.log(x);