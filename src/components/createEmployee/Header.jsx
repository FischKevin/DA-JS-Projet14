import { Link } from "react-router-dom";

// Define the Header functional component
function Header() {

  return (
    <>
      <h1>HRnet</h1>
      <Link to="/current-employees">View Current Employees</Link>
    </>
  )
}

export default Header;