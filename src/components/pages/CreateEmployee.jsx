import Header from '../createEmployee/Header';
import IdentityForm from '../createEmployee/IdentityForm';
import AddressForm from '../createEmployee/AddressForm';
import DepartmentForm from '../createEmployee/DepartmentForm';
// import Button from '@mui/material/Button';
// import useEmployeeForm from '../../hooks/useEmployeeForm';

function CreateEmployee() {

  return (
    <>
      <Header />
      <h2>Create Employee</h2>
      <IdentityForm />
      <AddressForm />
      <DepartmentForm />
      {/* <Button onClick={handleSubmit}>Save</Button> */}
    </>
  )

}

export default CreateEmployee;