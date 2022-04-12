import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "../../utils/axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Forgotpass() {
  const initFormState = {
    email: "",
  };
  const [formState, setFormState] = useState(initFormState);
  const { email } = formState;

  const handleChangeEmail = (e) => {
    setFormState({ [e.target.name]: e.target.value });
  };

  const onSubmitClick = async () => {
    try {
      await axios.put("/users/reset-password", {
        email: formState.email,
      });
      alert("Check your email");
    } catch (error) {}
  };

  return (
    <div className="pages">
      <div>
        <h1> Forgot Password</h1>
        <p> Fill the Email and Submit to get an update password page</p>
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Email"
          type="email"
          onChange={handleChangeEmail}
          value={email}
        />

        <Button variant="contained" onClick={onSubmitClick}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Forgotpass;
