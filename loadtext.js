function getText(name){
  document.getElementById(name).innerHTML = "Loading...";
  var client = new XMLHttpRequest();
  client.open('GET', '/text/'+name+'.txt');
  client.onreadystatechange = function() {
    if (client.readyState == 4) {
      var response = JSON.parse(xmlhttp.responseText);
      if (xmlhttp.status === 200 && response.status === 'OK') {
        document.getElementById(name).innerHTML = client.responseText;
      } else {
        document.getElementById(name).innerHTML = "Failed to load."
      }
    }
  }
  client.send();
}
function loadTexts(){
  getText("ilovevideogames");
}
