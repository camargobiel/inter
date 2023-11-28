import { Button, TextField } from "@mui/material";
import { ModalComponent } from "../../../components/Modal/Modal";
import { Close } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { form } from "./form";
import { validationSchema } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../../components/FormError/FormError";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { AuthenticationService } from "../../../services/AuthenticationService";
import { CustomerModel } from "../../../models/CustomerModel";
import { RemoveCustomerConfirmationModal } from "../RemoveCustomerConfirmationModal/RemoveCustomerConfirmationModal";
import { toast } from "react-toastify";
import { EditCustomerParams } from "../types/EditCustomerParams";
import { PhoneMaskInput } from "../../../components/InputMasks/PhoneMask";

type EditProductModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<CustomerModel | null>>;
  customer: CustomerModel | null;
}

type Data = {
  name: string;
  phone?: string | null;
};

export const EditProductModal = ({ open, setOpen, customer }: EditProductModalProps) => {
  const { control, formState: { errors }, handleSubmit, reset } = useForm({
    resolver: yupResolver(validationSchema),
  })
  const user = AuthenticationService.getUser();
  const [openRemoveProductConfirmationModal, setOpenRemoveProductConfirmationModal] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: EditCustomerParams) => {
      return axios.put(`http://localhost:5000/api/customers`, data).then((res) => res.data);
    },
    onSuccess: () => {
      toast.success('Cliente atualizado com sucesso!');
      setOpen(null);
    }
  })

  const defaultValues = {
    name: customer?.name,
    phone: customer?.phone,
  }

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset])

  const submit = (data: Data) => {
    mutation.mutate({
      ...customer,
      name: data.name,
      phone: data.phone,
      companyId: user.companyId,
    })
  }

  return (
    <>
      <RemoveCustomerConfirmationModal
        open={openRemoveProductConfirmationModal}
        setOpen={setOpenRemoveProductConfirmationModal}
        customerId={customer?.id}
        onSuccess={() => setOpen(null)}
      />
      <ModalComponent handleClose={() => setOpen(null)} open={open} width={500}>
        <form onSubmit={handleSubmit(submit)} onKeyDown={
          (e) => {
            if (e.key === 'Enter') {
              handleSubmit(submit)();
            }
          }
        }>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-lg font-medium text-blue-600">Editar produto</h2>
            <Close
              className="pointer"
              style={{
                cursor: 'pointer',
                color: "#757575"
              }}
              onClick={
                () => setOpen(null)
              }
            />
          </div>
          <div className="flex flex-col gap-5 w-full">
            {form.map(({ id, label, placeholder }) => (
              <div key={id}>
                <Controller
                  name={id}
                  defaultValue={defaultValues[id]}
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
          <div className="mt-10 w-full flex gap-2">
            <Button
              variant="contained"
              color="error"
              className="h-12 w-40"
              onClick={
                () => setOpenRemoveProductConfirmationModal(true)
              }
            >
              Excluir
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="h-12"
            >
              Confirmar
            </Button>
          </div>
        </form>
      </ModalComponent>
    </>
  )
}
