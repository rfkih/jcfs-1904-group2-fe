import React, { useState } from "react";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";

import { useParams } from "react-router-dom";
import axios from "../../utils/axios";

function ResetPassword() {
  const params = useParams();

  const [formState, setFormState] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangePassword = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const { token } = useParams();

  const onResetPassword = async () => {
    try {
      const res = await axios.put(`/users/reset-password/${token}`, {
        password: formState.confirmPassword,
        token: params.token,
      });
    } catch (error) {
      console.log({ error });
      window.alert(error.message);
    }
  };

  const onConfirmClick = () => {
    onResetPassword();
    alert("Password has been reset");

  };

  const onInputPress = (e) => {
    if (e.code === "Enter") onResetPassword();
  };


  return (
    <div className="landing-page">
      <div>
        <h1> Update Your Password </h1>
      </div>
      <div className="form-control">
        <FormControl sx={{ m: 3 }}>
          <FormLabel sx={{ mb: 4 }}>
            <TextField
              required
              id="outlined-required"
              label="New Password"
              type="password"
              name="newPassword"
              onChange={handleChangePassword}
              fullWidth
            />

            <TextField
              required
              id="outlined-required"
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              onChange={handleChangePassword}
              onKeyDown={onInputPress}
              fullWidth
              sx={{ mt: 2, mb: 2 }}
            />

            <Button
              variant="contained"
              onClick={onConfirmClick}
              href="/login"
              sx={{ mt: 2 }}
            >
              Confirm
            </Button>
          </FormLabel>
        </FormControl>
      </div>
    </div>
  );
}

export default ResetPassword;
