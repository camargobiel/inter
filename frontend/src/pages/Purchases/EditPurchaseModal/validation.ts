import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup.string().required("Nome é um campo obrigatório"),
});
