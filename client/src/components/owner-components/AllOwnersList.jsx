import { useState, useEffect } from "react";
import { useServerName } from "../../ServerNameProvider";
import { Navbar } from "../Navbar";
import { OwnerListView } from "./OwnerListView";

export function AllOwnersList() {
  const [allOwnersList, setAllOwnersList] = useState(null);
  const serverName = useServerName();

  async function loadAllOwners() {
    try {
      await fetch(`https://${serverName}/allowners`)
        .then((res) => {
          if (res.status >= 400) {
            throw res.status;
          }
          return res.json();
        })
        .then((json) => setAllOwnersList(json));
    } catch (e) {
      console.log("Could not get owner list. The following error occurred:", e);
    }
  }

  useEffect(() => {
    loadAllOwners();
  }, []);

  return (
    <div className="flex">
      <Navbar />
      <div className="flex flex-col">
        <h2>All owners:</h2>
        {allOwnersList ? (
          <OwnerListView list={allOwnersList} />
        ) : (
          <p>List could not be found.</p>
        )}
      </div>
    </div>
  );
}
