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
  //Logger.log("Student Licensing Fees: "+studentLicensingFees+", Revenue from Training Teachers: "+revenueOfTrainingTeachers);
  
  return (studentLicensingFees * 15 / 25 )+ revenueOfTrainingTeachers;
}
/*
function randomIntBetween(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}
function random(){
  return Math.random();
}
*/
function example(years){
  var get = getSchools(baseSchools,years);
  //Logger.log(get[0]);
  //Logger.log("Leftover Funds: "+get[1]);
  return schoolsToText(get[0]);
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
  var staffCount = [0,0,0]
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
  return [staffCount,revenue];
}  
function getSchools(schools, year) {
  //Logger.log("Year: "+year);
  var originalSchools = schools;
  var currentYear = 0;
  var currentFunds = 0;
  while (currentYear < year) {
    //Logger.log("Ran");
    // For Each Year
    
    currentFunds += getTotalRevenue(schools);
    var getOtherStaffInfo = getOtherStaffInfo(schools);
    currentFunds += getOtherStaffInfo[1];
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
  //Logger.log("Total Revenue: "+output);
  return output;
}
function generateSchools(schools,revenue) {
  var costPerTeamMemberPerSchool = 30000;
  var trainingTeamSize = 5;
  var maximumTeamMembers = Math.floor(revenue / costPerTeamMemberPerSchool);
  for (var i = 0; revenue >= costPerTeamMemberPerSchool * trainingTeamSize & i < Math.floor(maximumTeamMembers/trainingTeamSize); i++) {
    schools.push({name:"New School",students:200,teachers:8,age:0,summerTraining:false,PLCSupport:false,expertOnCall:false});
    revenue -= trainingTeamSize * costPerTeamMemberPerSchool;
  }
  return [schools,revenue];
}
