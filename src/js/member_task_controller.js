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
    let markup = "<tr><td> " + (i+1) + " </td><td><a>" + userTaskList[i].taskName +"</a><br/><small>" + userTaskList[i].startDate +"</small></td><td>" + userTaskList[i].taskDescription + "</td><td class='project_progress'><div class='progress progress-sm'><div class='progress-bar bg-green' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width: 60%'></div></div><small>" + userTaskList[i].left +"</small></td><td class='project-state'><span class='badge badge-success'>" + userTaskList[i].taskStatus +"</span></td><td class='project-actions text-right'><button class='btn btn-info btn-sm' onclick='goToEditTask("+i+")'><i class='fas fa-pencil-alt'></i> Edit</a></td></tr>";
    $("table tbody").append(markup);
}
document.getElementById("navUserName").innerHTML= getCurrentUser().name

function goToEditTask(index){
    let currentTaskId = userTaskList[index].taskId;
    console.log("index: "+ index);

    localStorage.setItem(CURRENT_TASK_ID, JSON.stringify(currentTaskId));
    window.location.href = "./member_task_edit.html";
}