import {
  Card,
  CardHeader,
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
}) {
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

  return (
    <Card>
      <CardHeader>{petname}</CardHeader>
      <CardBody className="pet-profile-body">
        <div className="pet-stats">
          <img></img>
          <p>
            {species}
            {breed}
          </p>
          <p>
            {sex} Altered? {altered}
          </p>
          <p>
            {age}
            {weight}
          </p>
          <p>{physicaldesc}</p>
          <p>Owner name - owner phone</p>
          <p>Emergency contact name - EC phone</p>
        </div>
        <Tabs>
          {" "}
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
