import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../store/store";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { deleteCarrera, fetchCarreraById, fetchCarreras } from "../../store/carreraSlice";
import { CarreraForm } from "./CarreraForm";

export const Carrera = () => {
    const dispatch = useAppDispatch();
    const { carreras, loading, error} = useSelector((state : RootState) => state.carrera || {});
    const carrera = useSelector((state : RootState) => state.carrera.carrera);

    useEffect(() => {
    dispatch(fetchCarreras());
  }, [dispatch]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
    return (
       <div>
        <CarreraForm />
      <h2>Lista de carreras</h2>
        {carreras.length === 0 && <p>No hay carreras registrados.</p>}
        
      <ul>
        {carreras.map((a) => (
          <li key={a.id}>
            {a.nombre}
            
            <button onClick={() => dispatch(fetchCarreraById(a.id))}>Ver</button>
            <Link to={`/carrera/${a.id}/editar`}>
        <button>✏️ Editar</button>
      </Link>
            <button onClick={() => dispatch(deleteCarrera(a.id))}>❌ Eliminar</button>
          </li>
        ))}

        
      </ul>
      <h2>{carrera.nombre}</h2>
          <p>ID: {carrera.id}</p>
      
    </div>
    );
}
