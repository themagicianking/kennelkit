import { ThemeProvider } from "@material-tailwind/react";
import { ServerNameProvider } from "./ServerNameProvider";
import { Homepage } from "./components/Homepage";
import { CheckedInPetsList } from "./components/pet-components/CheckedInPetsList";
import { Route, Routes } from "react-router-dom";
import { AllPetsList } from "./components/pet-components/AllPetsList";
import { PetProfile } from "./components/pet-components/PetProfile";
import { EditPetForm } from "./components/pet-components/EditPetForm";
import { OwnerProfile } from "./components/owner-components/OwnerProfile";
import { AllOwnersList } from "./components/owner-components/AllOwnersList";
import { EditOwnerForm } from "./components/owner-components/EditOwnerForm";

export function App() {
  return (
    <ServerNameProvider>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/pets/checkedin" element={<CheckedInPetsList />} />
        <Route exact path="/pets" element={<AllPetsList />} />
        <Route exact path="/owners" element={<AllOwnersList />} />
        <Route path="pets/:id" element={<PetProfile />} />
        <Route path="pets/:id/edit" element={<EditPetForm />} />
        <Route path="owners/:id" element={<OwnerProfile />} />
        <Route path="owners/:id/edit" element={<EditOwnerForm />} />
      </Routes>
    </ServerNameProvider>
  );
}
