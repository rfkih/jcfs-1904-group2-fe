export const loginAction = ({ id, username, role, token, photo }) => {
  localStorage.setItem(
    "userData",
    JSON.stringify({ id, username, role, token, photo })
  );

  return {
    type: "LOGIN_SUCCESS",
    payload: { id, username, role, token, photo },
  };
};

export const keepLoginAction = ({ id, username, role, token, photo }) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: { id, username, role, token, photo },
  };
};

export const logoutAction = () => {
  localStorage.removeItem("userData","cartData");
  return {
    type: "LOGOUT_SUCCESS",
  };
};
