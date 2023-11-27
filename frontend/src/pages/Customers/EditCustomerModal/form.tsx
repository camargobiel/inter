export type Form = {
  id: "name" | "phone";
  label: string;
  placeholder: string;
}

export const form: Form[] = [
  {
    id: "name",
    label: "Nome*",
    placeholder: "Ex. Lucas, João, Maria...",
  },
  {
    id: "phone",
    label: "Telefone",
    placeholder: "Ex. (00) 00000-0000",
  },
]
