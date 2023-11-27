import { Add, Edit, OpenInNew, Search, ShoppingBag } from "@mui/icons-material"
import { Button, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { AddPurchaseModal } from "./AddPurchaseModal/AddPurchaseModal";
import { useQuery } from "react-query";
import { AuthenticationService } from "../../services/AuthenticationService";
import axios from "axios";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ptBR } from "@mui/x-data-grid";
import { EditPurchaseModal } from "./EditPurchaseModal/EditPurchaseModal";
import { PurchaseModel } from "../../models/PurchaseModel";

export const Purchases = () => {
  const [addPurchaseModalIsOpen, setPurchaseModalIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [purchases, setPurchases] = useState<PurchaseModel[]>([]);
  const [purchaseToEdit, setPurchaseToEdit] = useState<PurchaseModel | null>(null);

  const { companyId } = AuthenticationService.getUser();
  const columns: GridColDef[] = [
    { field: 'identifier', headerName: 'Identificador', flex: 1 },
    { field: 'totalPrice', headerName: 'Preço total', flex: 1 },
    { field: 'payment_method', headerName: 'Método de pagamento', flex: 1 },
    { field: 'edit',
      headerName: 'Editar',
      flex: 1,
      renderCell: (params) => <Edit style={{ cursor: "pointer" }} onClick={() => setPurchaseToEdit(params.row)} />,
    },
  ]

  const { data, isLoading, refetch } = useQuery<PurchaseModel[]>('sells', async () => {
    const { data } = await axios.get(`http://localhost:5000/api/sells`, {
      data: {
        companyId,
      }
    });
    setPurchases(data);
    return data;
  })

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (data) {
      timeoutId = setTimeout(() => {
        const filteredCustomers = data.filter((purchase) => {
          return purchase.identifier.toLowerCase().includes(search.toLowerCase())
        })
        setPurchases(filteredCustomers)
      }, 500);
    }
    return () => clearTimeout(timeoutId);
  }, [search, data])

  useEffect(() => {
    if (!addPurchaseModalIsOpen || !purchaseToEdit) {
      refetch();
    }
  }, [addPurchaseModalIsOpen, purchaseToEdit, refetch])

  return (
    <>
      <AddPurchaseModal open={addPurchaseModalIsOpen} setOpen={setPurchaseModalIsOpen}  />
      <EditPurchaseModal open={Boolean(purchaseToEdit)} setOpen={setPurchaseToEdit} purchase={purchaseToEdit} />
      <div className="mt-20 p-20">
        <div className="flex justify-between items-center">
          <div className="flex gap-10 items-center">
            <h1 className="text-2xl font-medium"><ShoppingBag /> Vendas</h1>
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
              <Add />
            }
            onClick={() => setPurchaseModalIsOpen(true)}
          >
            NOVA VENDA
          </Button>
        </div>
        <div className="mt-10 w-full h-[30rem]">
          <DataGrid
            loading={isLoading}
            rows={purchases}
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
