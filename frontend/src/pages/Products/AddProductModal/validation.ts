import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup.string().required("Nome é um campo obrigatório"),
  color: yup.string(),
  size: yup.string(),
  price: yup.string().required("Preço é um campo obrigatório"),
  category: yup.string().required("Categoria é um campo obrigatório"),
  ncm: yup.string().required("NCM é um campo obrigatório"),
  reference: yup.string(),
});
