var IdsignInEmail = document.getElementById("signInEmail");
var IdsignInPassword = document.getElementById("signInPassword");
var managerEmail = "manager";
var memberEmail = "member";

function performSignIn(){

    if((IdsignInEmail.value).includes(managerEmail)){
        window.location.href = "../../index.html";
    } else if ((IdsignInEmail.value).includes(memberEmail)){
        window.location.href = "../../member_dashboard.html";
    }

}