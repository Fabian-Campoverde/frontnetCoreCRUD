import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../store/store";
import { useEffect } from "react";
import { deleteAlumno, fetchAlumnoById, fetchAlumnos } from "../../store/alumnoSlice";
import CustomForm from "../CustomForm/CustomForm";
import { Link, useNavigate } from "react-router-dom";
import { deleteAlumnoCurso } from "../../store/alumnoCursoSlice";

export const Content = () => {
    const dispatch = useAppDispatch();
    const { alumnos, loading, error} = useSelector((state : RootState) => state.alumno || {});
    const alumno = useSelector((state : RootState) => state.alumno.alumno);
    const navigate = useNavigate();

    useEffect(() => {
    dispatch(fetchAlumnos());
  }, [dispatch]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
    return (
       <div>
        <CustomForm />
      <h2>Lista de Alumnos</h2>
        {alumnos.length === 0 && <p>No hay alumnos registrados.</p>}
        
      <ul>
        {alumnos.map((a) => (
          <li key={a.id}>
            {a.nombre}
            {/* Cursos del alumno */}
      {a.cursos && a.cursos.length > 0 ? (
        <ul>
          {a.cursos.map((c: any) => (
            <li key={c.id}>
              📘 {c.titulo}
              <button
  onClick={async () => {
    await dispatch(deleteAlumnoCurso(c.alumnoCursoId));
    dispatch(fetchAlumnos()); 
  }}
>
  ❌ Quitar
</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>❌ No tiene cursos asignados</p>
      )}
            
            <button onClick={() => dispatch(fetchAlumnoById(a.id))}>Ver</button>
            <Link to={`/alumno/${a.id}/editar`}>
        <button>✏️ Editar</button>
      </Link>
            <button onClick={() => dispatch(deleteAlumno(a.id))}>❌ Eliminar</button>
            <Link to={`/alumno/${a.id}/addcurso`}>
        <button>✏️ Agregar Curso</button>
      </Link>
          </li>
        ))}

        
      </ul>
      <button type="button" onClick={() => navigate("/cursos")}>Ir a Cursos</button>
      <button type="button" onClick={() => navigate("/carreras")}>Ir a Carreras</button>
      <h2>{alumno.nombre}</h2>
          <p>ID: {alumno.id}</p>
      
    </div>
    );
}
