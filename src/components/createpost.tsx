import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { FormEvent, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { lightTheme } from "../theme";
import { Box, Grid,} from "@mui/material";

export default function CreatePostPage(prop: {
  courseid: number | undefined;
  categoryid: number | undefined;
  subcategoryid: number | undefined;
}) {
    const [Category, setCategory] =useState(null);
    const [title, setTitle] =useState<string>('');
    const [content, setContent] = useState<string>('');
    const [isPending,setIsPending] = useState<boolean>(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        const data = new FormData(event.currentTarget);
        const post = {title:data.get("title"), content:data.get("content"), parentpostid:0};
        setIsPending(true);
        fetch(process.env.REACT_APP_API_KEY+"/api/courses/"+prop.courseid+"/categories/"+prop.categoryid+"/subcategories/"+prop.subcategoryid+"/posts",{
            method:'POST',
            headers:{"Content-Type": "application/json" },
            body: JSON.stringify(post),
            credentials: "include"
        }).then(()=>
        console.log("new post added"));
        setIsPending(false);
        
    }

  return (
    <ThemeProvider theme={lightTheme}>
    <React.Fragment>
    <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                multiline
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="content"
                label="Content"
                type="text"
                id="content"
                multiline
                
                
              />
              <Grid item sx={{justifyContent:"center",display:"flex", color:"darkred"}}>
              </Grid>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
    </React.Fragment>
    </ThemeProvider>
  );
  
}
