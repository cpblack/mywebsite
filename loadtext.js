function getText(){
  var client = new XMLHttpRequest();
  client.open('GET', '/text/ilovevideogames.txt');
  client.onreadystatechange = function() {
    alert(client.responseText);
  }
  client.send();
  document.getElementById("p1").innerHTML = "New text!";
}
