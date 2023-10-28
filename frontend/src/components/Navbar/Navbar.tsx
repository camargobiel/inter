import { Checkroom } from "@mui/icons-material"
import theme from "../../theme"

const Navbar = () => {
  return (
    <nav
      style={{
        backgroundColor: theme.palette.primary.main
      }}
      className="fixed w-full h-16 top-0 left-0 z-10"
    >
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
    </nav>
  )
}

export default Navbar