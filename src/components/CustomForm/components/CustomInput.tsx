import { Controller, type Control, type FieldError } from "react-hook-form";
import type { FormValues } from "../models/form.model";


interface Props {
    name:keyof FormValues,
    label: string,
    control: Control<FormValues>,
    type?: string,
    error?: FieldError
}

const InputForm = ({name, label, control, type,error} : Props) =>{
    return (
        <div className='form-group'>
            <label htmlFor={name}> {label} </label>
            <Controller 
            name={name}
            control={control}
            render={({field}) => 
            <input id={name} type={type} {...field} 
            className={`form-control ${error? "is-invalid" : ""}`} />}
             />
             {error && <small className="error">{error.message}</small>}
            </div>
    )
}

export default InputForm;