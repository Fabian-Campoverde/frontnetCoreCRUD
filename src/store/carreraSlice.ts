import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Carrera } from "../models/Carrera";


// URL base de tu API
const API_URL = "https://localhost:7096/api/Carrera";

// ✅ 1. GET all Carreras
export const fetchCarreras = createAsyncThunk("Carrera/fetchAll", async () => {
  const response = await axios.get(API_URL);
  
  return response.data;
});

// ✅ 2. GET Carrera by ID
export const fetchCarreraById = createAsyncThunk("Carrera/fetchById", async (id : number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
});

// ✅ 3. POST Carrera (crear)
export const createCarrera = createAsyncThunk("Carrera/create", async (Carrera) => {
  const response = await axios.post(API_URL, Carrera);
  return response.data;
});

// ✅ 4. PUT Carrera (editar)
export const updateCarrera = createAsyncThunk("Carrera/update", async ({ id, carrera }: any) => {
  const response = await axios.put(`${API_URL}/${id}`, carrera);
  return response.data;
});

// ✅ 5. DELETE Carrera
export const deleteCarrera = createAsyncThunk("Carrera/delete", async (id : number) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const CarreraSlice = createSlice({
  name: "Carrera",
  initialState: {
    carreras: [] as Carrera[], 
    carrera: {} as Carrera, 
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET all
      .addCase(fetchCarreras.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCarreras.fulfilled, (state, action) => {
        state.loading = false;
        state.carreras = action.payload;
      })
      .addCase(fetchCarreras.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch Carreras";
      })
      // GET by ID
      .addCase(fetchCarreraById.fulfilled, (state, action) => {
        state.carrera = action.payload;
      })
      // CREATE
      .addCase(createCarrera.fulfilled, (state, action) => {
        state.carreras.push(action.payload);
      })
      // UPDATE
      .addCase(updateCarrera.fulfilled, (state, action) => {
        const index = state.carreras.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) {
          state.carreras[index] = action.payload;
        }
      })
      // DELETE
      .addCase(deleteCarrera.fulfilled, (state, action) => {
        state.carreras = state.carreras.filter((a) => a.id !== action.payload);
      });
  },
});

export default CarreraSlice.reducer;