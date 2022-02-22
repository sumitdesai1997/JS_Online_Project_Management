var taskList = getTasks();
var currentProjectId = JSON.parse(localStorage.getItem(CURRENT_PROJECT_ID));
var currentTaskId;
var projectRelatedTaskList = taskList.filter(task => task.projectId == currentProjectId);
document.getElementById("navUserName").innerHTML= getCurrentUser().name

for(let i = 0; i < projectRelatedTaskList.length; i++){
    let markup = "<tr><td> " + (i+1) + " </td><td><a>" + projectRelatedTaskList[i].taskName +"</a><br/><small>" + projectRelatedTaskList[i].startDate +"</small></td><td>" + projectRelatedTaskList[i].taskDescription + "</td><td class='project_progress'><div class='progress progress-sm'><div class='progress-bar bg-green' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width: 60%'></div></div><small>" + getNumberOfDays(new Date(), projectRelatedTaskList[i].endDate) +"  days </small></td><td class='project-state'><span class='badge badge-success'>" + projectRelatedTaskList[i].taskStatus +"</span></td><td class='project-actions text-right'><button class='btn btn-info btn-sm' onclick='goToManagerEditTask("+i+")'><i class='fas fa-pencil-alt'></i>Edit</a></td></tr>";
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