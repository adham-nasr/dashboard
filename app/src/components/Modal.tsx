import "./Modal.css";

function Modal({ children }: any) {
  return <div className="modal-overlay">{children}</div>;
}

export default Modal