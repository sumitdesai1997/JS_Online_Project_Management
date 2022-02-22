var taskList = getTasks();
var projectList = getProjects();

var currentTaskId = JSON.parse(localStorage.getItem(CURRENT_TASK_ID));
var currentProjectId =JSON.parse(localStorage.getItem(CURRENT_PROJECT_ID));

var currentTask = taskList.filter(task => task.taskId == currentTaskId)[0];
var currentProject = projectList.filter(project => project.projectId == currentProjectId)[0];

var userRelatedCurrentProjectTaskList = currentProject.taskList.filter(task => task.taskMemberEmail == getCurrentUser().email);

document.getElementById("navUserName").innerHTML= getCurrentUser().name

for(let i = 0; i < userRelatedCurrentProjectTaskList.length; i++){
    let markup = "<tr><td> " + (i+1) + " </td><td><a>" + userRelatedCurrentProjectTaskList[i].taskName +"</a><br/><small>" + userRelatedCurrentProjectTaskList[i].startDate +"</small></td><td>" + userRelatedCurrentProjectTaskList[i].taskDescription + "</td><td class='project_progress'><div class='progress progress-sm'><div class='progress-bar bg-green' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width: 60%'></div></div><small>" + userRelatedCurrentProjectTaskList[i].left +"</small></td><td class='project-state'><span class='badge badge-success'>" + userRelatedCurrentProjectTaskList[i].taskStatus +"</span></td><td class='project-actions text-right'><button class='btn btn-info btn-sm' onclick='goToEditTask("+i+")'><i class='fas fa-pencil-alt'></i>Edit</a></td></tr>";
    $("table tbody").append(markup);
}

function goToEditTask(index){
    let currentTaskId = userRelatedCurrentProjectTaskList[index].taskId;
    console.log("index: "+ index);

    localStorage.setItem(CURRENT_TASK_ID, JSON.stringify(currentTaskId));
    window.location.href = "./member_task_edit.html";
}