import { Button } from "@mui/material";
import { ModalComponent } from "../../../components/Modal/Modal";
import { useMutation } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

type RemoveProductConfirmationModalProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  productId?: number;
  onSuccess?: () => void;
}

export const RemoveProductConfirmationModal = ({
  open,
  setOpen,
  productId,
  onSuccess
}: RemoveProductConfirmationModalProps) => {
  const mutation = useMutation({
    mutationFn: async ({ id }: any) => {
      return axios.delete(`http://localhost:5000/api/Product/${id}`).then((res) => res.data);
    },
    onSuccess: () => {
      toast.success('Produto excluído com sucesso!');
      setOpen(false);
      onSuccess?.();
    }
  })

  const handleDelete = () => {
    mutation.mutate({ id: productId });
  }

  return (
    <ModalComponent handleClose={() => setOpen(false)} open={open} width={400}>
      <h1 className="text-l font-medium text-pink-600">Tem certeza que deseja excluir o produto?</h1>
      <p className="text-sm text-gray-500 mt-3">Essa ação não poderá ser desfeita.</p>
      <div className="flex justify-end mt-10 gap-2">
        <Button
          variant="outlined"
          color="primary"
          className="h-12 w-40"
          onClick={() => setOpen(false)}
        >
          Cancelar
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="error"
          className="h-12"
          onClick={handleDelete}
        >
          Confirmar
        </Button>
      </div>
    </ModalComponent>
  )
}
