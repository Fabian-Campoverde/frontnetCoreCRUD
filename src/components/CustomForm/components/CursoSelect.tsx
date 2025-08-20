import { Controller, type Control, type FieldError } from "react-hook-form";
import type { CursoFormValues } from "../models/cursoForm.model";
import { useAppDispatch, type RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { fetchCarreras } from "../../../store/carreraSlice";
import { useEffect } from "react";

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  name: keyof CursoFormValues;
  label: string;
  control: Control<CursoFormValues>;
  options: Option[];
  error?: FieldError;
}

const CursoSelectForm = ({ name, label, control, error }: Props) => {
const dispatch = useAppDispatch();
    const { carreras, loading} = useSelector((state : RootState) => state.carrera || {});

    useEffect(() => {
    dispatch(fetchCarreras());
  }, [dispatch]);

  if (loading) return <p>Cargando...</p>;


  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            id={name}
            {...field}
            className={`form-control ${error ? "is-invalid" : ""}`}
          >
            <option value="">Seleccione una carrera</option>
            {carreras.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.nombre}
              </option>
            ))}
          </select>
        )}
      />
      {error && <small className="error">{error.message}</small>}
    </div>
  );
};

export default CursoSelectForm;
