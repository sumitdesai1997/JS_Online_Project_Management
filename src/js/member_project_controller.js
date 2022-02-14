
  $('#btnAddMember').click(function() {
    $('#modal-newMember').modal('show')
 });

//console.log("currentUser"+ getCurrentUserId())

getProjects().forEach(function callback(project, index) {
  console.log(project.projectName+"---"+project.projectDescription)
  index++

  let markup = "<tr><td>" +index + "</td><td><a>"+ project.projectName +"</a><br/><small>Created "+ project.startDate +"</small></td><td><ul class='list-inline'><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar.png'></li><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar2.png'></li><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar3.png'></li><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar4.png'></li></ul></td><td class='project_progress'><div class='progress progress-sm'><div class='progress-bar bg-green' role='progressbar' aria-valuenow='57' aria-valuemin='0' aria-valuemax='100' style='width: 57%'></div></div><small>57% Complete</small></td><td class='project-state'><span class='badge badge-success'>"+ project.projectStatus +"</span></td><td class='project-actions text-right'><a class='btn btn-primary btn-sm' href='./member_task.html'><i class='fas fa-folder'></i>View Task</a></td></tr>";
  $("table tbody").append(markup);
  
});

// var projectList = [
//     { projectname : "Red chillies", date : "29/06/2022", completion :  "47% complete", status : "About to Success" },
//     { projectname : "Green chillies", date : "22/06/2022", completion :  "57% complete", status : "Success" },
//     { projectname : "Purple chillies", date : "19/06/2022", completion :  "80% complete", status : "Success" },
//     { projectname : "Pink chillies", date : "11/06/2022", completion :  "95% complete", status : "Success" },
// ]

// for(let i = 0; i < projectList.length; i++){
//     let markup = "<tr><td>" + i + "</td><td><a>"+ projectList[i].projectname +"</a><br/><small>Created "+ projectList[i].date +"</small></td><td><ul class='list-inline'><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar.png'></li><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar2.png'></li><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar3.png'></li><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar4.png'></li></ul></td><td class='project_progress'><div class='progress progress-sm'><div class='progress-bar bg-green' role='progressbar' aria-valuenow='57' aria-valuemin='0' aria-valuemax='100' style='width: 57%'></div></div><small>57% Complete</small></td><td class='project-state'><span class='badge badge-success'>"+ projectList[i].status +"</span></td><td class='project-actions text-right'><a class='btn btn-primary btn-sm' href='./member_task.html'><i class='fas fa-folder'></i>View Task</a></td></tr>";
//     $("table tbody").append(markup);
// }
