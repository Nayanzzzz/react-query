// "use client";

// import React from "react";
// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import customerData from "@/lib/data/customer-data";
// import AddButton from "./_components/add-button";


 
// const columns = [
//   //   {
//   //     id: "select",
//   //     header: ({ table }) => (
//   //       <Checkbox
//   //         checked={
//   //           table.getIsAllPageRowsSelected() ||
//   //           (table.getIsSomePageRowsSelected() && "indeterminate")
//   //         }
//   //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//   //         aria-label="Select all"
//   //       />
//   //     ),
//   //     cell: ({ row }) => (
//   //       <Checkbox
//   //         checked={row.getIsSelected()}
//   //         onCheckedChange={(value) => row.toggleSelected(!!value)}
//   //         aria-label="Select row"
//   //       />
//   //     ),
//   //     enableSorting: false,
//   //     enableHiding: false,
//   //   },
//   {
//     accessorKey: "firstName",
//     header: ({ column }) => (
//       <Button
//         variant="ghost"
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//       >
//         First Name
//         <ArrowUpDown className="ml-2 h-4 w-4" />
//       </Button>
//     ),
//     cell: ({ row }) => <div>{row.getValue("firstName")}</div>,
//   },

//   {
//     accessorKey: "lastName",
//     header: ({ column }) => (
//       <Button
//         variant="ghost"
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//       >
//         Last Name
//         <ArrowUpDown className="ml-2 h-4 w-4" />
//       </Button>
//     ),
//     cell: ({ row }) => <div>{row.getValue("lastName")}</div>,
//   },

//   {
//     accessorKey: "email",
//     header: ({ column }) => (
//       <Button
//         variant="ghost"
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//       >
//         Email
//         <ArrowUpDown className="ml-2 h-4 w-4" />
//       </Button>
//     ),
//     cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
//   },

//   {
//     accessorKey: "mobile",
//     header: "Mobile",
//     cell: ({ row }) => <div>{row.getValue("mobile")}</div>,
//   },
//   {
//     accessorKey: "type",
//     header: "Type",
//     cell: ({ row }) => <div className="capitalize">{row.getValue("type")}</div>,
//   },
//   {
//     accessorKey: "address.city",
//     header: "City",
//     cell: ({ row }) => {
//       const address = row.original.address;
//       return <div>{address.city}</div>;
//     },
//   },
//   {
//     accessorKey: "address.state",
//     header: "State",
//     cell: ({ row }) => {
//       const address = row.original.address;
//       return <div>{address.state}</div>;
//     },
//   },
//   {
//     accessorKey: "address.country",
//     header: "State",
//     cell: ({ row }) => {
//       const address = row.original.address;
//       return <div>{address.country}</div>;
//     },
//   },
//   {
//     accessorKey: "address.pincode",
//     header: "State",
//     cell: ({ row }) => {
//       const address = row.original.address;
//       return <div>{address.pincode}</div>;
//     },
//   },

//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const customer = row.original;

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(customer.email)}
//             >
//               Copy email address
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>View customer details</DropdownMenuItem>
//             <DropdownMenuItem>Edit customer</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];

// export default function CustomerTable() {

//   const [sorting, setSorting] = React.useState([]);
//   const [columnFilters, setColumnFilters] = React.useState([]);
//   const [columnVisibility, setColumnVisibility] = React.useState({});
//   const [rowSelection, setRowSelection] = React.useState({});

//   const customers = JSON.parse(localStorage.getItem("customers")) || [];
//     //  console.log(customers);
    
//   const table = useReactTable({
//     data: customerData,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   });

//   return (
//     <div className="w-full px-10">
//       <div className="flex items-center py-4 ">
//         <Input
//           placeholder="Filter by email..."
//           value={table.getColumn("email")?.getFilterValue() ?? ""}
//           onChange={(e) =>
//             table.getColumn("email")?.setFilterValue(e.target.value)
//           }
//           className="max-w-sm"
//         />

//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className="ml-auto">
//               Columns <ChevronDown className="ml-2 h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             {table
//               .getAllColumns()
//               .filter((column) => column.getCanHide())
//               .map((column) => (
//                 <DropdownMenuCheckboxItem
//                   key={column.id}
//                   className="capitalize"
//                   checked={column.getIsVisible()}
//                   onCheckedChange={(value) => column.toggleVisibility(!!value)}
//                 >
//                   {column.id}
//                 </DropdownMenuCheckboxItem>
//               ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>

//       <div className="rounded-md border ">
//         <Table>
//           <TableHeader className="">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>

//           <TableBody>
//             {table.getRowModel().rows.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
          
//         </Table>
//       </div>

//       <div className="flex items-center justify-end space-x-2 py-4">
//         <div className="flex-1 text-sm text-muted-foreground">
//           {table.getFilteredSelectedRowModel().rows.length} of{" "}
//           {table.getFilteredRowModel().rows.length} row(s) selected.
//         </div>

//         <div className=" ">
//             <AddButton/>
//           </div>

//         <div className="space-x-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//           >
//             Previous
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//           >
//             Next
//           </Button>
//         </div>

//       </div>
//     </div>
//   );
// }

import React from 'react'

const page = () => {
  return (
    <div>
      home page
    </div>
  )
}

export default page
