import theme from "../../theme";

type FormErrorProps = {
  children: React.ReactNode;
};

const FormError = ({ children }: FormErrorProps) => {
  return (
    <span className="text-sm" style={{
      color: theme.palette.error.main
    }}>{children}</span>
  );
};

export default FormError;