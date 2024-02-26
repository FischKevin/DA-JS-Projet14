import { useState } from 'react';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import { format } from 'date-fns';
import SearchIcon from '@mui/icons-material/Search';

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

  function formatDate(date) {
    return format(new Date(date), 'MM/dd/yyyy');
  }

  const rows = useSelector(state => state.employee.employeesList);
  const [searchTerm, setSearchTerm] = useState('');

  const employeesList = useSelector((state) => state.employee.employeesList);

  const searchTerms = searchTerm.toLowerCase().split(' ').filter(term => term.length > 0);

  const filteredEmployees = employeesList.filter((employee) => {
    const employeeDataString = `${employee.firstName.toLowerCase()} ${employee.lastName.toLowerCase()} ${employee.department.toLowerCase()} ${employee.street.toLowerCase()} ${employee.city.toLowerCase()} ${employee.state.toLowerCase()} ${employee.zipCode} ${formatDate(employee.dateOfBirth)} ${formatDate(employee.startDate)}`;
    return searchTerms.every(term => employeeDataString.includes(term));
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ height: 400, width: '1200px' }}>
      <TextField
      placeholder="Find an employee..."
      variant="outlined"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ width: '50%' }}
      margin="normal"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
          ),
        }}
      />
        <DataGrid
          rows={filteredEmployees}
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
