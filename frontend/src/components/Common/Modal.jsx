import React, {
  useEffect,
  useRef,
} from "react";
import PropTypes from "prop-types";
import "./Modal.css";

const Modal = ({
  isOpen = false,
  onClose,
  title = "",
  children,
  size = "medium",
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  footer = null,
  className = "",
}) => {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    previousActiveElement.current =
      document.activeElement;

    const handleKeyDown = (event) => {
      if (
        closeOnEscape &&
        event.key === "Escape"
      ) {
        if (typeof onClose === "function") {
          onClose();
        }
      }

      if (event.key === "Tab") {
        const modal =
          modalRef.current;

        if (!modal) {
          return;
        }

        const focusableElements =
          modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );

        if (!focusableElements.length) {
          return;
        }

        const firstElement =
          focusableElements[0];

        const lastElement =
          focusableElements[
            focusableElements.length - 1
          ];

        if (
          event.shiftKey &&
          document.activeElement === firstElement
        ) {
          event.preventDefault();
          lastElement.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === lastElement
        ) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    document.body.classList.add(
      "modal-open"
    );

    const timer = window.setTimeout(() => {
      const firstFocusable =
        modalRef.current?.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

      if (firstFocusable) {
        firstFocusable.focus();
      }
    }, 0);

    return () => {
      window.clearTimeout(timer);

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.classList.remove(
        "modal-open"
      );

      if (
        previousActiveElement.current &&
        typeof previousActiveElement.current.focus ===
          "function"
      ) {
        previousActiveElement.current.focus();
      }
    };
  }, [
    isOpen,
    onClose,
    closeOnEscape,
  ]);

  if (!isOpen) {
    return null;
  }

  const modalClasses = [
    "app-modal",
    `app-modal-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleOverlayClick = (event) => {
    if (
      event.target === event.currentTarget &&
      closeOnOverlayClick &&
      typeof onClose === "function"
    ) {
      onClose();
    }
  };

  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <div
      className="app-modal-overlay"
      onMouseDown={handleOverlayClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        className={modalClasses}
        role="dialog"
        aria-modal="true"
        aria-labelledby={
          title
            ? "app-modal-title"
            : undefined
        }
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="app-modal-header">
            {title && (
              <h2
                id="app-modal-title"
                className="app-modal-title"
              >
                {title}
              </h2>
            )}

            {showCloseButton && (
              <button
                type="button"
                className="app-modal-close"
                onClick={handleClose}
                aria-label="Close modal"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  <path
                    d="M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="app-modal-body">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="app-modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.oneOf([
    "small",
    "medium",
    "large",
    "fullscreen",
  ]),
  showCloseButton: PropTypes.bool,
  closeOnOverlayClick: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  footer: PropTypes.node,
  className: PropTypes.string,
};

export default Modal;