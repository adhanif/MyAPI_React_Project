import { useState } from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PostItem({ post, setPostLists, postLists }) {
  const url = "https://jsonplaceholder.typicode.com/";
  const [isEditMode, setIsEditMode] = useState(false);
  // const [editableId, setEditableId] = useState(post.id);
  const [editableTitle, setEditableTitle] = useState(post.title);
  const [editableBody, setEditableBody] = useState(post.body);

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

      console.log(postLists)
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

  return (
    <Card className="mb-5 e-card formCard">
      <div key={post.id} className="posts">
        {post.id}
        {/* <input
          type="text"
          value={editableId}
          readOnly={!isEditMode}
          onChange={handleIdChange}
          id={isEditMode ? "editable" : "noEdit"}
        /> */}
        <Card.Body>
          <Card.Title>
            <Form.Control
              as="textarea"
              value={editableTitle}
              readOnly={!isEditMode}
              onChange={handleTitleChange}
              id={isEditMode ? "editableTitle" : "noeditableTitle"}
            />
          </Card.Title>
          <Card.Text className="auto-height">
            <Form.Control
              as="textarea"
              value={editableBody}
              readOnly={!isEditMode}
              onChange={handleBodyChange}
              id={isEditMode ? "editableBody" : "noeditableBody"}
              // style={{ resize: "none", height: "100%" }}
            />
          </Card.Text>
          <Row className="mt-5">
            <Col>
              <Button onClick={turnOnEditMode} variant="secondary">
                Edit
              </Button>
            </Col>
            <Col>
              <Button onClick={saveEditMode} variant="success">
                Save
              </Button>
            </Col>
            <Col>
              <Button variant="danger" onClick={deleteMode}>
                Delete
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </div>
    </Card>
  );
}
