import { ThemeProvider } from "@material-tailwind/react";
import { Homepage } from "./components/Homepage";
import { CheckedInPetsList } from "./components/pet-components/CheckedInPetsList";
import { Route, Routes } from "react-router-dom";
import { AllPetsList } from "./components/pet-components/AllPetsList";
import { CreatePetForm } from "./components/pet-components/CreatePetForm";
import { PetProfile } from "./components/pet-components/PetProfile";
import { EditPetForm } from "./components/pet-components/EditPetForm";
import { OwnerProfile } from "./components/owner-components/OwnerProfile";
import { AllOwnersList } from "./components/owner-components/AllOwnersList";
import { CreateOwnerForm } from "./components/owner-components/CreateOwnerForm";
import { EditOwnerForm } from "./components/owner-components/EditOwnerForm";
const baseURL = import.meta.env.VITE_API_URL;

console.log("Base URL:", baseURL);

export function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route
        exact
        path="/pets/checkedin"
        element={<CheckedInPetsList baseURL={baseURL} />}
      />
      <Route exact path="/pets" element={<AllPetsList baseUrl={baseURL} />} />
      <Route
        exact
        path="/owners"
        element={<AllOwnersList baseUrl={baseURL} />}
      />
      <Route
        exact
        path="/pets/new"
        element={<CreatePetForm baseURL={baseURL} />}
      />
      <Route
        exact
        path="/owners/new"
        element={<CreateOwnerForm baseURL={baseURL} />}
      />
      <Route path="pets/:id" element={<PetProfile baseURL={baseURL} />} />
      <Route path="pets/:id/edit" element={<EditPetForm baseURL={baseURL} />} />
      <Route path="owners/:id" element={<OwnerProfile baseURL={baseURL} />} />
      <Route
        path="owners/:id/edit"
        element={<EditOwnerForm baseURL={baseURL} />}
      />
    </Routes>
  );
}
