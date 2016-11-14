function getText(stringIn){
  document.getElementById(stringIn).innerHTML = "Loading...";
  var client = new XMLHttpRequest();
  client.open('GET', '/text/'+stringIn+'.txt');
  client.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE || xhr.readyState == 4) {
      var response = JSON.parse(xmlhttp.responseText);
      if (xmlhttp.status === 200 && response.status === 'OK') {
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
