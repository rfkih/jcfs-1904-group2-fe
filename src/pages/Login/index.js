import { useState, useContext } from "react";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";
import { loginAction } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { CartContext } from "../../helper/Context";
import { Link, Navigate } from "react-router-dom";
import axios from "../../utils/axios";

function LoginPage() {
  const dispatch = useDispatch();
  const { username, role } = useSelector((state) => {
    return state.auth;
  });
  const [isLoading, setIsLoading] = useState(false);
  const { userId, setUserId, setChange, change } = useContext(CartContext);
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onInputPress = (e) => {
    if (e.code === "Enter") onLogin();
  };

  const onLoginClick = () => {
    onLogin();
  };

  const onLogin = async () => {
    try {
      const res = await axios.post("/users/login", {
        username: formState.username,
        password: formState.password,
      });
      const payload = res.data;
      setChange(!change)

      if (res.data.role == "user") {
        setUserId(res.data.id);
      }
      console.log(res.data.role);

      const actionObj = loginAction(payload);
      console.log(actionObj);
      dispatch(actionObj);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  if (username) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="landing-page-login">
      <h1> Login </h1>
      <p>
        New to Pharmacy.com? <a href="/register"> Create an account </a>
      </p>

      <div className="form-control">
        <FormControl sx={{ m: 3 }}>
          <FormLabel sx={{ mb: 4 }}>
            <TextField
              required
              id="outlined-required"
              label="Username"
              name="username"
              onChange={handleChange}
              onKeyDown={onInputPress}
              fullWidth
            />

            <TextField
              id="outlined-password-input-required"
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              onChange={handleChange}
              onKeyDown={onInputPress}
              fullWidth
              sx={{ mt: 2, mb: 2 }}
            />
            <div className="login-button">
              <Link to="/forgot-password" class="login-text">
                {" "}
                forgot password?
              </Link>
              <Button
                variant="outlined"
                onClick={onLoginClick}
                onKeyDown={onInputPress}
              >
                {" "}
                {isLoading} Login{" "}
              </Button>
            </div>
          </FormLabel>
        </FormControl>
      </div>
    </div>
  );
}

export default LoginPage;
