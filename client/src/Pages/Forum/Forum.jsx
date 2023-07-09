import React, { useEffect, useState } from "react";
import "./Forum.css";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import ForumModal from "./ForumModal";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getForumList } from "../../reducers/ForumReducer";

function Forum() {
  const topic_id = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [openTopicCount, setOpenTopicCount] = useState(0);
  const [closedTopicCount, setClosedTopicCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentForum, setCurrentForum] = useState(null);
  const user = useSelector((state) => state.user?.value);
  const forums = useSelector((state) => state.forum);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const getForums = async () => {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/all-forums/${topic_id?.id}`
      );

      if (response?.data) {
        dispatch(getForumList(response?.data?.forums));
        setOpenTopicCount(response?.data?.open_forums_count);
        setClosedTopicCount(response?.data?.closed_forums_count);
        setCurrentForum(response?.data?.topic_name);
      }
      setLoading(false);
    };
    getForums();
  }, []);

  return (
    <div class="container">
      <ForumModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        user={user}
        topic_id={topic_id}
      />
      {loading ? (
        <div class="spinner-border mt-5" role="status">
          <span class="visually-hidden"></span>
        </div>
      ) : (
        <section class="content">
          <div className="mt-5">
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
                <li class="breadcrumb-item active" aria-current="page">
                  {currentForum}
                </li>
              </ol>
            </nav>
          </div>
          <div class="row">
            <div class="col-md-3">
              <div class="grid support">
                <div class="grid-body">
                  <h2>Browse</h2>
                  <hr />
                  <ul>
                    <li class="active">
                      <a href="#">
                        Everyone's Issues
                        <span class="pull-right">{forums?.length ?? 0}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-9">
              <div class="grid support-content">
                <div class="grid-body">
                  <h2>Issues</h2>
                  <hr />
                  <div class="btn-group">
                    <button type="button" class="btn btn-default active">
                      {openTopicCount} Open
                    </button>
                    <button type="button" class="btn btn-default">
                      {closedTopicCount} Closed
                    </button>
                  </div>
                  {user?.id && (
                    <button
                      type="button"
                      class="btn btn-success pull-right"
                      data-toggle="modal"
                      data-target="#newIssue"
                      onClick={() => {
                        setOpenModal(true);
                      }}
                    >
                      New Forum
                    </button>
                  )}
                  <div class="padding"></div>
                  <div class="row">
                    <div class="col-md-12">
                      <ul class="list-group fa-padding">
                        {forums?.map((forum) => {
                          return (
                            <li
                              class="list-group-item"
                              data-toggle="modal"
                              data-target="#issue"
                              onClick={() => {
                                navigate(`/forum-details/${forum?.id}`);
                              }}
                            >
                              <div class="media">
                                <div class="media-body">
                                  <strong>{forum?.title}</strong>{" "}
                                  {forum?.status === 0 && (
                                    <strong>[Closed]</strong>
                                  )}
                                  <span class="number pull-right">
                                    # {forum?.id}
                                  </span>
                                  <p class="info">
                                    Opened by <b>{forum?.user_name}</b>{" "}
                                    <span style={{ float: "right" }}>
                                      {forum?.time_diff}
                                      <i class="fa fa-comments"></i>{" "}
                                      <span href="#">
                                        {forum?.comments.length} comments
                                      </span>
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Forum;
