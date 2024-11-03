import { Navbar } from "./Navbar";

export function Homepage() {
  return (
    <div className="main-container">
      <Navbar selected={0} />
      <div className="page">
        <h1>Welcome to your kennel!</h1>
      </div>
    </div>
  );
}
