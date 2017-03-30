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
function setLeftovers(input){
  input = parseInt(input);
  document.getElementById("leftovers").innerHTML = "Leftovers: $"+input;
}
function buttonSubmit(){
var value = document.getElementById("yearInput").value;
value = Math.min(Math.max(document.getElementById("yearInput").value,0),150);
document.getElementById("yearInput").value = value;
var calc = example(value);
document.getElementById("output").innerHTML = calc[0];
setLeftovers(calc[1]);
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
  var get = getSchools(getBaseSchools(),years);
  return [schoolsToText(get[0]),get[1]];
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
    var depreciation = 1/(schools[i].age / 4);
    if (schools[i].summerTraining) {
      staffCount[0] += (1/4) * schools[i].teachers * depreciation;
    }
    if (schools[i].PLCSupport) {
      staffCount[1] += (1/4) * schools[i].teachers * depreciation;
    }
    if (schools[i].expertOnCall) {
      staffCount[2] += (1/4) * schools[i].teachers * depreciation;
    }
  }
  staffCount[0] = Math.max(staffCount[0]);
  staffCount[1] = Math.max(staffCount[1]);
  staffCount[2] = Math.max(staffCount[2]);
  revenue = 20000 * (staffCount[0]+staffCount[1]+staffCount[2]);
  var output = [staffCount,revenue];
  return output;
}  
function getSchools(schools, year) {
  var originalSchools = schools;
  var currentYear = 0;
  var currentFunds = 0;
  while (currentYear < year) {
    // For Each Year
    
    currentFunds += getTotalRevenue(schools);
    var otherStaffInfo = getOtherStaffInfo(schools);
    console.log("Before: "+currentFunds);
    currentFunds += otherStaffInfo[1];
    console.log("After: "+currentFunds);
    var get = generateSchools(schools,currentFunds);
    schools = get[0];
    currentFunds = get[1];
    currentYear += 1;
    schools = age(schools,1);
  }
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
  for (var i = 0; revenueIn >= costPerTeamMemberPerSchool * trainingTeamSize & i < Math.floor(maximumTeamMembers/trainingTeamSize); i++) {
    schools.push({name:"New School",students:200,teachers:8,age:0,summerTraining:true,PLCSupport:true,expertOnCall:true});
    revenueIn -= trainingTeamSize * costPerTeamMemberPerSchool;
  }
  return [schools,revenueIn];
}
window.addEventListener('load', init);
function init(){
document.getElementById("output").innerHTML = example(0);
document.getElementById("yearInput").value = 0;
document.getElementById("yearSubmit").addEventListener("click", buttonSubmit);
document.getElementById("increase").addEventListener("click", increase);
document.getElementById("decrease").addEventListener("click", decrease);
console.log("hi")
}
