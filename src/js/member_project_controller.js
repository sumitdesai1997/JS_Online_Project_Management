var taskList = getTasks();
var projectList = getProjects();

var currentTaskId = JSON.parse(localStorage.getItem(CURRENT_TASK_ID));
var currentProjectId =JSON.parse(localStorage.getItem(CURRENT_PROJECT_ID));

var currentTask = taskList.filter(task => task.taskId == currentTaskId)[0];
var currentProject = projectList.filter(project => project.projectId == currentProjectId)[0];

var taskList = getTasks();
var userTaskList = taskList.filter(task => task.taskMemberEmail == getCurrentUser().email);


//document.getElementById("navUserName").innerHTML= getCurrentUser().name

var userRelatedProjectList = projectList.filter(project => project.projectMembers.includes( getCurrentUser().email));

  $('#btnAddMember').click(function() {
    $('#modal-newMember').modal('show')
 });

//console.log("currentUser"+ getCurrentUserId())

userRelatedProjectList.forEach(function callback(project, index) {
  console.log(project.projectName+"---"+project.projectDescription)

  let markup = "<tr><td>" + (index+1) + "</td><td><a>"+ project.projectName +"</a><br/><small>Created "+ project.startDate +"</small></td><td><ul class='list-inline'>"+ project.imgAvatar +"</ul></td><td class='project_progress'><div class='progress progress-sm'><div class='progress-bar bg-green' role='progressbar' aria-valuenow='57' aria-valuemin='0' aria-valuemax='100' style='width: 57%'></div></div><small>57% Complete</small></td><td class='project-state'><span class='badge badge-success'>"+ project.projectStatus +"</span></td><td class='project-actions text-right'><button class='btn btn-primary btn-sm'onclick='goToProjectRelatedTask("+index+")'><i class='fas fa-folder'></i>  View Task</button></td></tr>";
  //let markup = "<tr><td> " + (index+1) + "</td><td><a>"+ project.projectName +"</a><br/><small>" + project.startDate + "</small></td><td><ul class='list-inline'>"+ project.imgAvatar +"<li class='list-inline-item'><button id='btnAddMember"+index+"' type='button' class='btn' data-toggle='modal' data-target='#modal-success'></button></li></ul></td><td class='project_progress'><div class='progress progress-sm'><div class='progress-bar bg-green' role='progressbar' aria-valuenow='57' aria-valuemin='0' aria-valuemax='100' style='width: 57%'></div></div><small> " + project.estimateHours + "</small></td><td class='project-state'><span class='badge badge-success'> " + project.projectStatus + " </span></td><td class='project-actions text-right'><a class='btn btn-primary btn-sm' onclick='goToEditProject("+index+")'><i class='fas fa-pencil-alt'></i> Edit</a>&nbsp; &nbsp;<a class='btn btn-info btn-sm' onclick='goToFilteredTask("+index+")'><i class='fas fa-folder'></i>View task</a></td></tr>";
  $("table tbody").append(markup);
  
  index++
});

function goToProjectRelatedTask(index){
  let currentProjectId = userRelatedProjectList[index].projectId;

  localStorage.setItem(CURRENT_PROJECT_ID, JSON.stringify(currentProjectId));
  window.location.href = "./member_project_filtered_list.html";
}
