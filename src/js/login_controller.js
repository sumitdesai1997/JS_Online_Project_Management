

var users =[]
// var members =[]

var user = {
    name: "Richardson",
    email: "manager@yopmail.com",
    password: 12345,
    role:"manager",
    subrole: "manager",
    experience: 2,
    skills:"Team management, Scrum management",
    note:""
    
   
};

users.push(user)


var user = {
    name: "member",
    email: "member@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Back end developer",
    payrate: 20,
    experience: 0,
    skills:"Java Script, Php",
    note:""

};

var user1 = {
    name: "Dinamol",
    email: "dinamol@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Front end developer",
    payrate: 20,
    experience: 0,
    skills:"Java Script, Php",
    note:""
};

var user2 = {
    name: "Ranjana",
    email: "ranjana@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Back end developer",
    payrate: 25,
    experience: 0,
    skills:"Java Script, Php",
    note:""
};

var user3 = {
    name: "Mihin",
    email: "mihin@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Full stack developer",
    payrate: 22,
    experience: 0,
    skills:"Java Script, Php",
    note:""
};

var user4 = {
    name: "Sumit",
    email: "sumit@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Full stack developer",
    payrate: 24,
    experience: 0,
    skills:"Java Script, Php",
    note:""
};

var user5 = {
    name: "Yash",
    email: "yash@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Full stack developer",
    payrate: 30,
    experience: 0,
    skills:"Java Script, Php",
    note:""
};

var user6 = {
    name: "Dhruv",
    email: "dhruv@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Back end developer",
    payrate: 27,
    experience: 0,
    skills:"Java Script, Php",
    note:""
};

var user7 = {
    name: "Ravi",
    email: "ravi@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Full stack developer",
    payrate: 25,
    experience: 0,
    skills:"Java Script, Php",
    note:""
};

var user8 = {
    name: "Kevin",
    email: "kevin@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Front end developer",
    payrate: 21,
    experience: 0,
    skills:"Java Script, Php",
    note:""
};

var user9 = {
    name: "Virat",
    email: "virat@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Back end developer",
    payrate: 30,
    experience: 0,
    skills:"Java Script, Php",
    note:""
};

var user10 = {
    name: "Rohit",
    email: "rohit@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Business Analyst",
    payrate: 18,
    experience: 0,
    skills:"Java Script, Php",
    note:""
};

var user11 = {
    name: "Ishant",
    email: "ishant@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Business Analyst",
    payrate: 16,
    experience: 0,
    skills:"Java Script, Php",
    note:""
};

var user12 = {
    name: "Vikas",
    email: "vikas@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Front end developer",
    payrate: 25,
    experience: 0,
    skills:"Java Script, Php",
    note:""
};

users.push(user);
users.push(user1);
users.push(user2);
users.push(user3);
users.push(user4);
users.push(user5);
users.push(user6);
users.push(user7);
users.push(user8);
users.push(user9);
users.push(user10);  
users.push(user11);
users.push(user12);

console.log("userlist size ::"+getUsers().length)

if(getUsers().length==0)
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