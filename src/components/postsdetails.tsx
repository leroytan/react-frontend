import { useFetch } from "../useFetch";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Post, isPost } from "../types/posts";
import Comments from "./postcomments";
import EditPost from "./editpost";
import { User } from "../types/user";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ReplyIcon from "@mui/icons-material/Reply";
import {
  IconButton,
  ListItem,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  List,
  ButtonGroup,
  Button,
  Box,
  Card,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import VerticalLikeDislike from "./verticallikedislike";
import { PollsOptionsVotes } from "../types/polloptions";
import Commentbar from "./commentbar";
import EditPostPage from "./editpost2";

export function finduserbyid(userids: User[], id: number) {
  for (let i = 0; i < userids.length; i = i + 1) {
    if (userids[i].ID === id) {
      return userids[i].Username;
    }
  }
}
const PostDetails = (prop: {
  courseid: number | undefined;
  categoryid: number | undefined;
  subcategoryid: number | undefined;
  postid: number | undefined;
  togglewarning: (bool: boolean) => void;
  handlechangeid: (
    courseid: number | undefined,
    categoryid: number | undefined,
    subcategoryid: number | undefined
  ) => void;
}) => {
  const [post, setPost] = useState<Post>();
  const [userpollsvotes, setUserpollsvotes] = useState<PollsOptionsVotes[]>();
  const [users, setUsers] = useState<User[]>();

  const { data, isPending, error } = useFetch(
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
  const navigate = useNavigate();
  const userdata = localStorage.getItem("user");
  const user: User = JSON.parse(userdata!).user;
  const handleDelete = () => {
    fetch(
      "http://127.0.0.1:3000/api/courses/" +
        prop.courseid +
        "/categories/" +
        prop.categoryid +
        "/subcategories/" +
        prop.subcategoryid +
        "/posts/" +
        post!.ID,
      {
        credentials: "include",
        method: "DELETE",
      }
    ).then(() => navigate("/"));
  };
  const [editing, setEditing] = useState<boolean>(false);
  const toggleedit = (bool: boolean) => {
    setEditing(bool);
  };
  const [iscommenting, setIsCommenting] = useState<boolean>(false);
  useEffect(() => {
    setEditing(false);
    if (data.post) {
      const post: Post = data.post;
      setPost(data.post);
    }
    if (data.userpollsvotes) {
      const userpollsvotes: PollsOptionsVotes[] = data.userpollsvotes;
      setUserpollsvotes(userpollsvotes);
    }
    if (data.users) {
      const users: User[] = data.users;
      setUsers(users);
    }
  }, [prop, data]);
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: "100%",
      }}
      component="article"
    >
      {!isPending && (
        <div>
          {prop.postid === undefined && <div></div>}
          {prop.postid != undefined && (
            <div>
              {isPending && <div>Loading...</div>}
              {error && <div>{error.message}</div>}
              {post && isPost(post) && (
                <>
                  <Card>
                    <ListItem>
                      <Grid container spacing={2} width="100%" maxWidth="100%">
                        <Grid xs>
                          {editing && (
                            <EditPostPage
                              courseid={prop.courseid}
                              categoryid={prop.categoryid}
                              subcategoryid={prop.subcategoryid}
                              postid={prop.postid}
                              toggleedit={toggleedit}
                              handlechangeid={prop.handlechangeid}
                            />
                          )}
                        </Grid>
                        {!editing && (
                          <>
                            <Grid xs={9.5} paddingBottom={5}>
                              {post.ParentpostID == 0 && <h2>{post.Title}</h2>}
                              <div>{finduserbyid(users!, post.UserID)}</div>
                              <div>
                                Updated at:{" "}
                                {new Date(post.UpdatedAt).toLocaleString()}
                              </div>
                            </Grid>
                            <Grid xs={2}>
                              {/*Side buttons*/}
                              <ButtonGroup
                                disableElevation
                                orientation="vertical"
                                variant="outlined"
                                aria-label="outlined primary button group"
                                sx={{ color: "red" }}
                              >
                                <Button
                                  title="Comment"
                                  onClick={() => setIsCommenting(!iscommenting)}
                                >
                                  <ReplyIcon />
                                </Button>
                                {post != null &&
                                  post.Username === user.Username && (
                                    <Button
                                      title="Edit"
                                      onClick={() => toggleedit(true)}
                                    >
                                      <EditIcon />
                                    </Button>
                                  )}

                                {post != null &&
                                  post.Username === user.Username && (
                                    <Button
                                      title="Delete"
                                      onClick={handleDelete}
                                    >
                                      <DeleteIcon />
                                    </Button>
                                  )}
                              </ButtonGroup>
                            </Grid>
                            {/*like and dislike button*/}
                            <Grid xs={"auto"} textAlign={"center"}>
                              <VerticalLikeDislike
                                courseid={prop.courseid}
                                categoryid={prop.categoryid}
                                subcategoryid={prop.subcategoryid}
                                postid={prop.postid}
                                post={post}
                                userpollsvotes={userpollsvotes}
                              />
                            </Grid>
                            <Grid xs>
                              <Box sx={{ whiteSpace: "pre-wrap" }}>
                                {post.Content}
                              </Box>
                            </Grid>
                          </>
                        )}
                      </Grid>
                    </ListItem>

                    {iscommenting && (
                      <Commentbar
                        courseid={prop.courseid}
                        categoryid={prop.categoryid}
                        subcategoryid={prop.subcategoryid}
                        postid={prop.postid}
                        post={post}
                        users={users!}
                        toggleedit={prop.togglewarning}
                        handlechangeid={prop.handlechangeid}
                      />
                    )}
                  </Card>
                  {
                    <Comments
                      courseid={prop.courseid}
                      categoryid={prop.categoryid}
                      subcategoryid={prop.subcategoryid}
                      postid={prop.postid}
                      post={post}
                      users={users!}
                      toggleedit={prop.togglewarning}
                      handlechangeid={prop.handlechangeid}
                    />
                  }
                </>
              )}
            </div>
          )}
        </div>
      )}
    </List>
  );
};
export default PostDetails;
