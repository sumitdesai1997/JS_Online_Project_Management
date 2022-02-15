
 class Task {
    constructor(taskName, taskDescription, taskStatus, startDate, endDate, taskMemberEmail, taskEstimateBudget, taskEstimateHours, isTaskIndependent, dependentTask = "") {
      this.taskName = taskName;
      this.taskDescription = taskDescription;
      this.taskStatus = taskStatus;
      this.startDate = startDate;
      this.endDate = endDate;
      this.taskEstimateBudget = taskEstimateBudget;
      this.taskEstimateHours = taskEstimateHours;
      this.projectManager = getCurrentUser().email;
      this.taskMemberEmail = taskMemberEmail;
      this.isTaskIndependent = isTaskIndependent
      this.dependentTask = dependentTask;
    }
  }

