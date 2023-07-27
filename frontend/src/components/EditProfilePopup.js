import { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import useValidator from "../hooks/useValidator";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateProfile,
  buttonText,
}) {
  const {
    inputValues,
    setInputValues,
    errors,
    handleChange,
    resetValidation,
    isValid,
  } = useValidator();

  const { name, about } = useContext(CurrentUserContext);

  useEffect(() => {
    setInputValues({ name, about });
  }, [isOpen, name, about, setInputValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateProfile(inputValues);
  }

  return (
    <PopupWithForm
      name={"edit-user"}
      title={"Редактировать профиль"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
      resetValidation={resetValidation}
      isValid={isValid}
    >
      {" "}
      <label className="popup__field">
        <input
          type="text"
          name="name"
          id="name-input"
          placeholder="Имя пользователя"
          className="popup__input popup__input_type_name"
          minLength="2"
          maxLength="40"
          autoComplete="off"
          value={inputValues.name || ""}
          onChange={handleChange}
          required
        />
        <span className="popup__error-message">{errors.name}</span>
      </label>
      <label className="popup__field">
        <input
          type="text"
          name="about"
          id="about-input"
          placeholder="О себе"
          className="popup__input popup__input_type_about"
          minLength="2"
          maxLength="200"
          autoComplete="off"
          value={inputValues.about || ""}
          onChange={handleChange}
          required
        />
        <span className="popup__error-message">{errors.about}</span>
      </label>
    </PopupWithForm>
  );
}
