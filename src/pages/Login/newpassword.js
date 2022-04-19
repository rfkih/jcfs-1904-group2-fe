import React from "react";

function Newpassword() {
  return (
    <div className="pages">
      <div>
        <h1> New Password </h1>
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="New Password"
          type="text"
        />

        <TextField
          required
          id="outlined-required"
          label="confirm new Password"
          type="password"
        />

        <Button variant="contained">Confirm</Button>
      </div>
    </div>
  );
}

export default Newpassword;
