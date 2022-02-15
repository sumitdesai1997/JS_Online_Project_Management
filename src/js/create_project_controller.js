var IdProjectStartDate = document.getElementById("projectStartDate");
var IdProjectEndDate = document.getElementById("projectEndDate");

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

function addProject(){
   let projectName,projectDescription,projectStatus,startDate,endDate,clientCompany,estimateBudget,estimateHours,totalHours,totalBudget;
   projectName=document.getElementById("inputName").value;
   projectDescription=document.getElementById("inputDescription").value;
   projectStatus=document.getElementById("inputStatus").value;
   startDate=document.getElementById("projectStartDate").value;
   endDate=document.getElementById("projectEndDate").value;
   clientCompany=document.getElementById("inputClientCompany").value;
   estimateBudget=document.getElementById("inputEstimatedBudget").value;
   estimateHours=document.getElementById("inputEstimatedHours").value;
   totalHours=document.getElementById("projectEndDate").value;
   totalBudget=document.getElementById("projectEndDate").value;
   let projectMembers = [];
  /* var project = {
    projectName: document.getElementById("inputName").value,
    projectDescription: document.getElementById("inputDescription").value,
    projectStatus: document.getElementById("inputStatus").value,
    startDate:document.getElementById("projectStartDate").value,
    endDate: document.getElementById("projectEndDate").value,
    clientCompany:document.getElementById("inputClientCompany").value,
    estimateBudget: document.getElementById("inputEstimatedBudget").value,
    estimateHours:document.getElementById("inputEstimatedHours").value,
   
}; */

var project1 = new Project(projectName, projectDescription, projectStatus, startDate, endDate, clientCompany, estimateBudget, estimateHours, projectMembers);


  //createProject(project1);

  createProject(project1, function() {
    resetForm();
  });
}

function resetForm(){
  document.getElementById("inputName").value = "";
  document.getElementById("inputDescription").value = "";
  document.getElementById("inputStatus").value = "Select one";
  document.getElementById("projectStartDate").value = "";
  document.getElementById("projectEndDate").value = "" ;
  document.getElementById("inputClientCompany").value = "" ;
  document.getElementById("inputEstimatedBudget").value = "";
  document.getElementById("inputEstimatedHours").value = "";

  var x = document.getElementById("toastCreateProject");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

  setTimeout(function(){window.location.href="../../index.html";}, 3500);
}

