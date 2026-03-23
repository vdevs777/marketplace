import * as y from "yup";

export const loginScheme = y.object({
  email: y.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: y
    .string()
    .required("Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos mínimo 6 caracteres"),
});

export type LoginFormData = y.InferType<typeof loginScheme>;
