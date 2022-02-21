var IdProjectStartDate = document.getElementById("editprojectStartDate");
var IdProjectEndDate = document.getElementById("editprojectEndDate");

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

if (dd < 10) {
  dd = '0' + dd;
}

if (mm < 10) {
  mm = '0' + mm;
} 
    
today = yyyy + '-' + mm + '-' + dd;
IdProjectStartDate.setAttribute("min", today);

document.getElementById("navUserName").innerHTML= getCurrentUser().name

function setMinForProjectEndDate(){
  IdProjectEndDate.setAttribute("min", IdProjectStartDate.value);
}

$('#btnAddNewTask').click(function() {
  $('#modal-newTask').modal('show');
});

function onChangeTaskDependency(){
  let value = document.getElementById("taskdependant1").checked ? "Yes" : "No";
  if(value == "Yes"){
    document.getElementById("dependentTaskDiv").hidden = true;
  } else {
    document.getElementById("dependentTaskDiv").hidden = false;
  }
}

currentIndex = localStorage.getItem(CURRENT_PROJECT_INDEX, JSON.parse(currentIndex));
var userList = JSON.parse(localStorage.getItem(USERS));

function addTask(){

  let newProjectList = getProjects();

  let taskName = document.getElementById("taskInputName").value;
  let taskDescription = document.getElementById("taskInputDescription").value;
  //let taskStatus = document.getElementById("taskInputStatus").value;
  let taskStatus = "Created";
  let startDate = document.getElementById("taskStartDate").value;
  let endDate = document.getElementById("taskEndDate").value;
  let taskMemberEmail = document.getElementById("taskInputMemberEmail").value;
  let taskEstimateHours = document.getElementById("inputTaskHours").value;
  //let taskEstimateBudget = document.getElementById("inputTaskCost").value;
  let isTaskIndependent = document.getElementById("taskdependant1").checked ? "Yes" : "No";
  let dependentTask = isTaskIndependent == "No" ? document.getElementById("dependentTask").value : "";
 
  dependentTask = dependentTask == "No tasks created yet" ? "" : dependentTask;
  isTaskIndependent = dependentTask == "" ? "Yes" : "No";

  let taskId = "TSK" + + Math.floor(100000 + Math.random() * 900000);

  let taskEstimateBudget = userList.filter(user => user.email == taskMemberEmail)[0].payrate * parseInt(taskEstimateHours);
  let actualTaskHours = -1;
  let actualTaskBudget = -1;
  let taskComment = ""

  var task = new Task(taskId, taskName, taskDescription, taskStatus, startDate, endDate, taskMemberEmail, taskEstimateBudget, taskEstimateHours, isTaskIndependent, dependentTask, newProjectList[currentIndex].projectId, actualTaskHours, actualTaskBudget, taskComment);

  let projectToBeRemoved = newProjectList.splice(currentIndex, 1)[0];

  projectToBeRemoved.taskList.push(task);

  var editedProject = new Project(projectToBeRemoved.projectId, projectToBeRemoved.projectName, projectToBeRemoved.projectDescription, projectToBeRemoved.projectStatus, projectToBeRemoved.startDate, projectToBeRemoved.endDate, projectToBeRemoved.clientCompany, projectToBeRemoved.estimateBudget, projectToBeRemoved.estimateHours, projectToBeRemoved.projectMembers, projectToBeRemoved.imgAvatar, projectToBeRemoved.taskList);
  newProjectList.push(editedProject);

  localStorage.setItem(PROJECTS, JSON.stringify(newProjectList));

  document.getElementById("addTaskModalClose").click();
  var x = document.getElementById("toastTaskAdd");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

  setTimeout(function(){window.location.href="../../index.html";}, 3500);

  addTaskIntoDB(task);
}

getProjects().forEach(function callback(project, index) {
  console.log(project.projectName+"---"+project.projectDescription);
  console.log("currentIndex:----- " + project.projectId+"=="+currentIndex);
  
  if(index == currentIndex){
    console.log("inside if:"+ project.projectName)
    document.getElementById("editInputName").value = project.projectName;
    document.getElementById("editInputDescription").value = project.projectDescription;
    document.getElementById("editInputStatus").value = project.projectStatus;
    document.getElementById("editprojectStartDate").value = project.startDate;
    document.getElementById("editprojectEndDate").value = project.endDate;
    document.getElementById("editIputClientCompany").value = project.clientCompany;
    document.getElementById("editInputEstimatedBudget").value = project.estimateBudget;
    document.getElementById("editInputEstimatedHours").value = project.estimateHours;
  }

  index++;
});

function saveChanges(){
  getProjects().forEach(function callback(project, index) {
    currentIndex = localStorage.getItem(CURRENT_PROJECT_INDEX, JSON.parse(currentIndex));
  
    if(index == currentIndex){
      let newProjectList = getProjects();
      let projectToBeRemoved = newProjectList.splice(index, 1)[0];
      
      let projectName = document.getElementById("editInputName").value;
      let projectDescription = document.getElementById("editInputDescription").value;
      let projectStatus = document.getElementById("editInputStatus").value;
      let startDate = document.getElementById("editprojectStartDate").value;
      let endDate = document.getElementById("editprojectEndDate").value;
      let clientCompany = document.getElementById("editIputClientCompany").value;
      let estimateBudget = document.getElementById("editInputEstimatedBudget").value;
      let estimateHours = document.getElementById("editInputEstimatedHours").value;
      let projectMembers = projectToBeRemoved.projectMembers;
      let imgAvatar = projectToBeRemoved.imgAvatar;
      let taskList = projectToBeRemoved.taskList;
      let projectId = projectToBeRemoved.projectId;

      var editedProject = new Project(projectId, projectName, projectDescription, projectStatus, startDate, endDate, clientCompany, estimateBudget, estimateHours, projectMembers, imgAvatar, taskList);
      newProjectList.push(editedProject);
      
      localStorage.setItem(PROJECTS, JSON.stringify(newProjectList));

      var x = document.getElementById("toastEditProject");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

      setTimeout(function(){window.location.href="../../index.html";}, 3500);
    }
  
    index++;
  });
}

function loadMemberEmails(){
  let projectList = getProjects();
  let currentProject = projectList[currentIndex];

    if (currentProject.projectMembers.length == 0){
          document.getElementById("taskInputMemberEmail").innerHTML = "<option></option>";
    } else {
        var memberOptions = "";
        for (index in currentProject.projectMembers) {
            memberOptions += "<option>" + currentProject.projectMembers[index] + "</option>";
        }
        document.getElementById("taskInputMemberEmail").innerHTML = memberOptions;
    }
}
loadMemberEmails();

function loadTaskList(){
  let projectList = getProjects();
  let currentProject = projectList[currentIndex];

    if (currentProject.taskList.length == 0){
          document.getElementById("dependentTask").innerHTML = "<option disabled selected>No tasks created yet</option>";
    } else {
        var taskOptions = "";
        for (index in currentProject.taskList) {
            taskOptions += "<option>" + currentProject.taskList[index].taskName + "</option>";
        }
        document.getElementById("dependentTask").innerHTML = taskOptions;
    }
}
loadTaskList();