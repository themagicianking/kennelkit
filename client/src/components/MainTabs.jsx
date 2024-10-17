import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import CheckedInPetsList from "./CheckedInPetsList";
import AllPetsList from "./AllPetsList";
import { CreatePetModal } from "./CreatePetModal";

export function MainTabs() {
  return (
    <Tabs value="Home" orientation="vertical">
      <TabsHeader>
        <Tab key="Home" value="Home">
          <i className="fas fa-house"></i>
        </Tab>
        <Tab key="Daycare" value="Daycare">
          <i className="fas fa-sun"></i>
        </Tab>
        <Tab key="Pets" value="Pets">
          <i className="fas fa-paw"></i>
        </Tab>
        <Tab key="Create" value="Create">
          <i className="fas fa-plus"></i>
        </Tab>
      </TabsHeader>
      <TabsBody>
        <TabPanel key="Home" value="Home"></TabPanel>
        <TabPanel key="Daycare" value="Daycare">
          <CheckedInPetsList />
        </TabPanel>
        <TabPanel key="Pets" value="Pets">
          <AllPetsList />
        </TabPanel>
        <TabPanel key="Create" value="Create">
          <CreatePetModal />
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
}
