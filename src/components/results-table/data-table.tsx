"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnFiltersState,
  getFilteredRowModel,
  type SortingState,
  getSortedRowModel,
  type VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

import { MultiSelectFilter } from "./multi-select-filter";
import { Toggle } from "../ui/toggle";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    "answer_label.correct": false,
    "answer_label.wrong": false,
    "answer_label.uncertain": false,
    "answer_label.none": false,
    "average_time.correct": false,
    "average_time.wrong": false,
    "average_time.uncertain": false,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },

    enableColumnFilters: true,
  });

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-start justify-baseline gap-2 py-4">
        <MultiSelectFilter<TData> table={table} columnId="category" />
        <MultiSelectFilter<TData> table={table} columnId="model" />
        <Toggle
          onClick={() => {
            table.getColumn("answer_label.correct")?.toggleVisibility();
            table.getColumn("answer_label.wrong")?.toggleVisibility();
            table.getColumn("answer_label.uncertain")?.toggleVisibility();
            table.getColumn("answer_label.none")?.toggleVisibility();
          }}
        >
          Show Answer Labels
        </Toggle>

        <Toggle
          onClick={() => {
            table.getColumn("average_time.correct")?.toggleVisibility();
            table.getColumn("average_time.wrong")?.toggleVisibility();
            table.getColumn("average_time.uncertain")?.toggleVisibility();
          }}
        >
          Show Time Taken
        </Toggle>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <TableHead
                    key={`${headerGroup.id}-${header.id}-${index}`}
                    colSpan={header.colSpan}
                    className="text-center px-0"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={`${row.id}-${index}`}
                  data-state={row.getIsSelected() && "selected"}
                  // 1) highlight the entire "Human" row
                  className={
                    (row.original as any).category === "Human"
                      ? "bg-blue-50"
                      : ""
                  }
                >
                  {row.getVisibleCells().map((cell, cellIndex) => {
                    // 2) only bold "accuracy" columns for the Human row
                    const isHumanRow =
                      (row.original as any).category === "Human";
                    const isAccuracyCell = cell.column.id?.includes("accuracy");

                    return (
                      <TableCell
                        key={`${cell.id}-${cellIndex}`}
                        className={`text-center ${
                          isHumanRow && isAccuracyCell ? "font-bold" : ""
                        }`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}