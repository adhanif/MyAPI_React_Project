import { Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
export default function Form1({ setPostLists, postLists }) {
  const [userId, setUserId] = useState();
  const [userTitle, setTitle] = useState();
  const [userBody, setuserBody] = useState();

  // to create post
  const form = {
    userId: Number(userId),
    title: userTitle,
    body: userBody,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(url + "posts", form)
      .then((response) => {
        // console.log([...postLists, response.data]);
        // console.log(response.data);
        setPostLists([...postLists, response.data]);
        setUserId("");
        setTitle("");
        setuserBody("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleUserId(e) {
    setUserId(e.target.value);
  }
  function handleUserTitle(e) {
    setTitle(e.target.value);
  }
  function handleUserBody(e) {
    setuserBody(e.target.value);
  }

  return (
    <Card className="mb-5 formCard">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            value={userId}
            onChange={handleUserId}
            placeholder="Add ID"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            value={userTitle}
            onChange={handleUserTitle}
            placeholder="Add Title"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            value={userBody}
            onChange={handleUserBody}
            placeholder="Add Body"
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </Card>
  );
}
