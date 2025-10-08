'use client'

import React from 'react'
import { createColumnHelper, ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { ExcelTable, TableInstructions } from './ExcelTable'

type Person = {
    id: number
    name: string
    age: number
    city: string
}

const defaultData: Person[] = [
    { id: 1, name: 'Ahmad', age: 24, city: 'Kendari' },
    { id: 2, name: 'Rina', age: 22, city: 'Jakarta' },
    { id: 3, name: 'Yudi', age: 27, city: 'Bandung' },
    { id: 4, name: 'Budi', age: 25, city: 'Makassar' },
    { id: 5, name: 'Sari', age: 26, city: 'Surabaya' },
    { id: 6, name: 'Doni', age: 28, city: 'Medan' },
]

const columnHelper = createColumnHelper<Person>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: ColumnDef<Person, any>[] = [
    // Checkbox select column
    columnHelper.display({
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllRowsSelected()}
                onCheckedChange={table.getToggleAllRowsSelectedHandler()}
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={row.getToggleSelectedHandler()}
            />
        ),
        enableSorting: false,
        enableColumnFilter: false, // ❌ Tidak bisa difilter (checkbox column)
    }),
    columnHelper.accessor('id', {
        header: 'ID',
        filterFn: 'equalsString',
        enableColumnFilter: false, // ❌ Contoh: Nonaktifkan filter untuk kolom ID
    }),
    columnHelper.accessor('name', {
        header: 'Name',
        enableColumnFilter: true, // ✅ Filter aktif (default)
    }),
    columnHelper.accessor('age', {
        header: 'Age',
        filterFn: 'equalsString',
        enableColumnFilter: true, // ✅ Filter aktif
    }),
    columnHelper.accessor('city', {
        header: 'City',
        enableColumnFilter: true, // ✅ Filter aktif
    }),
]

/**
 * Example usage of ExcelTable component
 * This demonstrates how to use the reusable ExcelTable with custom data and columns
 */
export default function Table() {
    const handleDataChange = (newData: Person[]) => {
        console.log('Data changed:', newData)
    }

    const handleCellEdit = (params: {
        rowIndex: number
        columnId: string
        oldValue: unknown
        newValue: unknown
    }) => {
        console.log('Cell edited:', params)
    }

    const handleSelectionChange = (selection: unknown) => {
        console.log('Selection changed:', selection)
    }

    return (
        <div className="p-8 bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <TableInstructions
                    title="Excel-Like Table with Shadcn UI ✨"
                    description="Full-featured spreadsheet with undo/redo, copy/paste, drag fill, and more"
                    dragFill={true}
                    keyboardShortcuts={true}
                    clipboard={true}
                    history={true}
                />

                <ExcelTable<Person>
                    data={defaultData}
                    columns={columns}
                    onDataChange={handleDataChange}
                    onCellEdit={handleCellEdit}
                    onSelectionChange={handleSelectionChange}
                    features={{
                        clipboard: true,
                        history: true,
                        dragFill: true,
                        sorting: true,
                        filtering: true,
                        rowSelection: true,
                        keyboardShortcuts: true,
                    }}
                />
            </div>
        </div>
    )
}