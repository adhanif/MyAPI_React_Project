import PostListItem from "./PostListItem";
export default function Postlist({ postLists, setPostLists }) {
  return (
    <div>
      {postLists.map((ele, index) => {
        return (
          <PostListItem
            key={index}
            index={index}
            post={ele}
            setPostLists={setPostLists}
            postLists={postLists}
          />
        );
      })}
    </div>
  );
}
