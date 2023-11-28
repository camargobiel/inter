import { Button, TextField } from "@mui/material";
import { ModalComponent } from "../../../components/Modal/Modal";
import { Close } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { form } from "./form";
import { validationSchema } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../../components/FormError/FormError";
import { useEffect } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { AuthenticationService } from "../../../services/AuthenticationService";
import { MoneyMaskInput } from "../../../components/InputMasks/MoneyMask";

type AddProductModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type Data = {
  name: string;
  color?: string;
  size?: string;
  price: string;
  category: string;
  ncm?: string;
  reference?: string;
};

export const AddProductModal = ({ open, setOpen }: AddProductModalProps) => {
  const { control, formState: { errors, isValid }, handleSubmit, reset } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const user = AuthenticationService.getUser();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await axios.post('http://localhost:5000/api/Product', data).then((res) => res.data);
    },
    onSuccess: () => {
      setOpen(false);
    }
  })

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset])

  const submit = (data: Data) => {
    mutation.mutate({
      ...data,
      price: parseFloat(data.price),
      companyId: user.companyId,
      id: 0
    })
  }

  return (
    <ModalComponent handleClose={() => setOpen(false)} open={open}>
      <form className="p-5" onSubmit={handleSubmit(submit)} onKeyDown={
        (e) => {
          if (e.key === 'Enter') {
            handleSubmit(submit)();
          }
        }
      }>
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-lg font-medium text-blue-600">Criar novo produto</h2>
          <Close
            className="pointer"
            style={{
              cursor: 'pointer',
              color: "#757575"
            }}
            onClick={
              () => setOpen(false)
            }
          />
        </div>
        <div className="flex justify-center gap-5 w-full">
          <div className="flex flex-col gap-5 max-w-xs">
            {form.slice(0, 4).map(({ id, label, placeholder, startAdornment }) => (
              <div key={id}>
                <Controller
                  name={id}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={
                        value
                      }
                      onChange={(e) => {
                        onChange(e.target.value)
                      }}
                      label={label}
                      placeholder={placeholder}
                      error={Boolean(errors[id]?.message)}
                      InputProps={{
                        startAdornment: value ? startAdornment : undefined,
                        inputComponent: id === 'price' ? MoneyMaskInput as any : undefined
                      }}
                    />
                  )}
                />
                <FormError>{errors[id]?.message}</FormError>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-5">
            {
              form.slice(4, 7).map(({ id, label, placeholder }) => (
                <div key={id} className="flex flex-col">
                  <Controller
                    name={id}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        label={label}
                        placeholder={placeholder}
                        error={Boolean(errors[id]?.message)}
                      />
                    )}
                  />
                  <FormError>{errors[id]?.message}</FormError>
                </div>
              ))
            }
          </div>
        </div>
        <div className="mt-10 w-full">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="h-12"
            disabled={!isValid}
          >
            Criar
          </Button>
        </div>
      </form>
    </ModalComponent>
  )
}
