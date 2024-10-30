import { useState } from "react";
import { useBaseLink } from "../../BaseLinkProvider";
import { Switch } from "@material-tailwind/react";

export function CheckInToggle({ id, checkedin }) {
  const [isChecked, setIsChecked] = useState(checkedin);
  const link = useBaseLink();

  async function toggleCheckIn(isChecked) {
    await fetch(`https://${link}/checkin`, {
      method: "PUT",
      body: JSON.stringify({ id: id, checkedin: isChecked }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) =>
        console.log("Pet's check in status has been changed to:", json)
      );
  }

  function handleChange(e) {
    toggleCheckIn(e.target.checked);
    setIsChecked(e.target.checked);
  }
  return (
    <Switch
      color="green"
      label="Checked In?"
      checked={isChecked}
      onChange={handleChange}
    />
  );
}
