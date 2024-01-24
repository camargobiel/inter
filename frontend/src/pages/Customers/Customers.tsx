import { Edit, OpenInNew, Person, PersonAdd, Search } from "@mui/icons-material"
import { Button, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { AddCustomerModal } from "./AddCustomerModal/AddCustomerModal";
import { useQuery } from "react-query";
import { AuthenticationService } from "../../services/AuthenticationService";
import axios from "axios";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ptBR } from "@mui/x-data-grid";
import { EditProductModal } from "./EditCustomerModal/EditCustomerModal";
import { CustomerModel } from "../../models/CustomerModel";
import { useNavigate } from "react-router-dom";

export const Customers = () => {
  const [addCustomerModalIsOpen, setCustomerModalIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState<CustomerModel[]>([]);
  const [customerToEdit, setCustomerToEdit] = useState<CustomerModel | null>(null);
  const navigate = useNavigate();

  const { companyId } = AuthenticationService.getUser();
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', flex: 1 },
    { field: 'phone', headerName: 'Telefone', flex: 1 },
    { field: 'mostPurchasedProduct', headerName: 'Produto mais comprado', flex: 1 },
    { field: 'sells', headerName: 'Compras feitas', flex: 1,
      renderCell: (params) => <OpenInNew onClick={
        () => navigate(`/vendas`, {
          state: {
            customerId: params.row.id,
            customerName: params.row.name,
          }
        })
      } />,
    },
    { field: 'edit',
      headerName: 'Editar',
      flex: 1,
      renderCell: (params) => <Edit style={{ cursor: "pointer" }} onClick={() => setCustomerToEdit(params.row)} />,
    },
  ]

  const { data, isLoading, refetch } = useQuery<CustomerModel[]>('customers', async () => {
    const { data } = await axios.get(`http://localhost:5000/api/customers/${companyId}`);
    setCustomers(data);
    return data;
  })

  useEffect(() => {
    document.title = 'Clientes | Listagem';
  }, [])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (data?.length) {
      timeoutId = setTimeout(() => {
        const filteredCustomers = data?.filter((customer) => {
          return customer.name.toLowerCase().includes(search.toLowerCase())
            || customer.phone?.toLowerCase().includes(search.toLowerCase())
            || customer.purchaseCount?.toString().includes(search.toLowerCase())
            || customer.mostPurchasedProduct?.toString().includes(search.toLowerCase())
        })
        setCustomers(filteredCustomers)
      }, 500);
    }
    return () => clearTimeout(timeoutId);
  }, [search, data])

  useEffect(() => {
    if (!addCustomerModalIsOpen || !customerToEdit) {
      refetch();
    }
  }, [addCustomerModalIsOpen, customerToEdit, refetch])

  return (
    <>
      <AddCustomerModal open={addCustomerModalIsOpen} setOpen={setCustomerModalIsOpen}  />
      <EditProductModal open={Boolean(customerToEdit)} setOpen={setCustomerToEdit} customer={customerToEdit} />
      <div className="mt-20 p-20">
        <div className="flex justify-between items-center">
          <div className="flex gap-10 items-center">
            <h1 className="text-2xl font-medium"><Person /> Clientes</h1>
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
              <PersonAdd />
            }
            onClick={() => setCustomerModalIsOpen(true)}
          >
            NOVO CLIENTE
          </Button>
        </div>
        <div className="mt-10 w-full h-[30rem]">
          <DataGrid
            loading={isLoading}
            rows={customers}
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
