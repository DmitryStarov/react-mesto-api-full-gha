import PopupWithForm from "./PopupWithForm";
import useValidator from "../hooks/useValidator";

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  buttonText,
}) {
  const {
    inputValues,
    errors,
    handleChange,
    resetValidation,
    isValid,
  } = useValidator();

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(inputValues);
  }
  return (
    <PopupWithForm
      name="add-image"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
      resetValidation={resetValidation}
      isValid={isValid}
    >
      <label className="popup__field">
        <input
          type="text"
          name="name"
          id="image-input"
          placeholder="Название"
          className="popup__input popup__input_type_image-name"
          minLength="2"
          maxLength="30"
          autoComplete="off"
          onChange={handleChange}
          value={inputValues.name || ""}
          required
        />
        <span className="popup__error-message">{errors.name}</span>
      </label>
      <label className="popup__field">
        <input
          type="url"
          name="linkImage"
          id="link-input"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_type_image-link"
          onChange={handleChange}
          value={inputValues.linkImage || ""}
          required
        />
        <span className="popup__error-message">{errors.linkImage}</span>
      </label>
    </PopupWithForm>
  );
}
