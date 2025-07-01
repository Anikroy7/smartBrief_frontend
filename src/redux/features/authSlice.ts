import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  email: string;
  role: string;
  token: string;
  userId: string;
};

const initialState: InitialState = {
  email: "",
  role: "",
  token: '',
  userId: ''
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      state.email = user.email;
      state.role = user.role;
      state.token= user.token;
      state.userId= user.userId;
    },

    logout: (state, action) => {
      console.log(action)
      state.email = '';
      state.role = ''
      state.token= ''
      state.userId= ''
    }
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
