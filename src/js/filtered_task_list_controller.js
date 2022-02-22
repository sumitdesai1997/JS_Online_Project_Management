var taskList = getTasks();
var currentProjectId = JSON.parse(localStorage.getItem(CURRENT_PROJECT_ID));
var currentTaskId;
var projectRelatedTaskList = taskList.filter(task => task.projectId == currentProjectId);
document.getElementById("navUserName").innerHTML= getCurrentUser().name

for(let i = 0; i < projectRelatedTaskList.length; i++){

    let className;
    if(projectRelatedTaskList[i].taskStatus == "Success"){
        className = "badge-success";
    } else if (projectRelatedTaskList[i].taskStatus == "Work in progress"){
        className ="badge-primary";
    } else if(projectRelatedTaskList[i].taskStatus == "Canceled"){
        className ="badge-danger";
    } else if(projectRelatedTaskList[i].taskStatus == "On Hold"){
        className ="badge-warning";
    } else {
        className ="badge-success";
    }

    let markup = "<tr><td> " + (i+1) + " </td><td><a>" + projectRelatedTaskList[i].taskName +"</a><br/><small>" + projectRelatedTaskList[i].startDate +"</small></td><td>" + projectRelatedTaskList[i].taskDescription + "</td><td >" + getNumberOfDays(new Date(), projectRelatedTaskList[i].endDate) +"  days</td><td class='project-state'><span class='badge "+className+"'>" + projectRelatedTaskList[i].taskStatus +"</span></td><td class='project-actions text-right'><button class='btn btn-info btn-sm' onclick='goToManagerEditTask("+i+")'><i class='fas fa-pencil-alt'></i>  Edit</a></td></tr>";
    $("table tbody").append(markup);
}

function goToManagerEditTask(index){
    currentTaskId = projectRelatedTaskList[index].taskId;
    localStorage.setItem(CURRENT_TASK_ID, JSON.stringify(currentTaskId));

    window.location.href = "./manager_edit_task.html";
}

function getNumberOfDays(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
}