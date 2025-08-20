import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../store/store";


import { zodResolver } from "@hookform/resolvers/zod";



import CarreraInputForm from "./CarreraInput";
import { schema, type CarreraFormValues } from "../CustomForm/models/carreraForm.model";
import { fetchCarreraById, updateCarrera } from "../../store/carreraSlice";


export default function EditCarrera() {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
const {control,reset, handleSubmit, formState:{errors}} =useForm<CarreraFormValues>({
          resolver : zodResolver(schema),
          mode: 'onBlur',
          defaultValues:{
              Nombre:'',
              
          }
      });
  const cursoEdit = useSelector((state: RootState) => state.carrera.carrera);


  // cargar datos del alumno cuando entra
  useEffect(() => {
    if (id) {
      dispatch(fetchCarreraById(Number(id)));
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (cursoEdit) {
      reset({
        
        Nombre: cursoEdit.nombre, 
      });
    }
  }, [cursoEdit, reset]);

  const onSubmit: SubmitHandler<CarreraFormValues> = (data : any) => {
    if (!id) return;

  const carrera = { Id: Number(id), Nombre: data.Nombre };
    dispatch(updateCarrera({ id: Number(id), carrera: carrera }))
      .unwrap()
      .then(() => {
        navigate("/carreras"); 
      });
  };

  return (
    <div>
      <h2>Editar Alumno</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
            <CarreraInputForm name='Nombre' label='Nombre' control={control} type='text' error={errors.Nombre} /> 
            <button type="submit"> Submit </button> 
    
        <button type="button" onClick={() => navigate("/carreras")}>Cancelar</button>
      </form>
    </div>
  );
}