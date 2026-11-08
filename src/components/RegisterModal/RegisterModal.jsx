import { useState, useEffect } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  isOpen,
  onRegister,
  onClose,
  onToggleClick,
  submitError,
}) => {
  const defaultValues = {
    email: "",
    password: "",
    name: "",
  };

  const validateForm = (formValues) => {
    const nextErrors = {};
    const trimmedName = formValues.name.trim();
    const trimmedEmail = formValues.email.trim();

    if (!trimmedName) {
      nextErrors.name = "Please enter your name.";
    } else if (trimmedName.length < 2) {
      nextErrors.name = "Name must be at least 2 characters.";
    } else if (trimmedName.length > 30) {
      nextErrors.name = "Name must be 30 characters or fewer.";
    }

    if (!trimmedEmail) {
      nextErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = "Please enter a valid email.";
    }

    if (!formValues.password) {
      nextErrors.password = "Please enter a password.";
    }

    return nextErrors;
  };

  const {
    values,
    errors,
    isSubmitted,
    handleChange,
    handleSubmit: submitForm,
  } = useFormWithValidation(defaultValues, validateForm);

  const [touched, setTouched] = useState({});

  const handleBlur = (evt) => {
    const { name } = evt.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  useEffect(() => {
    if (!isOpen) setTouched({});
  }, [isOpen]);

  function handleSubmit(evt) {
    const isFormValid = submitForm(evt);

    if (!isFormValid) {
      return;
    }

    onRegister({ ...values });
  }

  const currentErrors = validateForm(values);

  const showError = (fieldName) =>
    (touched[fieldName] || isSubmitted) && Boolean(currentErrors[fieldName]);
  const isSubmitDisabled = Object.keys(validateForm(values)).length > 0;

  return (
    <ModalWithForm
      name="register"
      title="Sign up"
      buttonText="Sign up"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
      toggleText=" Sign in"
      onToggleClick={onToggleClick}
      submitError={submitError}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className={`modal__input ${showError("email") ? "modal__input_invalid" : ""}`}
          name="email"
          id="register-email"
          placeholder="Enter email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          aria-invalid={showError("email")}
        />
        <span
          className={`modal__error ${showError("email") ? "modal__error_visible" : ""}`}
        >
          {currentErrors.email || ""}
        </span>
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className={`modal__input ${showError("password") ? "modal__input_invalid" : ""}`}
          name="password"
          id="register-password"
          placeholder="Enter password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={showError("password")}
        />
        <span
          className={`modal__error ${showError("password") ? "modal__error_visible" : ""}`}
        >
          {currentErrors.password || ""}
        </span>
      </label>
      <label htmlFor="register-name" className="modal__label">
        Username{" "}
        <input
          type="text"
          name="name"
          className={`modal__input ${showError("name") ? "modal__input_invalid" : ""}`}
          id="register-name"
          placeholder="Enter your username"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          aria-invalid={showError("name")}
        />
        <span
          className={`modal__error ${showError("name") ? "modal__error_visible" : ""}`}
        >
          {currentErrors.name || ""}
        </span>
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
