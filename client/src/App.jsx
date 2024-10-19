import { ThemeProvider } from "@material-tailwind/react";
import { Homepage } from "./components/Homepage";
import { CheckedInPetsList } from "./components/CheckedInPetsList";
import { Route, Routes } from "react-router-dom";
import AllPetsList from "./components/AllPetsList";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/pets/checkedin" element={<CheckedInPetsList />} />
      <Route exact path="/pets" element={<AllPetsList />} />
    </Routes>
  );
}

export default App;
