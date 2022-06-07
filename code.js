function createClickUpTask(name, responses, start_date, end_date){
  const url = 'https://api.clickup.com/api/v2/list/193071181/task';

  const formData = {
    "name": name,
    "description": (name + " has sent a form response. \n"
    + "\n" + responses),
    "assignees": [],
    "tags": [],
    "status": "New Applicants",
    "priority": 3,
    "due_date": start_date,
    "due_date_time": false,
    "time_estimate": 8640000,
    "start_date": end_date,
    "start_date_time": false,
    "notify_all": true,
    "parent": null,
    "links_to": null,
    "check_required_custom_fields": true
    };

  const headers = {
  'Authorization': 'pk_48749321_997QTCPDEKYO0E0YCIT1RE80HG81W9HZ',
  };
  Logger.log(JSON.stringify(formData));

  const options = { 
    'method' : 'post',
    'contentType': 'application/json',
    'headers': headers,
    'payload': JSON.stringify(formData)
  };

  const response = UrlFetchApp.fetch(url, options);
  var data = JSON.parse(response);
  Logger.log(data);
}

function getLastRespData(){
  const fstart_date = new Date;
  const start_date = fstart_date.getTime();
  const fend_date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const end_date = fend_date.getTime();

  var form = FormApp.openById('15fvSZ3k_wSVSc2-lsB1bInTZ87wcTMdQoXE8phjTzEE');
  var formResponses = form.getResponses();
  var formResponse = formResponses[formResponses.length-1];
  var itemResponses = formResponse.getItemResponses();
  var responses_list = [];
  var nome;
  for (var j = 0; j < itemResponses.length; j++) {
    let itemResponse = itemResponses[j];
    let itemtitle = itemResponse.getItem().getTitle();
    let itemresponsee = itemResponse.getResponse();
    if (itemtitle.includes('Anex')){
      itemresponsee = 'https://drive.google.com/u/0/open?id=' + itemresponsee + '&usp=forms_web';
    }
    let responses_items = itemtitle + ':\n' + itemresponsee + '\n';
    responses_list[j] = responses_items;
    if (itemResponse == itemResponses[0]){
      nome = itemresponsee;
    };
  }
  
  createClickUpTask(nome,responses_list.join("\n"),start_date,end_date);
  
}
