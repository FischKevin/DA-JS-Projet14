import { useState } from 'react';
import { Box } from '@mui/material';
import Header from '../createEmployee/Header';
import IdentityForm from '../createEmployee/IdentityForm';
import AddressForm from '../createEmployee/AddressForm';
import DepartmentForm from '../createEmployee/DepartmentForm';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal, addEmployee } from '../../features/employee/employeeSlice';
import SimpleDialog from 'simplereactdialogcomponent';
// import useEmployeeForm from '../../hooks/useEmployeeForm';

function CreateEmployee() {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.employee.showModal);
  // const { employeeFormData } = useEmployeeForm(); 
  // const { employee, handleInputChange, handleDateChange, handleZipChange } = useEmployeeForm({
  // const { employee } = useEmployeeForm({
  //   // Initialisez ici l'état initial si nécessaire, par exemple :
  //   firstName: '',
  //   lastName: '',
  //   startDate: '',
  //   department: '',
  //   dateOfBirth: '',
  //   street: '',
  //   city: '',
  //   state: '',
  //   zipCode: '',
  // });
  
  const dialogContent = {
    title: 'Employee Created',
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    startDate: null,
    department: '',
    dateOfBirth: null,
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleDataChange = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleSubmit = () => {
    const payload = {
      ...formData,
      id: Date.now(), // Assurez-vous d'ajouter un `id` unique ici
      dateOfBirth: formData.dateOfBirth.toISOString(), // Convertir en string ISO
      startDate: formData.startDate.toISOString(), // Convertir en string ISO
    };
  
    console.log("Soumission des données : ", payload);
    dispatch(addEmployee(payload));
    dispatch(toggleModal(true));
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      <Header />
      <h2>Create Employee</h2>
      <IdentityForm onDataChange={handleDataChange} />
      <AddressForm onDataChange={handleDataChange} />
      <DepartmentForm onDataChange={handleDataChange} />
      <Button onClick={handleSubmit} sx={{ margin: '0 auto', display: 'block' }}>Save</Button>
      {showModal && <SimpleDialog isOpen={showModal} onClose={() => dispatch(toggleModal())} content={dialogContent} />}
    </Box>
  )

}

export default CreateEmployee;