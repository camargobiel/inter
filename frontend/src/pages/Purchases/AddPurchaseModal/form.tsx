import dayjs from "dayjs";

export type Form = {
  id: "totalPrice" | "date"  | "paymentMethod" | "products" | "customer" | "identifier";
  label: string;
  placeholder: string;
  disabled?: boolean;
  type?: string;
  defaultValue?: string | string[] | number | undefined;
  multi?: boolean;
}

export const form: Form[] = [
  {
    id: "identifier",
    label: "Identificador *",
    placeholder: "Ex. 1, ABC123",
  },
  {
    id: "date",
    label: "Data*",
    placeholder: "Ex. 2021-01-01",
    type: "date",
    defaultValue: dayjs().format("YYYY-MM-DD")
  },
  {
    id: "paymentMethod",
    label: "Método de pagamento*",
    placeholder: "Ex. Cartão de crédito, dinheiro",
    type: "select",
    defaultValue: "creditCard",
  },
  {
    id: "products",
    label: "Produtos*",
    placeholder: "Ex. Camiseta, calça, tênis",
    type: "select",
    defaultValue: [],
    multi: true,
  },
  {
    id: "customer",
    label: "Cliente*",
    placeholder: "Ex. Camiseta, calça, tênis",
    type: "select",
    defaultValue: "",
  },
  {
    id: "totalPrice",
    label: "Preço total*",
    placeholder: "Ex. R$ 10,00",
    disabled: true,
    defaultValue: 0,
  },
]
