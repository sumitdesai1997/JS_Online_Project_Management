var projectList = getProjects();
var taskList = getTasks();

var currentProjectId =JSON.parse(localStorage.getItem(CURRENT_PROJECT_ID));

var currentProject = projectList.filter(project => project.projectId == currentProjectId)[0];

var userList = JSON.parse(localStorage.getItem(USERS));
var teamMemberList = userList.filter(user => currentProject.projectMembers.includes(user.email));

var totalAmount = 0;
var totalTime = 0;
document.getElementById("navUserName").innerHTML= getCurrentUser().name
//var teamMemberNameList = [];
teamMemberList.forEach(element => {
    document.getElementById("reportTeamMember").innerHTML += element.name + "<br>";
});

document.getElementById("reportProjectName").innerHTML = currentProject.projectName;
document.getElementById("reportProjectDescription").innerHTML = currentProject.projectDescription;
document.getElementById("reportManagerName").innerHTML = getCurrentUser().name;


currentProject.taskList.forEach(function callback(task, index) {
    console.log(task.taskName+"---"+task.taskDescription);
    
    let amountSpent = parseInt(task.actualTaskHours) * (task.taskEstimateBudget / parseInt(task.taskEstimateHours)); 
    let markup = "<tr><td>"+ (index + 1) +"</td><td>" + task.taskName +"</td><td>"+ task.taskDescription +"</td><td>$"+task.taskEstimateBudget+"</td><td>$" + amountSpent + "</td></tr>";
     
    $("#taskBudget").append(markup);
    
    totalAmount += amountSpent;
    totalTime += parseInt(task.taskEstimateHours);
    index++;
  });

  document.getElementById("subTotal").innerHTML ="$"+ totalAmount;
  document.getElementById("tax").innerHTML ="$"+  Math.round(totalAmount * 0.18);
  document.getElementById("total").innerHTML ="$"+  Math.round(totalAmount * 1.18);
  document.getElementById("amountDue").innerHTML ="Final payment details:";

  document.getElementById("estimatedBudget").innerHTML = "$"+currentProject.estimateBudget;
  document.getElementById("amountSpent").innerHTML = "$"+totalAmount;
  document.getElementById("estimatedDuration").innerHTML = currentProject.estimateHours+"hr";
  document.getElementById("timeSpent").innerHTML = totalTime+"hr";

  document.getElementById("budgetEffi").innerHTML = (currentProject.estimateBudget / totalAmount).toString().substring(0, 4);
  document.getElementById("timeEffi").innerHTML = (currentProject.estimateHours / totalTime).toString().substring(0, 4);