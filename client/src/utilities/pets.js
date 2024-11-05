// get string to indicate altered/unaltered
export function getAltered(altered, sex) {
  // set variable for return statement
  let alteredString;
  console.log(typeof altered);
  console.log("altered", altered, "sex", sex);
  if (altered === true && sex === "male") {
    console.log("first cond", altered, sex);
    alteredString = "Neutered";
  } else if (altered === true && sex === "female") {
    console.log("second cond", altered, sex);
    alteredString = "Spayed";
  } else {
    console.log("third cond", altered, sex);
    alteredString = "Intact";
  }
  return alteredString;
}

// calculate pet age based on birthday
export function getAge(birthday) {
  // convert birthday into date object
  const birthdate = Date.parse(birthday);
  // get current date
  const today = Date.now();
  // get time elapsed between birthday and current date
  const millisecondsElapsed = today - birthdate;
  const secondsElapsed = millisecondsElapsed / 1000;
  const minutesElapsed = secondsElapsed / 60;

  // get days elapsed since pet's birthdate
  let daysElapsed = minutesElapsed / 1440;

  // set variables for pet's age in years, months, and days
  let yearsElapsed;
  let monthsElapsed = 0;
  let daysRemaining = 0;

  // get years if pet is more than 1 year old
  if (daysElapsed / 365 > 1) {
    yearsElapsed = Math.floor(daysElapsed / 365);
    daysRemaining = Math.floor(daysElapsed % 365);
  } else {
    yearsElapsed = 0;
  }

  // get months if pet is more than 30 days old or some years + more than 30 days old
  if (daysRemaining / 30.4167 > 1) {
    monthsElapsed = Math.floor(daysRemaining / 30.4167);
  }

  if (yearsElapsed == 0 && monthsElapsed == 0) {
    daysElapsed = Math.floor(daysElapsed);
  }

  // set variable for return statement
  let ageString = "";
  // create age string based on pet age
  if (yearsElapsed == 0 && monthsElapsed == 0) {
    ageString = `${daysElapsed} days`;
  } else if (yearsElapsed == 0 && monthsElapsed > 0) {
    ageString = `${monthsElapsed} months`;
  } else if (monthsElapsed == 0) {
    ageString = `${yearsElapsed} years`;
  } else {
    ageString = `${yearsElapsed} years ${monthsElapsed} months`;
  }

  // return pet age
  return ageString;
}
