import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { newForumList } from "../../reducers/ForumReducer";

function ForumModal({ openModal, setOpenModal, user, topic_id }) {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [newId, setNewId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitForm = async () => {
    if (!user?.id) {
      setErrorMessage("User not found, please try again later or re-logging.");
    } else {
      setErrorMessage(null);
      setOpenModal(false);

      const response = await axios
        .post("http://localhost:8000/api/new-forum", {
          title: title,
          content: content,
          user_id: user?.id,
          topic_id: topic_id?.id,
        })
        .catch((error) => {});
      if (!response?.data?.error) {
        setNewId(response?.data?.forum?.id);
        const newForum = {
          ...response?.data?.forum,
          comments: [],
          time_diff: "Just now",
          user_name: user?.name,
        };
        dispatch(newForumList(newForum));
        setOpenSuccessModal(true);
        // reset form
        setTitle("");
        setContent("");
      }
    }
  };

  return (
    <div>
      <Modal
        show={openModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          onClick={() => {
            setOpenModal(false);
          }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Post a new forum
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="col-form-label">
                <h3>Title</h3>
              </label>
              <input
                className="form-control"
                id="recipient-name"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                <h5>Content</h5>
              </label>
              <textarea
                rows="12"
                className="form-control"
                id="message-text"
                maxLength="1000"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              ></textarea>
              <span style={{ float: "right" }}>{1000 - content.length}</span>
            </div>
          </form>
        </Modal.Body>
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-lg btn-success"
            disabled={title.length === 0 || content.length === 0}
            onClick={submitForm}
            style={{ float: "right", marginRight: "20px" }}
          >
            Post
          </button>
        </div>
        <div>
          <p style={{ float: "right", marginRight: "20px", color: "red" }}>
            {errorMessage}
          </p>
        </div>
      </Modal>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={openSuccessModal}
      >
        <Modal.Header
          closeButton
          onClick={() => {
            setOpenSuccessModal(false);
          }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Forum posted!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>
              You have successfully posted a new forum, kindly click on "Go to
              Post" to check out the newly posted forum!
            </p>
          </div>
        </Modal.Body>
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              navigate(`/forum-details/${newId}`);
            }}
            style={{ float: "right", marginRight: "20px" }}
          >
            Go to Post
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ForumModal;
