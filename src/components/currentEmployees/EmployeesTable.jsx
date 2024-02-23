import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns';
// import { selectEmployees } from '../../features/employee/employeeSlice';

const columns = [
  { field: 'firstName', headerName: 'First Name', width: 130 },
  { field: 'lastName', headerName: 'Last Name', width: 130 },
  { 
    field: 'startDate', 
    headerName: 'Start Date', 
    width: 130,
    valueGetter: (params) => format(new Date(params.value), 'MM/dd/yyyy'),
  },
  { field: 'department', headerName: 'Department', width: 130 },
  { 
    field: 'dateOfBirth', 
    headerName: 'Date of Birth', 
    width: 130,
    valueGetter: (params) => format(new Date(params.value), 'MM/dd/yyyy'),
  },
  { field: 'street', headerName: 'Street', width: 130 },
  { field: 'city', headerName: 'City', width: 130 },
  { field: 'state', headerName: 'State', width: 130 },
  { field: 'zipCode', headerName: 'Zip Code', width: 130 },
];

function EmployeesTable() {
  // const rows = useSelector(selectEmployees);
  const rows = useSelector(state => state.employee.employeesList);
  console.log("Employés actuels:", rows);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ height: 400, width: '1200px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[10, 25, 50, 100]}
          disableSelectionOnClick
          getRowId={(row) => `${row.firstName}-${row.lastName}-${row.startDate}`}
        />
        <div style={{position: 'relative', top: '-36px', left: '-535px', fontSize: '0.875rem' }}>
          Total Entries: {rows.length}
        </div>
      </div>
    </div>
  );
}

export default EmployeesTable;
