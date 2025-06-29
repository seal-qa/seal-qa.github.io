// columns.tsx
import { type ColumnDef } from "@tanstack/react-table";
import type { ModelEntry } from "./data";

export const columns: ColumnDef<ModelEntry>[] = [
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "cutoff",
    header: "Knowledge Cutoff",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "sealZeroNoSearch",
    header: "SEALZero (w/o Search)",
  },
  {
    accessorKey: "sealZeroSearch",
    header: "SEALZero (w/ Search)",
  },
  {
    accessorKey: "sealHardNoSearch",
    header: "SEALHard (w/o Search)",
  },
  {
    accessorKey: "sealHardSearch",
    header: "SEALHard (w/ Search)",
  },
];
