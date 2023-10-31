import React from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import login from '../../assets/svgs/login.svg'
import { ArrowForwardRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import { validationSchema } from './validation';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormError from '../../components/FormError/FormError';

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const success = window.location.href.includes('?success=true');

  React.useEffect(() => {
    document.title = 'Login';
  }, []);

  const submit = (data: any) => {
    console.log('data', data)
  }

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="grid grid-cols-2 w-screen" onSubmit={handleSubmit(submit)}>
      <img src={login} className='object-contain h-screen' alt="model in a model shoot" />
      <section className='flex flex-col justify-center items-center'>
        <div className="flex flex-col	gap-3 w-2/4">
          <h1 className="text-3xl font-medium text-blue-600	mb-5">
            Entrar na plataforma
          </h1>
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
                        onClick={handleClickShowPassword}
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
          <Button
            type="submit"
            variant="contained"
            endIcon={
              <ArrowForwardRounded />
            }
            color='primary'
            className="h-12"
          >
            Entrar
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            Não tem uma conta? <a href="/cadastro" className="text-blue-600">Cadastre-se</a>
          </p>
        </div>
      </section>
    </form>
  )
};

export default Login;