var getUsers = () => {
  return JSON.parse(localStorage.getItem(USERS) || "[]");
}
// var getTeamMembers = () => {
//   return JSON.parse(localStorage.getItem(MEMBERS) || "[]");
// }

function addUsers(users) {
  if(getUsers().length==0)
    localStorage.setItem(USERS, JSON.stringify(users));
};

// function addMembers(memebers) {
//   if(getTeamMembers().length==0)
//     localStorage.setItem(MEMBERS, JSON.stringify(memebers));
// };

function setCurrentUser(user) {
  localStorage.setItem(CURRENT_USER, JSON.stringify(user));
}

function getCurrentUser(){
  return JSON.parse(localStorage.getItem(CURRENT_USER)|| "");
}
/* function getCurrentRole(){
  return JSON.parse(localStorage.getItem(CURRENT_USER)|| "").role;
}
function getCurrentUserId(){
  return JSON.parse(localStorage.getItem(CURRENT_USER)|| "").email;
} */


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
