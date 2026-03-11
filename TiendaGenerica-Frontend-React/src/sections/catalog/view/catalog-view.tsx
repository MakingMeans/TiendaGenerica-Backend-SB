import type { Product } from 'src/modules/catalog/catalog.types';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { DashboardContent } from 'src/layouts/dashboard';
import { getProducts } from 'src/modules/catalog/catalog.service';
import { UploadCsvDialog } from 'src/modules/catalog/components/UploadCsvDialog';
import { EditCatalogDialog } from 'src/modules/catalog/components/EditCatalogDialog';
import { CreateCatalogDialog } from 'src/modules/catalog/components/CreateCatalogDialog';
import { DeleteCatalogDialog } from 'src/modules/catalog/components/DeleteCatalogDialog';
import { ReactivateCatalogDialog } from 'src/modules/catalog/components/ReactiveCatalogDialog';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { TableEmptyRows } from '../table-empty-rows';
import { CatalogTableRow } from '../catalog-table-row';
import { CatalogTableHead } from '../catalog-table-head';
import { CatalogTableToolbar } from '../catalog-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { CatalogProps } from '../catalog-table-row';

// ----------------------------------------------------------------------

export function CatalogView() {
  const table = useTable();

  const [filterName, setFilterName] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const dataFiltered: CatalogProps[] = applyFilter({
    inputData: products,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openReactivate, setOpenReactivate] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);

  const handleOpenEdit = (product: Product) => {
    setSelectedProduct(product);
    setOpenEdit(true);
  };

  const handleOpenDelete = (product: Product) => {
    setSelectedProduct(product);
    setOpenDelete(true);
  };

  const handleOpenReactivate = (product: Product) => {
    setSelectedProduct(product);
    setOpenReactivate(true);
  };

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Catálogo
        </Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => setOpenCreate(true)}
        >
          Nuevo producto
        </Button>
        <Button
            variant="outlined"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={() => setOpenUpload(true)}
          >
  Importar CSV
</Button>
      </Box>

      <Card>
        <CatalogTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <CatalogTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={products.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    products.map((product) =>
                      product.idProducto.toString()
                    )
                  )
                }
                headLabel={[
                  { id: 'codigo', label: 'Código' },
                  { id: 'nombre', label: 'Nombre' },
                  { id: 'precioVenta', label: 'Precio' },
                  { id: 'iva', label: 'IVA' },
                  { id: 'stockActual', label: 'Stock' },
                  { id: 'activo', label: 'Estado' },
                  { id: '' },
                ]}
              />

              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <CatalogTableRow
                      key={row.idProducto}
                      row={row}
                      selected={table.selected.includes(
                        row.idProducto.toString()
                      )}
                      onSelectRow={() =>
                        table.onSelectRow(row.idProducto.toString())
                      }
                      onEdit={(product) => handleOpenEdit(product)}
                      onDelete={(product) =>
                        product.activo
                          ? handleOpenDelete(product)
                          : handleOpenReactivate(product)
                      }
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(
                    table.page,
                    table.rowsPerPage,
                    products.length
                  )}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={products.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>

      <CreateCatalogDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSuccess={loadProducts}
      />

      <EditCatalogDialog
        open={openEdit}
        product={selectedProduct}
        onClose={() => setOpenEdit(false)}
        onSuccess={loadProducts}
      />

      <DeleteCatalogDialog
        open={openDelete}
        product={selectedProduct}
        onClose={() => setOpenDelete(false)}
        onSuccess={loadProducts}
      />

      <ReactivateCatalogDialog
        open={openReactivate}
        product={selectedProduct}
        onClose={() => setOpenReactivate(false)}
        onSuccess={loadProducts}
      />

      <UploadCsvDialog
  open={openUpload}
  onClose={() => setOpenUpload(false)}
  onSuccess={loadProducts}
/>
    </DashboardContent>
  );
}

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
