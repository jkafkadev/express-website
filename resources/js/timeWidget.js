const endOfSem = new Date (2022 , 11, 22);
function timeUntil(date) {
    const retVal = {
        "days": 0,
        "hours": 0,
        "minutes": 0,
        "seconds": 0
    }
    let today = date.getTime();
    let endDate = endOfSem.getTime();
    let timeLeft = endDate - today;
    retVal.days = Math.floor(timeLeft / 86400000);
    let remainder = timeLeft % 86400000;
    retVal.hours = Math.floor(remainder / 3600000);
    remainder %= 3600000;
    retVal.minutes = Math.floor(remainder / 60000);
    remainder %= 60000;
    retVal.seconds = Math.floor(remainder / 1000);


    return retVal;
}

function showTime() {
    setInterval(function() {
        let date = timeUntil(new Date());
        let txt = document.getElementById("timeLeft");
        txt.innerText = date.days + " Days " + date.hours + " Hours "
                    + date.minutes + " Minutes " + date.seconds + " Seconds";
    }, 1000);
}
showTime();