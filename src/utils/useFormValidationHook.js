import {useCallback, useState} from 'react';

export function useFormValidationHook() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsFormValid] = useState(false);
  const handleChange = (e) => {
    const input = e.target;
    const name = input.name;
    const value = input.value;

    setValues({...values, [name]: value});
    setErrors({...errors, [name]: input.validationMessage});
    setIsFormValid(input.closest('form').checkValidity());
  }
  const resetForm = useCallback((newIsFormValid = false, newValues = {}, newErrors = {}) => {
    setIsFormValid(newIsFormValid);
    setValues(newValues);
    setErrors(newErrors);
  }, [setValues, setErrors, setIsFormValid]);

  return {values, errors, isValid, handleChange, resetForm, setValues, setIsFormValid, setErrors};
}
