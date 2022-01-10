
// let hexColor = ["#ff5f52" , "#67daff" , "#4fb3bf" , "#333", "red"];
let theInput = document.querySelector(".achievement .actieve");
let btnAdd = document.querySelector(".add");
let achievements = document.querySelector(".achievements");
let Warning = document.querySelector(".warning");
let itemsArray = [];

getDataFromLocalStorage();

if (localStorage.getItem("tasks")) {
    itemsArray = JSON.parse(localStorage.getItem("tasks"));
}
 // Click on task Element 

 achievements.addEventListener("click" , (e)=>{
     if (e.target.classList.contains("del")) {
        //  Remove Element From Page
        e.target.parentElement.remove();
        // remove Task To local Storage 
        deleteTask(e.target.parentElement.getAttribute("data-id"));
     }
 })
btnAdd.onclick = ()=>{
    if (theInput.value == "") {
        theInput.focus();
     Warning.classList.add("show-warning");
    }
    else{
     createElement(theInput.value);
     theInput.value = "";
     theInput.focus();
     Warning.classList.remove("show-warning");


    }
}

function createElement(taskText) {
    const task = {
        id: Date.now(),
        title : taskText,
        completed : false
    };
    itemsArray.push(task);
    addTaskToPage(itemsArray);

    addDataToLocalStorage(itemsArray);
}
function addTaskToPage(itemsArray){
    achievements.innerHTML = "";
    itemsArray.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        // check Done Task 
        if (task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id" , task.id);
        div.append(document.createTextNode(task.title));
        let deletebtn =  document.createElement("span");
        deletebtn.appendChild(document.createTextNode("Delete"))
        deletebtn.className = "del";
        div.appendChild(deletebtn);
        achievements.appendChild(div);

        div.addEventListener("dblclick" , ()=>{
            div.classList.toggle("complete")
        })
    });
}
function addDataToLocalStorage(itemsArray){

    window.localStorage.setItem("tasks" , JSON.stringify(itemsArray))
}

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let taskes = JSON.parse(data);
        addTaskToPage(taskes);
    }
}
function deleteTask(taskId){

    itemsArray = itemsArray.filter((task) => task.id != taskId);
     addDataToLocalStorage(itemsArray);
    
}
window.onload = ()=>{
theInput.focus();
}