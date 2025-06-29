"use client";

import type { Column, ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type RowData = {
  category: string;
  model: string;
  accuracy: {
    all: string;        // e.g. "84.7%"
    text_only: string;  // e.g. "83.6%"
    multimodal: string; // e.g. "85.7%"
  };
  answer_label: {
    correct: string;
    wrong: string;
    uncertain: string;
    none: string;
  };
  average_time: {
    correct: string;
    wrong: string;
    uncertain: string;
  };
};

const getCorrectSort = (column: Column<RowData>) => {
  // Toggle sorting on click, cycling through asc -> desc -> none
  if (!column.getIsSorted()) {
    column.toggleSorting(false);
  } else if (column.getIsSorted() === "asc") {
    column.toggleSorting(true);
  } else if (column.getIsSorted() === "desc") {
    column.clearSorting();
  }
};

const SortableColumnHeader = ({
  column,
  header,
}: {
  column: Column<RowData>;
  header: string;
}) => (
  <Button
    variant="ghost"
    onClick={() => getCorrectSort(column)}
    size={"sm"}
    className="p-0"
  >
    <span className={cn(Boolean(column.getIsSorted()) && "text-primary")}>
      {header}
    </span>
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);

/**
 * Helper to parse a percentage string like "84.7%" => 84.7
 * If string is invalid, return 0
 */
function parsePercentage(value: string): number {
  if (!value) return 0;
  // Remove the "%" and parse as float
  const numeric = parseFloat(value.replace("%", ""));
  return isNaN(numeric) ? 0 : numeric;
}

export const columns: ColumnDef<RowData>[] = [
  {
    accessorKey: "category",
    header: "Category",
    filterFn: (row, id, filterValue) => {
      if (!filterValue || filterValue.length === 0) return true;
      const value = row.getValue(id) as string;
      return (filterValue as string[]).includes(value);
    },
  },
  {
    accessorKey: "model",
    header: "Model",
    filterFn: (row, id, filterValue) => {
      if (!filterValue || filterValue.length === 0) return true;
      const value = row.getValue(id) as string;
      return (filterValue as string[]).includes(value);
    },
  },
  {
    header: "Accuracy",
    columns: [
      {
        id: "accuracy.all",
        // 1) Store numeric value internally for sorting
        accessorFn: (row) => parsePercentage(row.accuracy.all),
        // 2) Display the original string (with `%`) in the table cell
        cell: ({ row }) => row.original.accuracy.all,
        header: ({ column }) => (
          <SortableColumnHeader column={column} header="All" />
        ),
      },
      {
        id: "accuracy.text_only",
        accessorFn: (row) => parsePercentage(row.accuracy.text_only),
        cell: ({ row }) => row.original.accuracy.text_only,
        header: ({ column }) => (
          <SortableColumnHeader column={column} header="Text Only" />
        ),
      },
      {
        id: "accuracy.multimodal",
        accessorFn: (row) => parsePercentage(row.accuracy.multimodal),
        cell: ({ row }) => row.original.accuracy.multimodal,
        header: ({ column }) => (
          <SortableColumnHeader column={column} header="Multimodal" />
        ),
      },
    ],
  },
  {
    header: "Answer Label",
    id: "answer_label",
    enableHiding: true,
    columns: [
      {
        accessorFn: (row) => row.answer_label.correct,
        id: "answer_label.correct",
        header: ({ column }) => (
          <SortableColumnHeader column={column} header="Correct" />
        ),
      },
      {
        accessorFn: (row) => row.answer_label.wrong,
        id: "answer_label.wrong",
        header: ({ column }) => (
          <SortableColumnHeader column={column} header="Wrong" />
        ),
      },
      {
        accessorFn: (row) => row.answer_label.uncertain,
        id: "answer_label.uncertain",
        header: ({ column }) => (
          <SortableColumnHeader column={column} header="Uncertain" />
        ),
      },
      {
        accessorFn: (row) => row.answer_label.none,
        id: "answer_label.none",
        header: ({ column }) => (
          <SortableColumnHeader column={column} header="None" />
        ),
      },
    ],
  },
  {
    header: "Average Time",
    columns: [
      {
        accessorFn: (row) => row.average_time.correct,
        id: "average_time.correct",
        header: ({ column }) => (
          <SortableColumnHeader column={column} header="Correct" />
        ),
      },
      {
        accessorFn: (row) => row.average_time.wrong,
        id: "average_time.wrong",
        header: ({ column }) => (
          <SortableColumnHeader column={column} header="Wrong" />
        ),
      },
      {
        accessorFn: (row) => row.average_time.uncertain,
        id: "average_time.uncertain",
        header: ({ column }) => (
          <SortableColumnHeader column={column} header="Uncertain" />
        ),
      },
    ],
  },
];
