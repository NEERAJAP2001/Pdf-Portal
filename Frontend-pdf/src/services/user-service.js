import { myAxios } from "./helper";

export const signUp = (user) => {
  return myAxios.post("/auth/register", user).then((response) => response.data);
};

export const loginUser = (loginDetail) => {
  return myAxios
    .post("/auth/login", loginDetail)
    .then((response) => response.data);
};

export const getUser = (userId) => {
  return myAxios.get(`/users/${userId}`).then((resp) => resp.data);
};


export const sendOTP = (email) => {
  return myAxios.post("/send-otp", null , { params: {email} } ).then((resp) => resp.data);
}

export const verifyOTP = (email,otp) => {
  return myAxios.put("/verify-otp", null , { params: {email,otp} } ).then((resp) => resp.data);
}

export const setPass = (email,newPassword) => {
  return myAxios.put("/set-password", newPassword, { params: {email} }  ).then((resp) => resp.data);
}
