

var users =[]
// var members =[]

var user = {
    name: "manager",
    email: "manager@yopmail.com",
    password: 12345,
    role:"manager"
   
};
users.push(user)


var user = {
    name: "member",
    email: "member@yopmail.com",
    password: 12345,
    role:"member"
   
};

users.push(user)
addUsers(users)
//addMembers(members)

    


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
        getUsers().forEach( user => {
            console.log(user);
            if(signInEmail == user.email && signInPassword == user.password) {
                matchedUser = user;
                console.log(user)
            }
        });
        // if(matchedUser==null){
        //     getTeamMembers().forEach( member => {
        //         console.log(member);
        //         if(signInEmail == member.email && signInPassword == member.password) {
        //             matchedUser = member;
        //             console.log(member)
        //         }
        //     }); 
        // }

        setCurrentUser(matchedUser)
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