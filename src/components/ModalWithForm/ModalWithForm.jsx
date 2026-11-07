import { useEffect } from "react";

import "./ModalWithForm.css";
import close from "../../assets/close.png";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  name,
  onClose,
  onSubmit,
  isSubmitDisabled,
  toggleText,
  onToggleClick,
  submitError,
}) {
  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) onClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (evt) => {
      if (evt.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} className="modal__close" type="button">
          <img src={close} alt="close" />
        </button>
        <form
          onSubmit={onSubmit}
          name={name}
          className="modal__form"
          noValidate
        >
          {children}
          {submitError && <p className="modal__submit-error">{submitError}</p>}
          <div className="modal__button-row"></div>
          <div className="modal__button-row">
            <button
              type="submit"
              className="modal__submit"
              disabled={isSubmitDisabled}
            >
              {buttonText}
            </button>
            {toggleText && (
              <p className="modal__toggle">
                or{" "}
                <button
                  type="button"
                  className="modal__toggle-link"
                  onClick={onToggleClick}
                >
                  {toggleText}
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
