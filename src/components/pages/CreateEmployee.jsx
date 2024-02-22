import { Box } from '@mui/material';
import Header from '../createEmployee/Header';
import IdentityForm from '../createEmployee/IdentityForm';
import AddressForm from '../createEmployee/AddressForm';
import DepartmentForm from '../createEmployee/DepartmentForm';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { saveEmployeeData, toggleModal } from '../../features/employee/employeeSlice';
import SimpleDialog from 'simplereactdialogcomponent';

function CreateEmployee() {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.employee.showModal);
  
  const dialogContent = {
    title: 'Employee Created',
  };

  const handleSubmit = () => {
    const employeeData = {
      // Supposons que vous ayez une manière de récupérer ces données du formulaire
    };
    dispatch(saveEmployeeData(employeeData));
    dispatch(toggleModal());
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      <Header />
      <h2>Create Employee</h2>
      <IdentityForm />
      <AddressForm />
      <DepartmentForm />
      <Button onClick={handleSubmit} sx={{ margin: '0 auto', display: 'block' }}>Save</Button>
      {showModal && <SimpleDialog isOpen={showModal} onClose={() => dispatch(toggleModal())} content={dialogContent} />}
    </Box>
  )

}

export default CreateEmployee;