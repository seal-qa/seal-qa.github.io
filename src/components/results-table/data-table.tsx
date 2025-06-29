// data-table.tsx
"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

export function DataTable<TData extends { category: string }>({
  columns,
  data,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const groupedRows: { [key: string]: TData[] } = {};

  // Group rows by category
  data.forEach((row) => {
    if (!groupedRows[row.category]) groupedRows[row.category] = [];
    groupedRows[row.category].push(row);
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {table.getFlatHeaders().map((header) => (
              <TableHead key={header.id} className="text-center">
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Object.entries(groupedRows).map(([category, rows], groupIndex) => (
            <React.Fragment key={category}>
              <TableRow>
                <TableCell colSpan={columns.length} className={`text-center font-semibold ${category.includes("Closed") ? "bg-yellow-100" : "bg-green-100"}`}>
                  {category}
                </TableCell>
              </TableRow>

              {rows.map((row, index) => {
                const rowModel = table.getRowModel().rows.find(
                  (r) => r.original === row
                );

                if (!rowModel) return null;

                return (
                  <TableRow key={`${category}-${index}`}>
                    {rowModel.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-center">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
