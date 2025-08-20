import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../store/store";

import { zodResolver } from "@hookform/resolvers/zod";

import { schema, type CarreraFormValues } from "../CustomForm/models/carreraForm.model";
import { createCarrera } from "../../store/carreraSlice";
import CarreraInputForm from "./CarreraInput";


export const CarreraForm = () =>{
    const dispatch = useAppDispatch();
    const {control, reset, handleSubmit, formState:{errors}} =useForm<CarreraFormValues>({
        resolver : zodResolver(schema),
        mode: 'onBlur',
        defaultValues:{
            Nombre:'',
            
        }
    });

    const onSubmit: SubmitHandler<CarreraFormValues> = (data : any) =>{
        console.log(data);
        dispatch(createCarrera(data));
        reset();
    }

    return(
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <CarreraInputForm name='Nombre' label='Nombre' control={control} type='text' error={errors.Nombre} /> 
            <button type="submit"> Submit </button> 
        </form> 
        </>
    )
}
