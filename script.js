if (window.location.search === "?date=") {
    var date = new Date();
    var dd = date.getDate();
    var mon = date.getMonth() + 1;
    var year = date.getFullYear();
    if (mon < 10)
        mon = "0" + mon;
    if (dd < 10)
        dd = "0" + dd;
    var today = year + "-" + mon + "-" + dd;
    window.location.search = window.location.search + today;
}
var tempToGlobal;
var temp = window.location.search.replace('date', '');
var temp1 = temp.replace('?', '');
var temp2 = temp1.replace('=', '');
var temp2 = temp2.split("-");

const monthsShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let prevAndNextMonth = [];
function displayCalendar(monthClicked, year = temp2[0] || dateNow.getFullYear()) {

    for (i = 0; i < monthsShortNames.length; i++) {

        if (monthClicked === monthsShortNames[i]) {

            document.getElementById(monthClicked).style.border = "2px solid red";
            prevAndNextMonth.push(monthClicked);

            monthClicked = i + 1;


        }
    }

    var htmlContent = "";
    var FebNumberOfDays = "";
    var counter = 1;


    var dateNow = new Date();
    if (temp2[1][0] === "0") {

        temp2[1] = temp2[1].substr(1);
    // console.log(temp2[1]);
    }
    var month = monthClicked - 1 || temp2[1] - 1 || dateNow.getMonth();




    var nextMonth = month + 1; 
    var prevMonth = month - 1;
    if (temp2[2][0] === "0") {

        temp2[2] = temp2[2].substr(1);

    }
    var day = temp2[2] || dateNow.getDate();
    //Feb  
    if (month == 1) {
        if ((year % 100 != 0) && (year % 4 == 0) || (year % 400 == 0)) {
            FebNumberOfDays = 29;
        } else {
            FebNumberOfDays = 28;
        }
    }


    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
    var dayPerMonth = ["31", "" + FebNumberOfDays + "", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"]
    var nextDate = new Date(nextMonth + ' 1 ,' + year);
    var weekdays = nextDate.getDay();
    var weekdays2 = weekdays
    var numOfDays = dayPerMonth[month];

    while (weekdays > 0) {
        htmlContent += "<td class='monthPre'></td>";
        weekdays--;
    }
    while (counter <= numOfDays) {
        if (weekdays2 > 6) {
            weekdays2 = 0;
            htmlContent += "</tr><tr>";
        }
        if (counter == day) {
            htmlContent += "<td class='dayNow'  onMouseOver='this.style.background=\"#FF0000\"; this.style.color=\"#FFFFFF\"' " +
                "onMouseOut='this.style.background=\"#FFFFFF\"; this.style.color=\"#00FF00\"'>" + counter + "</td>";
        } else {
            htmlContent += "<td class='monthNow' onMouseOver='this.style.background=\"#FF0000\"'" +
                " onMouseOut='this.style.background=\"#FFFFFF\"'>" + counter + "</td>";

        }

        weekdays2++;
        counter++;
    }
    var calendarBody = "<table class='calendar'> <tr class='monthNow'><th colspan='7'>"
        + "Days" + "</th></tr>";
    calendarBody += "<tr class='dayNames'>  <td>Su</td>  <td>Mo</td> <td>Tu</td>" +
        "<td>We</td> <td>Th</td> <td>Fr</td> <td>Sa</td> </tr>";
    calendarBody += "<tr>";
    calendarBody += htmlContent;
    calendarBody += "</tr></table>";
    document.getElementById("calendar").innerHTML = calendarBody;

}



function displayYear() {

    var temp = window.location.search.replace('date', '');
    var temp1 = temp.replace('?', '');
    var temp2 = temp1.replace('=', '');
    var temp2 = temp2.split("-");


    document.getElementById("first").innerHTML = temp2[0];
    document.getElementById("secound").innerHTML = temp2[0] - 1 + 1 + 1;

    tempToGlobal = temp2[1];

}



displayYear();
const clickedMonth = monthsShortNames[tempToGlobal[1] - 1];

function firstClick() {



    if (performance.navigation.type == 1) {
        document.getElementById(prevAndNextMonth[0] || clickedMonth).style.border = "none";
        prevAndNextMonth.shift();
        prevAndNextMonth.shift();
    }



    for (i = 0; i < monthsShortNames.length; i++) {
        if (clickedMonth !== monthsShortNames[i]) {
            document.getElementById(monthsShortNames[i]).disabled = true;

        } else {
            document.getElementById(clickedMonth).style.border = "2px solid white";
            break;

        }


    }
}

firstClick();

var globalId;
function monthClicked(id) {
    globalId = id;

    if (document.getElementById('first').disabled == false && document.getElementById('secound').disabled == false) {
        document.getElementById(prevAndNextMonth[0] || clickedMonth).style.border = "none";
        prevAndNextMonth.shift();
        prevAndNextMonth.shift();
        prevAndNextMonth.shift();
        displayCalendar(id);
    }
    if (document.getElementById('first').disabled) {
        document.getElementById(prevAndNextMonth[0] || clickedMonth).style.border = "none";
        prevAndNextMonth.shift();
        prevAndNextMonth.shift();
        prevAndNextMonth.shift();
        displayCalendar(id);
    } else if (document.getElementById('secound').disabled) {
        document.getElementById(prevAndNextMonth[0] || clickedMonth).style.border = "none";
        prevAndNextMonth.shift();
        prevAndNextMonth.shift();
        prevAndNextMonth.shift();
        // monthShow = true;
        displayCalendar(globalId, temp2[0] - 1 + 1 + 1);
    }




}


function secoundClick() {

    displayCalendar(globalId, temp2[0] - 1 + 1 + 1);
    displayAllMonths();
}

function displayAllMonths() {
    for (i = 0; i < monthsShortNames.length; i++) {
        if (monthsShortNames[i]) {
            document.getElementById(monthsShortNames[i]).disabled = false;

        } else {
            document.getElementById(clickedMonth).style.border = "2px solid red";
            break;

        }


    }
}


