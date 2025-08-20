import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../store/store";
import { fetchAlumnoById, updateAlumno } from "../../store/alumnoSlice";
import { schema, type FormValues } from "../CustomForm/models/form.model";
import { zodResolver } from "@hookform/resolvers/zod";
import InputForm from "../CustomForm/components/CustomInput";


export default function Edit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
const {control,reset, handleSubmit, formState:{errors}} =useForm<FormValues>({
          resolver : zodResolver(schema),
          mode: 'onBlur',
          defaultValues:{
              Nombre:'',
              
          }
      });
  const alumnoEdit = useSelector((state: RootState) => state.alumno.alumno);


  // cargar datos del alumno cuando entra
  useEffect(() => {
    if (id) {
      dispatch(fetchAlumnoById(Number(id)));
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (alumnoEdit) {
      reset({
        
        Nombre: alumnoEdit.nombre, 
      });
    }
  }, [alumnoEdit, reset]);

  const onSubmit: SubmitHandler<FormValues> = (data : any) => {
    if (!id) return;

  const alumno = { Id: Number(id), Nombre: data.Nombre };
    dispatch(updateAlumno({ id: Number(id), alumno: alumno }))
      .unwrap()
      .then(() => {
        navigate("/"); 
      });
  };

  return (
    <div>
      <h2>Editar Alumno</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
            <InputForm name='Nombre' label='Nombre' control={control} type='text' error={errors.Nombre} /> 
            <button type="submit"> Submit </button> 
    
        <button type="button" onClick={() => navigate("/")}>Cancelar</button>
      </form>
    </div>
  );
}