var hourArray = [{
    miltime: "09",
    id: "0",
    save: "",
},{
    miltime:"10",
    id: "1",
    save: "", 
},{
    miltime:"11",
    id: "2",
    save: "",
},{
    miltime:"12", 
    id: "3",
    save: "",
},{
    miltime:"13", 
    id: "4",
    save: "",
},{
    miltime:"14", 
    id: "5",
    save: "",
},{
    miltime:"15", 
    id: "6",
    save: "",
},{
    miltime:"16", 
    id: "7",
    save: "",
},{
    miltime:"17",
    id: "8",
    save: "",
}]


// variable objects
var displayDate = $("#currentDay");
var main = $(".container");

// dynamically generated new elements
var newDiv = $("<div>");
var newTable = $("<table>");

// predefined variables
var hourSlot = "";
var timeIndex = 0;
var currentTime = moment();

// Date & Time below the Jumbotron
function displayHeader () {
    var dayHeader = currentTime.format("dddd, MMMM Do YYYY");
    displayDate.text(dayHeader);
}

// shows current day in header
displayHeader();

// pulls persisted data, compares it to current Data. If saveData exists, it will populate in the application
function persistedData () {
    var saveData = JSON.parse(localStorage.getItem("userSaved"));
    if (saveData){
        hourArray = saveData;
    }
}

// loads any data from localstorage
persistedData();

function newData(){
    localStorage.setItem("userSaved", JSON.stringify(hourArray));
}

function plannerHour(time){
    var hourBlock = moment({hour: time}).format("h:mm a");
    hourSlot = hourBlock;
}

for (var i = 0; i < hourArray.length; i++){
    plannerHour(hourArray[i].miltime);
    buildTimeBlocks();
    timeIndex++;
}

// build time block rows with date column, textarea column and save button 
function buildTimeBlocks(){
    
    // creates Row Element, includes font styling
    var rowDiv = $("<div>");
    rowDiv.addClass("row");
    $("body").attr("style", "font-family: Open Sans")

    // creates Row's hour of day 
    var hourDiv = $("<div>");
    hourDiv.text(hourSlot);
    hourDiv.addClass("time-block hour col-md-2")

    // creates area for user to input
    var userTextEl = $("<textarea>").attr("id", hourArray[timeIndex].id);
    userTextEl.addClass("description col-md-9");
    userTextEl.text(hourArray[timeIndex].save);
    
    // creates button to save row's information
    var buttonSlot = $("<i></i>")
    buttonSlot.addClass("far fa-save fa-lg")
    var saveIcon = $("<button></button>")
    saveIcon.addClass("col-md-1 saveBtn")

    // based on time of day vs row's hour, changes color format
    if (hourArray[timeIndex].miltime < currentTime.format("HH")){

        userTextEl.addClass("past");

    } else if (hourArray[timeIndex].miltime > currentTime.format("HH")){
        userTextEl.addClass("future");
    } else {
        userTextEl.addClass("present col-md-8");
    }

    main.append(rowDiv);
    rowDiv.append(hourDiv, userTextEl, saveIcon);
    saveIcon.append(buttonSlot);
    
}
// based on global click, identifies element and saves any user input into original array property for persistence
$(".saveBtn").on("click", function(event){
    event.preventDefault();
    var futureSaveText = $(this).siblings(".future");
    var tempIndex = futureSaveText.attr("id");
    hourArray[tempIndex].save = futureSaveText.val();

    newData();
})


