var IdName = document.getElementById("inputName");

var IdExperience = document.getElementById("inputExperience");
var IdSkills = document.getElementById("inputSkills");
var IdHourlyRate = document.getElementById("inputHourlyRate");
var IdNotes = document.getElementById("inputNotes");

var currentUser = getCurrentUser()



IdName.value = currentUser.name
IdExperience.value=currentUser.experience
IdHourlyRate.value=currentUser.payrate
IdSkills.value=currentUser.skills
IdNotes.value=currentUser.note

document.getElementById("navUserName").innerHTML= getCurrentUser().name

document.getElementById("memberName").innerHTML=currentUser.name
document.getElementById("memberSubRole").innerHTML=currentUser.subrole
document.getElementById("memberEmail").innerHTML=currentUser.email
document.getElementById("memberHourlyRate").innerHTML="$"+currentUser.payrate
document.getElementById("memberExperience").innerHTML=currentUser.experience+" years"
document.getElementById("memberSkills").innerHTML=currentUser.skills
document.getElementById("memberProjects").innerHTML= getProjects().length
document.getElementById("memberTasks").innerHTML= getTasks().length
document.getElementById("memberNotes").innerHTML= currentUser.note

function submitProfileChanges(){
    

        // if(IdName.value==""){
        //     alert("Name can't be blank")
        // }else if(IdExperience.value==""){
        //     alert("Experience can't be blank")
        // }else if(IdHourlyRate.value==""){
        //     alert("Hourly Rate can't be blank")
        // }else if(IdSkills.value==""){
        //     alert("Skills can't be blank")
        // }else{
    
            var user = {
                name: IdName.value,
                email: currentUser.email,
                password: currentUser.password,
                role:currentUser.role,
                subrole: currentUser.subrole,
                payrate: IdHourlyRate.value,
                experience: IdExperience.value,
                skills:IdSkills.value,
                note:IdNotes.value
            };
    
    
                editUserProfile(currentUser.email,user)
        //}
    
   

}