import { useState } from "react";
import { Switch } from "@material-tailwind/react";

export function CheckInToggle({ baseURL, id, checkedin }) {
  const [isChecked, setIsChecked] = useState(checkedin);

  async function toggleCheckIn(isChecked) {
    await fetch(`https://${baseURL}/checkin`, {
      method: "PUT",
      body: JSON.stringify({ id: id, checkedin: isChecked }),
      headers: { "Content-Type": "application/json" },
    });
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
