import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: number | null;
  nombre: string;
  email: string;
  rol: string;
}

const initialState: UserState = {
  id: null,
  nombre: "",
  email: "",
  rol: "operador",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id;
      state.nombre = action.payload.nombre;
      state.email = action.payload.email;
      state.rol = action.payload.rol;
    },
    clearUser(state) {
      state.id = null;
      state.nombre = "";
      state.email = "";
      state.rol = "operador";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
