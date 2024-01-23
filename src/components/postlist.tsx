import { useFetch } from "../useFetch";
import { useState } from "react";
import { Post, isPost } from "../types/posts";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ThemeProvider,
} from "@mui/material";
import { lightTheme } from "../theme";

const Postlist = (prop: {
  courseid: number | undefined;
  categoryid: number | undefined;
  subcategoryid: number | undefined;
  postid: number | undefined;
  editing: boolean;
  togglewarning: (bool: boolean) => void;
  handlechangeid: (
    courseid: number | undefined,
    categoryid: number | undefined,
    subcategoryid: number | undefined
  ) => void;
}) => {
  const courseid = prop.courseid;
  const categoryid = prop.categoryid;
  const subcategoryid = prop.subcategoryid;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleItemclick = (
    index: number
  ) => {
    setSelectedIndex(index);
  };
  const { data, isPending, error } = useFetch(
    "http://127.0.0.1:3000/api/courses/" +
      courseid +
      "/categories/" +
      categoryid +
      "/subcategories/" +
      subcategoryid +
      "/posts",
    0
  );
  const posts: Post[] = data.posts;
  console.log(posts);
  return (
    <ThemeProvider theme={lightTheme}>
      <div>
        {error && <div>{error.message}</div>}
        {isPending && <div>Loading...</div>}
        {posts && posts.length === 0 && <div>There is no posts</div>}
        {posts && posts.length !== 0 && isPost(posts[0]) && (
          <List>
          <div>
            {data.posts.map((post: Post, index: number) => {
              const updatedate = new Date(post.UpdatedAt);
              return (
                <div key={post.UpdatedAt}>
                  
                    <ListItem disablePadding >
                      <ListItemButton
                      sx={{ borderBottomColor:"divider",
                    borderBottomWidth:"3px",
                  borderBottomStyle:"solid"}}
                      selected={selectedIndex === index}
                        onClick={() => {
                          handleItemclick(index);
                          if (prop.editing === true) {
                            prop.togglewarning(true);
                          }
                          if (prop.editing === false) {
                            prop.handlechangeid(undefined, undefined, post.ID);
                          }
                        }}
                      >
                        <ListItemText 
                        >
                          <Box sx={{ maxHeight: "50px", overflow:"clip"}}><h2>{post.Title}</h2></Box>
                          <Box sx={{ maxHeight: "200px", overflow:"clip"}}><p>{post.Content}</p></Box>
                          <p>{updatedate.toLocaleString()}</p>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  
                </div>
              );
            })}
          </div>
          </List>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Postlist;
