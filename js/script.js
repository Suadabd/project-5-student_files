/*
* Treehouse Techdegree:
* FSJS Project 5 - Public API Requests
* script js */


/// var I'm working with.
let employees = [];
const gallery = document.querySelector('#gallery');
const body = document.querySelector('body');

///** built from code in Tree House 'Working with Fetch API Workshop' */
// parameter: url
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const res = await checkStatus(response);
        return res.json();
    } catch (e) {
        return console.log('Problem', e);
    }
}

//  getting 12 random users from the Random User API source 
fetchData('https://randomuser.me/api/?results=12&nat=us')
    .then(data => {
        employees = data.results
        employees.forEach(employee => {
            const picture = `${employee.picture.large}`
            const name = `${employee.name.first} ${employee.name.last}`
            const email = `${employee.email}`
            const location = `${employee.location.city}, ${employee.location.state}`
            
            displayCard(name, email, location, picture) 
        })
    })


/// Handling potential errors.
///** code from Tree House 'Working with Fetch API Workshop' */
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}


///
/* Helper Functions */
///

/// displays employee information
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
    gallery.insertAdjacentHTML('beforeend', ehtml)
}

/// Modal to display when employee is selected.
/// employee (e)html string is added to the <body><body>
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

    body.insertAdjacentHTML('beforeend', ehtml)
}

/// formating for paramaters: dob: MM/DD/YYYY, phone (XXX) XXX-XXXX, location.
/// used Regex and template literals.
function birthdate(dob) {
    let birthday = dob.date.substr(0,10);
    const regex = /(\d{4})-(\d{2})-(\d{2})/;
    return birthday.replace(regex, '$2/$3/$1')
}

function phoneNumber(phone) {
    const regex = /^\D*(\d{3})\D*(\d{3})-\D*(\d{4})\D*$/;
    return phone.replace(regex, '($1) $2-$3')
}

function addresss(location) {
    return `${location.street.number} ${location.street.name}, ${location.city}, ${location.state} ${location.postcode}`
}

/**************/

function checkClickedEmployee (path, name) {
    let correct = false;     //returns T/F

    path.forEach(element => {
        if (element.className === 'card') {
            if(element.childNodes[3].childNodes[1].textContent === name) {
                correct = true;
            }
        } 
    })
    return correct;
}

/// Event listener responds tp emplyee name 'click'
// .foreach() loops through employee [array]. Modal called if information matches. 
gallery.addEventListener('click', (e) => {
    
    employees.forEach(employee => {
        const picture = `${employee.picture.large}`
        const name = `${employee.name.first} ${employee.name.last}`
        const email = `${employee.email}`
        const city = `${employee.location.city}`
        const number = phoneNumber(employee.phone)
        const address = addresss(employee.location)
        const birthday = birthdate(employee.dob)

        if (checkClickedEmployee(e.path, name)) {
            displayModal(picture, name, email, city, number, address, birthday)
        }
    })
})

/// Event listener for the close button
body.addEventListener('click', (e) => {
    if (e.target.textContent === 'X') {
        var modalContainer = document.querySelector('.modal-container');
        modalContainer.parentNode.removeChild(modalContainer);
    }
})