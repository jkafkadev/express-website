/*
Constants
*/

// Refers to Image next to Contacts Table
const image = document.getElementById("locImage");
// Contacts Table
const table = document.getElementById("contactsTable");


/*
Listeners
*/
// Set up event listeners for when a user hovers each row
for (let row of table.querySelectorAll(".contactRow")) {
    row.addEventListener("mouseenter", () => {
        displayLocation(row.querySelector(".rowImg").src);
    });
}
// Event Listener for when mouse leaves table
table.addEventListener("mouseleave", displayDefault);

// Event Listener to sort row by any column
for (let th of table.querySelectorAll("th")) {
    th.addEventListener("click", () => {
        console.log(table.querySelectorAll("th"));
        sortByColumn("." + th.id);
    })
}

/*
Handlers
*/
// change big image's src
function displayLocation(location) {
    image.setAttribute("src", location);
}
// change big image to display default image
function displayDefault() {
    image.setAttribute("src", "images/gophers-mascot.png");
}
// sort table by given column (low to high)
function sortByColumn(column) {
    const rowArray = []
    for (let row of table.querySelectorAll(".contactRow")) {
        rowArray.push(row);
        console.log(row.querySelector(column));
    }
    rowArray.sort((a, b) => {
        if (a.querySelector(column).innerHTML > b.querySelector(column).innerHTML) {
            return 1;
        } else {
            return -1;
        }
    });
    for (let row of rowArray) {
        table.appendChild(row);
    }
}