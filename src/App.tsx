import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signout from "./components/signout";
import { CoursesList } from "./components/courseslist";
import CoursePage from "./components/coursepage";
import RequireAuth from "./protectedroute";
import NavBar from "./components/navbar";
import Adduser from "./components/adduser";
import Login from "./components/login";
import Signup from "./components/signup";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signout" element={<Signout />} />
          <Route path="/" element={<Navigate to="/courses" />} />
          <Route
            path="/courses"
            element={
              <RequireAuth>
                <>
                  <NavBar />
                  <CoursesList />
                </>
              </RequireAuth>
            }
          />

          <Route
            path="/courses/:courseid/adduser"
            element={
              <RequireAuth>
                <>
                  <NavBar />
                  <Adduser />
                </>
              </RequireAuth>
            }
          />
          <Route
            path="/courses/:courseid"
            element={
              <RequireAuth>
                <>
                  <NavBar />
                  <CoursePage />
                </>
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
