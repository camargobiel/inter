import { Box, Modal } from "@mui/material"

type ModalComponentProps = {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
  width?: number;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

export const ModalComponent = ({ open, handleClose, children, width = 800 }: ModalComponentProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={{
        ...style,
        width,
      }}>
        {children}
      </Box>
    </Modal>
  )
}
