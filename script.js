function getText(stringIn){
  document.getElementById(stringIn).innerHTML = "Loading...";
  var client = new XMLHttpRequest();
  client.open('GET', '/text/'+stringIn+'.txt');
  client.onreadystatechange = function() {
    if (client.readyState == XMLHttpRequest.DONE || client.readyState == 4) {
      var response = JSON.parse(client.responseText);
      if (client.status === 200 && client.status === 'OK') {
        document.getElementById(stringIn).innerHTML = client.responseText;
      } else {
        document.getElementById(stringIn).innerHTML = "Failed to load.";
      }
    }
  }
  client.send();
}
function index(){
  getText("ilovevideogames");
}
