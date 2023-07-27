import PopupWithForm from "./PopupWithForm";

export default function ConfirmPopup({
  isOpen,
  onClose,
  onConfirm,
  buttonText,
}) {
  const handleConfirm = (evt) => {
    evt.preventDefault();
    onConfirm();
  };
  return (
    <PopupWithForm
      name={"delete-image"}
      title={"Вы уверены?"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleConfirm}
      buttonText={buttonText}
      isValid={true}
    />
  );
}
