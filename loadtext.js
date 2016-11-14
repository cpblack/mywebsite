function getText(){
  var client = new XMLHttpRequest();
  client.open('GET', '/text/ilovevideogames.txt');
  client.onreadystatechange = function() {
  if (xmlhttp.readyState === 4) {
    var response = JSON.parse(xmlhttp.responseText);
      if (xmlhttp.status === 200 && response.status === 'OK') {
    document.getElementById("ilovevideogames").innerHTML = client.responseText;
      } else {
    document.getElementById("ilovevideogames").innerHTML = "Failed to load."
      }
  }
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        }
  }
  client.send();
}
