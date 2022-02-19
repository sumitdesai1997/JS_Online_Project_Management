var IdName = document.getElementById("inputName");
var IdEmail = document.getElementById("inputEmail");
var IdExperience = document.getElementById("inputExperience");
var IdSkills = document.getElementById("inputSkills");


var user = getCurrentUser()

IdName.value = user.name
IdEmail.value = user.email

function submitProfileChanges(){

}