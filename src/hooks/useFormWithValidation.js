import { useState, useCallback } from 'react';
import { NOT_VALID_EMAIL, NOT_VALID_NAME, PATTERN_NAME } from '../utils/const';
import isEmail from "validator/es/lib/isEmail";

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const { name, value } = target;

    let isValid = true;

    setValues({...values, [name]: value});

    if (!target.validationMessage) {
      switch (name) {
        case 'email':
          if (!isEmail(value)) {
            setErrors({...errors, [name]: NOT_VALID_EMAIL });

            isValid = false;
          }

          break;
        case 'name':
          const regex = new RegExp(PATTERN_NAME, "i");

          if (!regex.test(value)) {
            setErrors({...errors, [name]: NOT_VALID_NAME });

            isValid = false;
          }

          break;
      }

      if (isValid) {
        setErrors({...errors, [name]: '' });
      }
    } else {
      setErrors({...errors, [name]: target.validationMessage });
      isValid = false;
    }

    setIsValid(target.closest("form").checkValidity() ? isValid : false);
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


