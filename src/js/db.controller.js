let MANAGERS="managers"
let MEMBERS="members"

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



