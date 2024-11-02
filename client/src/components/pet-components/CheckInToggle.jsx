import PropTypes from "prop-types";
import { useState } from "react";
import { useServerName } from "../../ServerNameProvider";
import { Switch } from "@material-tailwind/react";

export function CheckInToggle({ id, checkedin }) {
  const serverName = useServerName();
  const [isChecked, setIsChecked] = useState(checkedin);

  async function toggleCheckIn(isChecked) {
    console.log(`Sending check in status ${isChecked} to the server.`);
    try {
      await fetch(`https://${serverName}/checkin`, {
        method: "PUT",
        body: JSON.stringify({ id: id, checkedin: isChecked }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (res.status >= 400) {
            throw res.status;
          }
          return res.json();
        })
        .then((json) =>
          console.log("Pet's check in status has been changed to:", json)
        );
    } catch (e) {
      console.log(
        "Could not update check in status. The following error occurred:",
        e
      );
    }
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

CheckInToggle.propTypes = {
  id: PropTypes.number.isRequired,
  checkedin: PropTypes.bool.isRequired,
};
