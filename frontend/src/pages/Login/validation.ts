import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  email: yup.string().email("E-mail inválido").required("E-mail é um campo obrigatório"),
  password: yup.string().required("Senha é um campo obrigatório"),
});