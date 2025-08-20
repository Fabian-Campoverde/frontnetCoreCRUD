import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../store/store";

import { zodResolver } from "@hookform/resolvers/zod";
import { schema, type CursoFormValues } from "../CustomForm/models/cursoForm.model";
import { createCurso } from "../../store/cursoSlice";
import CursoInputForm from "../CustomForm/components/CursoInput";
import CursoSelectForm from "../CustomForm/components/CursoSelect";


export const CursoForm = () =>{
    const dispatch = useAppDispatch();
    const {control, handleSubmit, formState:{errors}} =useForm<CursoFormValues>({
        resolver : zodResolver(schema),
        mode: 'onBlur',
        defaultValues:{
            Titulo:'',
            
        }
    });

    const onSubmit: SubmitHandler<CursoFormValues> = (data : any) =>{
        console.log(data);
        dispatch(createCurso(data));
    }

    return(
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <CursoInputForm name='Titulo' label='Titulo' control={control} type='text' error={errors.Titulo} /> 
            <CursoSelectForm name='CarreraId' label='Carrera' control={control} options={[]} error={errors.CarreraId} />
            <button type="submit"> Submit </button> 
        </form> 
        </>
    )
}
