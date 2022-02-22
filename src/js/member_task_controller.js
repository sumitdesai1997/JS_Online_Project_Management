var taskList = getTasks();
var userTaskList = taskList.filter(task => task.taskMemberEmail == getCurrentUser().email);

$('#btnAddMember').click(function() {
    $('#modal-newMember').modal('show');
 });

/*  var taskList = [
    { taskName : "Eat", date : "29/06/2022", taskDesc: "Eat good", left :  "5% left", status : "About to Success" },
    { taskName : "Drink", date : "22/06/2022", taskDesc: "Drink good", left :  "15% left", status : "Success" },
    { taskName : "Sleep", date : "19/06/2022", taskDesc: "Sleep good", left :  "20% left", status : "Success" },
    { taskName : "Repeat", date : "11/06/2022", taskDesc: "Repeat everyday", left :  "5% left", status : "Success" },
] */

for(let i = 0; i < userTaskList.length; i++){

    let className;
    if(userTaskList[i].taskStatus == "Success"){
        className = "badge-success";
    } else if (userTaskList[i].taskStatus == "Work in progress"){
        className ="badge-primary";
    } else if(userTaskList[i].taskStatus == "Canceled"){
        className ="badge-danger";
    } else if(userTaskList[i].taskStatus == "On Hold"){
        className ="badge-warning";
    } else {
        className ="badge-success";
    }

    let markup = "<tr><td> " + (i+1) + " </td><td><a>" + userTaskList[i].taskName +"</a><br/><small>" + userTaskList[i].startDate +"</small></td><td>" + userTaskList[i].taskDescription + "</td><td >" + getNumberOfDays(new Date(), userTaskList[i].endDate) + " days</td><td class='project-state'><span class='badge "+className+"'>" + userTaskList[i].taskStatus +"</span></td><td class='project-actions text-right'><button class='btn btn-info btn-sm' onclick='goToEditTask("+i+")'><i class='fas fa-pencil-alt'></i>Edit</a></td></tr>";
    $("table tbody").append(markup);
}
document.getElementById("navUserName").innerHTML= getCurrentUser().name

function goToEditTask(index){
    let currentTaskId = userTaskList[index].taskId;
    console.log("index: "+ index);

    localStorage.setItem(CURRENT_TASK_ID, JSON.stringify(currentTaskId));
    window.location.href = "./member_task_edit.html";
}

function getNumberOfDays(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
}