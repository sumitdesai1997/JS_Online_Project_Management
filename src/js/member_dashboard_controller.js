
var taskList = getTasks();
var projectList = getProjects();

var currentTaskId = JSON.parse(localStorage.getItem(CURRENT_TASK_ID));
var currentProjectId =JSON.parse(localStorage.getItem(CURRENT_PROJECT_ID));

var currentTask = taskList.filter(task => task.taskId == currentTaskId)[0];
var currentProject = projectList.filter(project => project.projectId == currentProjectId)[0];

var taskList = getTasks();
var userTaskList = taskList.filter(task => task.taskMemberEmail == getCurrentUser().email);

var userRelatedProjectList = projectList.filter(project => project.projectMembers.includes( getCurrentUser().email));


document.getElementById("navUserName").innerHTML= getCurrentUser().name

userRelatedProjectList.reverse().slice(0,5).forEach(function callback(project, index) {
    console.log(project.projectName+"---"+project.projectDescription);
    
    let imgAvatar = project.imgAvatar.replaceAll("../../dist/img/avatar.png", "./dist/img/avatar.png");
    let markup = "<tr><td> " + (index+1) + "</td><td><a>"+ project.projectName +"</a><br/><small>" + project.startDate + "</small></td><td><ul class='list-inline'>"+ imgAvatar +"</ul></td><td class='project_progress'><div class='progress progress-sm'><div class='progress-bar bg-green' role='progressbar' aria-valuenow='57' aria-valuemin='0' aria-valuemax='100' style='width: 57%'></div></div><small> " + project.estimateHours + "</small></td><td class='project-state'><span class='badge badge-success'> " + project.projectStatus + " </span></td><td class='project-actions text-right'><a class='btn btn-primary btn-sm' onclick='goToEditProject("+index+")'><i class='fas fa-pencil-alt'></i> Edit</a>&nbsp; &nbsp;<a class='btn btn-info btn-sm' onclick='goToFilteredTask("+index+")'><i class='fas fa-folder'></i>  View task</a></td></tr>";
    $("table tbody").append(markup);
    
  });
  