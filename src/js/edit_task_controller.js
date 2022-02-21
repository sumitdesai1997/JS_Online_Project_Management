var taskList = getTasks();
var userTaskList = taskList.filter(task => task.taskMemberEmail == getCurrentUser().email);
document.getElementById("navUserName").innerHTML= getCurrentUser().name
var currentTaskIndex = JSON.parse(localStorage.getItem(CURRENT_TASK_INDEX));
document.getElementById("navUserName").innerHTML= getCurrentUser().name
document.getElementById("editTaskName").value = userTaskList[currentTaskIndex].taskName;
document.getElementById("editTaskDescription").value = userTaskList[currentTaskIndex].taskDescription;
document.getElementById("editTaskStartDate").value = userTaskList[currentTaskIndex].startDate;
document.getElementById("editTaskEndDate").value = userTaskList[currentTaskIndex].endDate;
document.getElementById("editAssignedTaskHours").value = userTaskList[currentTaskIndex].taskEstimateHours;
