export type Form = {
  id: "name" | "color" | "size" | "price" | "category" | "ncm" | "reference";
  label: string;
  placeholder: string;
  startAdornment?: JSX.Element;
}

export const form: Form[] = [
  {
    id: "name",
    label: "Nome*",
    placeholder: "Ex. Camiseta para corrida dry-fit"
  },
  {
    id: "color",
    label: "Cor",
    placeholder: "Ex. Azul, verde ou #758590"
  },
  {
    id: "size",
    label: "Tamanho",
    placeholder: "Ex. G, GG",
  },
  {
    id: "price",
    label: "Preço*",
    placeholder: "Ex. R$ 28,99",
    startAdornment: <span className="text-gray-500 mr-2">R$</span>
  },
  {
    id: "category",
    label: "Categoria*",
    placeholder: "Ex. Camiseta, short, calça"
  },
  {
    id: "ncm",
    label: "NCM",
    placeholder: "Ex. 61062000"
  },
  {
    id: "reference",
    label: "Referência",
    placeholder: "Ex. 0201"
  }
]
