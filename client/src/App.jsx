import { ThemeProvider } from "@material-tailwind/react";
import { Homepage } from "./components/Homepage";
import { CheckedInPetsList } from "./components/CheckedInPetsList";
import { Route, Routes } from "react-router-dom";
import { AllPetsList } from "./components/AllPetsList";
import { CreatePetForm } from "./components/CreatePetForm";
import { PetProfile } from "./components/PetProfile";
import { EditPetForm } from "./components/EditPetForm";
const baseURL = import.meta.env.VITE_API_URL;

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route
        exact
        path="/pets/checkedin"
        element={<CheckedInPetsList baseURL={baseURL} />}
      />
      <Route exact path="/pets" element={<AllPetsList />} />
      <Route exact path="/pets/new" element={<CreatePetForm />} />
      <Route path="pets/:id" element={<PetProfile />} />
      <Route path="pets/:id/edit" element={<EditPetForm />} />
    </Routes>
  );
}

export default App;
