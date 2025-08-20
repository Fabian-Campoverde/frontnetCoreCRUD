import React, { useEffect, useState } from "react";

import { useAppDispatch, type RootState } from "../store/store";
import { fetchCursos } from "../store/cursoSlice";
import { addAlumnoCurso } from "../store/alumnoCursoSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AlumnoCursoForm() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { cursos} = useSelector((state : RootState) => state.curso || {});

  // guardar varios cursoId seleccionados
  const [cursoIds, setCursoIds] = useState<number[]>([]);
  console.log(cursoIds);

  useEffect(() => {
    dispatch(fetchCursos() as any);
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cursoIds.length > 0 && id) {
      cursoIds.forEach((CursoId) => {
        dispatch(
          addAlumnoCurso({
            AlumnoId: Number(id),
            CursoId,
          }) as any
        );
      });
      setCursoIds([]);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions, (option) =>
      Number(option.value)
    );
    setCursoIds(values);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded w-96 space-y-4">
      <label className="block">
        <span className="text-gray-700">Seleccionar Cursos:</span>
        <select
          multiple
          className="mt-1 block w-full border rounded p-2 h-40"
          value={cursoIds.map(String)}
          onChange={handleSelectChange}
          required
        >
          {cursos.map((curso: any) => (
            <option key={curso.id} value={curso.id}>
              {curso.titulo}
            </option>
          ))}
        </select>
        <small className="text-gray-500">Mantén Ctrl (Windows) o ⌘ (Mac) para seleccionar varios cursos</small>
      </label>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Asignar Cursos
      </button>
    </form>
  );
}
