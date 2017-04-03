
function getBaseSchools() {
var baseSchools = [{name:"AISU",students:2000,age:3,teachers:80,summerTraining:false,PLCSupport:false,expertOnCall:false}]
return JSON.parse(JSON.stringify(baseSchools));
}
function schoolRevenue(school) {
  var students = school.students;
  var yearNumber = school.age;
  var studentLicensingFees = students * 50;
  var numberOfTeachers = school.teachers;
  var revenueOfTrainingTeachers = 0;
  if (yearNumber === 0) {
    revenueOfTrainingTeachers = numberOfTeachers * 500;
  }
  var output = (studentLicensingFees * 15 / 25 )+ revenueOfTrainingTeachers;
  return output;
}
/*
function randomIntBetween(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}
function random(){
  return Math.random();
}
*/
function createTable(array) {
var arrayLength = array.length;
var theTable = document.createElement('table');


// Note, don't forget the var keyword!
for (var i = 0, tr, td; i < arrayLength; i++) {
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.appendChild(document.createTextNode(array[i].join(", ")));
    td.setAttribute("style","display:block;text-align: center;vertical-align: middle;");
    td.setAttribute("align","center");
    tr.appendChild(td);
    tr.setAttribute("style","display:block;");
    //tr.setAttribute("style","width:100%;");
    theTable.appendChild(tr);
    
}
return theTable;
}
function schoolsToArray(schoolList){
    var output = [];
    for (var i = 0; i < schoolList.length;i++){
        var temp = schoolList[i];
        output[i] = [];
        output[i][0] = temp.name;
        output[i][1] = temp.students+" students";
        output[i][2] = temp.age+" years old";
    }
    return output;
}
function setLeftovers(input){
  input = parseInt(input);
  document.getElementById("leftovers").innerHTML = "Leftovers: $"+input;
}
function buttonSubmit(){
var value = document.getElementById("yearInput").value;
value = Math.min(Math.max(document.getElementById("yearInput").value,1),150);
document.getElementById("yearInput").value = value;
var calc = example(value);
console.log(calc[0]);
//document.getElementById("output").innerHTML = schoolsToText(calc[0]);

var tableDiv = document.getElementById("tableDiv");
while (tableDiv.hasChildNodes()) {
    tableDiv.removeChild(tableDiv.lastChild);
}
var table = createTable(schoolsToArray(calc[0]));
table.setAttribute("style","display: block; max-height: 30%; overflow-y: auto;margin: 0px auto;");
tableDiv.appendChild(table);
tableDiv.setAttribute("style","position: relative;");
table.setAttribute("align","center");
//setLeftovers(calc[1]);
}
function increase(){ 
    document.getElementById("yearInput").value = parseInt(document.getElementById("yearInput").value) + 1;
    buttonSubmit();
}
function decrease(){
    document.getElementById("yearInput").value = parseInt(document.getElementById("yearInput").value) - 1;
    buttonSubmit();
}
function example(years){
  console.log(years);
  var get = getSchools(getBaseSchools(),years);
  return get;
}
function schoolsToText(schools){
  var output = ""
  for(var i = 0, len = schools.length; i < len; i++){
    output += schools[i].name+", "+schools[i].students+" students, "+schools[i].age+" year";
    if (schools[i].age != 1) {
    output += "s";
    }
    output += " old.";
    if (i < len - 1) {
      output += "<br>"
    }
  }
  return output;
}
function getOtherStaffInfo(schools){
  var revenue = 0;
  var staffCount = [0,0,0];
  var revenuePerStaff;
  for (var i = 0; i < schools.length; i++) {
    var depreciation = 1/Math.max(schools[i].age / 4,1);
    if (schools[i].summerTraining) {
      staffCount[0] += (1/3) * schools[i].teachers * depreciation;
    }
    if (schools[i].PLCSupport) {
      staffCount[1] += (1/3) * schools[i].teachers * depreciation;
    }
    if (schools[i].expertOnCall) {
      staffCount[2] += (1/3) * schools[i].teachers * depreciation;
    }
  }
  staffCount[0] = Math.ceil(staffCount[0]);
  staffCount[1] = Math.ceil(staffCount[1]);
  staffCount[2] = Math.ceil(staffCount[2]);
  revenue = 20000 * (staffCount[0]+staffCount[1]+staffCount[2]);
  var output = [staffCount,revenue];
  console.log(revenue);
  return output;
}  
function getSchools(schools, year) {
  var revenueOverTime = [];
  var initalRevenue = 0;
  var supportRevenue = 0;
  var originalSchools = schools;
  var currentYear = 0;
  var currentFunds = 0;
  while (currentYear < year) {
    // For Each Year
    
    initialRevenue = getTotalRevenue(schools);
    currentFunds += initialRevenue;
    var otherStaffInfo = getOtherStaffInfo(schools);
    console.log("Before: "+currentFunds);
    supportRevenue = otherStaffInfo[1];
    currentFunds += supportRevenue;
    console.log("After: "+currentFunds);
    var get = generateSchools(schools,currentFunds);
    schools = get[0];
    currentFunds = get[1];
    currentYear += 1;
    schools = age(schools,1);
    revenueOverTime.push((initialRevenue+supportRevenue)/1000);
  }
  if (year == 0){
    revenueOverTime.push(getTotalRevenue(schools));
  }
  
  supportRevenue = getOtherStaffInfo(schools);
  supportRevenue = supportRevenue[1];
  generateStatistics(getTotalRevenue(schools),schools.length,supportRevenue,year);
  generateGraph(revenueOverTime);
  
  return [schools,currentFunds];
}
function age(schools,years){
  for (var i = 0; i < schools.length; i++){
    schools[i].age += years;
  }
  return schools;
}
function getTotalRevenue(schools) {
  var output = 0;
  for (var i = 0; i < schools.length; i++){
    output += schoolRevenue(schools[i]);
  }
  return output;
}
function generateSchools(schools,revenueIn) {
  var revenueOut = revenueIn;
  var costPerTeamMemberPerSchool = 30000;
  var trainingTeamSize = 5;
  var maximumTeamMembers = Math.floor(revenueIn / costPerTeamMemberPerSchool);
  for (var i = 0; revenueIn >= costPerTeamMemberPerSchool * trainingTeamSize & i < Math.max(1,parseInt(Math.sqrt(Math.sqrt(schools.length))))& i < Math.floor(maximumTeamMembers/trainingTeamSize); i++) {
    schools.push({name:"New School",students:200,teachers:8,age:0,summerTraining:true,PLCSupport:true,expertOnCall:true});
    revenueIn -= trainingTeamSize * costPerTeamMemberPerSchool;
  }
  return [schools,revenueIn];
}
window.addEventListener('load', init);
function generateStatistics(initialRevenue,totalSchools,supportRevenue,year){
    var outputParagraph = document.getElementById("statistics");
    outputParagraph.innerHTML = "Year "+year+":<br>License Revenue: $"+initialRevenue+"<br>Total Schools: "+totalSchools+"<br>Support Services Revenue: $"+parseInt(supportRevenue);
}
function init(){
//document.getElementById("output").innerHTML = example(0);
document.getElementById("yearInput").value = 0;
document.getElementById("yearSubmit").addEventListener("click", buttonSubmit);
document.getElementById("increase").addEventListener("click", increase);
document.getElementById("decrease").addEventListener("click", decrease);
buttonSubmit();
}
