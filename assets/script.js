var hourArray = [{
    miltime: "9",
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
var hourSlot = "";

// Date & Time below the Jumbotron
function displayHeader () {
    var dayHeader = moment().format("dddd, MMMM Do YYYY");
    displayDate.text(dayHeader);
}

displayHeader();

// pulls persisted data, compares it to current Data, if different, sets current data to saved data, updates into local storage
function persistedData () {
    var saveData = JSON.parse(localStorage.getItem("userSaved")) || [];
    if (hourArray !== saveData){
        saveData = hourArray;
        localStorage.setItem("userSaved", JSON.stringify(saveData));
    }
}

persistedData();

function plannerHour(time){
    var hourBlock = moment({hour: time}).format("h:mm a");
    hourSlot = hourBlock;
    // console.log(hourBlock);
}

for (var i = 0; i < hourArray.length; i++){
    plannerHour(hourArray[i].miltime);
    buildTimeBlocks();
}

// build time block rows with date column, textarea column and save button 
function buildTimeBlocks(){
    // parent object is Body>>Div Class "Container"
    var rowDiv = $("<div>");
    rowDiv.attr("class", "row");
    main.attr("style", "font-family: Open Sans")

    var hourDiv = $("<div>");
    hourDiv.text(hourSlot);
    hourDiv.attr("class", "time-block hour col-2");

    var userTextEl = $("<textarea>");
    userTextEl.attr("class", "col-8");
    
    main.append(rowDiv);
    rowDiv.append(hourDiv);
    rowDiv.append(userTextEl);

}



