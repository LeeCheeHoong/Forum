import React, { useEffect, useState } from "react";
import "./ForumDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  getCommentList,
  newCommentList,
  deleteComment,
  newEdit,
  editComment,
} from "../../reducers/CommentReducer";
import profileIcon from "../../images/profile_icon.png";
import { Modal } from "react-bootstrap";

function ForumDetails() {
  // const forums = useSelector((state) => state.forum);
  const [forum, setForum] = useState([]);
  const comments = useSelector((state) => state.comment?.comment);
  const edit = useSelector((state) => state.comment?.editComment);
  const forum_id = useParams();
  const user = useSelector((state) => state.user?.value);
  const dispatch = useDispatch();
  const [showTextBox, setShowTextBox] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newEditText, setNewEditText] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getComments = async () => {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/forum/${forum_id?.id}`
      );

      if (response?.data) {
        dispatch(getCommentList(response?.data?.comments ?? []));
      }

      setForum(response?.data?.forum);
      setLoading(false);
    };
    getComments();
  }, [forum_id]);

  const handleNewComment = () => {
    setShowTextBox(true);
  };

  const handleCommentSubmit = async () => {
    const response = await axios
      .post(`http://localhost:8000/api/new-comment`, {
        user_id: user?.id,
        forum_id: forum_id?.id,
        content: newComment,
      })
      .catch((error) => {});
    if (response?.data) {
      const newComment = {
        ...response?.data?.comment,
        time_diff: "Just now",
        user_name: user?.name,
      };
      dispatch(newCommentList(newComment));
    }
    // After submitting the comment, reset the state variables
    setShowTextBox(false);
    setNewComment("");
  };

  const closeForum = async () => {
    setDeleteLoading(true);
    const response = await axios
      .put(`http://localhost:8000/api/close-forum`, {
        user_id: user?.id,
        forum_id: forum_id?.id,
      })
      .catch((error) => {});

    setDeleteLoading(false);
    if (!response?.data?.error) {
      window.location.reload();
    }
  };

  const deleteCommentAction = async (commentId) => {
    axios
      .delete(`http://localhost:8000/api/delete-comment`, {
        data: { comment_id: commentId, user_id: user?.id },
      })
      .then((response) => {
        // Handle the success response
        dispatch(deleteComment(commentId));
      })
      .catch((error) => {});
  };

  const editCommentAction = async (commentId) => {
    axios
      .put(`http://localhost:8000/api/edit-comment`, {
        content: newEditText,
        comment_id: commentId,
        user_id: user?.id,
      })
      .then((response) => {
        dispatch(editComment({ commentId: commentId, content: newEditText }));
      })
      .catch((error) => {});
    dispatch(newEdit(null));
  };

  return loading ? (
    <div class="container mt-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden"></span>
      </div>
    </div>
  ) : (
    <div class="container mt-5">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <span
              className="bread-crumb-span"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </span>
          </li>
          <li class="breadcrumb-item">
            <span
              className="bread-crumb-span"
              onClick={() => {
                navigate(`/forum/${forum[0]?.topic_id}`);
              }}
            >
              {forum[0]?.topic_name}
            </span>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {forum[0]?.title}
          </li>
        </ol>
      </nav>
      {forum[0]?.user_id === user?.id && forum[0]?.status !== 0 && (
        <div className="row">
          <button
            className="btn btn-danger mb-2"
            style={{ width: "120px" }}
            onClick={() => {
              setOpenModal(true);
            }}
          >
            {deleteLoading ? "Closing" : "Close Topic"}
          </button>
        </div>
      )}
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
            Close the topic
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to close this topic?</Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Cancel
          </button>
          <button className="btn btn-danger" onClick={closeForum}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <div>
        <div className="row d-flex justify-content-center mt-5">
          <div className="col-md-8">
            <div class="card p-3 mt-2">
              <div class="d-flex justify-content-between align-items-center">
                <div class="user d-flex flex-row align-items-center">
                  <span>
                    <img
                      src={profileIcon}
                      width="30"
                      class="user-img rounded-circle"
                      style={{ marginRight: "10px" }}
                    />
                    <small class="font-weight-bold text-primary">
                      {forum[0]?.user_name}
                    </small>{" "}
                    <div class="font-weight-bold mt-2">{forum[0]?.content}</div>
                  </span>
                </div>
                <small style={{ marginTop: "-30px" }}>
                  {forum[0]?.time_diff}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row d-flex justify-content-center mt-5">
        <div class="col-md-8">
          <div class="headings d-flex justify-content-between align-items-center mb-3">
            <h5>Comments ({comments?.length ?? 0})</h5>
          </div>
          {comments?.length === 0 ? (
            <div class="card p-3 mt-2">
              <div class="d-flex justify-content-between align-items-center">
                <div class="user d-flex flex-row align-items-center">
                  <span>
                    <div class="font-weight-bold mt-2">No comments</div>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            comments?.map((comment) => {
              return (
                <div class="card p-3 mt-2">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="user d-flex flex-row align-items-center">
                      <span>
                        <img
                          src={profileIcon}
                          width="30"
                          class="user-img rounded-circle"
                          style={{ marginRight: "10px" }}
                        />
                        <small class="font-weight-bold text-primary">
                          {comment?.user_name}
                        </small>{" "}
                        <div class="font-weight-bold mt-2">
                          {comment?.user_id === user?.id &&
                          edit &&
                          edit === comment?.id ? (
                            <input
                              value={newEditText}
                              onChange={(event) => {
                                setNewEditText(event?.target.value);
                              }}
                            ></input>
                          ) : (
                            <div>{comment?.content}</div>
                          )}
                        </div>
                      </span>
                    </div>

                    <small style={{ marginTop: "-30px" }}>
                      {comment?.time_diff}
                    </small>
                  </div>
                  {comment?.user_id === user?.id &&
                    (edit && edit === comment?.id ? (
                      <div>
                        <small
                          className="editDeleteBtn"
                          onClick={() => {
                            editCommentAction(comment?.id);
                          }}
                        >
                          Save
                        </small>
                      </div>
                    ) : (
                      <div>
                        <small
                          className="editDeleteBtn"
                          onClick={() => {
                            setNewEditText(comment?.content);
                            dispatch(newEdit(comment?.id));
                          }}
                        >
                          Edit
                        </small>
                        <small
                          className="editDeleteBtn"
                          onClick={() => {
                            deleteCommentAction(comment?.id);
                          }}
                          style={{ color: "red" }}
                        >
                          Delete
                        </small>
                      </div>
                    ))}
                </div>
              );
            })
          )}
          {showTextBox && (
            <div class="card p-3 mt-2">
              <div className="mt-3">
                <textarea
                  className="form-control"
                  style={{ border: "0" }}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Enter your comment"
                ></textarea>
              </div>
            </div>
          )}
          {forum[0]?.status === 1 && user?.id ? (
            <div className="mt-5">
              <button
                className="btn btn-success"
                onClick={() => {
                  showTextBox ? handleCommentSubmit() : handleNewComment();
                }}
              >
                {showTextBox ? "Submit Comment" : "New Comment"}
              </button>
            </div>
          ) : (
            <div class="alert alert-warning mt-2" role="alert">
              This forum has been closed.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForumDetails;
