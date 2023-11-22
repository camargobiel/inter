import { AddShoppingCart, Edit, Search, ShoppingCart } from "@mui/icons-material"
import { Button, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { AddProductModal } from "./AddProductModal/AddProductModal";
import { useQuery } from "react-query";
import { AuthenticationService } from "../../services/AuthenticationService";
import axios from "axios";
import { ProductModel } from "../../models/ProductModel";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ptBR } from "@mui/x-data-grid";
import { EditProductModal } from "./EditProductModal/EditProductModal";

export const Products = () => {
  const [addProductModalIsOpen, setProductModalIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [productToEdit, setProductToEdit] = useState<ProductModel | null>(null);

  const { companyId } = AuthenticationService.getUser();
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', flex: 1 },
    { field: 'color', headerName: 'Cor', flex: 1 },
    { field: 'size', headerName: 'Tamanho', flex: 1 },
    { field: 'price', headerName: 'Preço', flex: 1, valueFormatter: (params) => `R$ ${params.value?.toFixed(2)}` },
    { field: 'category', headerName: 'Categoria', flex: 1 },
    { field: 'ncm', headerName: 'NCM', flex: 1 },
    { field: 'reference', headerName: 'Referência', flex: 1 },
    { field: 'edit',
      headerName: 'Editar',
      flex: 1,
      renderCell: (params) => <Edit style={{ cursor: "pointer" }} onClick={() => setProductToEdit(params.row)} />,
    },
  ]

  const { data, isLoading, refetch } = useQuery<ProductModel[]>('products', async () => {
    const { data } = await axios.get(`http://localhost:5000/api/Product/all/${companyId}`);
    setProducts(data);
    return data;
  })

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (data) {
      timeoutId = setTimeout(() => {
        const filteredProducts = data.filter((product) => {
          return product.name.toLowerCase().includes(search.toLowerCase())
            || product.color?.toLowerCase().includes(search.toLowerCase())
            || product.category.toLowerCase().includes(search.toLowerCase())
            || product.ncm?.toLowerCase().includes(search.toLowerCase())
            || product.reference?.toLowerCase().includes(search.toLowerCase())
            || product.size?.toLowerCase().includes(search.toLowerCase())
        })
        setProducts(filteredProducts)
      }, 500);
    }
    return () => clearTimeout(timeoutId);
  }, [search, data])

  useEffect(() => {
    if (!addProductModalIsOpen || !productToEdit) {
      refetch();
    }
  }, [addProductModalIsOpen, productToEdit, refetch])

  return (
    <>
      <AddProductModal open={addProductModalIsOpen} setOpen={setProductModalIsOpen}  />
      <EditProductModal open={Boolean(productToEdit)} setOpen={setProductToEdit} product={productToEdit} />
      <div className="mt-20 p-20">
        <div className="flex justify-between items-center">
          <div className="flex gap-10 items-center">
            <h1 className="text-2xl font-medium"><ShoppingCart /> Produtos</h1>
            <TextField
              placeholder="Pesquise por qualquer campo"
              autoComplete="off"
              size="small"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={
                {
                  endAdornment: <Search color="disabled" />
                }
              }
            />
          </div>
          <Button
            variant="contained"
            color='primary'
            endIcon={
              <AddShoppingCart />
            }
            onClick={() => setProductModalIsOpen(true)}
          >
            NOVO PRODUTO
          </Button>
        </div>
        <div className="mt-10 w-full h-[30rem]">
          <DataGrid
            loading={isLoading}
            rows={products}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 7 },
              },
              sorting: {
                sortModel: [{ field: 'name', sort: 'asc' }],
              },
            }}
            pageSizeOptions={[7]}
            rowSelection={false}
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          />
        </div>
      </div>
    </>
  )
}
