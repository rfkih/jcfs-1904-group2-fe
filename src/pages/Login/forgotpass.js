import { Button, FormControl, FormLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "../../utils/axios";

function Forgotpass() {
  const [formState, setFormState] = useState({
    email: "",
  });
  console.log(formState);

  const handleChangeEmail = (e) => {
    setFormState({ [e.target.name]: e.target.value });
  };

  const onSubmitClick = async () => {
    try {
      await axios.post("/users/forgot-password", {
        email: formState.email,
      });
      alert("Check your email");
    } catch (error) {}
  };

  return (
    <div className="landing-page">
      <div>
        <h1> Forgot Password</h1>
        <p> Fill and Submit your Email to Update your password </p>
      </div>
      <div className="form-control">
        <FormControl sx={{ m: 3 }}>
          <FormLabel sx={{ mb: 4 }}>
            <TextField
              required
              id="outlined-required"
              label="Email"
              type="email"
              name="email"
              onChange={handleChangeEmail}
              value={formState.email}
              fullWidth
            />

            <Button variant="contained" onClick={onSubmitClick} sx={{ mt: 2 }}>
              Submit
            </Button>
          </FormLabel>
        </FormControl>
      </div>
    </div>
  );
}

export default Forgotpass;
