import { useState, useEffect } from "react";
import { useBaseLink } from "../../BaseLinkProvider";
import { Navbar } from "../Navbar";
import { OwnerListView } from "./OwnerListView";

export function AllOwnersList() {
  const [allOwnersList, setAllOwnersList] = useState([]);
  const link = useBaseLink();

  async function loadAllOwners() {
    try {
      await fetch(`https://${link}/allowners`)
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
