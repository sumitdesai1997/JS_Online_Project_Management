var IdProjectStartDate = document.getElementById("editprojectStartDate");
var IdProjectEndDate = document.getElementById("editprojectEndDate");

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

if (dd < 10) {
  dd = '0' + dd;
}

if (mm < 10) {
  mm = '0' + mm;
} 
    
today = yyyy + '-' + mm + '-' + dd;
IdProjectStartDate.setAttribute("min", today);

function setMinForProjectEndDate(){
  IdProjectEndDate.setAttribute("min", IdProjectStartDate.value);
}

$('#btnAddNewTask').click(function() {
  $('#modal-newTask').modal('show');
});

function onChangeTaskDependency(){
  let value = document.getElementById("taskdependant1").checked ? "Yes" : "No";
  if(value == "Yes"){
    document.getElementById("dependentTaskDiv").hidden = true;
  } else {
    document.getElementById("dependentTaskDiv").hidden = false;
  }
}


function addTask(){

  let taskName = document.getElementById("taskInputName").value;
  let taskDescription = document.getElementById("taskInputDescription").value;
  let taskStatus = document.getElementById("taskInputStatus").value;
  let startDate = document.getElementById("taskStartDate").value;
  let endDate = document.getElementById("taskEndDate").value;
  let taskMemberEmail = document.getElementById("taskInputMemberEmail").value;
  let taskEstimateHours = document.getElementById("inputTaskHours").value;
  let taskEstimateBudget = document.getElementById("inputTaskCost").value;

  let isTaskIndependent = document.getElementById("taskdependant1").checked ? "Yes" : "No";
  let dependentTask = document.getElementById("dependentTask").value;
  
  var task = new Task(taskName, taskDescription, taskStatus, startDate, endDate, taskMemberEmail, taskEstimateBudget, taskEstimateHours, isTaskIndependent, dependentTask);

  addTaskIntoDB(task);
}

getProjects().forEach(function callback(project, index) {
  console.log(project.projectName+"---"+project.projectDescription);
  console.log("currentIndex: " + currentIndex);
  currentIndex = localStorage.getItem(CURRENT_PROJECT_INDEX, JSON.parse(currentIndex));

  if(index == currentIndex){
    document.getElementById("editInputName").value = project.projectName;
    document.getElementById("editInputDescription").value = project.projectDescription;
    document.getElementById("editInputStatus").value = project.projectStatus;
    document.getElementById("editprojectStartDate").value = project.startDate;
    document.getElementById("editprojectEndDate").value = project.endDate;
    document.getElementById("editIputClientCompany").value = project.clientCompany;
    document.getElementById("editInputEstimatedBudget").value = project.estimateBudget;
    document.getElementById("editInputEstimatedHours").value = project.estimateHours;
  }

  index++;
});

function saveChanges(){
  getProjects().forEach(function callback(project, index) {
    currentIndex = localStorage.getItem(CURRENT_PROJECT_INDEX, JSON.parse(currentIndex));
  
    if(index == currentIndex){
      let newProjectList = getProjects();
      let projectToBeRemoved = newProjectList.splice(index, 1)[0];
      
      let projectName = document.getElementById("editInputName").value;
      let projectDescription = document.getElementById("editInputDescription").value;
      let projectStatus = document.getElementById("editInputStatus").value;
      let startDate = document.getElementById("editprojectStartDate").value;
      let endDate = document.getElementById("editprojectEndDate").value;
      let clientCompany = document.getElementById("editIputClientCompany").value;
      let estimateBudget = document.getElementById("editInputEstimatedBudget").value;
      let estimateHours = document.getElementById("editInputEstimatedHours").value;
      let projectMembers = projectToBeRemoved.projectMembers;
      let imgAvatar = projectToBeRemoved.imgAvatar;

      var editedProject = new Project(projectName, projectDescription, projectStatus, startDate, endDate, clientCompany, estimateBudget, estimateHours, projectMembers, imgAvatar);
      newProjectList.push(editedProject);
      
      localStorage.setItem(PROJECTS, JSON.stringify(newProjectList));

      var x = document.getElementById("toastEditProject");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

      setTimeout(function(){window.location.href="../../index.html";}, 3500);
    }
  
    index++;
  });
}

