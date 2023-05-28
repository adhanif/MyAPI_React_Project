import { useState } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import ShowCommentBtn from "./ShowCommentBtn";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PostListItem.css";

export default function PostItem({ post, setPostLists, postLists }) {
  const url = "https://jsonplaceholder.typicode.com/";
  const [isEditMode, setIsEditMode] = useState(false);
  // const [editableId, setEditableId] = useState(post.id);
  const [editableTitle, setEditableTitle] = useState(post.title);
  const [editableBody, setEditableBody] = useState(post.body);
  const [commentsInfo, setCommentsInfo] = useState([]); // for prob from child (ShowCommentBtn)
  const [ShowCommentinfo, setShowCommentinfo] = useState([]); //for prob from child (ShowCommentBtn)
  const [showUserInfo, setShowUserInfo] = useState();
  const [hideUserInfo, setHideUserInfo] = useState("show");
  function turnOnEditMode() {
    setIsEditMode(true);
  }

  // Edit button function
  function saveEditMode(event) {
    event.preventDefault();
    if (isEditMode) {
      setIsEditMode(false);
      axios
        .put(url + `posts/${post.id}`, { editableTitle, editableBody })
        .then((response) => {
          const editedPost = response.data;
          const updatedPostLists = postLists.map((ele) => {
            if (ele.id === post.id) {
              return editedPost;
            }
            return ele;
          });
          setPostLists(updatedPostLists);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  //Delete button function
  function deleteMode(event) {
    event.preventDefault();
    axios
      .delete(url + `posts/${post.id}`)
      .then(() => {
        const updatedListAfterdelet = postLists.filter(
          (ele) => ele.id !== post.id
        );
        // console.log(updatedListAfterdelet);
        setPostLists(updatedListAfterdelet);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // function handleIdChange(e) {
  //   setEditableId(e.target.value);
  // }

  function handleTitleChange(e) {
    setEditableTitle(e.target.value);
  }

  function handleBodyChange(e) {
    setEditableBody(e.target.value);
  }

  // for child compoennt showCommentBtn
  const handleCommentsInfo = (comments) => {
    setCommentsInfo(comments);
  };
  const handleShowComment = (info) => {
    setShowCommentinfo(info);
  };

  // get user information and show
  function ShowUsersBtn(e) {
    e.preventDefault();
    if (hideUserInfo === "show") {
      axios.get(url + `posts/${post.id}/comments`).then((response) => {
        // console.log(response.data);
        setShowUserInfo(response.data);

        setHideUserInfo("hide");
      });
    } else {
      setShowUserInfo([]);
      setHideUserInfo("show");
    }
  }
  // formCard
  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Card className="mb-5 e-card posts-cards align-items-center post-cards">
        <Card.Body>
          <Card.Title className="text-center mb-2">Post#{post.id}</Card.Title>
          <Card.Title className="text-center ">
            <Form.Control
              as="textarea"
              value={editableTitle}
              readOnly={!isEditMode}
              onChange={handleTitleChange}
              id={isEditMode ? "editableTitle" : "noeditableTitle"}
              // className="card-title-textarea"
              className="card-title-textarea"
              style={{
                backgroundColor: isEditMode ? "#f8f8f8" : "transparent",
                ooutline: "none",
              }}
            />
          </Card.Title>
          <Card.Text className="auto-height">
            <Form.Control
              as="textarea"
              value={editableBody}
              // readOnly={!isEditMode}
              onChange={handleBodyChange}
              id={isEditMode ? "editableBody" : "noeditableBody"}
              className="card-body-textarea"
              style={{
                backgroundColor: isEditMode ? "#f8f8f8" : "transparent",
              }}
            />
          </Card.Text>
          <Row className="mb-5 g-1 text-center">
            <Col md="auto" className="mb-2">
              <Button
                onClick={turnOnEditMode}
                variant="secondary"
                className="w-100"
              >
                Edit
              </Button>
            </Col>
            <Col md="auto" className="mb-2">
              <Button
                onClick={saveEditMode}
                variant="success"
                className="w-100"
              >
                Save
              </Button>
            </Col>
            <Col md="auto" className="mb-2">
              <Button variant="danger" onClick={deleteMode} className="w-100">
                Delete
              </Button>
            </Col>
            <Col md="auto" className="mb-2">
              <ShowCommentBtn
                post={post}
                setPostLists={setPostLists}
                postLists={postLists}
                onCommentsInfo={handleCommentsInfo}
                onShowComments={handleShowComment}
              />
            </Col>
            <Col md="auto" className="mb-2">
              <Button variant="dark" onClick={ShowUsersBtn} className="w-100">
                {hideUserInfo === "show"
                  ? "Show Users Info"
                  : "Hide Users Info"}
              </Button>
            </Col>
          </Row>
          <Row>
            {ShowCommentinfo && (
              <div>
                {commentsInfo.map((item, index) => (
                  <div key={index} className="showComments">
                    <p key={index}>{item.body}</p>
                  </div>
                ))}
              </div>
            )}
          </Row>
          <Row>
            {showUserInfo && (
              <div>
                {showUserInfo.map((ele, index) => (
                  <div key={index} className="userInfo">
                    <p key={index}>
                      {" "}
                      <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
                      {ele.name}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
                      {ele.email}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
