import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../store/store";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteCurso, fetchCursoById, fetchCursos } from "../../store/cursoSlice";
import { CursoForm } from "../Content/CursoForm";

export const Curso = () => {
    const dispatch = useAppDispatch();
    const { cursos, loading, error} = useSelector((state : RootState) => state.curso || {});
    const curso = useSelector((state : RootState) => state.curso.curso);

    useEffect(() => {
    dispatch(fetchCursos());
  }, [dispatch]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
    return (
       <div>
        <CursoForm />
      <h2>Lista de cursos</h2>
        {cursos.length === 0 && <p>No hay cursos registrados.</p>}
        
      <ul>
        {cursos.map((a : any) => (
          <li key={a.id}>
            {a.titulo}
            
            <button onClick={() => dispatch(fetchCursoById(a.id))}>Ver</button>
            <Link to={`/curso/${a.id}/editar`}>
        <button>✏️ Editar</button>
      </Link>
            <button onClick={() => dispatch(deleteCurso(a.id))}>❌ Eliminar</button>
          </li>
        ))}

        
      </ul>
      <h2>{curso.titulo}</h2>
          <p>ID: {curso.id}</p>
      
    </div>
    );
}
