import { z } from "zod";

export const schema= z.object({
    Nombre: z.string().min(1,'El nombre es obligatorio').max(100,'El nombre debe tener menos de 100 caracteres'),
    
})

export type FormValues = z.infer<typeof schema>;