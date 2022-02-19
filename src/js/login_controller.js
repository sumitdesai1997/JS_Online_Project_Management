

var users =[]
// var members =[]

var user = {
    name: "manager",
    email: "manager@yopmail.com",
    password: 12345,
    role:"manager",
    subrole: "manager"
   
};

users.push(user)


var user = {
    name: "member",
    email: "member@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Back end developer",
    payrate: 20
};

var user1 = {
    name: "dinamol",
    email: "dinamol@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Front end developer",
    payrate: 20
};

var user2 = {
    name: "ranjana",
    email: "ranjana@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Back end developer",
    payrate: 25
};

var user3 = {
    name: "mihin",
    email: "mihin@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Full stack developer",
    payrate: 22
};

var user4 = {
    name: "sumit",
    email: "sumit@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Full stack developer",
    payrate: 24
};

var user5 = {
    name: "Yash",
    email: "yash@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Full stack developer",
    payrate: 30
};

var user6 = {
    name: "Dhruv",
    email: "dhruv@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Back end developer",
    payrate: 27
};

var user7 = {
    name: "Ravi",
    email: "ravi@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Full stack developer",
    payrate: 25
};

var user8 = {
    name: "Kevin",
    email: "kevin@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Front end developer",
    payrate: 21
};

var user9 = {
    name: "Virat",
    email: "virat@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Back end developer",
    payrate: 30
};

var user10 = {
    name: "Rohit",
    email: "rohit@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Business Analyst",
    payrate: 18
};

var user11 = {
    name: "Ishant",
    email: "ishant@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Business Analyst",
    payrate: 16
};

var user12 = {
    name: "Vikas",
    email: "vikas@yopmail.com",
    password: 12345,
    role:"member",
    subrole: "Front end developer",
    payrate: 25
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