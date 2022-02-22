/* var projectList = [
    { projectname : "Red chillies", date : "29/06/2022", completion :  "47% complete", status : "About to Success" },
    { projectname : "Green chillies", date : "22/06/2022", completion :  "57% complete", status : "Success" },
    { projectname : "Purple chillies", date : "19/06/2022", completion :  "80% complete", status : "Success" },
    { projectname : "Pink chillies", date : "11/06/2022", completion :  "95% complete", status : "Success" },
] */

var currentIndex = 0;
document.getElementById("navUserName").innerHTML= getCurrentUser().name

getProjects().forEach(function callback(project, index) {
    console.log(project.projectName+"---"+project.projectDescription);
    
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

    let markup = "<tr><td> " + (index+1) + "</td><td><a>"+ project.projectName +"</a><br/><small>" + project.startDate + "</small></td><td><ul class='list-inline'>"+ project.imgAvatar +"<li class='list-inline-item'><button id='btnAddMember"+index+"' type='button' class='btn' data-toggle='modal' data-target='#modal-success'><img alt='Avatar' class='table-avatar' src='../../dist/img/plus.png'></button></li></ul></td><td >" + getNumberOfDays(new Date(), project.endDate) + " Days</td><td class='project-state'><span class='badge "+ className +"'> " + project.projectStatus + " </span></td><td class='project-actions text-right'><a class='btn btn-primary btn-sm' onclick='goToEditProject("+index+")'><i class='fas fa-pencil-alt'></i> Edit</a>&nbsp; &nbsp;<a class='btn btn-info btn-sm' onclick='goToFilteredTask("+index+")'><i class='fas fa-folder'></i>  View task</a></td></tr>";
    $("table tbody").append(markup);
    
    index++;
  });

/* for(let i = 0; i < projectList.length; i++){
    let markup = "<tr><td> " + i + "</td><td><a>"+ projectList[i].projectname +"</a><br/><small>" + projectList[i].date + "</small></td><td><ul class='list-inline'><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar.png'></li><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar2.png'></li><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar3.png'></li><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar4.png'></li><li class='list-inline-item'><button id='btnAddMember"+i+"' type='button' class='btn' data-toggle='modal' data-target='#modal-success'><img alt='Avatar' class='table-avatar' src='../../dist/img/plus.png'></button></li></ul></td><td class='project_progress'><div class='progress progress-sm'><div class='progress-bar bg-green' role='progressbar' aria-valuenow='57' aria-valuemin='0' aria-valuemax='100' style='width: 57%'></div></div><small> " + projectList[i].completion + "</small></td><td class='project-state'><span class='badge badge-success'> " + projectList[i].status + " </span></td><td class='project-actions text-right'><a class='btn btn-info btn-sm' href='./project-edit.html'><i class='fas fa-pencil-alt'></i>Edit</a></td></tr>";
    $("table tbody").append(markup);
}
 */
for(let j = 0; j < getProjects().length; j++){
    $("#btnAddMember"+j).click(function() {
        currentIndex = j;
        $('#modal-newMember').modal('show');
     });
}

function goToEditProject(index){
    console.log("index: "+ index);
    currentIndex = index;
    let projectList = getProjects();
    let currentProjectId = projectList[index].projectId;
    localStorage.setItem(CURRENT_PROJECT_INDEX, JSON.stringify(currentIndex));
    localStorage.setItem(CURRENT_PROJECT_ID, JSON.stringify(currentProjectId));
    window.location.href = "./project-edit.html";
}

function goToFilteredTask(index){
    let projectList = getProjects();
    let currentProjectId = projectList[index].projectId;
    console.log("index: "+ index);
    currentIndex = index;
    localStorage.setItem(CURRENT_PROJECT_ID, JSON.stringify(currentProjectId));
    localStorage.setItem(CURRENT_PROJECT_INDEX, JSON.stringify(currentIndex));
    window.location.href = "./filtered_task_list.html";
}



var userList = JSON.parse(localStorage.getItem(USERS));
var usersBySubrole = {
    "Business Analyst": userList.filter(user => user.subrole == "Business Analyst"),
    "Front end developer": userList.filter(user => user.subrole == "Front end developer"),
    "Back end developer": userList.filter(user => user.subrole == "Back end developer"),
    "Full stack developer": userList.filter(user => user.subrole == "Full stack developer"),
}

function onChangeOfRole(value){
    
    let projectList = getProjects();
    
    if(value != undefined){
        if (value.length == 0){
             document.getElementById("selecteMemberEmail").innerHTML = "<option></option>";
        } else {
            var memberOptions = "";
            for (userId in usersBySubrole[value]) {
                if(!projectList[currentIndex].projectMembers.includes(usersBySubrole[value][userId].email)){
                    memberOptions += "<option>" + usersBySubrole[value][userId].email + "</option>";
                }
            }
            document.getElementById("selecteMemberEmail").innerHTML = memberOptions;
        }
    }
}
onChangeOfRole();

function addMemberToProject(){
    let memberRole = document.getElementById("selecteRoleOfMember").value;
    let memberEmail = document.getElementById("selecteMemberEmail").value;

    if(memberRole == undefined || memberRole == "Select the role of member" || memberEmail == undefined || memberEmail == ""){
        alert("Select member first");
    } else{
        let newProjectList = getProjects();
        let projectToBeRemoved = newProjectList.splice(currentIndex, 1)[0];

        projectToBeRemoved.projectMembers.push(memberEmail);
        projectToBeRemoved.imgAvatar += "<li class='list-inline-item'><a data-toggle='tooltip' data-placement='top' title='"+ memberEmail.split("@")[0].toUpperCase() +"'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar.png'></li>";

        var editedProject = new Project(projectToBeRemoved.projectId, projectToBeRemoved.projectName, projectToBeRemoved.projectDescription, projectToBeRemoved.projectStatus, projectToBeRemoved.startDate, projectToBeRemoved.endDate, projectToBeRemoved.clientCompany, projectToBeRemoved.estimateBudget, projectToBeRemoved.estimateHours, projectToBeRemoved.projectMembers, projectToBeRemoved.imgAvatar, projectToBeRemoved.taskList);
        newProjectList.push(editedProject);

        localStorage.setItem(PROJECTS, JSON.stringify(newProjectList));

        window.location.href=window.location.href;
    }
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