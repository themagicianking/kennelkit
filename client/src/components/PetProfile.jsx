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

  function getAge(birthday) {
    // calculate pet age based on birthday
    // return pet age
  }

  let age = getAge(birthday);

  return (
    <Card>
      <CardHeader>{petname}</CardHeader>
      <CardBody>
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
