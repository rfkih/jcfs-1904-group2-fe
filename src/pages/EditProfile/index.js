import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  Radio,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Stack,
} from "@mui/material";
import axios from "../../utils/axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "@mui/icons-material/AccountCircleOutlined";

function EditProfile() {
  const params = useParams();

  const [photo, setPhoto] = useState(null);
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState({ female: "", male: "" });
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onImageChange = (e) => {
    const photo = e.target.files[0];
    setPhoto(photo);
  };

  const onChangeOldPassword = (e) => {
    setOldPassword(e.target.value);
  };
  const onChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const onChangeGender = (e) => {
    setGender({ [e.target.name]: e.target.value });
  };

  //ambil Id di redux -> taruh Id di endpoint 40
  const { id, token } = useSelector((state) => state.auth);

  const getUserById = async () => {
    try {
      const response = await axios.get(`/users/${id}`);

      setFullName(response.data[0].fullName);
      setAge(response.data[0].age);
      setGender(response.data[0].gender);
      setAddress(response.data[0].address);
      setEmail(response.data[0].email);
    } catch (error) {
      console.log(error);
    }
  };

  const onSaveData = async () => {
    try {
      const formData = new FormData();
      formData.append("fullname", fullName);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("address", address);
      formData.append("email", email);
      formData.append("oldPassword", oldPassword);
      formData.append("newPassword", newPassword);

      const response = await axios.put(`/users/edit-profile/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Update Success");

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const buttonHandleChange = () => {
    onSaveData();
  };

  useEffect(() => {
    getUserById();
  }, []);

  const changePassword = async () => {
    await axios
      .put("/change-password", {
        oldPassword: oldPassword,
        newPassword: newPassword,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log({ error }));
  };

  return (
    <div className="pages">
      <div>
        <div className="avatar">
          <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
            <Avatar sx={{ fontSize: 60 }} />
            <Button variant="outlined" component="label" size="small">
              <input type="file" />
            </Button>
          </Stack>
        </div>
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
                {/* gender ? female */}
                {/* cari tahu, cara ceklis radio button lewat FormControlLabel */}
                {/* temukan logic untuk menentukan radio button mana yang harus di ceklis */}
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  name="female"
                  onChange={onChangeGender}
                  checked={gender.female === "female"}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  name="male"
                  onChange={onChangeGender}
                  checked={gender.male === "male"}
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
              onClick={buttonHandleChange}
              type="file"
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
