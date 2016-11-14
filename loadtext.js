function getText(){
  var client = new XMLHttpRequest();
  client.open('GET', '/text/ilovevideogames.txt');
  client.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    document.getElementById("ilovevideogames").innerHTML = client.responseText;
        }
  }
  client.send();
}
