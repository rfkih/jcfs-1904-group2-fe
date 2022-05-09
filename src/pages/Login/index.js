import { useState, useContext } from "react";
import { Button, TextField } from "@mui/material";
import { loginAction } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import {CartContext} from '../../helper/Context'
import { Link, Navigate } from "react-router-dom";
import axios from "../../utils/axios";

function LoginPage() {
  const dispatch = useDispatch();
  const {username, role} = useSelector((state) => {
    return state.auth;
  });
  const [isLoading, setIsLoading] = useState(false);
  const {userId, setUserId} = useContext(CartContext)
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

      if (res.data.role == 'user') {
        setUserId(res.data.id)
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
    <div className="pages">
      <h1> Account Login</h1>
      <p>
        New to Pharmacy.com? <a href="/register"> Create an account </a>
      </p>

      <div>
        <TextField
          required
          id="outlined-required"
          label="Username"
          name="username"
          onChange={handleChange}
          onKeyDown={onInputPress}
        />

        <TextField
          id="outlined-password-input-required"
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          onChange={handleChange}
          onKeyDown={onInputPress}
        />
        <Button
          variant="outlined"
          onClick={onLoginClick}
          onKeyDown={onInputPress}
        >
          {" "}
          {isLoading} Login{" "}
        </Button>
        <Link to="/reset-password"> forget password?</Link>
      </div>
    </div>
  );
}

export default LoginPage;
