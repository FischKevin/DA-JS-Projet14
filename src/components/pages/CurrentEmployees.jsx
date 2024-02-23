import { Link } from 'react-router-dom';
import EmployeesTable from '../currentEmployees/EmployeesTable';

function CurrentEmployees() {
  return (
    <div>
      <h2>Current Employees</h2>
      <EmployeesTable className='dataTable' />
      <p>
        <Link to="/" className='homeLink'>Home</Link>
      </p>
    </div>
  );
}

export default CurrentEmployees;
