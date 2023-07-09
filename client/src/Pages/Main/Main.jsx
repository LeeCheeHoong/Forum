import React, { useEffect, useState } from "react";
import "./Main.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Main() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [topicCount, setTotalTopicCount] = useState(0);

  useEffect(() => {
    const getTopics = async () => {
      const response = await axios.get(`http://localhost:8000/api/all-topics`);
      if (response.data) {
        setTopics(response.data);
        const topicCount = response.data?.reduce(
          (acc, item) => acc + item.forum_count,
          0
        );
        setTotalTopicCount(topicCount);
      }
    };
    getTopics();
  }, []);

  return (
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="wrapper wrapper-content animated fadeInRight">
            <div class="ibox-content m-b-sm border-bottom">
              <div class="p-xs">
                <div class="pull-left m-r-md">
                  <i class="fa fa-globe text-navy mid-icon"></i>
                </div>
                <h2>Welcome to our forum</h2>
                <span>Feel free to choose topic you're interested in.</span>
              </div>
            </div>

            <div class="ibox-content forum-container">
              <div class="forum-title">
                <div class="pull-right forum-desc">
                  <small>Total posts: {topicCount}</small>
                </div>
                <h3>General subjects</h3>
              </div>
              {topics?.length === 0 ? (
                <div class="text-center m-5">
                  <div class="spinner-border" role="status"></div>
                </div>
              ) : (
                topics?.map((topic) => {
                  return (
                    <div class="forum-item active">
                      <div class="row">
                        <div class="col-md-11">
                          <div
                            onClick={() => {
                              navigate(`/forum/${topic?.id}`);
                            }}
                            class="forum-item-title"
                          >
                            {topic?.name}
                          </div>
                          <div class="forum-sub-title">
                            {topic?.description}
                          </div>
                        </div>
                        <div class="col-md-1 forum-info">
                          <span class="views-number">{topic?.forum_count}</span>
                          <div>
                            <small>Posts</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
