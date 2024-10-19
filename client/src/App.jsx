import { ThemeProvider } from "@material-tailwind/react";
import { Homepage } from "./components/Homepage";
import { CheckedInPetsList } from "./components/CheckedInPetsList";
import { Route, Routes } from "react-router-dom";
import { AllPetsList } from "./components/AllPetsList";
import { CreatePetForm } from "./components/CreatePetForm";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/pets/checkedin" element={<CheckedInPetsList />} />
      <Route exact path="/pets" element={<AllPetsList />} />
      <Route exact path="/pets/new" element={<CreatePetForm />} />
    </Routes>
  );
}

export default App;
