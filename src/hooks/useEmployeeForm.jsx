import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addEmployee } from 'pathToYourReduxActions'; // Ajustez le chemin selon votre structure

const useEmployeeForm = (initialState) => {
  const [employee, setEmployee] = useState(initialState);
  // const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleDateChange = (name, value) => {
    setEmployee({ ...employee, [name]: value });
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault(); // Empêcher le rechargement de la page
  //   dispatch(addEmployee(employee));
  //   // Afficher le modal ici si nécessaire
  // };

  // return { employee, handleInputChange, handleDateChange, handleSubmit };
  return { employee, handleInputChange, handleDateChange };
};

export default useEmployeeForm;
