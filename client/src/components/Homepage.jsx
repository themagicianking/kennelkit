import { Navbar } from "./Navbar";

export function Homepage() {
  return (
    <div className="main-container">
      <Navbar />
      <div className="homepage">
        <h1>Welcome to your kennel!</h1>
      </div>
    </div>
  );
}
