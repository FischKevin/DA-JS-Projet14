import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Header from '../createEmployee/Header';
import IdentityForm from '../createEmployee/IdentityForm';
import AddressForm from '../createEmployee/AddressForm';
import DepartmentForm from '../createEmployee/DepartmentForm';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal, addEmployee } from '../../features/employee/employeeSlice';
// import SimpleDialog from 'simplereactdialogcomponent';
import Dialog from 'simplereactdialogcomponent';

const initialFormData = {
  firstName: '',
  lastName: '',
  startDate: null,
  department: '',
  dateOfBirth: null,
  street: '',
  city: '',
  state: '',
  zipCode: '',
};

function CreateEmployee() {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.employee.showModal);
  const [formData, setFormData] = useState(initialFormData);

  const dialogContent = {
    title: 'Employee Created!',
    buttonText: 'Close',
  };

  
  useEffect(() => {


    const content = {
      title: 'Employee Created',
      buttonText: 'Toto',
    };  
    console.log('Button text:', content.buttonText); // Ajoutez ceci pour déboguer
    console.log('Button text:', content.buttonText); // Ajoutez ceci pour déboguer
  }, []);

  const handleCloseModal = () => {
    dispatch(toggleModal(false)); // Fermer la modale
    setFormData(initialFormData); // Réinitialiser le formulaire après la fermeture de la modale
  };

  const handleDataChange = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleSubmit = () => {
    const payload = {
      ...formData,
      id: Date.now(), 
      dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth.toISOString() : null,
      startDate: formData.startDate ? formData.startDate.toISOString() : null,
    };
  
    dispatch(addEmployee(payload));
    dispatch(toggleModal(true));
    setFormData(initialFormData);
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      <Header />
      <h2>Create Employee</h2>
      <IdentityForm onDataChange={handleDataChange}  formData={formData} />
      <AddressForm onDataChange={handleDataChange}  formData={formData} />
      <DepartmentForm onDataChange={handleDataChange}  formData={formData} />
      <Button onClick={handleSubmit} sx={{ margin: '0 auto', display: 'block' }}>Save</Button>
      {showModal && <Dialog isOpen={showModal} onClose={handleCloseModal} content={dialogContent} />}
    </Box>
  )

}

export default CreateEmployee;