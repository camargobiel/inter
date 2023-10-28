import React from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import register from '../../assets/images/register.svg'
import { ArrowForwardRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import { validationSchema } from './validation';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormError from '../../components/FormError/FormError';

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })
  console.log('errors', errors)

  const submit = (data: any) => {
    console.log('data', data)
  }

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <form className="grid grid-cols-2 w-screen" onSubmit={handleSubmit(submit)}>
      <img src={register} className='object-contain h-screen ml-20' alt="woman in a virtual clothes store" />
      <section className='flex flex-col justify-center items-center'>
        <div className="flex flex-col	gap-3 w-2/4">
          <h1 className="text-3xl font-medium text-blue-600	mb-5">
            Cadastre-se! É grátis.
          </h1>
          <Controller
            name='companyName'
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={(e) => onChange(e.target.value)}
                value={value}
                size='medium'
                variant="outlined"
                label="Nome da empresa*"
                error={!!errors.companyName}
              />
            )}
          />
          <FormError>{errors.companyName?.message}</FormError>
          <Controller
            name='name'
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={(e) => onChange(e.target.value)}
                value={value}
                size='medium'
                variant="outlined"
                label="Nome completo*"
                error={!!errors.name}
              />
            )}
          />
          <FormError>{errors.name?.message}</FormError>
          <Controller
            name='email'
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={(e) => onChange(e.target.value)}
                value={value}
                size='medium'
                variant="outlined"
                label="E-mail*"
                error={!!errors.email}
              />
            )}
          />
          <FormError>{errors.email?.message}</FormError>
          <Controller
            name='password'
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={(e) => onChange(e.target.value)}
                value={value}
                type={showPassword ? "text" :"password"}
                size='medium'
                variant="outlined"
                label="Senha*"
                error={!!errors.password}
                InputProps={
                  {
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility  />}
                      </IconButton>
                    )
                  }
                }
              />
            )}
            />
            <FormError>{errors.password?.message}</FormError>
            <Controller
            name='confirmPassword'
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={(e) => onChange(e.target.value)}
                value={value}
                type={showConfirmPassword ? "text" :"password"}
                size='medium'
                variant="outlined"
                label="Confirmar senha*"
                error={!!errors.password}
                InputProps={
                  {
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowConfirmPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility  />}
                      </IconButton>
                    )
                  }
                }
              />
            )}
            />
            <FormError>{errors.confirmPassword?.message}</FormError>
          <Button
            type="submit"
            variant="contained"
            endIcon={
              <ArrowForwardRounded />
            }
            color='primary'
            className="h-12"
          >
            Cadastrar
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            Já tem uma conta? <a href="#" className="text-blue-600">Faça o login</a>
          </p>
        </div>
      </section>
    </form>
  )
};

export default Register;