var taskList = getTasks();
var projectList = getProjects();

var currentTaskId = JSON.parse(localStorage.getItem(CURRENT_TASK_ID));
var currentProjectId =JSON.parse(localStorage.getItem(CURRENT_PROJECT_ID));

var currentTask = taskList.filter(task => task.taskId == currentTaskId)[0];
var currentProject = projectList.filter(project => project.projectId == currentProjectId)[0];

var userRelatedProjectList = projectList.filter(project => project.projectMembers.includes( getCurrentUser().email));

  $('#btnAddMember').click(function() {
    $('#modal-newMember').modal('show')
 });

//console.log("currentUser"+ getCurrentUserId())

userRelatedProjectList.forEach(function callback(project, index) {
  console.log(project.projectName+"---"+project.projectDescription)

  let markup = "<tr><td>" +index + "</td><td><a>"+ project.projectName +"</a><br/><small>Created "+ project.startDate +"</small></td><td><ul class='list-inline'><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar.png'></li><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar2.png'></li><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar3.png'></li><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar4.png'></li></ul></td><td class='project_progress'><div class='progress progress-sm'><div class='progress-bar bg-green' role='progressbar' aria-valuenow='57' aria-valuemin='0' aria-valuemax='100' style='width: 57%'></div></div><small>57% Complete</small></td><td class='project-state'><span class='badge badge-success'>"+ project.projectStatus +"</span></td><td class='project-actions text-right'><button class='btn btn-primary btn-sm'onclick='goToProjectRelatedTask("+index+")'><i class='fas fa-folder'></i>View Task</button></td></tr>";
  $("table tbody").append(markup);
  
  index++
});

function goToProjectRelatedTask(index){
  let currentProjectId = userRelatedProjectList[index].projectId;

  localStorage.setItem(CURRENT_PROJECT_ID, JSON.stringify(currentProjectId));
  window.location.href = "./member_project_filtered_list.html";
}
