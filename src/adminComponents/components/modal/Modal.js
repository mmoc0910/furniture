import React from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { toogleShowModal } from "../../sagas/modal/modalSlice";
import { useSelector } from "react-redux";

function createPortalWrapper() {
  const elm = document.createElement("div");
  elm.id = "portal-wrapper";
  return elm;
}
const portalWrapper = createPortalWrapper();

const Modal = ({ children, classModal = "", classContent = "" }) => {
  const { showModal } = useSelector((state) => state.modal);

  React.useEffect(() => {
    showModal
      ? document.body.appendChild(portalWrapper)
      : document.body.removeChild(portalWrapper);
  }, [showModal]);

  const dispatch = useDispatch();

  const PortalContent = () => (
    <div
      className={`modal z-20 fixed inset-0 flex items-center justify-center bg-[#16191b80] ${classModal}`}
    >
      <div
        className="absolute inset-0 z-30"
        onClick={() => dispatch(toogleShowModal(false))}
      ></div>
      <div className={`modal-content z-40 ${classContent}`}>{children}</div>
    </div>
  );
  return createPortal(<PortalContent></PortalContent>, portalWrapper);
};

export default Modal;
