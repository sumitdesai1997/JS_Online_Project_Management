
// var projectList = [
//     { projectname : "Red chillies", date : "29/06/2022", completion :  "47% complete", status : "About to Success" },
//     { projectname : "Green chillies", date : "22/06/2022", completion :  "57% complete", status : "Success" },
//     { projectname : "Purple chillies", date : "19/06/2022", completion :  "80% complete", status : "Success" },
//     { projectname : "Pink chillies", date : "11/06/2022", completion :  "95% complete", status : "Success" },
// ]

// for(let i = 0; i < projectList.length; i++){
//     let markup = "<tr><td> "+ i + " </td><td><a>"+ projectList[i].projectname +"</a><br/><small>Created "+ projectList[i].date +"</small></td><td><ul class='list-inline'><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='dist/img/avatar2.png'></li><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='dist/img/avatar4.png'></li></ul></td><td class='project_progress'><div class='progress progress-sm'><div class='progress-bar bg-green' role='progressbar' aria-valuenow='47' aria-valuemin='0' aria-valuemax='100' style='width: 47%'></div></div><small>"+ projectList[i].completion +"</small></td><td class='project-state'><span class='badge badge-success'>"+ projectList[i].status +"</span></td><td class='project-actions text-right'><a class='btn btn-primary btn-sm' href='./src/html/member_task.html'><i class='fas fa-folder'></i>View Task</a></td></tr>";
    
//     $("table tbody").append(markup);
// }
var taskList = getTasks();
var userTaskList = taskList.filter(task => task.taskMemberEmail == getCurrentUser().email);

document.getElementById("navUserName").innerHTML= getCurrentUser().name

getProjects().reverse().slice(0,5).forEach(function callback(project, index) {
    console.log(project.projectName+"---"+project.projectDescription);
    // project.reverse();
    //let markup = "<tr><td> " + index + "</td><td><a>"+ project.projectName +"</a><br/><small>" + project.startDate + "</small></td><td><ul class='list-inline'><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar.png'></li><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar2.png'></li><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar3.png'></li><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar4.png'></li><li class='list-inline-item'><button id='btnAddMember"+index+"' type='button' class='btn' data-toggle='modal' data-target='#modal-success'><img alt='Avatar' class='table-avatar' src='../../dist/img/plus.png'></button></li></ul></td><td class='project_progress'><div class='progress progress-sm'><div class='progress-bar bg-green' role='progressbar' aria-valuenow='57' aria-valuemin='0' aria-valuemax='100' style='width: 57%'></div></div><small> " + project.estimateHours + "</small></td><td class='project-state'><span class='badge badge-success'> " + project.projectStatus + " </span></td><td class='project-actions text-right'><button class='btn btn-info btn-sm' onclick='goToEditProject("+index+")'><i class='fas fa-pencil-alt'></i>Edit</a></td></tr>";
    let markup = "<tr><td> " + index + "</td><td><a>"+ project.projectName +"</a><br/><small>" + project.startDate + "</small></td><td><ul class='list-inline'>"+ project.imgAvatar +"<li class='list-inline-item'><button id='btnAddMember"+index+"' type='button' class='btn' data-toggle='modal' data-target='#modal-success'><img alt='Avatar' class='table-avatar' src='../../dist/img/plus.png'></button></li></ul></td><td class='project_progress'><div class='progress progress-sm'><div class='progress-bar bg-green' role='progressbar' aria-valuenow='57' aria-valuemin='0' aria-valuemax='100' style='width: 57%'></div></div><small> " + project.estimateHours + "</small></td><td class='project-state'><span class='badge badge-success'> " + project.projectStatus + " </span></td><td class='project-actions text-right'><a class='btn btn-primary btn-sm' onclick='goToEditProject("+index+")'><i class='fas fa-pencil-alt'></i>Edit</a>&nbsp; &nbsp;<a class='btn btn-info btn-sm' onclick='goToFilteredTask("+index+")'><i class='fas fa-folder'></i>View task</a></td></tr>";
    $("table tbody").append(markup);
    
  });
  