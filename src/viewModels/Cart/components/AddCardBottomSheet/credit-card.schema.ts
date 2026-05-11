import * as y from "yup";

export const creditCardSchema = y.object().shape({
  titularName: y
    .string()
    .required("Nome do titular é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres"),
  number: y
    .string()
    .required("Número do cartão é obrigatório")
    .test(
      "card-number",
      "Número do cartão deve ter exatamente 16 dígitos",
      (value) => {
        if (!value) return false;
        const cleaned = value.replace(/\D/g, "");
        return /^\d{16}$/.test(cleaned);
      },
    ),
  expirationDate: y
    .string()
    .required("Data de vencimento é obrigatória")
    .matches(/^\d{2}\/\d{2}$/, "Formato deve ser MM/AA"),
  CVV: y
    .string()
    .required("CVV é obrigatório")
    .matches(/^\d{3}$/, "CVV deve ter exatamente 3 dígitos"),
});

export type CreditCardFormData = y.InferType<typeof creditCardSchema>;
