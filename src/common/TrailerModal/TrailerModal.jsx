import React from "react";
import Modal from "react-bootstrap/Modal";
import YouTube from "react-youtube";

const TrailerModal = ({ show, handleClose, trailerId }) => {
  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Trailer</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <YouTube videoId={trailerId} opts={{ width: "100%", height: "400" }} />
      </Modal.Body>
    </Modal>
  );
};

export default TrailerModal;