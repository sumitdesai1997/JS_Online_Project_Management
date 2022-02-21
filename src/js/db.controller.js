var getUsers = () => {
  return JSON.parse(localStorage.getItem(USERS) || "[]");
}
// var getTeamMembers = () => {
//   return JSON.parse(localStorage.getItem(MEMBERS) || "[]");
// }

function addUsers(users) {
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


function createProject(project, callback){
  var projectList=getProjects()
    projectList.push(project);
    localStorage.setItem(PROJECTS, JSON.stringify(projectList));
  
    callback();
};

var getTasks = () => {
  return JSON.parse(localStorage.getItem(TASKS) || "[]");
}

function addTaskIntoDB(task){
  var taskList = getTasks()
  taskList.push(task);
  localStorage.setItem(TASKS, JSON.stringify(taskList));
  
};


function editUserProfile(userEmail,updatedUser){
  var users=getUsers()
  
  users.forEach((user, index) => {
    if(user.email === userEmail) {
        users[index] = updatedUser;
    }
  });
localStorage.setItem(CURRENT_USER, JSON.stringify(updatedUser));
localStorage.setItem(USERS, JSON.stringify(users));


}

function signOut(){
  localStorage.removeItem(CURRENT_USER)
}