import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const Upload = () => {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("picture", image, image.name);

      await axios.post("/api/profile/upload", formData);
      setError(false);
      handleClose();
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  const fileData = () => {
    if (image)
      return (
        <h5>
          {" "}
          <em> {image.name} </em>{" "}
        </h5>
      );

    return null;
  };

  return (
    <>
      <a className="btn" href="#!" onClick={handleShow}>
        {" "}
        <i className="fas fa-user-plus text-primary"></i> Add Profile Picture
      </a>

      <Modal className="container" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <div className="custom-file">
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="custom-file-input"
                  id="image"
                />

                <label className="custom-file-label" htmlFor="image">
                  {image ? fileData() : "Choose File"}
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>

            {error ? (
              <div className="text-danger">
                {" "}
                Some error occured uploading the file{" "}
              </div>
            ) : null}
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Upload;
