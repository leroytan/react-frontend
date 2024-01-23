import { Post } from "../types/post";
import { User } from "../types/user";
import PostDetails from "./postsdetails";
import {
  ListItem,
} from "@mui/material";

const Comments = (prop: {
  courseid: number | undefined;
  categoryid: number | undefined;
  subcategoryid: number | undefined;
  postid: number | undefined;
  post: Post;
  users: User[];
  toggleedit: (bool: boolean) => void;
  handlechangeid: (
    courseid: number | undefined,
    categoryid: number | undefined,
    subcategoryid: number | undefined
  ) => void;
}) => {
  return (
    <div>
      <br />
      
      
        {prop.post.Comments.map((comment) => {
          return (
            <ListItem sx={{ pl: 20 }}>
              <PostDetails
                courseid={prop.courseid}
                categoryid={prop.categoryid}
                subcategoryid={prop.subcategoryid}
                postid={comment.ID}
                togglewarning={prop.toggleedit}
                handlechangeid={prop.handlechangeid}
              />
            </ListItem>
          );
        })}
      
    </div>
  );
};

export default Comments;
