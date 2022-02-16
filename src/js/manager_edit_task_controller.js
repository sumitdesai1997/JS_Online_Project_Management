var taskList = getTasks();
var projectList = getProjects();

var currentTaskId = JSON.parse(localStorage.getItem(CURRENT_TASK_ID));
var currentProjectId =JSON.parse(localStorage.getItem(CURRENT_PROJECT_ID));

var currentTask = taskList.filter(task => task.taskId == currentTaskId)[0];
var currentProject = projectList.filter(project => project.projectId == currentProjectId)[0];

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
document.getElementById("managerEditMemberEmail").value = currentTask.taskMemberEmail;
document.getElementById("managerEditTaskHours").value = currentTask.taskEstimateHours;

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
 