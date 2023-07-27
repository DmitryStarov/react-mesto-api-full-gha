import React from "react";

export default function useValidator(values = {}) {
  const [inputValues, setInputValues] = React.useState(values);
  const [isValid, setIsValid] = React.useState(false);
  const [errors, setErrors] = React.useState("");

  function handleChange(evt) {
    const { value, name } = evt.target;
    setInputValues({ ...inputValues, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setIsValid(evt.target.closest(".form").checkValidity());
  }

  function resetValidation() {
    setInputValues({});
    setIsValid(false);
    setErrors({});
  }

  return {
    inputValues,
    setInputValues,
    errors,
    handleChange,
    resetValidation,
    isValid,
  };
}
