import { useState } from "react";
import { Switch } from "@material-tailwind/react";

export function CheckInToggle({ id, checkedin }) {
  const [isChecked, setIsChecked] = useState(checkedin);

  async function toggleCheckIn(usertoggle) {
    await fetch("http://localhost:5000/checkin", {
      method: "PUT",
      body: JSON.stringify({ id: id, checkedin: usertoggle }),
      headers: { "Content-Type": "application/json" },
    });
  }

  function handleChange() {
    setIsChecked(!isChecked);
    toggleCheckIn(isChecked);
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
