import { useEffect } from "react";

export default function ImagePopup({ card, onClose }) {
  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) onClose();
  }

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") onClose();
    };
    if (card) document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [card, onClose]);

  return (
    <div
      className={`popup popup_type_view-image ${card && "popup_opened"}`}
      onMouseDown={handleOverlayClick}
    >
      <div className="popup__container-image">
        <button
          type="button"
          className="popup__button-close"
          onClick={onClose}
        ></button>
        <img
          src={card ? card.link : "#"}
          alt={card ? card.name : ""}
          className="popup__image"
        />
        <h2 className="popup__image-description">{card ? card.name : ""}</h2>
      </div>
    </div>
  );
}
