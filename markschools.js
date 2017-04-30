var maxYear = 150;
var baseOperations = 850000;
function duplicate(object) {
return JSON.parse(JSON.stringify(object));
}

function buttonSubmit(){
var value = document.getElementById("yearInput").value;
value = Math.min(Math.max(document.getElementById("yearInput").value,1),maxYear);
document.getElementById("yearInput").value = value;
var calc = run(value - 1);
console.log(calc);
//console.log(getRevenueCostSet(calc));
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
function run(years){
  //console.log(years);
  var graphOutput = [];
  var lifetimeProfit = 0;
  for (var f = 0; f < years + 1; f++) {
      var tempC = getRevenueCostSet(getSchools(f));
      var total = tempC[0]+tempC[1]-tempC[2]-tempC[3] + 200000 - baseOperations;
      lifetimeProfit += total;
      graphOutput.push(total);
  }
  generateGraph(graphOutput);
  var get = getSchools(years);
  var revenue = getRevenueCostSet(get);
  addAISURevenue(revenue);
  generateStatistics(years +1,revenue,getSchoolCount(get),lifetimeProfit);
  return revenue;
}
function addAISURevenue(revenue){
    revenue[0] += 200000;
    return revenue;
}

function getSchoolCount(schoolSet){
    var total = 1;
    for (var i = 0; i < schoolSet.length; i++){
        total += schoolSet[i].quantity;
    }
    return total;
}
function getRevenueCost(schools){
    var students = 600;
    var softwareRevenuePerStudent = 125;
    var softwareLicenseRevenue = students * softwareRevenuePerStudent;
    var retention = [100,90,75,50,25];
    var furtherRetention = 25;
    var consultingMargin = 40;
    var softwareMargin = 95;
    var firstYearConsultingRevenue = 150000;
    var consecutiveYearConsultingRevenue = 75000;
    
    
    var consultingRevenue = 0;
    var softwareRevenue = 0;
    var consultingCost = 0;
    var softwareCost = 0;
    //console.log(schools);
    if (true || schools != null && schools.quantity != null && Number.isInteger(schools.quantity)&& schools.age != null && Number.isInteger(schools.age)){
        //console.log(schools.year);
        if (schools.year < 1){
            consultingRevenue = firstYearConsultingRevenue * schools.quantity;
        } else if (schools.year > 0){
            consultingRevenue = consecutiveYearConsultingRevenue * schools.quantity;
        }
        consultingCost = consultingRevenue * ((100 - consultingMargin)/100);
        var tempRetention = 0;
        if (schools.year < retention.length) {
            tempRetention = retention[schools.year];
        } else {
            tempRetention = furtherRetention;
        }
        softwareRevenue = softwareLicenseRevenue * (tempRetention / 100);
        softwareCost = softwareRevenue * ((100 - softwareMargin)/100);
        }
    return [consultingRevenue,softwareRevenue,consultingCost,softwareCost];
}
function getRevenueCostSet(schoolsSet){
    var output = [0,0,0,0];
    for (var i = 0; i < schoolsSet.length;i++){
        var fetch = getRevenueCost(schoolsSet[i]);
        console.log(i+":");
        console.log(fetch);
        output[0] += fetch[0];
        output[1] += fetch[1];
        output[2] += fetch[2];
        output[3] += fetch[3];
    }
    return output;
}
function getSchools(year) {
  var currentYear = 0;
  var currentFunds = 0;
  var schools = [];
  while (currentYear < year + 1) {
     if (currentYear > 0){
         var quantity = 3 * currentYear;
        var temp = {year:year,quantity:quantity};
        age(schools,1);
        schools.push(temp);
     }
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
function generateStatistics(year,revenueCost,schoolCount,lifetimeProfit){
    var outputParagraph = document.getElementById("statistics");
    var totalSchools = schoolCount;
    outputParagraph.innerHTML = "Year "+year+"<br>Total Schools: "+totalSchools+"<br>Consulting Revenue: $"+revenueCost[0].toLocaleString('en')+"<br>Base Operations: $"+parseInt(baseOperations).toLocaleString('en')+"<br>Licensing Revenue: $"+parseInt(revenueCost[1]).toLocaleString('en')+"<br>Consulting Fees: $"+parseInt(revenueCost[2]).toLocaleString('en')+"<br> Licensing Fees: $"+parseInt(revenueCost[3]).toLocaleString('en')+"<br>Total Revenue: $"+parseInt(revenueCost[0]+revenueCost[1]-revenueCost[2]-revenueCost[3]- baseOperations).toLocaleString('en')+"<br>Lifetime Profit: $"+parseInt(lifetimeProfit).toLocaleString("en");
}
function init(){
//document.getElementById("output").innerHTML = example(0);
document.getElementById("yearInput").value = 0;
document.getElementById("yearSubmit").addEventListener("click", buttonSubmit);
document.getElementById("increase").addEventListener("click", increase);
document.getElementById("decrease").addEventListener("click", decrease);
buttonSubmit();
}
