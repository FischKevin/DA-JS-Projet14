import { Link } from 'react-router-dom';
import EmployeesTable from '../currentEmployees/EmployeesTable';

function CurrentEmployees() {
  return (
    <div>
      <h2>Current Employees</h2>
      <EmployeesTable />
      <Link to="/">Home</Link>
    </div>
  );
}

export default CurrentEmployees;
