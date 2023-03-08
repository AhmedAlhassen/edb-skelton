import React from "react";
import MaterialReactTable from "material-react-table";
import { Box, Button, IconButton } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ExportToCsv } from "export-to-csv";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";

const MuiDatatable = ({ col, data, hanlePrint }) => {
  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: [
      "Id",
      "Bill Id",
      "Ammount",
      "Commission",
      "Currency",
      "Account",
      "Teller Trans Ref",
      "Cheque Date",
      "Cheque Collect REF",
      "Cheque NO",
      "Voucher",
      "Branch",
      "Auther",
      "Date",
      "Status",
    ],
  };
  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportRows = (rows) => {
    const toPrint = [];
    rows.map((row) => {
      const { biler, paymentM, uuid, updateddate, ...original } = row.original;

      toPrint.push(original);
    });
    csvExporter.generateCsv(toPrint);
  };

  const handleExportData = () => {
    const dataToPrint = [];
    data.map((row) => {
      const { biler, paymentM, uuid, updateddate, ...original } = row;
      dataToPrint.push(original);
    });

    csvExporter.generateCsv(dataToPrint);
  };
  return (
    <MaterialReactTable
      columns={col}
      data={data}
      muiTableProps={{
        sx: {
          tableLayout: "auto",
        },
      }}
      initialState={{ pagination: { pageSize: 5, pageIndex: 0 } }}
      enableRowSelection
      positionToolbarAlertBanner="bottom"
      enableColumnResizing
      columnResizeMode="onEnd"
      enableColumnOrdering
      enableColumnFilterModes
      renderTopToolbarCustomActions={({ table }) => (
        <Box
          sx={{ display: "flex", gap: "1rem", p: "0.5rem", flexWrap: "wrap" }}
        >
          <Button
            color="primary"
            //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
            onClick={handleExportData}
            startIcon={<FileDownloadIcon />}
            variant="contained"
            size="small"
          >
            Data
          </Button>
          <Button
            disabled={table.getPrePaginationRowModel().rows.length === 0}
            //export all rows, including from the next page, (still respects filtering and sorting)
            onClick={() =>
              handleExportRows(table.getPrePaginationRowModel().rows)
            }
            startIcon={<FileDownloadIcon />}
            variant="contained"
            size="small"
          >
            All
          </Button>
          <Button
            disabled={table.getRowModel().rows.length === 0}
            //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
            onClick={() => handleExportRows(table.getRowModel().rows)}
            startIcon={<FileDownloadIcon />}
            variant="contained"
            size="small"
          >
            Page
          </Button>
          <Button
            disabled={
              !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
            }
            //only export selected rows
            onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
            startIcon={<FileDownloadIcon />}
            variant="contained"
            size="small"
          >
            Selected Rows
          </Button>
        </Box>
      )}
      enableRowActions
      renderRowActions={({ row }) => (
        <Box>
          <IconButton onClick={() => hanlePrint(row.original)}>
            <LocalPrintshopIcon />
          </IconButton>
        </Box>
      )}
      positionActionsColumn="last"
      //   muiTableContainerProps={{ sx: { m: "40px 0 0 0", height: "75vh" } }}
    ></MaterialReactTable>
  );
};

export default MuiDatatable;
