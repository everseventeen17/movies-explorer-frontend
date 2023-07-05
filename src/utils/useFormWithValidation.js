import { useCallback, useState } from "react";

function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const handleChange = (e) => {
    const target = e.target;
    const { value, name } = target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  }

  const resetForm = useCallback((newIsValid = false, newValues = {}, newErrors = {}) => {
    setIsValid(newIsValid);
    setValues(newValues);
    setErrors(newErrors);
  }, [setValues, setErrors, setIsValid]);

  return {values, errors, isValid, handleChange, resetForm,};
}

export default useFormWithValidation;
