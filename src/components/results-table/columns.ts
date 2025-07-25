// src/components/results-table/columns.ts

import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import type { SealHardRow } from "@data/sealHardCombined";

const helper = createColumnHelper<SealHardRow>();

export const columns: ColumnDef<SealHardRow, any>[] = [
  helper.accessor("model", {
    header: "Model",
    cell: info => info.getValue(),
  }),

  helper.group({
    header: "Q1–Q5 w/o Search",
    columns: [
      helper.accessor("t2_wo_q1", { header: "Q1", cell: i => i.getValue()?.toFixed(1) ?? "–" }),
      helper.accessor("t2_wo_q2", { header: "Q2", cell: i => i.getValue()?.toFixed(1) ?? "–" }),
      helper.accessor("t2_wo_q3", { header: "Q3", cell: i => i.getValue()?.toFixed(1) ?? "–" }),
      helper.accessor("t2_wo_q4", { header: "Q4", cell: i => i.getValue()?.toFixed(1) ?? "–" }),
      helper.accessor("t2_wo_q5", { header: "Q5", cell: i => i.getValue()?.toFixed(1) ?? "–" }),
    ],
  }),
  helper.group({
    header: "Q1–Q5 w/ Search",
    columns: [
      helper.accessor("t2_w_q1", { header: "Q1", cell: i => i.getValue()?.toFixed(1) ?? "–" }),
      helper.accessor("t2_w_q2", { header: "Q2", cell: i => i.getValue()?.toFixed(1) ?? "–" }),
      helper.accessor("t2_w_q3", { header: "Q3", cell: i => i.getValue()?.toFixed(1) ?? "–" }),
      helper.accessor("t2_w_q4", { header: "Q4", cell: i => i.getValue()?.toFixed(1) ?? "–" }),
      helper.accessor("t2_w_q5", { header: "Q5", cell: i => i.getValue()?.toFixed(1) ?? "–" }),
    ],
  }),

  helper.group({
    header: "Fast-Changing w/o",
    columns: [
      helper.accessor("t3_wo_never", { header: "Never", cell: i => i.getValue()?.toFixed(1) ?? "–" }),
      helper.accessor("t3_wo_slow",  { header: "Slow",  cell: i => i.getValue()?.toFixed(1) ?? "–" }),
      helper.accessor("t3_wo_fast",  { header: "Fast",  cell: i => i.getValue()?.toFixed(1) ?? "–" }),
    ],
  }),
  helper.group({
    header: "Fast-Changing w/",
    columns: [
      helper.accessor("t3_w_never", { header: "Never", cell: i => i.getValue()?.toFixed(1) ?? "–" }),
      helper.accessor("t3_w_slow",  { header: "Slow",  cell: i => i.getValue()?.toFixed(1) ?? "–" }),
      helper.accessor("t3_w_fast",  { header: "Fast",  cell: i => i.getValue()?.toFixed(1) ?? "–" }),
    ],
  }),

  helper.group({
    header: "Recency w/o",
    columns: [
      helper.accessor("t4_wo_pre2024", { header: "<2024", cell: i => i.getValue()?.toFixed(1) ?? "–" }),
      helper.accessor("t4_wo_2024",    { header: "2024", cell: i => i.getValue()?.toFixed(1) ?? "–" }),
      helper.accessor("t4_wo_2025",    { header: "2025", cell: i => i.getValue()?.toFixed(1) ?? "–" }),
    ],
  }),
  helper.group({
    header: "Recency w/",
    columns: [
      helper.accessor("t4_w_pre2024", { header: "<2024", cell: i => i.getValue()?.toFixed(1) ?? "–" }),
      helper.accessor("t4_w_2024",    { header: "2024", cell: i => i.getValue()?.toFixed(1) ?? "–" }),
      helper.accessor("t4_w_2025",    { header: "2025", cell: i => i.getValue()?.toFixed(1) ?? "–" }),
    ],
  }),

  helper.group({
    header: "Helpful w/o",
    columns: [
      helper.accessor("t5_wo_unhelpful", { header: "Unhelpful", cell: i => i.getValue()?.toFixed(1) ?? "–" }),
      helper.accessor("t5_wo_conflict",  { header: "Conflict",  cell: i => i.getValue()?.toFixed(1) ?? "–" }),
    ],
  }),
  helper.group({
    header: "Helpful w/",
    columns: [
      helper.accessor("t5_w_unhelpful", { header: "Unhelpful", cell: i => i.getValue()?.toFixed(1) ?? "–" }),
      helper.accessor("t5_w_conflict",  { header: "Conflict",  cell: i => i.getValue()?.toFixed(1) ?? "–" }),
    ],
  }),
];
