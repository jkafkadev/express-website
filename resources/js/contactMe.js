/*
Constants
*/
const email = document.getElementById("formEmail");
const concern = document.getElementById("concern");
/*
Event Listeners
*/
email.addEventListener("blur", () => {
    const username = document.getElementById("formUsername");
    if (username.value == "") {
        const newUsername = email.value.substring(0, email.value.indexOf("@"));
        username.value = newUsername;
    }
});

concern.addEventListener("change", () => {
    document.getElementById("formRight").style.display = "block";
});
document.getElementById("question").addEventListener("change", clearDiv);
document.getElementById("comment").addEventListener("change", clearDiv);

function clearDiv() {
    document.getElementById("formRight").style.display = "none";
}