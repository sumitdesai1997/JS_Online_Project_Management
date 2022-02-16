
 class Project {
    constructor(projectId, projectName, projectDescription, projectStatus, startDate, endDate, clientCompany, estimateBudget, estimateHours, projectMembers, imgAvatar, taskList) {
      this.projectId = projectId;
      this.projectName = projectName;
      this.projectDescription = projectDescription;
      this.projectStatus = projectStatus;
      this.startDate = startDate;
      this.endDate = endDate;
      this.clientCompany = clientCompany;
      this.estimateBudget = estimateBudget;
      this.estimateHours = estimateHours;
      this.projectManager = getCurrentUser().email;
      this.projectMembers = projectMembers;
      this.imgAvatar = imgAvatar;
      this.taskList = taskList;
    }
  }

