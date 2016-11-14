function getText(stringIn){
  var client = new XMLHttpRequest();
  client.open('GET', '/text/ilovevideogames.txt');
  client.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      var response = JSON.parse(xmlhttp.responseText);
      if (xmlhttp.status === 200 && response.status === 'OK') {
        document.getElementById("ilovevideogames").innerHTML = client.responseText;
      } else {
        document.getElementById("ilovevideogames").innerHTML = "Failed to load.";
      }
    }
  }
  client.send();
}
function index(){
  getText("ilovevideogames");
}
