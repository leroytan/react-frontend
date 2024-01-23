import { Box, Button, TextField } from "@mui/material";
import { Post } from "../types/post";
import { User } from "../types/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Commentbar = (prop: {
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
    const [mycomment, setMycomment] = useState<string>("");
    const [isPending, setIsPending] = useState<boolean>(false);
    const [err, setErr] = useState<any>(null);
    const navigate = useNavigate();
    const handleSubmit = async (entry: any) => {
        entry.preventDefault();
        const Title = "";
        const Content = mycomment;
        const ParentpostID = prop.post.ID;
        const comment = { Title, Content, ParentpostID };
        setIsPending(true);
        try {
          const response = await fetch(
            process.env.REACT_APP_API_KEY+"/api/courses/" +
              prop.courseid +
              "/categories/" +
              prop.categoryid +
              "/subcategories/" +
              prop.subcategoryid +
              "/posts",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(comment),
              credentials: "include",
            }
          );
          if (!response.ok) {
            const respjson = await response.json();
            throw respjson.error;
          } else {
            setIsPending(false);
            navigate("/");
          }
        } catch (error: any) {
          setIsPending(false);
          setErr(error);
        }
      };
    return(
      <div>
        <Box width="100%" maxWidth="100%" padding={3}>
        <TextField id="Comment"
          multiline
          value={mycomment}
          required
          fullWidth
          onChange={(e) => setMycomment(e.target.value)}>
        
        </TextField>
        </Box>
        <Box width="100%" maxWidth="100%" padding={3} textAlign={"right"}>
      <Button onClick={handleSubmit} variant="contained">
        Comment
      </Button>
      </Box>
      <br />
      </div>
    )
}
 
export default Commentbar;