function generateGraph(dataIn) {
var ctx = document.getElementById("graph");
function generateColorations(quantity){
    var output = [[],[]]
    for (var i = 0; i < quantity; i++) {
        var colors = [randomBetween(0,120),randomBetween(0,120),randomBetween(0,120)];
        output[0].push("rgba("+colors[0].toString()+', '+colors[1].toString()+', '+colors[2].toString()+", "+0.2+")");
        output[1].push("rgba("+colors[0].toString()+', '+colors[1].toString()+', '+colors[2].toString()+", "+1+")");
    }
    return output;
}
function generateLabels(length){
    var output = [];
    for(var i = 0; i < length; i++){
        output.push("Year "+(i+1));
    }
    return output;
}
function randomBetween(intOne,intTwo) {
  min = Math.ceil(intOne);
  max = Math.floor(intTwo);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var coloration = generateColorations(dataIn.length);
var borderColoration = coloration[1];
var coloration = coloration[0];
var rawDatasets = [{label: 'Profit  Over Time (In Thousands)',data: dataIn,backgroundColor: coloration,borderColor: borderColoration,borderWidth: 1}];
            
var rawData = {
        labels: generateLabels(dataIn.length),
        datasets: rawDatasets
    }
var dataFormatted = {type: 'bar', data: rawData, options: { scales: { yAxes: [{ ticks: { beginAtZero:true } }] } }};
var myChart = new Chart(ctx, dataFormatted);
}