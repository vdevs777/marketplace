import * as y from "yup";

export const registerScheme = y.object({
  name: y
    .string()
    .required("Nome é obrigatório")
    .min(4, "Nome deve ter pelo menos 4 caracteres"),
  email: y.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: y
    .string()
    .required("Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos mínimo 6 caracteres"),
  confirmPassword: y
    .string()
    .required("Senha é obrigatória")
    .oneOf([y.ref("password")], "Senhas não coincidem"),
  phone: y
    .string()
    .required("Telefone é obrigatório")
    .matches(/^\d{11}$/, "Telefone deve ter 11 dígitos (DDD + número)"),
});

export type RegisterFormData = y.InferType<typeof registerScheme>;
