//console.log("currentUser"+ getCurrentUserId())

$('#hrefAddMember').click(function() {
    $('#modal-newMemberWithProject').modal('show');
});

$('#hrefEditProject').click(function() {
    $('#modal-editProject').modal('show');
});

var userList = JSON.parse(localStorage.getItem(USERS));
var usersBySubrole = {
    "Business Analyst": userList.filter(user => user.subrole == "Business Analyst"),
    "Front end developer": userList.filter(user => user.subrole == "Front end developer"),
    "Back end developer": userList.filter(user => user.subrole == "Back end developer"),
    "Full stack developer": userList.filter(user => user.subrole == "Full stack developer"),
}

document.getElementById("navUserName").innerHTML= getCurrentUser().name

var recentProjects= getProjects().reverse().slice(0,5)

getProjects().reverse().slice(0,5).forEach(function callback(project, index) {
    console.log(project.projectName+"---"+project.projectDescription);
    // project.reverse();
    //let markup = "<tr><td> " + index + "</td><td><a>"+ project.projectName +"</a><br/><small>" + project.startDate + "</small></td><td><ul class='list-inline'><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar.png'></li><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar2.png'></li><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar3.png'></li><li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar4.png'></li><li class='list-inline-item'><button id='btnAddMember"+index+"' type='button' class='btn' data-toggle='modal' data-target='#modal-success'><img alt='Avatar' class='table-avatar' src='../../dist/img/plus.png'></button></li></ul></td><td class='project_progress'><div class='progress progress-sm'><div class='progress-bar bg-green' role='progressbar' aria-valuenow='57' aria-valuemin='0' aria-valuemax='100' style='width: 57%'></div></div><small> " + project.estimateHours + "</small></td><td class='project-state'><span class='badge badge-success'> " + project.projectStatus + " </span></td><td class='project-actions text-right'><button class='btn btn-info btn-sm' onclick='goToEditProject("+index+")'><i class='fas fa-pencil-alt'></i>Edit</a></td></tr>";
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

    let markup = "<tr><td> " + (index+1) + "</td><td><a>"+ project.projectName +"</a><br/><small>" + project.startDate + "</small></td><td><ul class='list-inline'>"+ imgAvatar +"</ul></td><td >" + getNumberOfDays(new Date(), project.endDate) + " Days</td><td class='project-state'><span class='badge "+ className +"'> " + project.projectStatus + " </span></td><td class='project-actions text-right'><a class='btn btn-primary btn-sm' onclick='goToEditProject("+index+")'><i class='fas fa-pencil-alt'></i> Edit</a>&nbsp; &nbsp;<a class='btn btn-info btn-sm' onclick='goToFilteredTask("+index+")'><i class='fas fa-folder'></i>  View task</a></td></tr>";
    $("table tbody").append(markup);
    
  });
  

function loadModalData(){
    
    let projectList = getProjects();
    
    if (projectList.length == 0){
            document.getElementById("selectProject").innerHTML = "<option></option>";
            document.getElementById("selectEditProject").innerHTML = "<option></option>";
    } else {
        var projectOptions = "";
        for (index in projectList) {
            projectOptions += "<option value='"+projectList[index].projectName+"'>" + projectList[index].projectName + "</option>";
        }
        document.getElementById("selectProject").innerHTML = projectOptions;
        document.getElementById("selectEditProject").innerHTML = projectOptions;
    }
}
loadModalData();

function onChangeOfRole(value){
    
    let projectList = getProjects();
    let selectedProjectName = document.getElementById("selectProject").value;
    let selectedProject;

    if(value != undefined){
        if (value.length == 0){
             document.getElementById("selectMember").innerHTML = "<option></option>";
        } else {
            var memberOptions = "";

            for(var i = 0; i < projectList.length; i++){
                if(projectList[i].projectName == selectedProjectName){
                    selectedProject = projectList[i];
                }
            }

            for (userId in usersBySubrole[value]) {
                if(!selectedProject.projectMembers.includes(usersBySubrole[value][userId].email)){
                    memberOptions += "<option>" + usersBySubrole[value][userId].email + "</option>";
                }
            }
            document.getElementById("selectMember").innerHTML = memberOptions;
        }
    }
}
onChangeOfRole();

function addMemberToProject(){
    let selectedProjectName = document.getElementById("selectProject").value;
    //let memberRole = document.getElementById("selecteRoleOfMember").value;
    let selectedMemberEmail = document.getElementById("selectMember").value;
    let currentIndex;

    if(selectMember == undefined || selectMember == "Select the role of member" || selectedMemberEmail == undefined || selectedMemberEmail == ""){
        alert("Select member first");
    } else{
        let newProjectList = getProjects();

        for(var i = 0; i < newProjectList.length; i++){
            if(newProjectList[i].projectName == selectedProjectName){
                currentIndex = i;
            }
        }

        let projectToBeRemoved = newProjectList.splice(currentIndex, 1)[0];

        projectToBeRemoved.projectMembers.push(selectedMemberEmail);
        projectToBeRemoved.imgAvatar += "<li class='list-inline-item'><a data-toggle='tooltip' data-placement='top' title='"+ selectedMemberEmail.split("@")[0].toUpperCase() +"'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar.png'></li>";

        var editedProject = new Project(projectToBeRemoved.projectId, projectToBeRemoved.projectName, projectToBeRemoved.projectDescription, projectToBeRemoved.projectStatus, projectToBeRemoved.startDate, projectToBeRemoved.endDate, projectToBeRemoved.clientCompany, projectToBeRemoved.estimateBudget, projectToBeRemoved.estimateHours, projectToBeRemoved.projectMembers, projectToBeRemoved.imgAvatar, projectToBeRemoved.taskList);
        newProjectList.push(editedProject);

        localStorage.setItem(PROJECTS, JSON.stringify(newProjectList));

        window.location.href=window.location.href;
    }
}

function goToEditProject(index){

    if(index == undefined || index == null){
        let newProjectList = getProjects();
        let selectEditProjectName = document.getElementById("selectEditProject").value;
    
         for(var i = 0; i < newProjectList.length; i++){
            if(newProjectList[i].projectName == selectEditProjectName){
                console.log("name matched :: "+newProjectList[i].projectName+"=="+selectEditProjectName);
                localStorage.setItem(CURRENT_PROJECT_ID, JSON.stringify(newProjectList[i].projectId));
                break;
            }
        }
    
        window.location.href = "./src/html/project-edit.html"
    } else {
        let currentProjectListInRecentView = getProjects().reverse().slice(0,5);

        localStorage.setItem(CURRENT_PROJECT_ID, JSON.stringify(currentProjectListInRecentView[index].projectId));
        window.location.href = "./src/html/project-edit.html"
    }



}

function goToFilteredTask(index){
    let currentProjectListInRecentView = getProjects().reverse().slice(0,5);
   
    localStorage.setItem(CURRENT_PROJECT_ID, JSON.stringify(currentProjectListInRecentView[index].projectId));
   
    localStorage.setItem(CURRENT_PROJECT_INDEX, JSON.stringify(index));
    window.location.href = "./src/html/filtered_task_list.html";
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