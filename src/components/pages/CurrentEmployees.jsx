import { Link } from 'react-router-dom';
import EmployeesTable from '../currentEmployees/EmployeesTable';

// Functional component for the Current Employees page
function CurrentEmployees() {
  return (
    <div>
      <h2>Current Employees</h2>
      <EmployeesTable className='dataTable' />
      <p>
        {/* Navigation link to return to the home page */}
        <Link to="/" className='homeLink'>Home</Link>
      </p>
    </div>
  );
}

export default CurrentEmployees;
