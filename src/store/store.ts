import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cursoReducer from "./cursoSlice";
import alumnoReducer from "./alumnoSlice";
import alumnoCursoReducer from "./alumnoCursoSlice";
import carreraReducer from "./carreraSlice";
import { useDispatch } from "react-redux";


const reducers = combineReducers({
  alumno: alumnoReducer,
  curso: cursoReducer,
  alumnocurso: alumnoCursoReducer,
  carrera: carreraReducer
  
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();