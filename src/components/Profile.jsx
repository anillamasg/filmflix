import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Copyright from "./Copyright";
import { Link as RouterLink } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { currentUser, sendEmailToUpdate, sendPasswordToUpdate } = useAuth();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    setEmail(currentUser.email);
  }, [currentUser.email]);

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    setError("");
    setLoading(true);

    return Promise.resolve()
      .then(function () {
        return sendEmailToUpdate(emailRef.current.value);
      })
      .then(function () {
        return sendPasswordToUpdate(passwordRef.current.value);
      })
      .then(() => {
        setMessage("Profile updated succesfully.");
      })
      .catch((error) => {
        setError("Failed to update account.");
        console.log("error :>> ", error);
      })
      .finally(() => {
        setLoading(false);
        setPassword("");
        setConfirmPassword("");
      });
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
        <Box className="flex-column-center-mx4">
          <Link
            component={RouterLink}
            to="/"
            style={{ textDecoration: "none" }}
          >
            <Typography variant="h2" color="primary" sx={{ fontWeight: 400 }}>
              FILMFLIX
            </Typography>
          </Link>
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Profile
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
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              inputRef={emailRef}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              inputRef={passwordRef}
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep the same."
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              inputRef={passwordConfirmRef}
              margin="normal"
              fullWidth
              name="password"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Leave blank to keep the same."
              InputLabelProps={{ shrink: true }}
            />
            <Button
              disabled={loading}
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
            >
              Update
            </Button>
            <Link
              component={RouterLink}
              to="/"
              style={{ textDecoration: "none" }}
            >
              <Button
                fullWidth
                size="large"
                color="text"
                variant="contained"
                sx={{ mt: 0 }}
              >
                Cancel
              </Button>
            </Link>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
