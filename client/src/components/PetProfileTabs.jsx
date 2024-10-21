import {
  Tabs,
  TabsHeader,
  Tab,
  TabPanel,
  TabsBody,
} from "@material-tailwind/react";

export function PetProfileTabs() {
  return (
    <Tabs className="rounded-lg pet-tabs" value="Notes">
      <TabsHeader>
        <Tab key="Notes" value="Notes">
          Notes
        </Tab>
        <Tab key="History" value="History">
          History
        </Tab>
        <Tab key="Vaccines" value="Vaccines">
          Vaccines
        </Tab>
        <Tab key="Reservations" value="Reservations">
          Reservations
        </Tab>
      </TabsHeader>
      <TabsBody>
        <TabPanel key="Notes" value="Notes">
          Notes description goes here
        </TabPanel>
        <TabPanel key="History" value="History">
          History goes here
        </TabPanel>
        <TabPanel key="Vaccines" value="Vaccines">
          Vaccines description goes here
        </TabPanel>
        <TabPanel key="Reservations" value="Reservations">
          Reservations description goes here
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
}
