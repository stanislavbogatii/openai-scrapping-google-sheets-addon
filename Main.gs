 

function onHomepage() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('My Add-On Menu')
    .addItem('Open Sidebar', 'showSidebar')
    .addToUi();
}

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('My App')
    .addItem('Show sidebar', 'showSidebar')
    .addToUi();
}

function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('Sidebar')
      .setWidth(600)
      .setHeight(300);
  SpreadsheetApp.getUi().showSidebar(html);
}

function runTask(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var spreadsheetId = SpreadsheetApp.getActiveSpreadsheet().getId();
  var token = ScriptApp.getOAuthToken();
  var listName = sheet.getName();
  data.inputRange = listName + '!' + data.inputRange;
  data.outputRange = listName + '!' + data.outputRange;

  var propelAuthAPIKey = getPropelAuthAPIKey();
  var openAIAPIKey = getOpenAIAPIKey();

  try {
    var response = UrlFetchApp.fetch('https://typecharm-backend.onrender.com/sheets_task', {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + token,
        "Content-Type": "application/json"
      },
      payload: JSON.stringify({token, spreadsheetId, openAIAPIKey, propelAuthAPIKey, ...data }),
      contentType: 'application/json',
      muteHttpExceptions: true 
    });
    var statusCode = response.getResponseCode();

    if (statusCode >= 200 && statusCode < 300) {
      return {message: "Success", statusCode, isSuccess: true}
    } 
    else {
      return {message: "Missing or invalid tokens", isSuccess: false, statusCode, response};
    }

  } catch (e) {
    return {isSuccess: false, message: "Error"}
  }
}
