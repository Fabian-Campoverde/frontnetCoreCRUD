import { Controller, type Control, type FieldError } from "react-hook-form";

import type { CarreraFormValues } from "../CustomForm/models/carreraForm.model";


interface Props {
    name:keyof CarreraFormValues,
    label: string,
    control: Control<CarreraFormValues>,
    type?: string,
    error?: FieldError
}

const CarreraInputForm = ({name, label, control, type,error} : Props) =>{
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

export default CarreraInputForm;