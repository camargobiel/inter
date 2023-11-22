import { Checkroom, ExitToApp } from "@mui/icons-material"
import theme from "../../theme"
import { useLocation } from 'react-router-dom';
import { AuthenticationService } from "../../services/AuthenticationService";
import { toast } from "react-toastify";

const Navbar = () => {
  const routesToShowRegisterButtons = ["/login", "/cadastro", "/"];
  const location = useLocation();
  const user = AuthenticationService.getUser();

  return (
    <nav
      style={{
        backgroundColor: theme.palette.primary.main
      }}
      className="fixed w-full h-20 top-0 left-0 z-10"
    >
      {routesToShowRegisterButtons.includes(location.pathname) ? (
        <div className="container mx-auto flex justify-between items-center h-full">
          <div className="flex items-center">
            <a href="/" className="flex items-center text-white font-bold text-2xl">
              <Checkroom className="mr-2" />
              TextilTech
            </a>
          </div>
          <div className="flex items-center gap-5">
            <a href="/login" className="text-white font-medium mx-2">Login</a>
            <a href="/cadastro" className="text-white font-bold mx-2 border-solid border-2 border-white rounded p-2 pt-1 pb-1">
              Cadastro
            </a>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex justify-between items-center h-full ml-6 mr-6">
          <div
            className="flex items-center gap-5 w-fit"
          >
            <div
              className="flex items-center gap-1"
            >
              <p
                className="text-white font-bold mx-2 p-2 pt-1 pb-1 cursor-pointer"
                onClick={() => window.location.href = "/produtos"}
              >
                Produtos
              </p>
              <p
                className="text-white font-bold mx-2 p-2 pt-1 pb-1 cursor-pointer"
                onClick={() => window.location.href = "/clientes"}
              >
                Clientes
              </p>
              <p
                className="text-white font-bold mx-2 p-2 pt-1 pb-1 cursor-pointer"
                onClick={() => window.location.href = "/vendas"}
              >
                Vendas
              </p>
            </div>
          </div>
          <div
            className="flex items-center gap-5 items-center w-fit"
          >
            <p className="text-white text-xl">
              Olá, <span className="font-bold">{user.name}</span>
            </p>
            <div
              onClick={() => {
                AuthenticationService.logout();
                toast.success("Você foi deslogado com sucesso!");
                window.location.href = "/login";
              }}
              className="text-white font-medium mx-2 p-2 pt-1 pb-1 cursor-pointer"
            >
              Sair
              <ExitToApp className="text-white" />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
