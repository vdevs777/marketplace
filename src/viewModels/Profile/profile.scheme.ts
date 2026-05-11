import * as y from "yup";

export const profileScheme: y.ObjectSchema<{
  name: string;
  email: string;
  phone: string;
  password?: string;
  newPassword?: string;
}> = y.object().shape({
  name: y.string().required("Nome é obrigatório"),
  email: y
    .string()
    .required("E-mail é obrigatório")
    .email("Informe um e-mail válido"),
  phone: y
    .string()
    .required("Telefone é obrigatório")
    .matches(/^\d{11}$/, "Telefone deve ter 11 dígitos (DDD + número)"),
  password: y.string().optional(),
  newPassword: y.string().optional(),
});

export type ProfileFormData = y.InferType<typeof profileScheme>;
