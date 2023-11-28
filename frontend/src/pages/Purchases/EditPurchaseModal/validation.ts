import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  identifier: yup.string().required("Identificador é um campo obrigatório"),
  totalPrice: yup.number().required("Preço é um campo obrigatório"),
  paymentMethod: yup.string().required("Método de pagamento é um campo obrigatório"),
  date: yup.string().required("Data é um campo obrigatório"),
  products: yup.array().min(1, "É necessário selecionar ao menos um produto").of(yup.number().required()).required(),
  customer: yup.string().required("Cliente é um campo obrigatório"),
});
