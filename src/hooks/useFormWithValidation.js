import { useState, useCallback } from 'react';
import { NOT_VALID_DEFAULT, NOT_VALID_EMAIL, NOT_VALID_NAME } from '../utils/const';

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const { name, value } = target;

    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });

    if (!target.validationMessage && target.pattern) {
      const regex = new RegExp(target.pattern, "i");

      if (!regex.test(value)) {
        switch (name) {
          case 'email':
            setErrors({...errors, [name]: NOT_VALID_EMAIL });

            break;
          case 'name':
            setErrors({...errors, [name]: NOT_VALID_NAME });

            break;
          default:
            setErrors({...errors, [name]: NOT_VALID_DEFAULT });

            break;
        }
      }
    }

    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, setValues, handleChange, errors, isValid, resetForm };
}


