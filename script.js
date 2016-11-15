function loadFile(stringName) {
var txtFile = new XMLHttpRequest();
txtFile.open("GET", "http://polished.tech/text/"+stringName+".txt", true);
txtFile.onreadystatechange = function() {
  if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
    if (txtFile.status === 200) {  // Makes sure it's found the file.
      onLoad(stringName, JSON.parse(txtFile.responseText));
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
