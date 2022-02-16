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
        projectToBeRemoved.imgAvatar += "<li class='list-inline-item'><img alt='Avatar' class='table-avatar' src='../../dist/img/avatar.png'></li>";

        var editedProject = new Project(projectToBeRemoved.projectId, projectToBeRemoved.projectName, projectToBeRemoved.projectDescription, projectToBeRemoved.projectStatus, projectToBeRemoved.startDate, projectToBeRemoved.endDate, projectToBeRemoved.clientCompany, projectToBeRemoved.estimateBudget, projectToBeRemoved.estimateHours, projectToBeRemoved.projectMembers, projectToBeRemoved.imgAvatar, projectToBeRemoved.taskList);
        newProjectList.push(editedProject);

        localStorage.setItem(PROJECTS, JSON.stringify(newProjectList));

        window.location.href=window.location.href;
    }
}

function goToEditProject(){
    let newProjectList = getProjects();
    let selectEditProjectName = document.getElementById("selectEditProject").value;

    for(var i = 0; i < newProjectList.length; i++){
        if(newProjectList[i].projectName == selectEditProjectName){
            localStorage.setItem(CURRENT_PROJECT_INDEX, JSON.stringify(i));
            break;
        }
    }

    window.location.href = "./src/html/project-edit.html"
}