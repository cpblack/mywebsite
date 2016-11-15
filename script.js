function readTextFile(filein)
{
    document.getElementById(filein).innerHTML = "Loading..."
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "/file/"+filein+".txt", false);
    rawFile.onreadystatechange = function (){
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                document.getElementById(filein).innerHTML = allText
            } else {
                document.getElementById(filein).innerHTML = "Failed."
            }
        }
    }
    rawFile.send(null);
}

function index(){
  readTextFile("ilovevideogames");
}
