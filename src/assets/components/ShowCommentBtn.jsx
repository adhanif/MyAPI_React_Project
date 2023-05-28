import React from "react";
import { useState } from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ShowUsersBtn({ post, onCommentsInfo, onShowComments }) {
  const [commentsInfo, setCommentsInfo] = useState();
  const [showComments, setShowComments] = useState(false);

  const url = "https://jsonplaceholder.typicode.com/";

  function getComments(e) {
    e.preventDefault();
    if (!showComments) {
      setShowComments(showComments);
      axios.get(url + `posts/${post.id}/comments`).then((response) => {
        setCommentsInfo(response.data);
        setShowComments(true);
        onShowComments(true); // Pass commentsInfo to the parent component
        onCommentsInfo(response.data); // Pass commentsInfo to the parent component
      });
    } else {
      setShowComments(false);
      onShowComments(false); // Pass commentsInfo to the parent component
    }
  }

  return (
    <div>
      <div>
        <Button variant="warning" onClick={getComments} className="w-100">
          {showComments ? "Hide Comments" : "Show Comments"}
        </Button>
      </div>

      {/* <div>
        {showComments && (
          <div className="comments-details">
            {commentsInfo.map((item, index) => {
              return <p key={index}>{item.body}</p>;
            })}
          </div>
        )}
      </div> */}
    </div>
  );
}
