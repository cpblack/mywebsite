function loadFile(stringName) {
var txtFile = new XMLHttpRequest();
txtFile.open("GET", "http://my.remote.url/myremotefile.txt", true);
txtFile.onreadystatechange = function() {
  if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
    if (txtFile.status === 200) {  // Makes sure it's found the file.
      allText = txtFile.responseText; 
      lines = txtFile.responseText.split("\n");
      onLoad(stringName,lines.join("<br>");
    }
  }
}
txtFile.send(null);
}
function onLoad(stringIn, content){
document.getElementById(stringIn).innerHTML = content
}

function index(){
  readTextFile("ilovevideogames");
}
