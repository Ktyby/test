import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";

import "./style.css";

const Modal = memo(({ children, onClose, title, ...props }) => {
  const handleOverlayClick = useCallback((evt) => {
    if (evt.target.classList.contains("overlay")) {
      onClose();
    }
  }, []);

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div {...props} className="modal">
        <div className="modal__heading">
          <h3 className="modal__title">{title}</h3>
          <button className="modal__close" onClick={onClose}>
            ╳
          </button>
        </div>
        {children}
      </div>
    </div>
  );
});

Modal.propTypes = {
  children: PropTypes.any,
  onClose: PropTypes.func,
  title: PropTypes.string,
};
Modal.defaultProps = {
  onClose: () => {},
  title: "",
};

export default Modal;
