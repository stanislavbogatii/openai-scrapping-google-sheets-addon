function saveTasks(data) {
  var userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty("form", JSON.stringify(data));
}

function deleteTask(id) {
  var userProperties = PropertiesService.getUserProperties();
  userProperties.deleteProperty(id);
}

function findTasks() {
  var userProperties = PropertiesService.getUserProperties();
  
  var allProperties = userProperties.getProperty("form");
  
  Logger.log(allProperties);
  
  return allProperties;
}