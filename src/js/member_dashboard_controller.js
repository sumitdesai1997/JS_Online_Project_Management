
var taskList = getTasks();
var projectList = getProjects();

var currentTaskId = JSON.parse(localStorage.getItem(CURRENT_TASK_ID));
var currentProjectId =JSON.parse(localStorage.getItem(CURRENT_PROJECT_ID));

var currentTask = taskList.filter(task => task.taskId == currentTaskId)[0];
var currentProject = projectList.filter(project => project.projectId == currentProjectId)[0];

var taskList = getTasks();
var userTaskList = taskList.filter(task => task.taskMemberEmail == getCurrentUser().email);


document.getElementById("navUserName").innerHTML= getCurrentUser().name



var userRelatedProjectList = projectList.filter(project => project.projectMembers.includes( getCurrentUser().email));

  $('#btnAddMember').click(function() {
    $('#modal-newMember').modal('show')
 });

//console.log("currentUser"+ getCurrentUserId())

userRelatedProjectList.forEach(function callback(project, index) {
  console.log(project.projectName+"---"+project.projectDescription)
  let imgAvatar = project.imgAvatar.replaceAll("../../dist/img/avatar.png", "./dist/img/avatar.png");

  let className;
  if(project.projectStatus == "Success"){
      className = "badge-success";
  } else if (project.projectStatus == "Work in progress"){
      className ="badge-primary";
  } else if(project.projectStatus == "Canceled"){
      className ="badge-danger";
  } else if(project.projectStatus == "On Hold"){
      className ="badge-warning";
  } else {
      className ="badge-success";
  }

  let markup = "<tr><td>" + (index+1) + "</td><td><a>"+ project.projectName +"</a><br/><small>Created "+ project.startDate +"</small></td><td><ul class='list-inline'>"+ imgAvatar +"</ul></td><td >" + getNumberOfDays(new Date(), project.endDate) +" Days</td><td class='project-state'><span class='badge "+ className +"'>"+ project.projectStatus +"</span></td><td class='project-actions text-right'><button class='btn btn-primary btn-sm'onclick='goToProjectRelatedTask("+index+")'><i class='fas fa-folder'></i>  View Task</button></td></tr>";
  //let markup = "<tr><td> " + (index+1) + "</td><td><a>"+ project.projectName +"</a><br/><small>" + project.startDate + "</small></td><td><ul class='list-inline'>"+ project.imgAvatar +"<li class='list-inline-item'><button id='btnAddMember"+index+"' type='button' class='btn' data-toggle='modal' data-target='#modal-success'></button></li></ul></td><td class='project_progress'><div class='progress progress-sm'><div class='progress-bar bg-green' role='progressbar' aria-valuenow='57' aria-valuemin='0' aria-valuemax='100' style='width: 57%'></div></div><small> " + project.estimateHours + "</small></td><td class='project-state'><span class='badge badge-success'> " + project.projectStatus + " </span></td><td class='project-actions text-right'><a class='btn btn-primary btn-sm' onclick='goToEditProject("+index+")'><i class='fas fa-pencil-alt'></i> Edit</a>&nbsp; &nbsp;<a class='btn btn-info btn-sm' onclick='goToFilteredTask("+index+")'><i class='fas fa-folder'></i>View task</a></td></tr>";
  $("table tbody").append(markup);
  
  index++
});

function goToProjectRelatedTask(index){
  let currentProjectId = userRelatedProjectList[index].projectId;

  localStorage.setItem(CURRENT_PROJECT_ID, JSON.stringify(currentProjectId));
  window.location.href = "./src/html/member_project_filtered_list.html";
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