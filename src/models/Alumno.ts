import type { AlumnoCurso } from "./AlumnoCurso ";

export interface Alumno {
    id: number;
    nombre: string;
    cursos?: AlumnoCurso[]; 
}