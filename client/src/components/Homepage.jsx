import { Navbar } from "./Navbar";

export function Homepage() {
  return (
    <div className="main-container">
      <Navbar selected={0} />
      <div className="page">
        <h2>Welcome to your kennel!</h2>
      </div>
    </div>
  );
}
