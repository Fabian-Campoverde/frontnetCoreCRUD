import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../store/store";


import { zodResolver } from "@hookform/resolvers/zod";

import { schema, type CursoFormValues } from "../CustomForm/models/cursoForm.model";
import { fetchCursoById, updateCurso } from "../../store/cursoSlice";
import CursoInputForm from "../CustomForm/components/CursoInput";
import CursoSelectForm from "../CustomForm/components/CursoSelect";


export default function EditCurso() {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
const {control,reset, handleSubmit, formState:{errors}} =useForm<CursoFormValues>({
          resolver : zodResolver(schema),
          mode: 'onBlur',
          defaultValues:{
              Titulo:'',
              
          }
      });
  const cursoEdit = useSelector((state: RootState) => state.curso.curso);


  // cargar datos del alumno cuando entra
  useEffect(() => {
    if (id) {
      dispatch(fetchCursoById(Number(id)));
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (cursoEdit) {
      reset({
        
        Titulo: cursoEdit.titulo, 
        CarreraId: String(cursoEdit.carreraId),
      });
    }
  }, [cursoEdit, reset]);

  const onSubmit: SubmitHandler<CursoFormValues> = (data : any) => {
    if (!id) return;

  const curso = { Id: Number(id), Titulo: data.Titulo,CarreraId: data.CarreraId };
    dispatch(updateCurso({ id: Number(id), curso: curso }))
      .unwrap()
      .then(() => {
        navigate("/cursos"); 
      });
  };

  return (
    <div>
      <h2>Editar Alumno</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
            <CursoInputForm name='Titulo' label='Titulo' control={control} type='text' error={errors.Titulo} />
            <CursoSelectForm name='CarreraId' label='Carrera' control={control} options={[]} error={errors.CarreraId} />
            <button type="submit"> Submit </button> 
    
        <button type="button" onClick={() => navigate("/cursos")}>Cancelar</button>
      </form>
    </div>
  );
}