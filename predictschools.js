var baseSchools = [{name:"AISU",students:2000,age:3,teachers:80,summerTraining:false,PLCSupport:false,expertOnCall:false}]
function schoolRevenue(school) {
  var students = school.students;
  var yearNumber = school.age;
  var studentLicensingFees = students * 50;
  var numberOfTeachers = school.teachers;
  var revenueOfTrainingTeachers = 0;
  if (yearNumber == 0) {
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
function buttonSubmit(){
var value = example(document.getElementById("yearInput").value);
console.log(document.getElementById("yearInput").value);
document.getElementById("p1").innerHTML = value;
}
function example(years){
  var get = getSchools(baseSchools,years);
  return schoolsToText(get[0])+" Leftover funds: "+get[1];
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
      output += " - "
    }
  }
  return output;
}
function getOtherStaffInfo(schools){
  var revenue = 0;
  var staffCount = [0,0,0];
  var revenuePerStaff;
  for (var i = 0; i < schools.length; i++) {
    if (schools[i].summerTraining) {
      staffCount[0] += (1/4) * teachers;
    }
    if (schools[i].PLCSupport) {
      staffCount[1] += (1/4) * teachers;
    }
    if (schools[i].expertOnCall) {
      staffCount[2] += (1/4) * teachers;
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
    
    var get = generateSchools(schools,currentFunds);
    schools = get[0];
    currentFunds = get[1];
    currentFunds += getTotalRevenue(schools);
    var otherStaffInfo = getOtherStaffInfo(schools);
    currentFunds += otherStaffInfo[1];
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
    schools.push({name:"New School",students:200,teachers:8,age:0,summerTraining:false,PLCSupport:false,expertOnCall:false});
    revenueIn -= trainingTeamSize * costPerTeamMemberPerSchool;
  }
  return [schools,revenueIn];
}
window.addEventListener('load', init);
function init(){
document.getElementById("yearSubmit").addEventListener("click", buttonSubmit);
console.log("hi")
}
