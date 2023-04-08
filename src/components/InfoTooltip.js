import closeIcon from "../images/cross.svg";
import React from "react";
import successAuthImg from "../images/success-auth-img.svg";
import failAuthImg from "../images/fail-auth-img.svg";

function InfoTooltip({ name, isOpen, onClose, isSuccessTooltipStatus }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__conteiner">
        <button className="popup__close" type="button" onClick={onClose}>
          <img
            className="popup__close-cross"
            src={closeIcon}
            alt="закрыть окно"
          />
        </button>
        <img
          className="popup__register-image"
          src={isSuccessTooltipStatus ? successAuthImg : failAuthImg}
        />
        <p className="popup__register-text">
          {isSuccessTooltipStatus
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
