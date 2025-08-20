import { z } from "zod";

export const schema= z.object({
    Titulo: z.string().min(1,'El titulo es obligatorio').max(100,'El nombre debe tener menos de 100 caracteres'),
    CarreraId: z.string()
    .min(1, 'Debes seleccionar una categoría'),
})

export type CursoFormValues = z.infer<typeof schema>;