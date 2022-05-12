import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  Radio,
  FormControlLabel,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import axios from "../../utils/axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function EditProfile() {
  const params = useParams();

  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState(""); // female / male
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onChangeOldPassword = (e) => {
    setOldPassword(e.target.value);
  };
  const onChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const onChangeGender = (e) => {
    setGender(e.target.value);
  };

  //ambil Id di redux -> taruh Id di endpoint 40
  const { id } = useSelector((state) => state.auth);

  const { token } = JSON.parse(localStorage.getItem("userData"));

  const getUserById = async () => {
    try {
      const response = await axios.get(`/users/${id}`);

      const { fullName, email, age, gender, address } = response.data[0];
      setFullName(fullName);
      setAge(age);
      setGender(gender.toLowerCase());
      setAddress(address);
      setEmail(email);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  const onSaveData = async () => {
    try {
      const data = {
        fullName,
        age,
        gender,
        address,
        email,
        oldPassword,
        newPassword,
      };

      const response = await axios.put(`/users/edit-profile/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Update Success");

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const buttonHandleClick = () => {
    onSaveData();
  };

  return (

    <div className="edit-profile">

      <div>
        <div className="form-control">
          <FormControl sx={{ m: 3 }}>
            <FormLabel sx={{ mb: 4 }}>
              Fullname:
              <TextField
                required
                fullWidth
                label="Fullname"
                name="fullname"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                sx={{ mt: 2 }}
              />
            </FormLabel>

            <FormLabel sx={{ mb: 4 }}>
              Age:
              <TextField
                fullWidth
                label="Age"
                type="age"
                name="age"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                sx={{ mt: 2 }}
              />
            </FormLabel>

            <FormLabel id="demo-row-radio-buttons-group-label" sx={{ mb: 5 }}>
              Gender:
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="gender"
                className="gender"
                sx={{ mt: 2 }}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  name="female"
                  onChange={onChangeGender}
                  checked={gender === "female"}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  name="male"
                  onChange={onChangeGender}
                  checked={gender === "male"}
                />
              </RadioGroup>
            </FormLabel>

            <FormLabel sx={{ mb: 4 }}>
              Address:
              <TextField
                fullWidth
                label="Address"
                id="fullWidth"
                type="address"
                name="address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                sx={{ mt: 2 }}
              />{" "}
            </FormLabel>

            <FormLabel sx={{ mb: 4 }}>
              Email:
              <TextField
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                sx={{ mt: 2 }}
              />
            </FormLabel>

            <FormLabel sx={{ mb: 4 }}>
              Change Password:
              <TextField
                id="outlined"
                label="Old Password"
                type="password"
                name="oldPassword"
                onChange={onChangeOldPassword}
                value={oldPassword}
                sx={{ ml: 3, mr: 3 }}
              />
              <TextField
                id="outlined"
                label="New Password"
                type="password"
                name="newPassword"
                onChange={onChangeNewPassword}
                value={newPassword}
              />
            </FormLabel>

            <Button
              variant="contained"
              size="large"
              onClick={buttonHandleClick}
            >
              {" "}
              SAVE{" "}
            </Button>
          </FormControl>{" "}
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
