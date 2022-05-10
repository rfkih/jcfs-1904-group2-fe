import React, { useState } from "react";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { loginAction } from "../../store/actions";
import axios from "../../utils/axios";

function ResetPassword() {
  const dispatch = useDispatch;
  const params = useParams();
  const usernameLogin = useSelector((state) => state.auth.username);

  const [formState, setFormState] = useState({
    password: "",
  });

  const handleChangePassword = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  console.log(formState);

  const onResetPassword = async () => {
    try {
      const res = await axios.put(`/users/reset-password/${params.token}`, {
        password: formState.confirmPassword,
        token: params.token,
      });
      console.log(res.data);

      // const user = res.data.user;
      // const postToken = res.data.token;

      // const action = loginAction({ user, postToken });
      // dispatch(action);
    } catch (error) {
      console.log({ error });
      window.alert(error.message);
    }
  };

  const onConfirmClick = () => {
    onResetPassword();
    alert("Password has been reset");
    // <Navigate to="/login" replace />;
  };

  const onInputPress = (e) => {
    if (e.code === "Enter") onResetPassword();
  };

  // if (usernameLogin) {
  //   return <Navigate to="/" replace />;
  // }

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
