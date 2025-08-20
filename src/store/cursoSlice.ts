import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Curso } from "../models/Curso";


// URL base de tu API
const API_URL = "https://localhost:7096/api/Curso";

// ✅ 1. GET all cursos
export const fetchCursos = createAsyncThunk("curso/fetchAll", async () => {
  const response = await axios.get(API_URL);
  
  return response.data;
});

// ✅ 2. GET curso by ID
export const fetchCursoById = createAsyncThunk("curso/fetchById", async (id : number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
});

// ✅ 3. POST curso (crear)
export const createCurso = createAsyncThunk("curso/create", async (curso) => {
  const response = await axios.post(API_URL, curso);
  return response.data;
});

// ✅ 4. PUT curso (editar)
export const updateCurso = createAsyncThunk("curso/update", async ({ id, curso }: any) => {
  const response = await axios.put(`${API_URL}/${id}`, curso);
  return response.data;
});

// ✅ 5. DELETE curso
export const deleteCurso = createAsyncThunk("curso/delete", async (id : number) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const cursoSlice = createSlice({
  name: "Curso",
  initialState: {
    cursos: [] as Curso[], 
    curso: {} as Curso, 
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET all
      .addCase(fetchCursos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCursos.fulfilled, (state, action) => {
        state.loading = false;
        state.cursos = action.payload;
      })
      .addCase(fetchCursos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch cursos";
      })
      // GET by ID
      .addCase(fetchCursoById.fulfilled, (state, action) => {
        state.curso = action.payload;
      })
      // CREATE
      .addCase(createCurso.fulfilled, (state, action) => {
        state.cursos.push(action.payload);
      })
      // UPDATE
      .addCase(updateCurso.fulfilled, (state, action) => {
        const index = state.cursos.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) {
          state.cursos[index] = action.payload;
        }
      })
      // DELETE
      .addCase(deleteCurso.fulfilled, (state, action) => {
        state.cursos = state.cursos.filter((a) => a.id !== action.payload);
      });
  },
});

export default cursoSlice.reducer;