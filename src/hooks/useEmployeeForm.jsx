import { useState } from 'react';

// A function to validate form inputs based on the input name
const validateInput = (name, value) => {
  // Validators object containing regex for various form inputs
  const validators = {
    firstName: value => /^[A-Za-zÀ-ÖØ-öø-ÿ\s-']*$/.test(value), // Allows letters, spaces, hyphens, and apostrophes
    lastName: value => /^[A-Za-zÀ-ÖØ-öø-ÿ\s-']*$/.test(value), // Same as firstName
    city: value => /^[A-Za-zÀ-ÖØ-öø-ÿ\s-']*$/.test(value), // Same as firstName
    zipCode: value => /^\d*$/.test(value), // Allows only digits
    street: value => /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 \-']*$/.test(value), // Allows letters, digits, spaces, hyphens, and apostrophes
  };

  // Check if the validator exists for the input and use it, otherwise return true (valid)
  return validators[name] ? validators[name](value) : true;
};

// Custom hook for managing employee form state
const useEmployeeForm = (initialState) => {
  // State to hold the form data
  const [employee, setEmployee] = useState(initialState);

  // Function to handle changes in text input fields, with validation
  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    // If input is invalid according to validateInput, do not update state
    if (!validateInput(name, value)) return;

    // Update the state with the new value for the given field name
    setEmployee({ ...employee, [name]: value });
  };

  // Function to handle changes in date fields
  const handleDateChange = (name, date) => {
    // Update the state with the new date for the given field name
    setEmployee(prevEmployee => ({
      ...prevEmployee,
      [name]: date
    }));
  };

  // Function to increment or decrement the zip code value
  const handleZipChange = (increase) => {
    setEmployee(prevState => ({
      ...prevState,
      zipCode: increase 
        ? parseInt(prevState.zipCode || 0, 10) + 1 
        : Math.max(parseInt(prevState.zipCode || 0, 10) - 1, 0)
    }));
  };

  // Return the form state and handler functions from the hook
  return { employee, handleInputChange, handleDateChange, handleZipChange };
};

export default useEmployeeForm;
