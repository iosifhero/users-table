import React, { useRef } from "react";

const Modal = ({ user, onClose }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  if (!user) return null;

  return (
    <div className={`modal ${user ? "show" : ""}`} onClick={handleClickOutside}>
      <div className="modal-content" ref={modalRef}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <p>Возраст: {user.age}</p>
        <p>
          Адрес: {user.address.city}, {user.address.address}
        </p>
        <p>Рост: {user.height} см</p>
        <p>Вес: {user.weight} кг</p>
        <p>Номер телефона: {user.phone}</p>
        <p>Email-адрес: {user.email}</p>
      </div>
    </div>
  );
};

export default Modal;
