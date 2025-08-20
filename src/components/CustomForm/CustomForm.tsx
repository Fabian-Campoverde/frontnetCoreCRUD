import { zodResolver } from '@hookform/resolvers/zod';

import InputForm from './components/CustomInput';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { schema, type FormValues } from './models/form.model';
import { useAppDispatch } from '../../store/store';
import { createAlumno } from '../../store/alumnoSlice';


const CustomForm = () =>{
    const dispatch = useAppDispatch();
    const {control,reset, handleSubmit, formState:{errors}} =useForm<FormValues>({
        resolver : zodResolver(schema),
        mode: 'onBlur',
        defaultValues:{
            Nombre:'',
            
        }
    });

    const onSubmit: SubmitHandler<FormValues> = (data : any) =>{
        console.log(data);
        dispatch(createAlumno(data));
        reset();
    }

    return(
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputForm name='Nombre' label='Nombre' control={control} type='text' error={errors.Nombre} /> 
            <button type="submit"> Submit </button> 
        </form> 
        </>
    )
}

export default CustomForm;


