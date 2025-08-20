import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Alumno } from "../models/Alumno";

// URL base de tu API
const API_URL = "https://localhost:7096/api/Alumno";

// ✅ 1. GET all alumnos
export const fetchAlumnos = createAsyncThunk("alumno/fetchAll", async () => {
  const response = await axios.get(API_URL);
  
  return response.data;
});

// ✅ 2. GET alumno by ID
export const fetchAlumnoById = createAsyncThunk("alumno/fetchById", async (id : number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
});

// ✅ 3. POST alumno (crear)
export const createAlumno = createAsyncThunk("alumno/create", async (alumno) => {
  const response = await axios.post(API_URL, alumno);
  return response.data;
});

// ✅ 4. PUT alumno (editar)
export const updateAlumno = createAsyncThunk("alumno/update", async ({ id, alumno }: any) => {
  const response = await axios.put(`${API_URL}/${id}`, alumno);
  return response.data;
});

// ✅ 5. DELETE alumno
export const deleteAlumno = createAsyncThunk("alumno/delete", async (id : number) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const alumnoSlice = createSlice({
  name: "alumno",
  initialState: {
    alumnos: [] as Alumno[], 
    alumno: {} as Alumno, 
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET all
      .addCase(fetchAlumnos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAlumnos.fulfilled, (state, action) => {
        state.loading = false;
        state.alumnos = action.payload;
      })
      .addCase(fetchAlumnos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch alumnos";
      })
      // GET by ID
      .addCase(fetchAlumnoById.fulfilled, (state, action) => {
        state.alumno = action.payload;
      })
      // CREATE
      .addCase(createAlumno.fulfilled, (state, action) => {
        state.alumnos.push(action.payload);
      })
      // UPDATE
      .addCase(updateAlumno.fulfilled, (state, action) => {
        const index = state.alumnos.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) {
          state.alumnos[index] = action.payload;
        }
      })
      // DELETE
      .addCase(deleteAlumno.fulfilled, (state, action) => {
        state.alumnos = state.alumnos.filter((a) => a.id !== action.payload);
      });
  },
});

export default alumnoSlice.reducer;