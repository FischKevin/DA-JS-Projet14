import { useState } from 'react';

const useEmployeeForm = (initialState) => {
  const [employee, setEmployee] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    // Restriction pour les champs firstName, lastName, et city pour n'accepter que des lettres
    if (["firstName", "lastName", "city"].includes(name) && !/^[A-Za-z]*$/.test(value)) return;
  
    // Restriction pour le champ zipCode pour n'accepter que des chiffres
    if (name === "zipCode" && !/^\d*$/.test(value)) return;

    // Restriction pour le champ street pour n'accepter que des lettres, des chiffres, des espaces, des tirets et des apostrophes
   if (name === "street" && !/^[A-Za-z0-9 \-']*$/.test(value)) return;
  
    // Mise à jour de l'état avec la nouvelle valeur
    setEmployee({ ...employee, [name]: value });
  };

  const handleDateChange = (name, date) => {
    setEmployee(prevEmployee => ({
      ...prevEmployee,
      [name]: date // Assurez-vous que 'date' est dans le format attendu ou converti correctement.
    }));
  };

  const handleZipChange = (increase) => {
    setEmployee(prevState => ({
      ...prevState,
      zipCode: increase 
        ? parseInt(prevState.zipCode || 0, 10) + 1 
        : Math.max(parseInt(prevState.zipCode || 0, 10) - 1, 0) // Empêche les valeurs négatives
    }));
  };

  return { employee, handleInputChange, handleDateChange, handleZipChange};
};

export default useEmployeeForm;
