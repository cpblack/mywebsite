function getText(){
  var client = new XMLHttpRequest();
  client.open('GET', '/text/ilovevideogames.txt');
  client.onreadystatechange = function() {
    document.getElementById("p1").innerHTML = client.responseText;
  }
  client.send();
}
