import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  companyName: yup.string().required("Nome da empresa é um campo obrigatório"),
  name: yup.string().required("Nome é um campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é um campo obrigatório"),
  password: yup.string().required("Senha é um campo obrigatório"),
  confirmPassword: yup.string().required("Confirmação de senha é um campo obrigatório"),
});