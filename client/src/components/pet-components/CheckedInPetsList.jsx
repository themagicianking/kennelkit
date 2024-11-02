/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useServerName } from "../../ServerNameProvider";
import { Navbar } from "../Navbar";
import { PetListView } from "./PetListView";

export function CheckedInPetsList() {
  const serverName = useServerName();
  const [checkedInPetsList, setCheckedInPetsList] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCheckedInPets();
  }, []);

  async function loadCheckedInPets() {
    try {
      await fetch(`https://${serverName}/checkedinpets`)
        .then((res) => {
          if (res.status >= 400) {
            throw res.status;
          }
          return res.json();
        })
        .then((json) => {
          setCheckedInPetsList(json);
          setLoading(false);
        });
    } catch (e) {
      setErrorMessage(
        `Could not get pet list. The following error occured: ${e}`
      );
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex">
      <Navbar />
      <div>
        <h2>Checked in pets:</h2>
        {checkedInPetsList ? (
          <PetListView list={checkedInPetsList} />
        ) : (
          <p>{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
