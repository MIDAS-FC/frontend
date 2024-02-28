import Modal from "react-modal";

function Modal_Talking({ modalIsOpen, toggleModal }: any) {
  return (
    <Modal
      isOpen={modalIsOpen}
      shouldCloseOnOverlayClick={false}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        },
        // modal창
        content: {
          position: "absolute",
          top: "80px",
          left: "500px",
          bottom: "80px",
          width: "500px",
          height: "650px",
          background: "#fff",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
        },
      }}
    ></Modal>
  );
}

export default Modal_Talking;
