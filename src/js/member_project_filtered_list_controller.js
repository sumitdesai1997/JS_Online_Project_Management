var taskList = getTasks();
var projectList = getProjects();

var currentTaskId = JSON.parse(localStorage.getItem(CURRENT_TASK_ID));
var currentProjectId =JSON.parse(localStorage.getItem(CURRENT_PROJECT_ID));

var currentTask = taskList.filter(task => task.taskId == currentTaskId)[0];
var currentProject = projectList.filter(project => project.projectId == currentProjectId)[0];

var userRelatedCurrentProjectTaskList = currentProject.taskList.filter(task => task.taskMemberEmail == getCurrentUser().email);

document.getElementById("navUserName").innerHTML= getCurrentUser().name

for(let i = 0; i < userRelatedCurrentProjectTaskList.length; i++){

    let className;
    if(userRelatedCurrentProjectTaskList[i].taskStatus == "Success"){
        className = "badge-success";
    } else if (userRelatedCurrentProjectTaskList[i].taskStatus == "Work in progress"){
        className ="badge-primary";
    } else if(userRelatedCurrentProjectTaskList[i].taskStatus == "Canceled"){
        className ="badge-danger";
    } else if(userRelatedCurrentProjectTaskList[i].taskStatus == "On Hold"){
        className ="badge-warning";
    } else {
        className ="badge-success";
    }

    let markup = "<tr><td> " + (i+1) + " </td><td><a>" + userRelatedCurrentProjectTaskList[i].taskName +"</a><br/><small>" + userRelatedCurrentProjectTaskList[i].startDate +"</small></td><td>" + userRelatedCurrentProjectTaskList[i].taskDescription + "</td><td >" + getNumberOfDays(new Date(), userRelatedCurrentProjectTaskList[i].endDate)  +" days </td><td class='project-state'><span class='badge "+className+"'>" + userRelatedCurrentProjectTaskList[i].taskStatus +"</span></td><td class='project-actions text-right'><button class='btn btn-info btn-sm' onclick='goToEditTask("+i+")'><i class='fas fa-pencil-alt'></i> Edit</a></td></tr>";
    $("table tbody").append(markup);
}

function goToEditTask(index){
    let currentTaskId = userRelatedCurrentProjectTaskList[index].taskId;
    console.log("index: "+ index);

    localStorage.setItem(CURRENT_TASK_ID, JSON.stringify(currentTaskId));
    window.location.href = "./member_task_edit.html";
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