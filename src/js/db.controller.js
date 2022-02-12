let MANAGERS="managers"
let MEMBERS="members"
let PROJECTS="projects"
let TASKS="tasks"

var getManagers = () => {
  return JSON.parse(localStorage.getItem(MANAGERS) || "[]");
}
var getTeamMembers = () => {
  return JSON.parse(localStorage.getItem(MEMBERS) || "[]");
}

function addManagers(managers) {
  if(getManagers().length==0)
    localStorage.setItem(MANAGERS, JSON.stringify(managers));
};

function addMembers(memebers) {
  if(getTeamMembers().length==0)
    localStorage.setItem(MEMBERS, JSON.stringify(memebers));
};

var loggedInUser = (user) => {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
}

//Add New Project
var getProjects = () => {
  return JSON.parse(localStorage.getItem(PROJECTS) || "[]");
}


function createProject(project){
  var projectList=getProjects()
    projectList.push(project);
    localStorage.setItem(PROJECTS, JSON.stringify(projectList));
  
};

var getTasks = () => {
  return JSON.parse(localStorage.getItem(TASKS) || "[]");
}

function addTaskIntoDB(task){
  var taskList = getTasks()
  taskList.push(task);
  localStorage.setItem(TASKS, JSON.stringify(taskList));
  
};
