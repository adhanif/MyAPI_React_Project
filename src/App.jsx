import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import PostList from "./assets/components/PostList";
import Form1 from "./assets/components/Form";
import Navbar from "./assets/components/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  const url = "https://jsonplaceholder.typicode.com/";
  const [postLists, setPostLists] = useState([]);
 

  const getData = () => {
    axios
      .get(url + "posts")
      .then((response) => {
        // console.log(response.data);
        setPostLists(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(postLists);
  // getData()
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <Row className="justify-content-center">
          <Form1 setPostLists={setPostLists} postLists={postLists} />
        </Row>
        <Row className="justify-content-center">
          <PostList
            postLists={postLists}
            setPostLists={setPostLists}
            
          />
        </Row>
      </Container>
    </>
  );
}

export default App;
