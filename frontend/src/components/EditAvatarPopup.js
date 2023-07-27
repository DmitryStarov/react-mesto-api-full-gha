import PopupWithForm from "./PopupWithForm";
import useValidator from "../hooks/useValidator";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  buttonText,
}) {
  const { inputValues, errors, handleChange, resetValidation, isValid } =
    useValidator();

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log(inputValues);
    onUpdateAvatar(inputValues);
  }
  return (
    <PopupWithForm
      name={"edit-avatar"}
      title={"Обновить аватар"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
      resetValidation={resetValidation}
      isValid={isValid}
    >
      <label className="popup__field">
        <input
          type="url"
          name="avatar"
          placeholder="Ссылка на аватар"
          className={`popup__input popup__input_type_avatar ${
            errors?.avatar && "popup__input_error "
          }`}
          value={inputValues.avatar || ""}
          onChange={handleChange}
          required
        />
        <span className="popup__error-message">{errors.avatar}</span>
      </label>
    </PopupWithForm>
  );
}
