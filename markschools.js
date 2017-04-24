var maxYear = 150;
function getBaseSchools() {
var baseSchools = [{name:"AISU"}]
return JSON.parse(JSON.stringify(baseSchools));
}

function buttonSubmit(){
var value = document.getElementById("yearInput").value;
value = Math.min(Math.max(document.getElementById("yearInput").value,1),maxYear);
document.getElementById("yearInput").value = value;
var calc = example(value);
console.log(calc);
//setLeftovers(calc[1]);
}
function increase(){ 
    if (document.getElementById("yearInput").value < maxYear){
      document.getElementById("yearInput").value = parseInt(document.getElementById("yearInput").value) + 1;
      buttonSubmit();
    }
}
function decrease(){
    if (document.getElementById("yearInput").value > 1) {
      document.getElementById("yearInput").value = parseInt(document.getElementById("yearInput").value) - 1;
      buttonSubmit();
    }
}
function example(years){
  console.log(years);
  var get = getSchools(years);
  return get;
}

function getRevenueCost(schoolCount,age){
    
    
}

function getSchools(year) {
  var currentYear = 0;
  var currentFunds = 0;
  var schools = [{year:0,quantity:1}]
  while (currentYear < year) {
     if (currentYear > 0){
        var temp = {year:year,quantity:(3*year)};
        schools.push(temp);
     }
     age(schools,1);
     currentYear += 1;
  }
  
  return schools;
}
function age(schools,years){
  for (var i = 0; i < schools.length; i++){
    schools[i].year += years;
  }
  return schools;
}


window.addEventListener('load', init);
function generateStatistics(initialRevenue,totalSchools,supportRevenue,year){
    var outputParagraph = document.getElementById("statistics");
    outputParagraph.innerHTML = "Year "+year+":<br>License Revenue: $"+initialRevenue.toLocaleString('en')+"<br>Total Schools: "+totalSchools+"<br>Support Services Revenue: $"+parseInt(supportRevenue).toLocaleString('en');
}
function init(){
//document.getElementById("output").innerHTML = example(0);
document.getElementById("yearInput").value = 0;
document.getElementById("yearSubmit").addEventListener("click", buttonSubmit);
document.getElementById("increase").addEventListener("click", increase);
document.getElementById("decrease").addEventListener("click", decrease);
buttonSubmit();
}
