import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "../theme";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="https://mui.com/">
        Forumn
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
//Taken and adapted from the official docs of material UI
export default function Login() {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [err, setErr] = useState<any>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const logininfo = {
      email: data.get("email"),
      password: data.get("password"),
    };
    setIsPending(true);
    try {
      const response = await fetch("http://127.0.0.1:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logininfo),
        credentials: "include",
      });
      if (!response.ok) {
        const respjson = await response.json();
        throw respjson.error;
      } else {
        const response = await fetch("http://127.0.0.1:3000/api/validate", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw Error("unauthenticated");
        } else {
          setIsPending(false);
          navigate("/");
        }
      }
    } catch (error: any) {
      setIsPending(false);
      setErr(error);
    }
  };
  const [showpassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showpassword);
  const handleMouseDownPassword = () => setShowPassword(!showpassword);

  return (
    <ThemeProvider theme={lightTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              FORUMN
            </Typography>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showpassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showpassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Grid
                item
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  color: "darkred",
                }}
              >
                <div>{err}</div>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Grid container>
                <Grid item xs sx={{ color: "ActiveCaption" }}>
                  <Link to={`#`}>Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to={`/signup`}>{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
