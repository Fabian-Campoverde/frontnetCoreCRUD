import type { Alumno } from "./Alumno";
import type { Curso } from "./Curso";

export interface AlumnoCurso {
  AlumnoId: number;
  CursoId: number;
  // si quieres incluir los objetos relacionados:
  alumno?: Alumno;
  curso?: Curso;
}