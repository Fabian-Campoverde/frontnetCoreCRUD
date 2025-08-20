import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { AlumnoCurso } from "../models/AlumnoCurso ";


const API = "https://localhost:7096/api/AlumnoCurso";

// GET ALL
export const fetchAlumnoCursos = createAsyncThunk(
  "alumnoCurso/fetchAll",
  async () => {
    const res = await axios.get(API);
    return res.data;
  }
);

// POST
export const addAlumnoCurso = createAsyncThunk(
  "alumnoCurso/add",
  async (data: AlumnoCurso) => {
    const res = await axios.post(API, data);
    return res.data;
  }
);

// PUT
export const updateAlumnoCurso = createAsyncThunk(
  "alumnoCurso/update",
  async ({ id, data }: { id: number; data: AlumnoCurso }) => {
    const res = await axios.put(`${API}/${id}`, data);
    return res.data; // devuelve el alumnoCurso actualizado
  }
);

// DELETE
export const deleteAlumnoCurso = createAsyncThunk(
  "alumnoCurso/delete",
  async (id: number) => {
    await axios.delete(`${API}/${id}`);
    return id;
  }
);

interface AlumnoCursoState {
  list: AlumnoCurso[];
  loading: boolean;
}

const initialState: AlumnoCursoState = {
  list: [],
  loading: false,
};

const alumnoCursoSlice = createSlice({
  name: "alumnoCurso",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchAlumnoCursos.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      // POST
      .addCase(addAlumnoCurso.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      // PUT
      .addCase(updateAlumnoCurso.fulfilled, (state, action) => {
        const index = state.list.findIndex((ac : any) => ac.id === action.payload.id);
        if (index >= 0) state.list[index] = action.payload;
      })
      // DELETE
      .addCase(deleteAlumnoCurso.fulfilled, (state, action) => {
        state.list = state.list.filter((ac : any) => ac.id !== action.payload);
      });
  },
});

export default alumnoCursoSlice.reducer;
