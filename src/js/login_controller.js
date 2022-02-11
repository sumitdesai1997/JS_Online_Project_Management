

var projectManagers =[]
var members =[]

var projectManager = {
    NAME: "manager",
    email: "manager@yopmail.com",
    password: 12345,
    role:"manager"
   
};
projectManagers.push(projectManager)
addManagers(projectManagers)

var teamMemeber = {
    name: "member",
    email: "member@yopmail.com",
    password: 12345,
    role:"member"
   
};

members.push(teamMemeber)
addMembers(members)

    


// var managerEmail = "manager";
// var memberEmail = "member";

function performSignIn(){
    var matchedUser =null
    var signInEmail = document.getElementById("signInEmail").value;
    var signInPassword = document.getElementById("signInPassword").value;
    if(signInEmail=="")
        alert("Enter Email First")
    else if(signInPassword=="")
        alert("Enter Password First")
    else{
        getManagers().forEach( manager => {
            console.log(manager);
            if(signInEmail == manager.email && signInPassword == manager.password) {
                matchedUser = manager;
                console.log(manager)
            }
        });
        if(matchedUser==null){
            getTeamMembers().forEach( member => {
                console.log(member);
                if(signInEmail == member.email && signInPassword == member.password) {
                    matchedUser = member;
                    console.log(member)
                }
            }); 
        }
        if(matchedUser==null){
            alert("User not found")
        }

        if(matchedUser.role=="manager"){
            window.location.href = "../../index.html";
        }else{
            window.location.href = "../../member_dashboard.html";
        }


    }
 

}