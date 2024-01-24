import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup.string().required("Nome é um campo obrigatório"),
  color: yup.string().nullable(),
  size: yup.string().nullable(),
  price: yup.string().required("Preço é um campo obrigatório"),
  category: yup.string().required("Categoria é um campo obrigatório"),
  ncm: yup.string().max(8, "NCM tem que ter no máximo 8 caracteres").nullable().required("NCM é um campo obrigatório"),
  reference: yup.string().nullable(),
});
