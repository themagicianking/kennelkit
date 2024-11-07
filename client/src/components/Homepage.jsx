import { Navbar } from "./Navbar";
import { Card } from "@material-tailwind/react";

export function Homepage() {
  return (
    <div className="main-container">
      <Navbar selected={0} />
      <Card shadow={true} variant="gradient" className="page">
        <h2>Welcome to your kennel!</h2>
      </Card>
    </div>
  );
}
