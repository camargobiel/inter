import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { ModalComponent } from "../../../components/Modal/Modal";
import { Close } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { form } from './form'
import { validationSchema } from './validation'
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../../components/FormError/FormError";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { AuthenticationService } from "../../../services/AuthenticationService";
import { PurchaseModel } from "../../../models/PurchaseModel";
import { RemovePurchaseConfirmationModal } from "../RemovePurchaseConfirmationModal/RemovePurchaseConfirmationModal";
import { toast } from "react-toastify";

type EditPurchaseModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<PurchaseModel | null>>;
  purchase: PurchaseModel | null;
}

type Data = {
  totalPrice: number;
  date: string;
  paymentMethod: string;
  products: (string | undefined)[];
  customer: string | undefined;
  identifier: string;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const EditPurchaseModal = ({ open, setOpen, purchase }: EditPurchaseModalProps) => {
  const { control, formState: { errors }, handleSubmit, reset, setValue, getValues } = useForm({
    resolver: yupResolver(validationSchema),
  })
  const user = AuthenticationService.getUser();
  const [openRemovePurchaseConfirmationModal, setOpenRemovePurchaseConfirmationModal] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: PurchaseModel) => {
      return axios.put(`http://localhost:5000/api/sells`, data).then((res) => res.data);
    },
    onSuccess: () => {
      toast.success('Cliente atualizado com sucesso!');
      setOpen(null);
    }
  })

  const { data: products } = useQuery({
    queryKey: 'products',
    queryFn: async () => {
      return await axios.get(`http://localhost:5000/api/Product/all/${user.companyId}`);
    }
  })

  const { data: customers } = useQuery({
    queryKey: 'customers',
    queryFn: async () => {
      return await axios.get(`http://localhost:5000/api/customers/${user.companyId}`);
    }
  })

  const defaultValues = {
    ...purchase
  } as any

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset])

  const submit = (data: Data) => {
    mutation.mutate({
      customerId: data.customer,
      productsIds: data.products,
      date: data.date,
      paymentMethod: data.paymentMethod,
      identifier: data.identifier,
      totalPrice: data.totalPrice,
    } as any)
  }

  const updateTotalPrice = (selectedProducts: (string | undefined)[]) => {
    const totalPrice = selectedProducts.reduce((acc, curr) => {
      const product = products?.data?.find((product: any) => product.id === parseInt(curr as string));
      return acc + (product?.price || 0);
    }, 0);
    setValue('totalPrice', totalPrice);
  }

  return (
    <>
      <RemovePurchaseConfirmationModal
        open={openRemovePurchaseConfirmationModal}
        setOpen={setOpenRemovePurchaseConfirmationModal}
        purchaseId={purchase?.id}
        onSuccess={() => setOpen(null)}
      />
      <ModalComponent handleClose={() => setOpen(null)} open={open} width={800}>
      <form onSubmit={handleSubmit(submit)} onKeyDown={
        (e) => {
          if (e.key === 'Enter') {
            handleSubmit(submit)();
          }
        }
      }>
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-lg font-medium text-blue-600">Criar nova venda</h2>
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
        <div className="flex gap-5 w-full">
          <div className="flex flex-col gap-5 w-full">
            {form.slice(0, 3).map(({ id, label, placeholder, disabled, type }) => (
              <div key={id} className="w-full flex flex-col gap-2">
                <Controller
                  name={id}
                  defaultValue={defaultValues[id]}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    type === "select" ? (
                      <Select
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        error={Boolean(errors[id]?.message)}
                      >
                        <MenuItem value="creditCard">Cartão de crédito</MenuItem>
                        <MenuItem value="debitCard">Cartão de débito</MenuItem>
                        <MenuItem value="pix">Pix</MenuItem>
                        <MenuItem value="money">Dinheiro</MenuItem>
                      </Select>
                    ) : (
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
                        disabled={disabled}
                        type={type}
                        InputProps={{
                          startAdornment: id === "totalPrice" ? (
                            <span className="text-gray-400 mr-2">R$ </span>
                          ) : null
                        }}
                      />
                    )
                  )}
                />
                <FormError>{errors[id]?.message}</FormError>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-5 w-full">
            {form.slice(3, 8).map(({ id, label, placeholder, disabled, type, multi }) => (
              <div key={id} className="w-full flex flex-col gap-2">
                <Controller
                  name={id}
                  defaultValue={defaultValues[id]}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    type === "select" ? (
                      <FormControl>
                        <InputLabel id={id}>{label}</InputLabel>
                        <Select
                          value={value}
                          labelId={id}
                          id={id}
                          onChange={(e) => {
                            onChange(e.target.value)
                            updateTotalPrice(getValues("products"));
                          }}
                          error={Boolean(errors[id]?.message)}
                          multiple={Boolean(multi)}
                          label={label}
                          className="w-full"
                          input={<OutlinedInput label={label} />}
                          MenuProps={MenuProps}
                        >
                          {
                            id === "products" && products?.data?.map((product: any) => (
                              <MenuItem key={product.id} value={product.id}>
                                {product.name}
                              </MenuItem>
                            ))
                          }
                          {
                            id === "customer" && customers?.data?.map((customer: any) => (
                              <MenuItem key={customer.id} value={customer.id}>
                                {customer.name}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    ) : (
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
                        disabled={disabled}
                        type={type}
                      />
                    )
                  )}
                />
                <FormError>{errors[id]?.message}</FormError>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 w-full">
          <Button type="submit" fullWidth variant="contained" color="primary" className="h-12">
            Criar
          </Button>
        </div>
      </form>
    </ModalComponent>
    </>
  )
}
