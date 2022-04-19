import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { Stack, Button } from "@mui/material";
import axios from "../../utils/axios";

function ProfilePicture() {
  const [photo, setPhoto] = useState("");
  const [image, setImage] = useState("");
  const onPhotoChange = (e) => {
    const photo = e.target.files[0];
    setPhoto(photo);
  };

  const { id } = JSON.parse(localStorage.getItem("userData"));
  console.log("Avatar", image);
  const getUserById = async () => {
    try {
      const response = await axios.get(`/users/${id}`);

      setImage(response.data[0].photo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  const onSaveData = async () => {
    const { id, token } = JSON.parse(localStorage.getItem("userData"));
    try {
      const formData = new FormData();
      formData.append("photo", photo);

      const response = await axios.put(
        `/users/edit-profile-picture/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const Image = response.data.Image;
      setImage(Image);
      console.log("Image", Image);
      // console.log("Avatar", avatar);
      alert("Update Success");

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile-picture">
      <div className="avatar">
        <Stack direction="column" spacing={2} sx={{ mt: 5 }}>
          <Avatar alt="user photo" src={image} sx={{ width: 56, height: 56 }} />
          <Button variant="outlined" component="label" size="small">
            <input type="file" onChange={onPhotoChange} />
          </Button>
          <Button variant="contained" onClick={onSaveData}>
            {" "}
            YES{" "}
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default ProfilePicture;
