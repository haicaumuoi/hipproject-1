import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    _id: "",
    avatar: "",
    email: "",
    skillset: [],
    name: "",
    phone: "",
    uni: "",
    location: "",
    bio: "",
  },
  reducers: {
    userLogIn: (state, action) => {
      state._id = action.payload._id;
      state.avatar = action.payload.avatar;
      state.email = action.payload.email;
      state.skillset = action.payload.skillset;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.uni = action.payload.uni;
      state.bio = action.payload.bio;
      state.location = action.payload.location;
    },
  },
});
