import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { ModalComponent } from "../../../components/Modal/Modal";
import { Close } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { form } from "./form";
import { validationSchema } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../../components/FormError/FormError";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { AuthenticationService } from "../../../services/AuthenticationService";
import { toast } from "react-toastify";

type AddPurchaseModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type Data = {
  totalPrice: number;
  date: string;
  paymentMethod: string;
  products: string[];
  customer: string;
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

export const AddPurchaseModal = ({ open, setOpen }: AddPurchaseModalProps) => {
  const { control, formState: { errors, isValid }, handleSubmit, reset, setValue, getValues } = useForm({
    resolver: yupResolver(validationSchema),
  })
  const user = AuthenticationService.getUser();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await axios.post('http://localhost:5000/api/sells', data).then((res) => res.data);
    },
    onSuccess: () => {
      toast.success('Venda criada com sucesso!');
      setOpen(false);
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

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset])

  const submit = (data: Data) => {
    mutation.mutate({
      identifier: data.identifier,
      companyId: user?.companyId,
      paymentMethod: data.paymentMethod,
      totalPrice: parseInt(data.totalPrice.toString()),
      date: new Date(data.date).toISOString(),
      customerId: parseInt(data.customer),
      productsIds: data.products.map((id) => parseInt(id))
    })
  }

  const updateTotalPrice = (selectedProducts: (string | undefined)[]) => {
    const totalPrice = selectedProducts.reduce((acc, curr) => {
      const product = products?.data?.find((product: any) => product.id === parseInt(curr as string));
      return acc + (product?.price || 0);
    }, 0);
    setValue('totalPrice', totalPrice);
  }

  return (
    <ModalComponent handleClose={() => setOpen(false)} open={open} width={800}>
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
              () => setOpen(false)
            }
          />
        </div>
        <div className="flex gap-5 w-full">
          <div className="flex flex-col gap-5 w-full">
            {form.slice(0, 3).map(({ id, label, placeholder, disabled, type, defaultValue }) => (
              <div key={id} className="w-full flex flex-col gap-2">
                <Controller
                  name={id}
                  defaultValue={defaultValue}
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
                      />
                    )
                  )}
                />
                <FormError>{errors[id]?.message}</FormError>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-5 w-full">
            {form.slice(3, 8).map(({ id, label, placeholder, disabled, type, defaultValue, multi }) => (
              <div key={id} className="w-full flex flex-col gap-2">
                <Controller
                  name={id}
                  defaultValue={defaultValue as any}
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
                          multiple={multi}
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
                        InputProps={
                          {
                            startAdornment: id === 'totalPrice' ? (
                              <span style={{ color: "#00000061" }} className="mr-2">R$</span>
                            ) : undefined
                          }
                        }
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
