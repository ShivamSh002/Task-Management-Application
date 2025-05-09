import React, { useState } from "react";
import axios from "axios";
import AuthImg from "../../Assets/7.png";
import styles from "./Register.module.css";
import {
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { LockOpen, PersonAdd } from "@mui/icons-material";
import TaskManager from "../TaskManager/TaskManager";

const RegisterAndLogin = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
   const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = async (type) => {
    setLoading(true);
    setError("");

    try {
      if (!email || !password || (isRegister && !confirmPass)) {
        throw new Error("All fields are required.");
      }

      if (isRegister && password !== confirmPass) {
        throw new Error("Passwords do not match.");
      }

      const url = `https://task-management-application-3dmi.onrender.com/auth/${type}`;
      const payload = { email, password , withCredentials: true};

      const response = await axios.post(url, payload);

      if (type === "login") {
        localStorage.setItem("token", response.data.token);
        alert("Login successful");
        setIsAuthenticated(true);
      } else {
        alert("Registration successful, please log in.");
        setIsRegister(false);
      }

      setEmail("");
      setPassword("");
      setConfirmPass("");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

   if (isAuthenticated) {
          return <TaskManager />;
      }
  return (
    <div>
      <h1 className={styles.head}>Task Management Application</h1>
      <div className={styles.container}>
        <div>
          <img src={AuthImg} alt="Auth" className={styles.img} />
        </div>
        <div>
          <Box display="flex" justifyContent="center" alignItems="center" bgcolor="#f5f5f5">
            <Card sx={{ width: 400, borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" align="center" gutterBottom color="primary">
                  {isRegister ? "Create Account" : "Login"}
                </Typography>

                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {isRegister && (
                  <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                  />
                )}

                {error && (
                  <Typography color="error" align="center" mt={1}>
                    {error}
                  </Typography>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => handleAuth(isRegister ? "register" : "login")}
                  disabled={loading}
                >
                  {loading
                    ? "Please wait..."
                    : isRegister
                    ? "Register"
                    : "Login"}
                </Button>

                <Box mt={2} display="flex" justifyContent="center" alignItems="center">
                  <Typography color="black" align="center" mr={1}>
                    {isRegister
                      ? "Already have an account?"
                      : "Don't have an account?"}
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => setIsRegister(!isRegister)}
                    startIcon={isRegister ? <LockOpen /> : <PersonAdd />}
                  >
                    {isRegister ? "Continue to Login" : "Register Now"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default RegisterAndLogin;
