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
import { PhoneMaskInput } from "../../../components/InputMasks/PhoneMask";

type AddCustomerModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type Data = {
  name: string;
  phone?: string;
};

export const AddCustomerModal = ({ open, setOpen }: AddCustomerModalProps) => {
  const { control, formState: { errors }, handleSubmit, reset } = useForm({
    resolver: yupResolver(validationSchema),
  })
  const user = AuthenticationService.getUser();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await axios.post('http://localhost:5000/api/customers', data).then((res) => res.data);
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
      companyId: user?.companyId,
    })
  }

  return (
    <ModalComponent handleClose={() => setOpen(false)} open={open} width={500}>
      <form onSubmit={handleSubmit(submit)} onKeyDown={
        (e) => {
          if (e.key === 'Enter') {
            handleSubmit(submit)();
          }
        }
      }>
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-lg font-medium text-blue-600">Criar novo cliente</h2>
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
        <div className="flex flex-col gap-5 w-full">
          {form.map(({ id, label, placeholder }) => (
            <div key={id} className="w-full">
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
                    className="w-full"
                    InputProps={
                      {
                        inputComponent: id === 'phone' ? PhoneMaskInput as any : undefined,
                      }
                    }
                  />
                )}
              />
              <FormError>{errors[id]?.message}</FormError>
            </div>
          ))}
        </div>
        <div className="mt-10 w-full">
          <Button type="submit" fullWidth variant="contained" color="primary" className="h-12">
            Criar
          </Button>
        </div>
      </form>
    </ModalComponent>
  )
}
