import { useEffect } from "react";

import "../ModalWithForm/ModalWithForm.css";
import "./RegistrationSuccessModal.css";
import close from "../../assets/close.png";

function RegistrationSuccessModal({ isOpen, onClose, onSignInClick }) {
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
      className={`modal modal_type_success ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content">
        <h2 className="modal__title modal__title_type_success">
          Registration successfully completed!
        </h2>
        <button onClick={onClose} className="modal__close" type="button">
          <img src={close} alt="close" />
        </button>
        <button type="button" className="modal__link" onClick={onSignInClick}>
          Sign in
        </button>
      </div>
    </div>
  );
}

export default RegistrationSuccessModal;
