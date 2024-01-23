import { useParams } from "react-router-dom";
import { CategoryList } from "./categorylist";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  LinearProgress,
  ThemeProvider,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useEffect, useState } from "react";
import Postlist from "./postlist";
import PostDetails from "./postsdetails";
import { useFetch } from "../useFetch";
import { Category } from "../types/category";
import { lightTheme } from "../theme";
import AddCategoryDialog from "../createcategory";
import { useValidate } from "./validate";
import { User } from "../types/user";
import CreatePostPage from "./createpost";

const CoursePage = () => {
  const userdata = useValidate().user;
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setUser(userdata);
  }, [userdata]);

  const { courseid: courseidstr } = useParams();
  const [courseid, setCourseid] = useState<number>(Number(courseidstr));
  const {
    data,
    isPending: FetchPending,
    error,
  } = useFetch(
    "http://127.0.0.1:3000/api/courses/" + courseid + "/categories/",
    0
  );
  const categories: Category[] = data.categories;
  const [categoryid, setCategoryid] = useState<number | undefined>(undefined);
  const [subcategoryid, setSubcategoryid] = useState<number | undefined>(
    undefined
  );
  const [postid, setPostid] = useState<number | undefined>(undefined);
  const [editing, setEditing] = useState<boolean>(false);
  const [warning, setWarning] = useState<boolean>(false);
  const togglewarning = (bool: boolean) => {
    if (editing === true && bool === false) {
      setWarning(true);
    }
    if (editing === false && bool === true) {
      setEditing(true);
    }
  };
  const handlechangeid = (
    categoryid: number | undefined,
    subcategoryid: number | undefined,
    postid: number | undefined
  ) => {
    if (categoryid != undefined) {
      setCreatePostOpen(false)
      setCategoryid(categoryid);
      
    }
    if (subcategoryid != undefined) {
      setCreatePostOpen(false)
      setSubcategoryid(subcategoryid);
      
    }
    if (postid != undefined) {
      setCreatePostOpen(false)
      setPostid(postid);
      
    }
  };

  const [createpostopen, setCreatePostOpen] = useState(false);

  const handleCreatePostOpen = () => {
    setCreatePostOpen(true);
  };

  const handleCreatePostClose = () => {
    setCreatePostOpen(false);
  };
  useEffect(() => {
    if (Array.isArray(categories) && categories.length != 0) {
      setCategoryid(categories[0].ID);
      if (categories[0].Subcategories.length != 0) {
        setSubcategoryid(categories[0].Subcategories[0].ID);
      }
    }
  }, [data]);
  {
    /*end of variables*/
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <>
        {FetchPending && <LinearProgress />}
        {/* Popup that warns user of closing the edit page*/}
        <Dialog open={warning}>
          <DialogTitle>You are leaving the edit page</DialogTitle>
          <DialogContent>
            <DialogContentText>
              All data will be non-recoverable. Are you sure?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setWarning(false);
                setEditing(true);
              }}
            >
              Continue editing
            </Button>
            <Button
              onClick={() => {
                setWarning(false);
                setEditing(false);
              }}
              autoFocus
            >
              Leave
            </Button>
          </DialogActions>
        </Dialog>

        <Grid
          maxHeight={window.innerHeight - 60}
          maxWidth={window.innerWidth}
          display="flex"
          justifyContent="center"
          overflow={"hidden"}
          container
          spacing={4}
          sx={{
            pt: "10px",
            "--Grid-borderWidth": "1px",
            borderColor: "divider",
            "& > div": {
              borderRight: "var(--Grid-borderWidth) solid",
              borderBottom: "var(--Grid-borderWidth) solid",
              borderColor: "divider",
              pt: "10px",
            },
          }}
        >
          {/* Loading */}

          {FetchPending && (
            <Grid xs={0} md={1.5} border={1}>
              Loading...
            </Grid>
          )}
          {FetchPending && (
            <Grid xs={2} md={2} border={1}>
              Loading...
            </Grid>
          )}
          {FetchPending && <Grid xs={0} md={8.5} border={1}></Grid>}

          {/* No data*/}

          {!FetchPending && categoryid === undefined && (
            <>
              <Grid xs={0} md={1.5} border={1}>
                <Grid
                  sx={{
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  {user && user.RoleID > 1 && <AddCategoryDialog />}
                </Grid>
                No Categories
              </Grid>
            </>
          )}
          {!FetchPending && categoryid === undefined && (
            <Grid xs={2} md={2} border={1}>
              No Post
            </Grid>
          )}
          {!FetchPending && categoryid === undefined && (
            <Grid xs={0} md={8.5} border={1}></Grid>
          )}

          {/* Data has been fetched*/}

          {categoryid != undefined && (
            <Grid
              xs={1.5}
              md={1.5}
              border={1}
              maxHeight={window.innerHeight}
              overflow={"auto"}
            >
              <Grid
                sx={{
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                {user && user.RoleID > 1 && <AddCategoryDialog />}
              </Grid>
              <CategoryList
                courseid={courseid}
                categories={categories}
                user ={user!}
                handlechangeid={handlechangeid}
              />
            </Grid>
          )}
          {categoryid != undefined && (
            <Grid
              xs={2}
              md={2.5}
              border={1}
              maxHeight={window.innerHeight}
              overflow={"auto"}
            >
              <Grid
                sx={{
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <Button variant="outlined" onClick={handleCreatePostOpen}>
                  Create Post
                </Button>
              </Grid>
              <Postlist
                courseid={courseid}
                categoryid={categoryid}
                subcategoryid={subcategoryid}
                postid={postid}
                editing={editing}
                togglewarning={togglewarning}
                handlechangeid={handlechangeid}
              />
            </Grid>
          )}

          {categoryid != undefined && (
            <Grid
              xs={8.5}
              md={8}
              border={1}
              maxHeight={window.innerHeight}
              overflow={"auto"}
            >
              {createpostopen && (
                <CreatePostPage
                  courseid={courseid}
                  categoryid={categoryid}
                  subcategoryid={subcategoryid}
                />
              )}

              {!createpostopen && (
                <PostDetails
                  courseid={courseid}
                  categoryid={categoryid}
                  subcategoryid={subcategoryid}
                  postid={postid}
                  togglewarning={togglewarning}
                  handlechangeid={handlechangeid}
                />
              )}
            </Grid>
          )}
        </Grid>
      </>
    </ThemeProvider>
  );
};

export default CoursePage;
