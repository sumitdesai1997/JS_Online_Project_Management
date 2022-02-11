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
class Project {
  constructor(projectName, projectDescription, projectStatus, startDate, endDate, clientCompany, estimateBudget, estimateHours) {
    this.projectName = projectName;
    this.projectDescription = projectDescription;
    this.projectStatus = projectStatus;
    this.startDate = startDate;
    this.endDate = endDate;
    this.clientCompany = clientCompany;
    this.estimateBudget = estimateBudget;
    this.estimateHours = estimateHours;
  }
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
  // totalHours=document.getElementById("projectEndDate").value;
  // totalBudget=document.getElementById("projectEndDate").value;

  var project1 = new Project(projectName, projectDescription, projectStatus, startDate, endDate, clientCompany, estimateBudget, estimateHours);
  //var project1String = project1;
  //getProjrcts();
  //getProjrcts();
  createProject(project1);
}

