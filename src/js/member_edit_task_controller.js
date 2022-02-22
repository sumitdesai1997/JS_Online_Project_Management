var taskList = getTasks();
var projectList = getProjects();

var currentTaskId = JSON.parse(localStorage.getItem(CURRENT_TASK_ID));
var currentProjectId =JSON.parse(localStorage.getItem(CURRENT_PROJECT_ID));

var currentTask = taskList.filter(task => task.taskId == currentTaskId)[0];
var currentProject = projectList.filter(project => project.projectId == currentProjectId)[0];


document.getElementById("navUserName").innerHTML= getCurrentUser().name

document.getElementById("memberEditTaskName").value = currentTask.taskName;
document.getElementById("memberEditTaskDescription").value = currentTask.taskDescription;
document.getElementById("memberEditTaskStartDate").value = currentTask.startDate;
if(!(currentTask.taskStatus == "Created" ||  currentTask.taskStatus == undefined)){
    document.getElementById("memberEditTaskStatus").value = currentTask.taskStatus;
}
if(currentTask.isTaskIndependent == "No"){
    let dependentTaskName = currentTask.dependentTask;
    let dependentTask = taskList.filter(task => task.taskName == dependentTaskName)[0];

    if(dependentTask.taskStatus != "Success"){
        document.getElementById("memberEditTaskStatus").disabled = true;
    }
}
document.getElementById("memberEditTaskEndDate").value = currentTask.endDate;
document.getElementById("memberEditTaskHour").value = currentTask.taskEstimateHours;

document.getElementById("taskCompletionHours").value = parseInt(currentTask.actualTaskHours);
document.getElementById("taskComments").value = currentTask.taskComment;

function memberEditTask(){
    // TASKS UPDATE
    var newTaskList = getTasks();

    var taskToBeRemoved = newTaskList.filter(task => task.taskId == currentTaskId)[0];
    //newTaskList.remove(taskToBeRemoved);

    const taskIndex = newTaskList.indexOf(taskToBeRemoved);
    if (taskIndex > -1) {
        newTaskList.splice(taskIndex, 1);
    }

    //let taskName = document.getElementById("managerEditTaskName").value;
    //let taskDescription = document.getElementById("managerEditTaskDescription").value;
    //let taskStatus = document.getElementById("taskInputStatus").value;
    let taskStatus = document.getElementById("memberEditTaskStatus").value;
    //let startDate = document.getElementById("managerEditTaskStartDate").value;
    //let endDate = document.getElementById("managerEditTaskEndDate").value;
    //let taskMemberEmail = document.getElementById("managerEditMemberEmail").value;
    //let taskEstimateHours = document.getElementById("managerEditTaskHours").value;
    //let taskEstimateBudget = document.getElementById("inputTaskCost").value;
    //let isTaskIndependent = document.getElementById("managerEditTaskdependant1").checked ? "Yes" : "No";
    //let dependentTask = isTaskIndependent == "No" ? document.getElementById("managerEditDependentTask").value : "";
    
    //dependentTask = dependentTask == "No tasks created yet" ? "" : dependentTask;
    //isTaskIndependent = dependentTask == "" ? "Yes" : "No";

    //let taskId = "TSK" + + Math.floor(100000 + Math.random() * 900000);

    var userList = JSON.parse(localStorage.getItem(USERS));
    let actualTaskHours = document.getElementById("taskCompletionHours").value;
    let actualTaskBudget = userList.filter(user => user.email == getCurrentUser().email)[0].payrate * parseInt(actualTaskHours);
    let taskComment = document.getElementById("taskComments").value;

    


    var editedTask = new Task(taskToBeRemoved.taskId, taskToBeRemoved.taskName, taskToBeRemoved.taskDescription, taskStatus, taskToBeRemoved.startDate, taskToBeRemoved.endDate, taskToBeRemoved.taskMemberEmail, taskToBeRemoved.taskEstimateBudget, taskToBeRemoved.taskEstimateHours, taskToBeRemoved.isTaskIndependent, taskToBeRemoved.dependentTask, currentProjectId, actualTaskHours, actualTaskBudget, taskComment);
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

    var x = document.getElementById("memberToastEditTask");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

    setTimeout(function(){window.location.href="../../member_dashboard.html";}, 3500);
}