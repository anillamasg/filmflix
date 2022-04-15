import React, { useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Link,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "./Copyright";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ForgotPassword() {
  const emailRef = useRef();

  const { resetPassword } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Password reset link has been sent to your email.");
    } catch (error) {
      setError("Failed to reset password.");
    }

    setLoading(false);
  }

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <CssBaseline />
      <Grid
        className="flex-center-none"
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={24}
        square
      >
        <Box
          className="flex-column-center-mx4"
          sx={{
            width: "100%",
          }}
        >
          <Typography variant="h2" color="primary" sx={{ fontWeight: 400 }}>
            FILMFLIX
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          {message && (
            <Typography variant="h6" color="primary" sx={{ mt: 5 }}>
              {message}
            </Typography>
          )}

          {error && (
            <Typography variant="h6" color="error" sx={{ mt: 5 }}>
              {error}
            </Typography>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 2, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              inputRef={emailRef}
              fullWidth
            />
            <Button
              disabled={loading}
              type="submit"
              size="large"
              variant="contained"
              fullWidth
              sx={{ mt: 1, mb: 2 }}
            >
              Reset Password
            </Button>
            <Grid container sx={{ justifyContent: "space-between" }}>
              <Grid item>
                <Link component={RouterLink} to="/signin">
                  {"Sign In?"}
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/signup">
                  {"Need an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
