import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
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
      alert("Registrasi berhasil");
    } catch (error) {
      alert("Registrasi gagal");
    }
  };

  if (usernameLogin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="pages">
      <h1> Register Here </h1>

      <div>
        <TextField
          required
          name="username"
          id="outlined-required"
          label="Username"
          type="username"
          onChange={handleChange}
          value={username}
        />

        <TextField
          required
          name="email"
          id="outlined-required"
          label="Email"
          type="email"
          onChange={handleChange}
          value={email}
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
        />
        <Button variant="outlined" onClick={onRegisterClick}>
          Register
        </Button>
      </div>
    </div>
  );
}

export default RegisterPage;
