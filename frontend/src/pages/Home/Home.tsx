import { Button } from "@mui/material";
import home from '../../assets/svgs/home.svg'
import checkmark from '../../assets/svgs/checkmark.svg'
import { ArrowForwardIos } from "@mui/icons-material";
import React from "react";

const Home = () => {

  React.useEffect(() => {
    document.title = 'Página inicial';
  }, []);

  return (
    <main className="p-20 mt-32 flex items-center justify-center h-full gap-40">
      <section className="pb-40">
        <h1 className="text-blue-600 text-4xl font-semibold">
          Uma nova forma <br/> para gerenciar sua loja de roupas
        </h1>
        <h3 className="text-xl text-gray-500 mt-4">
          Ofereça uma experiência de compra inesquecível para seus clientes <br />
          e uma gestão de vendas completa para <span className="font-semibold">você</span>.
        </h3>
        <div>
          <ul className="mt-5">
            <li className="flex gap-2 items-center mb-2 text-gray-800">
              <img src={checkmark} alt="checkmark" /> Controle de vendas
            </li>
            <li className="flex gap-2 items-center mb-2 text-gray-800">
              <img src={checkmark} alt="checkmark" /> Gráficos de vendas
            </li>
            <li className="flex gap-2 items-center mb-2 text-gray-800">
              <img src={checkmark} alt="checkmark" /> Cadastro de produtos
            </li>
            <li className="flex gap-2 items-center mb-2 text-gray-800">
              <img src={checkmark} alt="checkmark" /> Gerenciamento de clientes
            </li>
          </ul>
        </div>
        <div className="mt-10">
          <Button
            variant="contained"
            color="primary"
            size="large"
            disableElevation
            onClick={
              () => window.location.href = '/cadastro'
            }
            endIcon={
              <ArrowForwardIos />
            }
          >Começar agora</Button>
          <p className="text-sm text-gray-500 mt-4">
            Já tem uma conta? <a href="/login" className="text-blue-600">Faça o login</a>
          </p>
        </div>
      </section>
      <section>
        <img src={home} alt="Home" className="w-full"/>
      </section>
    </main>
  )
}

export default Home;