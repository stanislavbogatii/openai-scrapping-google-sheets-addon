function saveTokens({openAiToken, propelAuthToken}) {
  var userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty('propelAuthAPIKey', propelAuthToken);
  userProperties.setProperty('openAIAPIKey', openAiToken);
}

function getPropelAuthAPIKey() {
  var userProperties = PropertiesService.getUserProperties();
  const propelAuthAPIKey = userProperties.getProperty('propelAuthAPIKey');
  // const openAIAPIKey = userProperties.getProperty('openAIAPIKey');
  return propelAuthAPIKey;
}

function getOpenAIAPIKey() {
  var userProperties = PropertiesService.getUserProperties();
  const openAIAPIKey = userProperties.getProperty('openAIAPIKey');
  return openAIAPIKey;
}

function testRequest() {
  try {
    var response = UrlFetchApp.fetch('https://img.sharevan.co.uk/test', {
      method: 'post',
      payload: JSON.stringify({ data: 'dd' }),
      contentType: 'application/json',
      muteHttpExceptions: true // Позволяет получить ответ в случае ошибки
    });

    var responseCode = response.getResponseCode();
    var responseText = response.getContentText();
    console.log(responseCode)
    
    if (responseCode === 401) {
      console.log("Error 401: Unauthorized");
      console.log(responseText);
    } else {
      console.log("Response: " + responseText);
    }
  } catch (e) {
    console.log(e)
  }
}