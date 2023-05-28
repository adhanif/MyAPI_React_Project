import PostListItem from "./PostListItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import PaginationBtn from "./PaginationBtn";

export default function Postlist({ postLists, setPostLists }) {
  const [page, setPage] = useState(1); // for Pagination

  const postsPerPage = 10; // Number of posts to display per page
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const displayedPosts = postLists.slice(startIndex, endIndex);

  return (
    <Container>
      <Row className="d-flex align-items-center justify-content-center">
        {/* slice function is used only for pagination */}
        {displayedPosts.map((ele, index) => (
          <Col xs={12} md={12} key={`${ele.id}_${index}`}>
            <PostListItem
              index={startIndex + index}
              post={ele}
              setPostLists={setPostLists}
              postLists={postLists}
            />
          </Col>
        ))}
      </Row>
      {/* For Pagination */}
      <div>
        <PaginationBtn
          postLists={postLists}
          setPage={setPage}
          postsPerPage={postsPerPage}
        />
      </div>
    </Container>
  );
}
