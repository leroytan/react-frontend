import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../useFetch";
import { Post, isPost } from "../types/posts";
import { Alert } from "@mui/material";

const EditPost = (prop: {
  courseid: number | undefined;
  categoryid: number | undefined;
  subcategoryid: number | undefined;
  postid: number | undefined;
  handlechangeid: (
    courseid: number | undefined,
    categoryid: number | undefined,
    subcategoryid: number | undefined
  ) => void;
}) => {
  const { id } = useParams();
  const {
    data,
    error,
    isPending: fetchPending,
  } = useFetch(
    "http://127.0.0.1:3000/api/courses/" +
      prop.courseid +
      "/categories/" +
      prop.categoryid +
      "/subcategories/" +
      prop.subcategoryid +
      "/posts/" +
      prop.postid,
    0
  );
  const post: Post = data.post;
  const navigate = useNavigate();
  const [Category, setCategory] = useState(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleSubmit = (entry: any) => {
    entry.preventDefault();
    const editedpost = { Category, title, content };
    setIsPending(true);
    fetch(
      "http://127.0.0.1:3000/api/courses/" +
        prop.courseid +
        "/categories/" +
        prop.categoryid +
        "/subcategories/" +
        prop.subcategoryid +
        "/posts/" +
        prop.postid,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedpost),
        credentials: "include",
      }
    ).then(() => console.log("post edited"));
    setIsPending(false);
    navigate("/");
  };
  useEffect(() => {
    if (post && isPost(post)) {
      setTitle(post.Title);
      setContent(post.Content);
    }
  }, [data]);

  return (
    <div>
      <Alert severity="warning">
        Do not leave while editing, contents will not be saved
      </Alert>
      <br />
      {fetchPending && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {post && isPost(post) && (
        <form onSubmit={handleSubmit}>
          <label>Category: </label>
          <input></input>

          <br />
          <label>Title: </label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <br />
          <label>Content: </label>
          <input
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></input>
          <br />
          {!isPending && <button>Edit Post</button>}
          {isPending && <button disabled>Editing post...</button>}
        </form>
      )}
    </div>
  );
};

export default EditPost;
