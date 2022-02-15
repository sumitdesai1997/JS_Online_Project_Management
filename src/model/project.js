
 class Project {
    constructor(projectName, projectDescription, projectStatus, startDate, endDate, clientCompany, estimateBudget, estimateHours, projectMembers) {
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
    }
  }

