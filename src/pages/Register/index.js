import React, { useState } from "react";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "../../utils/axios";

function RegisterPage() {
  const initFormState = {
    username: "",
    email: "",
    password: "",
  };

  const [formState, setFormState] = useState(initFormState);
  const { username, email, password } = formState;
  const usernameLogin = useSelector((state) => state.auth.username);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onRegisterClick = async () => {
    try {
      const newUser = {
        role: "user",
        username,
        email,
        password,
      };
      await axios.post("/users", newUser);
      setFormState(initFormState);
      alert("Registrasi berhasil & verifikasi account melalui Email");
    } catch (error) {
      alert("Registrasi gagal");
    }
  };

  if (usernameLogin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="landing-page">
      <h1> Register Here </h1>
      <h4> Welcome to Pharmacy! </h4>

      <div className="form-control">
        <FormControl sx={{ m: 3 }}>
          <FormLabel sx={{ mb: 4 }}>
            <TextField
              required
              name="username"
              id="outlined-required"
              label="Username"
              type="username"
              onChange={handleChange}
              value={username}
              fullWidth
            />

            <TextField
              required
              name="email"
              id="outlined-required"
              label="Email"
              type="email"
              onChange={handleChange}
              value={email}
              fullWidth
              sx={{ mt: 2 }}
            />

            <TextField
              required
              name="password"
              id="outlined-password-input-required"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={handleChange}
              value={password}
              fullWidth
              sx={{ mt: 2 }}
            />
          </FormLabel>
          <Button variant="outlined" onClick={onRegisterClick}>
            Register
          </Button>
          <Button variant="text" a href="/login" sx={{ mt: 2 }} size="small">
            Already have an account?
          </Button>
        </FormControl>
      </div>
    </div>
  );
}

export default RegisterPage;
