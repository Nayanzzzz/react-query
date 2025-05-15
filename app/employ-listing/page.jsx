"use client";

import React from "react";
import { Pen } from "lucide-react";
import { Trash2 } from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import customerData from "@/lib/data/customer-data";

import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";

export default function CustomerTable() {
  const queryClient = useQueryClient();

  const handleReset = async () => {
    await queryClient.removeQueries(["employ"]);
    refetch(); // Call the useQuery's refetch method
  };

  const columns = [
      // {
      //   id: "select",
      //   header: ({ table }) => (
      //     <Checkbox
      //       checked={
      //         table.getIsAllPageRowsSelected() ||
      //         (table.getIsSomePageRowsSelected() && "indeterminate")
      //       }
      //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      //       aria-label="Select all"
      //     />
      //   ),
      //   cell: ({ row }) => (
      //     <Checkbox
      //       checked={row.getIsSelected()}
      //       onCheckedChange={(value) => row.toggleSelected(!!value)}
      //       aria-label="Select row"
      //     />
      //   ),
      //   enableSorting: false,
      //   enableHiding: false,
      // },
    {
      accessorKey: "firstName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("firstName")}</div>,
    },

    {
      accessorKey: "lastName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("lastName")}</div>,
    },

    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },

    {
      accessorKey: "mobile",
      header: "Mobile",
      cell: ({ row }) => <div>{row.getValue("mobile")}</div>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("type")}</div>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => {
        return <div>{row.getValue("address")}</div>;
      },
    },
    {
      accessorKey: "city",
      header: "City",
      cell: ({ row }) => {
        return <div>{row.getValue("city")}</div>;
      },
    },
    {
      accessorKey: "state",
      header: "State",
      cell: ({ row }) => {
        return <div>{row.getValue("state")}</div>;
      },
    },
    {
      accessorKey: "country",
      header: "State",
      cell: ({ row }) => {
        return <div>{row.getValue("country")}</div>;
      },
    },
    {
      accessorKey: "pincode",
      header: "State",
      cell: ({ row }) => {
        return <div>{row.getValue("pincode")}</div>;
      },
    },
    {
      accessorKey: "salary",
      header: "Salary",
      cell: ({ row }) => {
        return <div>{row.getValue("salary")}</div>;
      },
    },
    {
      accessorKey: "Edit",
      cell: ({ row }) => {
        const id = row.original.id;
        // console.log(id);
        return (
          <div className="flex items-center justify-center  ">
            <Pen
              className="cursor-pointer w-4 h-4"
              onClick={() => {
                router.push(`/employ-listing/edit?id=${id}`);
              }}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "Delete",
      cell: ({ row }) => {
        const id = row.original.id;
        console.log(id);

        return (
          <div className="flex items-center justify-center  ">
            <AlertDialog>
              <AlertDialogTrigger>
                {" "}
                <Trash2 className="cursor-pointer w-4 h-4" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter> 
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                  <AlertDialogAction
                    onClick={() => {
                      queryClient.setQueryData(["employ"], (old) =>
                        old ? old.filter((e) => e.id !== id) : []
                      );
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },

    // {
    //   id: "actions",
    //   enableHiding: false,
    //   cell: ({ row }) => {
    //     const customer = row.original;

    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="ghost" className="h-8 w-8 p-0">
    //             <span className="sr-only">Open menu</span>
    //             <MoreHorizontal className="h-4 w-4" />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //           <DropdownMenuItem
    //             onClick={() => navigator.clipboard.writeText(customer.email)}
    //           >
    //             Copy email address
    //           </DropdownMenuItem>
    //           <DropdownMenuSeparator />
    //           <DropdownMenuItem>View customer details</DropdownMenuItem>
    //           <DropdownMenuItem>Edit customer</DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>

    //     );
    //   },
    // },
  ];

  const { data: employ, refetch } = useQuery({
    queryKey: ["employ"],
    queryFn: () => [],
    enabled: false, // prevents refetch since it's only from cache
  });

  const router = useRouter();

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10, // ← show only 5 rows per page
  });

  const table = useReactTable({
    data: employ ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  return (
    <div className="w-full   min-h-screen  px-10">
      <div>
        <div className="flex items-center py-4 ">
          <Input
            placeholder="Filter by email..."
            value={table.getColumn("email")?.getFilterValue() ?? ""}
            onChange={(e) =>
              table.getColumn("email")?.setFilterValue(e.target.value)
            }
            className="max-w-sm"
          />

          {/* <Button variant="outline" className="ml-52">Only Selected Employ Delete</Button> */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="rounded-md border ">
          <Table>
            <TableHeader className="">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
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

            {/* <TableBody>
            
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className=""
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Data Found.
                </TableCell>
              </TableRow>
            )}
          </TableBody> */}

            <TableBody>
              {(() => {
                const realRows = table.getRowModel().rows;
                const pageSize = table.getState().pagination.pageSize;
                const realCount = realRows.length;
                const blanksCount = pageSize - realCount;

                // 1) Real rows
                const realRowsJsx = realRows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ));

                // 2) Blank rows
                const blankRowsJsx =
                  blanksCount > 0
                    ? Array.from({ length: blanksCount }).map((_, idx) => (
                        <TableRow key={`blank-${idx}`}>
                          {table.getAllLeafColumns().map((col) => (
                            <TableCell key={col.id}>&nbsp;</TableCell>
                          ))}
                        </TableRow>
                      ))
                    : [];

                // 3) If truly no data at all, show your “No Data Found” row instead
                if (realCount === 0) {
                  return (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No Data Found.
                      </TableCell>
                    </TableRow>
                  );
                }

                return [...realRowsJsx, ...blankRowsJsx];
              })()}
            </TableBody>

          </Table>
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>

          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/employ-listing/add")}
            >
              Add
            </Button>

            <Button variant="outline" size="sm" onClick={handleReset}>
              Delete All
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
