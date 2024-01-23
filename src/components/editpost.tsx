import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { lightTheme } from "../theme";
import { Alert, Box, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Post, isPost } from "../types/post";
import { useFetch } from "../useFetch";

export default function EditPostPage(prop: {
  courseid: number | undefined;
  categoryid: number | undefined;
  subcategoryid: number | undefined;
  postid: number | undefined;
  toggleedit: (bool: boolean) => void
  handlechangeid: (
    courseid: number | undefined,
    categoryid: number | undefined,
    subcategoryid: number | undefined
  ) => void;
}) {
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const editedpost = {
      title: data.get("title"),
      content: data.get("content"),
    };
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
  };
  useEffect(() => {
    if (post && isPost(post)) {
      setTitle(post.Title);
      setContent(post.Content);
    }
  }, [data]);

  return (
    <ThemeProvider theme={lightTheme}>
      <React.Fragment>
        <Alert severity="warning">
          Do not leave while editing, contents will not be saved
        </Alert>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            multiline
            defaultValue={title}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="content"
            label="Content"
            hiddenLabel
            type="text"
            id="content"
            defaultValue={content}
            InputLabelProps={{ shrink: true }}
            multiline
          />
          <Grid
            item
            sx={{ justifyContent: "center", display: "flex", color: "darkred" }}
          ></Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Confirm Edit
          </Button>
          <Button
            onClick={()=>prop.toggleedit(false)}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </React.Fragment>
    </ThemeProvider>
  );
}
