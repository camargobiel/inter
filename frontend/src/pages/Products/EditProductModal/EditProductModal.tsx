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
import { ProductModel } from "../../../models/ProductModel";
import { RemoveProductConfirmationModal } from "../RemoveProductConfirmationModal/RemoveProductConfirmationModal";
import { toast } from "react-toastify";
import { MoneyMaskInput } from "../../../components/InputMasks/MoneyMask";

type EditProductModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<ProductModel | null>>;
  product: ProductModel | null;
}

type Data = {
  name: string;
  color?: string | null;
  size?: string | null;
  price: string;
  category: string;
  ncm?: string | null;
  reference?: string | null;
};

export const EditProductModal = ({ open, setOpen, product }: EditProductModalProps) => {
  const { control, formState: { errors }, handleSubmit, reset } = useForm({
    resolver: yupResolver(validationSchema),
  })
  const user = AuthenticationService.getUser();
  const [openRemoveProductConfirmationModal, setOpenRemoveProductConfirmationModal] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return axios.put(`http://localhost:5000/api/Product/update`, data).then((res) => res.data);
    },
    onSuccess: () => {
      toast.success('Produto atualizado com sucesso!');
      setOpen(null);
    }
  })

  const defaultValues = {
    name: product?.name,
    color: product?.color,
    size: product?.size,
    price: product?.price?.toString(),
    category: product?.category,
    ncm: product?.ncm,
    reference: product?.reference,
  }

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
      id: product?.id,
    })
  }

  return (
    <>
      <RemoveProductConfirmationModal
        open={openRemoveProductConfirmationModal}
        setOpen={setOpenRemoveProductConfirmationModal}
        productId={product?.id}
        onSuccess={() => setOpen(null)}
      />
      <ModalComponent handleClose={() => setOpen(null)} open={open}>
        <form className="p-5" onSubmit={handleSubmit(submit)} onKeyDown={
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
          <div className="flex justify-center gap-5 w-full">
            <div className="flex flex-col gap-5 max-w-xs">
              {form.slice(0, 4).map(({ id, label, placeholder, startAdornment }) => (
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
                  <div key={id}>
                    <Controller
                      name={id}
                      defaultValue={defaultValues[id]}
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
