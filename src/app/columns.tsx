"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Ngo } from "./data/getNgos";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "./column-header";

export const columns: ColumnDef<Ngo>[] = [
    {
        accessorKey: "registrationNumber",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Registration Number" />
    },
    {
        accessorKey: "type",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />
    },
    {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />
    },
    {
        accessorKey: "phone",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Phone" />
    },
    {
        accessorKey: "email",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />
    },
    {
        accessorKey: "officialAddress",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Official Address" />
    },
    {
        accessorKey: "district",
        header: ({ column }) => <DataTableColumnHeader column={column} title="District" />
    },
    {
        accessorKey: "province",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Province" />
    },
    {
        accessorKey: "country",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Country" />
    },
    {
        accessorKey: "contactPerson",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Contact Person(s)" />
    },
    {
        accessorKey: "status",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />
    }
];
