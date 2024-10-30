import { ThemeProvider } from "@material-tailwind/react";
import { Homepage } from "./components/Homepage";
import { CheckedInPetsList } from "./components/CheckedInPetsList";
import { Route, Routes } from "react-router-dom";
import { AllPetsList } from "./components/AllPetsList";
import { CreatePetForm } from "./components/CreatePetForm";
import { PetProfile } from "./components/PetProfile";
import { EditPetForm } from "./components/EditPetForm";
import { OwnerProfile } from "./components/OwnerProfile";
import { AllOwnersList } from "./components/AllOwnersList";
import { CreateOwnerForm } from "./components/CreateOwnerForm";
import { EditOwnerForm } from "./components/EditOwnerForm";
const baseURL = import.meta.env.VITE_API_URL;

console.log("Base URL:", baseURL);

function App() {
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

export default App;
