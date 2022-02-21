var IdName = document.getElementById("inputName");
//var IdEmail = document.getElementById("inputEmail");
var IdExperience = document.getElementById("inputExperience");
var IdSkills = document.getElementById("inputSkills");
var IdNotes = document.getElementById("inputNotes");

var currentUser = getCurrentUser()
IdName.value = currentUser.name
//IdEmail.value = user.email
IdExperience.value=currentUser.experience
IdSkills.value=currentUser.skills
IdNotes.value=currentUser.note

document.getElementById("navUserName").innerHTML= getCurrentUser().name


document.getElementById("managerName").innerHTML=currentUser.name
document.getElementById("managerSubRole").innerHTML=currentUser.subrole
document.getElementById("managerEmail").innerHTML=currentUser.email
document.getElementById("managerExperience").innerHTML=currentUser.experience+" years"
document.getElementById("managerSkills").innerHTML=currentUser.skills
document.getElementById("managerProjects").innerHTML= getProjects().length
document.getElementById("managerTasks").innerHTML= getTasks().length
document.getElementById("managerNotes").innerHTML= currentUser.note


function submitProfileChanges(){

    // if(IdName.value==""){
    //     alert("Name can't be blank")
    // }else if(IdExperience.value==""){
    //     alert("Experience can't be blank")
    // }else if(IdSkills.value==""){
    //     alert("Skills can't be blank")
    // }else{

    

        var user = {
            name: IdName.value,
            email: currentUser.email,
            password: currentUser.password,
            role:currentUser.role,
            subrole: currentUser.subrole,
            experience: IdExperience.value,
            skills:IdSkills.value,
            note:IdNotes.value
        };

        console.log("Updated User :: "+user)

            editUserProfile(currentUser.email,user)
    //}


}