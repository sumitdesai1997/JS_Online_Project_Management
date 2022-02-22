var taskList = getTasks();
var projectList = getProjects();

var currentTaskId = JSON.parse(localStorage.getItem(CURRENT_TASK_ID));
var currentProjectId =JSON.parse(localStorage.getItem(CURRENT_PROJECT_ID));

var currentTask = taskList.filter(task => task.taskId == currentTaskId)[0];
var currentProject = projectList.filter(project => project.projectId == currentProjectId)[0];

var projectRelatedTaskList = taskList.filter(task => task.projectId == currentProjectId);
document.getElementById("navUserName").innerHTML= getCurrentUser().name

var IdTaskStartDate = document.getElementById("managerEditTaskStartDate");
var IdTaskEndDate = document.getElementById("managerEditTaskEndDate");

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
IdTaskStartDate.setAttribute("min", today);

//document.getElementById("navUserName").innerHTML= getCurrentUser().name

function setMinForTaskEndDate(){
    IdTaskEndDate.setAttribute("min", IdTaskStartDate.value);
}

function onChangeTaskDependency(){
    let value = document.getElementById("managerEditTaskdependant1").checked ? "Yes" : "No";
    if(value == "Yes"){
      document.getElementById("mangerEditDependentTaskDiv").hidden = true;
    } else {
      document.getElementById("mangerEditDependentTaskDiv").hidden = false;
    }
}

document.getElementById("managerEditTaskName").value = currentTask.taskName;
document.getElementById("managerEditTaskDescription").value = currentTask.taskDescription;
document.getElementById("managerEditTaskStartDate").value = currentTask.startDate;
document.getElementById("managerEditTaskEndDate").value = currentTask.endDate;
document.getElementById("managerEditTaskHours").value = currentTask.taskEstimateHours;
document.getElementById("managerEditTaskCompletionHours").value = parseInt(currentTask.actualTaskHours);
document.getElementById("managerEditTaskComments").value = currentTask.taskComment;

document.getElementById("managerEditTaskCompletionHours").disabled = true;
document.getElementById("managerEditTaskComments").disabled = true;

if(currentTask.isTaskIndependent == "Yes"){
    document.getElementById("managerEditTaskdependant1").checked = true;
} else {
    document.getElementById("managerEditTaskdependant2").checked = true;
}
onChangeTaskDependency();

function loadMemberEmails(){
      if (currentProject.projectMembers.length == 0){
            document.getElementById("managerEditMemberEmail").innerHTML = "<option></option>";
      } else {
          var memberOptions = "";
          for (index in currentProject.projectMembers) {
              memberOptions += "<option>" + currentProject.projectMembers[index] + "</option>";
          }
          document.getElementById("managerEditMemberEmail").innerHTML = memberOptions;
      }
  }
  loadMemberEmails();

document.getElementById("managerEditMemberEmail").value = currentTask.taskMemberEmail;

  function loadTaskList(){
      if (currentProject.taskList.length == 0){
            document.getElementById("managerEditDependentTask").innerHTML = "<option disabled selected>No tasks created yet</option>";
      } else {
          var taskOptions = "";
          for (index in currentProject.taskList) {
              taskOptions += "<option>" + currentProject.taskList[index].taskName + "</option>";
          }
          document.getElementById("managerEditDependentTask").innerHTML = taskOptions;
      }
  }
  loadTaskList();

if(currentTask.dependentTask != null && currentTask.dependentTask != ""){
    document.getElementById("managerEditDependentTask").value = currentTask.dependentTask;
}
 
function managerEditTask(){

    // TASKS UPDATE
    var newTaskList = getTasks();

    var taskToBeRemoved = newTaskList.filter(task => task.taskId == currentTaskId)[0];
    //newTaskList.remove(taskToBeRemoved);

    const taskIndex = newTaskList.indexOf(taskToBeRemoved);
    if (taskIndex > -1) {
        newTaskList.splice(taskIndex, 1);
    }

    let taskName = document.getElementById("managerEditTaskName").value;
    let taskDescription = document.getElementById("managerEditTaskDescription").value;
    //let taskStatus = document.getElementById("taskInputStatus").value;
    let taskStatus = "Created";
    let startDate = document.getElementById("managerEditTaskStartDate").value;
    let endDate = document.getElementById("managerEditTaskEndDate").value;
    let taskMemberEmail = document.getElementById("managerEditMemberEmail").value;
    let taskEstimateHours = document.getElementById("managerEditTaskHours").value;
    //let taskEstimateBudget = document.getElementById("inputTaskCost").value;
    let isTaskIndependent = document.getElementById("managerEditTaskdependant1").checked ? "Yes" : "No";
    let dependentTask = isTaskIndependent == "No" ? document.getElementById("managerEditDependentTask").value : "";
    
    dependentTask = dependentTask == "No tasks created yet" ? "" : dependentTask;
    isTaskIndependent = dependentTask == "" ? "Yes" : "No";

    //let taskId = "TSK" + + Math.floor(100000 + Math.random() * 900000);
    var userList = JSON.parse(localStorage.getItem(USERS));
    let taskEstimateBudget = userList.filter(user => user.email == taskMemberEmail)[0].payrate * parseInt(taskEstimateHours);

    var editedTask = new Task(taskToBeRemoved.taskId, taskName, taskDescription, taskStatus, startDate, endDate, taskMemberEmail, taskEstimateBudget, taskEstimateHours, isTaskIndependent, dependentTask, currentProjectId, taskToBeRemoved.actualTaskHours, taskToBeRemoved.actualTaskBudget, taskToBeRemoved.taskComment);
    newTaskList.push(editedTask);

    localStorage.setItem(TASKS, JSON.stringify(newTaskList));

    // PROJECTS UPDATE
    var newProjectList = getProjects();

    var projectToBeRemoved = newProjectList.filter(project => project.projectId == currentProjectId)[0];
    //newProjectList.remove(projectToBeRemoved);

    const projectIndex = newProjectList.indexOf(projectToBeRemoved);
    if (projectIndex > -1) {
        newProjectList.splice(projectIndex, 1);
    }

    var taskToBeRemovedFromProject = projectToBeRemoved.taskList.filter(task => task.taskId == currentTaskId)[0];
    //projectToBeRemoved.taskList.remove(taskToBeRemovedFromProject);

    const projectTaskIndex = projectToBeRemoved.taskList.indexOf(taskToBeRemovedFromProject);
    if (projectTaskIndex > -1) {
        projectToBeRemoved.taskList.splice(projectTaskIndex, 1);
    }

    projectToBeRemoved.taskList.push(editedTask);

    newProjectList.push(projectToBeRemoved);    
    localStorage.setItem(PROJECTS, JSON.stringify(newProjectList));

    var x = document.getElementById("toastEditTask");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

    setTimeout(function(){window.location.href="../../index.html";}, 3500);
}