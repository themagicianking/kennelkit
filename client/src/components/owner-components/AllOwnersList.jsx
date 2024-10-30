import { useState, useEffect } from "react";
import { Navbar } from "../Navbar";
import { OwnerListView } from "./OwnerListView";

export function AllOwnersList({ baseUrl }) {
  const [allOwnersList, setAllOwnersList] = useState([]);

  async function loadAllOwners() {
    try {
      await fetch(`https://${baseUrl}/allowners`)
        .then((res) => {
          return res.json();
        })
        .then((json) => setAllOwnersList(json));
    } catch (e) {
      console.log(
        "Could not connect to the server. The following error occurred:",
        e
      );
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
        <OwnerListView list={allOwnersList} />
      </div>
    </div>
  );
}
