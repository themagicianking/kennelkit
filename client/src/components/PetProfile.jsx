import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
  TabPanel,
  TabsBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";

export default function PetProfile({
  petname,
  species,
  breed,
  sex,
  altered,
  birthday,
  weight,
  physicaldesc,
  checkedin,
  owner,
}) {
  // get string to indicate altered/unaltered
  function getAltered(altered) {
    // set variable for return statement
    let alteredString;
    if (altered && sex == "male") {
      alteredString = "Neutered";
    } else if (altered && sex == "female") {
      alteredString = "Spayed";
    } else {
      alteredString = "Intact";
    }
    return alteredString;
  }

  let alteredString = getAltered(altered);
  // calculate pet age based on birthday
  function getAge(birthday) {
    // convert birthday into date object
    const birthdate = Date.parse(birthday);
    // get current date
    const today = Date.now();
    // get time elapsed between birthday and current date
    const millisecondsElapsed = today - birthdate;
    const secondsElapsed = millisecondsElapsed / 1000;
    const minutesElapsed = secondsElapsed / 60;

    // get days elapsed since pet's birthdate
    const daysElapsed = minutesElapsed / 1440;

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

  let age = getAge(birthday);

  const data = [
    {
      label: "Notes",
      value: "notes",
      desc: `notes here`,
    },
    {
      label: "History",
      value: "history",
      desc: `history here`,
    },
    {
      label: "Vaccines",
      value: "vaccines",
      desc: `vaccines here`,
    },
    {
      label: "Reservations",
      value: "reservations",
      desc: `reservations here`,
    },
  ];

  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="gray"
        className="m-0 rounded-none"
      >
        <Typography variant="h2">
          {petname} {checkedin ? <i className="fas fa-circle-check" /> : <></>}
        </Typography>
      </CardHeader>
      <CardBody className="pet-profile-body">
        <div className="pet-stats">
          <img
            className="h-96 w-96 rounded-full object-cover object-center shadow-xl shadow-blue-gray-900/50"
            src="https://lh3.googleusercontent.com/pw/AP1GczPul97HrD-i2k9STdgNDmvTyVJI1bFyxJRoTZiLVSu4Q9pCQiYitPJs3_sIdGLEnS8RCwVewLlNBZY_r935JYiG1v4bb_-5-Z-Yc2LDC4JawfKHJlrO1tHPGdrSkrsBpsxrEYPQiD2Vg2EeR8ismGzQ=w1270-h1686-s-no-gm?authuser=0"
          ></img>
          <p>
            {species == "dog" ? (
              <i className="fas fa-dog" />
            ) : (
              <i className="fas fa-cat" />
            )}{" "}
            {breed}
          </p>
          <p>
            {sex == "male" ? (
              <i className="fas fa-mars" />
            ) : (
              <i className="fas fa-venus" />
            )}{" "}
            {alteredString}
          </p>
          <p>
            {age} {weight}lbs
          </p>
          <p>{physicaldesc}</p>
          <p>
            {owner.firstname} {owner.lastname}
          </p>
          <p>
            {owner.phone} {owner.email}
          </p>
          <p>
            {owner.ecfirstname} {owner.eclastname}
          </p>
          <p>
            {owner.ecphone} {owner.ecemail}
          </p>
        </div>
        <Tabs>
          <TabsHeader>
            {data.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </CardBody>
      <CardFooter>
        <Button>Edit</Button>
      </CardFooter>
    </Card>
  );
}
