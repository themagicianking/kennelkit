import { ThemeProvider } from "@material-tailwind/react";
import { ServerNameProvider } from "./ServerNameProvider";
import { Homepage } from "./components/Homepage";
import { CheckedInPetsList } from "./components/pet-components/CheckedInPetsList";
import { Route, Routes } from "react-router-dom";
import { AllPetsList } from "./components/pet-components/AllPetsList";
import { PetProfile } from "./components/pet-components/PetProfile";
import { OwnerProfile } from "./components/owner-components/OwnerProfile";
import { AllOwnersList } from "./components/owner-components/AllOwnersList";

export function App() {
  const customTheme = {};

  return (
    <ThemeProvider value={customTheme}>
      <ServerNameProvider>
      <h1 className="title">KENNELKIT</h1>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/pets/checkedin" element={<CheckedInPetsList />} />
          <Route exact path="/pets" element={<AllPetsList />} />
          <Route exact path="/owners" element={<AllOwnersList />} />
          <Route path="pets/:id" element={<PetProfile />} />
          <Route path="owners/:id" element={<OwnerProfile />} />
        </Routes>
      </ServerNameProvider>
    </ThemeProvider>
  );
}
