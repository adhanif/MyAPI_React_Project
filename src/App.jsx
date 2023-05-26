import { useEffect, useState } from "react";

import "./App.css";
import axios from "axios";
import PostList from "./assets/components/PostList";
import Form1 from "./assets/components/Form";

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
      <Form1 setPostLists={setPostLists} postLists={postLists} />
      <PostList postLists={postLists} setPostLists={setPostLists} />
    </>
  );
}

export default App;
