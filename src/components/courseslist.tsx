import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import { useValidate } from "./validate";
import { useFetch } from "../useFetch";
import { Course } from "../types/course";
import { Link } from "react-router-dom";
import { lightTheme } from "../theme";

import AddCourseDialog from "./createcourse";
export const CoursesList = () => {
  const userdata = useValidate().user;
  const [user, setUser] = useState<User>();
  const {
    data,
    isPending: FetchPending,
    error,
  } = useFetch(process.env.REACT_APP_API_KEY+"/api/getusercourses", 0);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const courses: Course[] = data.courses;

  useEffect(() => {
    setUser(userdata);
  }, [userdata]);
  return (
    <ThemeProvider theme={lightTheme}>
      <div>
        {!user && <h1>You are not logged in</h1>}
        {user && <h1>Welcome {user.Username}</h1>}
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          {courses &&
            courses.map((course: Course) => {
              return (
                <Stack
                  spacing={{ xs: 1, sm: 2 }}
                  direction="row"
                  useFlexGap
                  flexWrap="wrap"
                >
                  <Card sx={{ width: 250, maxWidth: 250, }}>
                    <CardActionArea
                      component={Link}
                      to={`/courses/${course.ID}`}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image="https://source.unsplash.com/random?wallpapers"
                        alt={course.Title}
                      />
                      <CardContent>
                        <div key={course.ID}></div>
                        <h2>{course.Title}</h2>
                        <p>{course.Description}</p>
                      </CardContent>
                    </CardActionArea>
                    {user && user.RoleID > 1 && (
                      <CardActions>
                        <Button size="small" color="primary">
                          <Link to={`/courses/${course.ID}/adduser`}>
                            Add/Remove user
                          </Link>
                        </Button>
                      </CardActions>
                    )}
                  </Card>
                </Stack>
              );
            })}

          {user && user.RoleID > 1 && <AddCourseDialog />}
        </Stack>
      </div>
    </ThemeProvider>
  );
};
