import PostListItem from "./PostListItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import PaginationBtn from "./PaginationBtn";

export default function Postlist({ postLists, setPostLists }) {
  const [page, setPage] = useState(1); // for Pagination
  return (
    <Container>
      <Row className="d-flex align-items-center justify-content-center">
        {/* slice function is used only for pagination */}
        {postLists.slice(page * 10 - 10, page * 10).map((ele, index) => (
          <Col xs={12} md={12} key={ele.id}>
            <PostListItem
              index={index}
              post={ele}
              setPostLists={setPostLists}
              postLists={postLists}
            />
          </Col>
        ))}
      </Row>
      {/* For Pagination */}
      <div>
        <PaginationBtn page={page} postLists={postLists} setPage={setPage} />
      </div>
    </Container>
  );
}
