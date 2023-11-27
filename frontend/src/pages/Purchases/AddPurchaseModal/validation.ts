import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  totalPrice: yup.number().required("Preço é um campo obrigatório"),
  paymentMethod: yup.string().required("Método de pagamento é um campo obrigatório"),
  date: yup.string().required("Data é um campo obrigatório"),
  products: yup.array().of(yup.string()).required("Produtos é um campo obrigatório"),
  customers: yup.array().of(yup.string()).required("Clientes é um campo obrigatório"),
});
