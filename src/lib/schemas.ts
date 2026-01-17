import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo electrónico es requerido")
    .email("Ingresa una dirección de correo válida"),
  password: z.string().min(1, "La contraseña es requerida"),
  remember: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .regex(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        "El nombre solo puede contener letras",
      ),
    lastName: z
      .string()
      .min(2, "El apellido debe tener al menos 2 caracteres")
      .regex(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        "El apellido solo puede contener letras",
      ),
    email: z
      .string()
      .min(1, "El correo electrónico es requerido")
      .email("Ingresa una dirección de correo válida"),
    birthDate: z.string().refine((date) => {
      const birth = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birth.getFullYear();
      return age >= 13;
    }, "Debes tener al menos 13 años para registrarte"),
    gender: z.enum(['male', 'female', 'other'], {
    message: 'Selecciona una opción de género',
  }),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
      .regex(/[0-9]/, "Debe contener al menos un número"),
    confirmPassword: z.string().min(1, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
