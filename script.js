function readTextFile(file)
{
    document.getElementById(file).innerHTML = "Loading..."
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "/file/"+file+".txt", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                document.getElementById(file).innerHTML = allText
            } else {
                document.getElementById(file).innerHTML = "Failed."
            }
        }
    }
    rawFile.send(null);
}
function index(){
  getText("ilovevideogames");
}
