/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useServerName } from "../../ServerNameProvider";
import { Navbar } from "../Navbar";
import { PetListView } from "./PetListView";
import { DefaultSkeleton } from "../LoadingScreen";

export function AllPetsList() {
  const serverName = useServerName();
  const [allPetsList, setAllPetsList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadAllPets();
  }, []);

  async function loadAllPets() {
    try {
      await fetch(`https://${serverName}/allpets`)
        .then((res) => {
          if (res.status >= 400) {
            throw res.status;
          }
          return res.json();
        })
        .then((data) => {
          setAllPetsList(data);
          setLoading(false);
        });
    } catch (e) {
      setLoading(false);
      setErrorMessage(
        `Could not get pet list. The following error occurred: ${e}`
      );
    }
  }

  if (loading) {
    return <DefaultSkeleton />;
  }

  return (
    <div className="main-container">
      <Navbar selected={2} />
      <div className="page">
        <h2>All pets:</h2>
        {allPetsList ? (
          <PetListView list={allPetsList} />
        ) : (
          <p>{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
