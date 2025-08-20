import { Controller, type Control, type FieldError } from "react-hook-form";

import type { CursoFormValues } from "../models/cursoForm.model";


interface Props {
    name:keyof CursoFormValues,
    label: string,
    control: Control<CursoFormValues>,
    type?: string,
    error?: FieldError
}

const CursoInputForm = ({name, label, control, type,error} : Props) =>{
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

export default CursoInputForm;