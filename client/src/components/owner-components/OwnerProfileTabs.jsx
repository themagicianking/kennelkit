import {
  Tabs,
  Tab,
  TabsHeader,
  TabPanel,
  TabsBody,
} from "@material-tailwind/react";
import { PetListView } from "../pet-components/PetListView";

export function OwnerProfileTabs({ pets }) {
  return (
    <Tabs className="rounded-lg" value="Pets">
      <TabsHeader>
        <Tab key="Pets" value="Pets">
          Pets
        </Tab>
        <Tab key="Notes" value="Notes">
          Notes
        </Tab>
        <Tab key="Upcoming" value="Upcoming">
          Upcoming Reservations
        </Tab>
        <Tab key="History" value="History">
          History
        </Tab>
      </TabsHeader>
      <TabsBody>
        <TabPanel key="Pets" value="Pets">
          <PetListView list={pets}></PetListView>
        </TabPanel>
        <TabPanel key="Notes" value="Notes">
          Notes go here
        </TabPanel>
        <TabPanel key="Upcoming" value="Upcoming">
          Upcoming reservations go here
        </TabPanel>
        <TabPanel key="History" value="History">
          History goes here
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
}
