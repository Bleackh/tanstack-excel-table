'use client'

import React, { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { ExcelTable, TableInstructions, TableStatusBar } from './ExcelTable'
import { SubmitIssueDialog } from './SubmitIssueDialog'

type Person = {
    id: number
    name: string
    age: number
    city: string
    email: string
    jobTitle: string
    salary: number
    status: 'Aktif' | 'Cuti' | 'Resign'
    joinDate: string
}

const defaultData: Person[] = [
    { id: 1, name: 'Ahmad', age: 24, city: 'Kendari', email: 'ahmad@example.com', jobTitle: 'Software Engineer', salary: 8500000, status: 'Aktif', joinDate: '2022-03-10' },
    { id: 2, name: 'Rina', age: 22, city: 'Jakarta', email: 'rina@example.com', jobTitle: 'UI/UX Designer', salary: 7500000, status: 'Aktif', joinDate: '2023-01-15' },
    { id: 3, name: 'Yudi', age: 27, city: 'Bandung', email: 'yudi@example.com', jobTitle: 'Data Analyst', salary: 9200000, status: 'Cuti', joinDate: '2020-07-22' },
    { id: 4, name: 'Budi', age: 25, city: 'Makassar', email: 'budi@example.com', jobTitle: 'Project Manager', salary: 11000000, status: 'Aktif', joinDate: '2019-11-05' },
    { id: 5, name: 'Sari', age: 26, city: 'Surabaya', email: 'sari@example.com', jobTitle: 'HR Specialist', salary: 8700000, status: 'Aktif', joinDate: '2021-05-18' },
    { id: 6, name: 'Doni', age: 28, city: 'Medan', email: 'doni@example.com', jobTitle: 'QA Engineer', salary: 8800000, status: 'Resign', joinDate: '2018-02-10' },
    { id: 7, name: 'Nina', age: 23, city: 'Palembang', email: 'nina@example.com', jobTitle: 'Marketing Executive', salary: 7300000, status: 'Aktif', joinDate: '2023-04-01' },
    { id: 8, name: 'Andi', age: 30, city: 'Balikpapan', email: 'andi@example.com', jobTitle: 'Network Engineer', salary: 9600000, status: 'Cuti', joinDate: '2017-12-20' },
    { id: 9, name: 'Lina', age: 21, city: 'Pontianak', email: 'lina@example.com', jobTitle: 'Content Writer', salary: 6400000, status: 'Aktif', joinDate: '2024-01-10' },
    { id: 10, name: 'Tono', age: 29, city: 'Padang', email: 'tono@example.com', jobTitle: 'Accountant', salary: 8900000, status: 'Aktif', joinDate: '2020-09-25' },
    { id: 11, name: 'Rudi', age: 24, city: 'Denpasar', email: 'rudi@example.com', jobTitle: 'Backend Developer', salary: 9500000, status: 'Aktif', joinDate: '2021-02-05' },
    { id: 12, name: 'Mira', age: 27, city: 'Manado', email: 'mira@example.com', jobTitle: 'Finance Officer', salary: 8700000, status: 'Cuti', joinDate: '2020-10-14' },
    { id: 13, name: 'Dewi', age: 25, city: 'Yogyakarta', email: 'dewi@example.com', jobTitle: 'Customer Support', salary: 6700000, status: 'Aktif', joinDate: '2022-09-12' },
    { id: 14, name: 'Rizal', age: 28, city: 'Semarang', email: 'rizal@example.com', jobTitle: 'Mobile Developer', salary: 9300000, status: 'Aktif', joinDate: '2019-04-23' },
    { id: 15, name: 'Ayu', age: 23, city: 'Banjarmasin', email: 'ayu@example.com', jobTitle: 'SEO Specialist', salary: 7100000, status: 'Resign', joinDate: '2023-02-17' },
    { id: 16, name: 'Eka', age: 26, city: 'Samarinda', email: 'eka@example.com', jobTitle: 'Business Analyst', salary: 9000000, status: 'Aktif', joinDate: '2021-06-09' },
    { id: 17, name: 'Tina', age: 24, city: 'Mataram', email: 'tina@example.com', jobTitle: 'Recruiter', salary: 7600000, status: 'Aktif', joinDate: '2022-08-01' },
    { id: 18, name: 'Rafi', age: 27, city: 'Kupang', email: 'rafi@example.com', jobTitle: 'System Administrator', salary: 9400000, status: 'Cuti', joinDate: '2019-03-30' },
    { id: 19, name: 'Indah', age: 22, city: 'Pekanbaru', email: 'indah@example.com', jobTitle: 'Graphic Designer', salary: 7000000, status: 'Aktif', joinDate: '2024-02-10' },
    { id: 20, name: 'Bagas', age: 29, city: 'Palangkaraya', email: 'bagas@example.com', jobTitle: 'Operations Manager', salary: 10500000, status: 'Aktif', joinDate: '2020-06-15' },
    { id: 21, name: 'Yani', age: 31, city: 'Serang', email: 'yani@example.com', jobTitle: 'Executive Assistant', salary: 8000000, status: 'Cuti', joinDate: '2018-11-11' },
    { id: 22, name: 'Fikri', age: 28, city: 'Tangerang', email: 'fikri@example.com', jobTitle: 'Front-End Developer', salary: 9500000, status: 'Aktif', joinDate: '2021-05-02' },
    { id: 23, name: 'Lusi', age: 26, city: 'Bekasi', email: 'lusi@example.com', jobTitle: 'Administrative Staff', salary: 6900000, status: 'Aktif', joinDate: '2022-01-25' },
    { id: 24, name: 'Nando', age: 25, city: 'Depok', email: 'nando@example.com', jobTitle: 'IT Support', salary: 8000000, status: 'Aktif', joinDate: '2021-12-05' },
    { id: 25, name: 'Rosa', age: 23, city: 'Bogor', email: 'rosa@example.com', jobTitle: 'Social Media Manager', salary: 7200000, status: 'Resign', joinDate: '2023-06-01' },
    { id: 26, name: 'Gilang', age: 27, city: 'Cirebon', email: 'gilang@example.com', jobTitle: 'System Analyst', salary: 8800000, status: 'Aktif', joinDate: '2020-03-14' },
    { id: 27, name: 'Putri', age: 24, city: 'Tasikmalaya', email: 'putri@example.com', jobTitle: 'HR Generalist', salary: 8300000, status: 'Aktif', joinDate: '2021-04-21' },
    { id: 28, name: 'Rian', age: 30, city: 'Cimahi', email: 'rian@example.com', jobTitle: 'Software Tester', salary: 8900000, status: 'Cuti', joinDate: '2019-09-12' },
    { id: 29, name: 'Anita', age: 25, city: 'Cilegon', email: 'anita@example.com', jobTitle: 'Finance Analyst', salary: 8700000, status: 'Aktif', joinDate: '2021-07-18' },
    { id: 30, name: 'Wawan', age: 28, city: 'Sukabumi', email: 'wawan@example.com', jobTitle: 'Procurement Officer', salary: 8600000, status: 'Aktif', joinDate: '2020-10-29' },
    { id: 31, name: 'Hendra', age: 32, city: 'Purwokerto', email: 'hendra@example.com', jobTitle: 'Operations Supervisor', salary: 10000000, status: 'Cuti', joinDate: '2017-08-13' },
    { id: 32, name: 'Mega', age: 23, city: 'Solo', email: 'mega@example.com', jobTitle: 'Copywriter', salary: 6500000, status: 'Aktif', joinDate: '2023-03-22' },
    { id: 33, name: 'Tegar', age: 29, city: 'Salatiga', email: 'tegar@example.com', jobTitle: 'DevOps Engineer', salary: 9800000, status: 'Aktif', joinDate: '2020-05-10' },
    { id: 34, name: 'Rosa', age: 27, city: 'Magelang', email: 'rosa2@example.com', jobTitle: 'Legal Officer', salary: 8700000, status: 'Resign', joinDate: '2019-06-25' },
    { id: 35, name: 'Fani', age: 26, city: 'Blitar', email: 'fani@example.com', jobTitle: 'Customer Success', salary: 7800000, status: 'Aktif', joinDate: '2021-11-14' },
    { id: 36, name: 'Iwan', age: 25, city: 'Kediri', email: 'iwan@example.com', jobTitle: 'Database Administrator', salary: 9400000, status: 'Aktif', joinDate: '2021-01-17' },
    { id: 37, name: 'Sinta', age: 22, city: 'Malang', email: 'sinta@example.com', jobTitle: 'Customer Care', salary: 6800000, status: 'Aktif', joinDate: '2024-01-08' },
    { id: 38, name: 'Vina', age: 24, city: 'Pasuruan', email: 'vina@example.com', jobTitle: 'Research Assistant', salary: 7600000, status: 'Cuti', joinDate: '2022-02-12' },
    { id: 39, name: 'Yoga', age: 27, city: 'Probolinggo', email: 'yoga@example.com', jobTitle: 'Software Engineer', salary: 9100000, status: 'Aktif', joinDate: '2020-07-16' },
    { id: 40, name: 'Rico', age: 28, city: 'Banyuwangi', email: 'rico@example.com', jobTitle: 'Graphic Designer', salary: 8200000, status: 'Aktif', joinDate: '2021-09-20' },
    { id: 41, name: 'Bella', age: 23, city: 'Jember', email: 'bella@example.com', jobTitle: 'Recruitment Officer', salary: 7500000, status: 'Aktif', joinDate: '2023-02-14' },
    { id: 42, name: 'Alif', age: 30, city: 'Tuban', email: 'alif@example.com', jobTitle: 'Web Developer', salary: 9700000, status: 'Cuti', joinDate: '2019-12-05' },
    { id: 43, name: 'Nadia', age: 24, city: 'Lamongan', email: 'nadia@example.com', jobTitle: 'Data Scientist', salary: 9800000, status: 'Aktif', joinDate: '2022-05-01' },
    { id: 44, name: 'Reza', age: 29, city: 'Gresik', email: 'reza@example.com', jobTitle: 'IT Consultant', salary: 10300000, status: 'Aktif', joinDate: '2020-09-30' },
    { id: 45, name: 'Sandy', age: 26, city: 'Sidoarjo', email: 'sandy@example.com', jobTitle: 'Marketing Analyst', salary: 8700000, status: 'Aktif', joinDate: '2021-06-11' },
    { id: 46, name: 'Lutfi', age: 25, city: 'Mojokerto', email: 'lutfi@example.com', jobTitle: 'Technical Writer', salary: 7800000, status: 'Aktif', joinDate: '2021-03-09' },
    { id: 47, name: 'Citra', age: 28, city: 'Tulungagung', email: 'citra@example.com', jobTitle: 'Product Manager', salary: 11200000, status: 'Aktif', joinDate: '2020-08-24' },
    { id: 48, name: 'Bagus', age: 27, city: 'Ngawi', email: 'bagus@example.com', jobTitle: 'Software Tester', salary: 8800000, status: 'Cuti', joinDate: '2019-05-19' },
    { id: 49, name: 'Kiki', age: 22, city: 'Ponorogo', email: 'kiki@example.com', jobTitle: 'Graphic Designer', salary: 6900000, status: 'Aktif', joinDate: '2024-03-05' },
    { id: 50, name: 'Farah', age: 25, city: 'Pacitan', email: 'farah@example.com', jobTitle: 'Finance Officer', salary: 8500000, status: 'Aktif', joinDate: '2022-04-10' },
    { id: 51, name: 'Rio', age: 29, city: 'Batu', email: 'rio@example.com', jobTitle: 'Software Engineer', salary: 9400000, status: 'Aktif', joinDate: '2020-07-01' },
    { id: 52, name: 'Sofia', age: 23, city: 'Blora', email: 'sofia@example.com', jobTitle: 'HR Assistant', salary: 7200000, status: 'Aktif', joinDate: '2023-01-22' },
    { id: 53, name: 'Dafa', age: 26, city: 'Cepu', email: 'dafa@example.com', jobTitle: 'Data Engineer', salary: 9500000, status: 'Cuti', joinDate: '2021-05-15' },
    { id: 54, name: 'Tari', age: 24, city: 'Kudus', email: 'tari@example.com', jobTitle: 'Product Designer', salary: 8600000, status: 'Aktif', joinDate: '2022-09-19' },
    { id: 55, name: 'Bintang', age: 28, city: 'Jepara', email: 'bintang@example.com', jobTitle: 'QA Engineer', salary: 9100000, status: 'Aktif', joinDate: '2020-12-02' },
];

// Define columns using direct ColumnDef format for more control
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const columns: ColumnDef<Person, any>[] = [
    // Checkbox select column
    {
        id: 'select',
        header: ({ table }) => (
            <div className="flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableColumnFilter: false, // ❌ Tidak bisa difilter (checkbox column)
    },
    {
        accessorKey: 'id',
        header: () => <div className="text-sm font-semibold">ID</div>,
        cell: ({ row }) => (
            <div className="text-sm">{row.getValue('id')}</div>
        ),
        meta: {
            headerLabel: 'ID', // String label untuk filter placeholder
            editable: false,   // ❌ ID tidak bisa di-edit
        },
        filterFn: 'equalsString',
        enableColumnFilter: false, // ❌ Nonaktifkan filter untuk ID
    },
    {
        accessorKey: 'name',
        header: () => <div className="text-center text-sm font-semibold">Name</div>,
        cell: ({ row }) => (
            <div className="text-sm font-medium text-center">{row.getValue('name')}</div>
        ),
        meta: {
            headerLabel: 'Name',
            editable: true,    // ✅ Name bisa di-edit
        },
        filterFn: 'includesString',
        enableColumnFilter: true, // ✅ Filter aktif
    },
    {
        accessorKey: 'age',
        header: () => <div className="text-sm font-semibold">Age</div>,
        cell: ({ row }) => (
            <div className="text-sm text-center">{row.getValue('age')}</div>
        ),
        meta: {
            headerLabel: 'Age',
        },
        filterFn: 'equalsString',
        enableColumnFilter: true, // ✅ Filter aktif
    },
    {
        accessorKey: 'city',
        header: () => <div className="text-sm font-semibold">City</div>,
        cell: ({ row }) => (
            <div className="text-sm">{row.getValue('city')}</div>
        ),
        meta: {
            headerLabel: 'City',
        },
        filterFn: 'includesString',
        enableColumnFilter: true, // ✅ Filter aktif
    },
    {
        accessorKey: 'email',
        header: () => <div className="text-sm font-semibold">Email</div>,
        cell: ({ row }) => (
            <div className="text-sm text-blue-600">{row.getValue('email')}</div>
        ),
        meta: {
            headerLabel: 'Email',
        },
        filterFn: 'includesString',
        enableColumnFilter: true, // ✅ Filter aktif
    },
    {
        accessorKey: 'jobTitle',
        header: () => <div className="text-sm font-semibold">Job Title</div>,
        cell: ({ row }) => (
            <div className="text-sm text-gray-700">{row.getValue('jobTitle')}</div>
        ),
        meta: {
            headerLabel: 'Job Title',
        },
        filterFn: 'includesString',
        enableColumnFilter: false, // ❌ Nonaktifkan filter untuk contoh
    },
    {
        accessorKey: 'salary',
        header: () => <div className="text-sm font-semibold text-right">Salary</div>,
        cell: ({ row }) => {
            const salary = row.getValue('salary') as number
            const formatted = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
            }).format(salary)
            return <div className="text-sm text-right font-medium">{formatted}</div>
        },
        meta: {
            headerLabel: 'Salary',
            editable: true,    // ✅ Salary bisa di-edit
        },
        filterFn: 'equalsString',
        enableColumnFilter: false, // ❌ Nonaktifkan filter untuk sensitive data
    },
    {
        accessorKey: 'status',
        header: () => <div className="text-sm font-semibold">Status</div>,
        cell: ({ row }) => {
            const status = row.getValue('status') as string
            const statusColor =
                status === 'Aktif' ? 'bg-green-100 text-green-800' :
                    status === 'Cuti' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'

            return (
                <div className={`text-xs px-2 py-1 rounded-full inline-block font-medium ${statusColor}`}>
                    {status}
                </div>
            )
        },
        meta: {
            headerLabel: 'Status',
            editable: true,    // ✅ Status bisa di-edit
        },
        filterFn: 'equalsString',
        enableColumnFilter: true, // ✅ Filter aktif
    },
    {
        accessorKey: 'joinDate',
        header: () => <div className="text-sm font-semibold">Join Date</div>,
        cell: ({ row }) => (
            <div className="text-sm text-gray-600">{row.getValue('joinDate')}</div>
        ),
        meta: {
            headerLabel: 'Join Date',
            editable: false,   // ❌ Join Date tidak bisa di-edit (read-only)
        },
        filterFn: 'includesString',
        enableColumnFilter: false, // ❌ Nonaktifkan filter untuk contoh
    },
]

/**
 * Example usage of ExcelTable component with separate UI components
 * This demonstrates how to use the reusable ExcelTable with custom layout
 */
export default function Table() {
    const [data] = useState<Person[]>(defaultData)

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
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <TableInstructions
                            title="Excel-Like Table with Shadcn UI ✨"
                            description="Full-featured spreadsheet with undo/redo, copy/paste, drag fill, and more"
                            dragFill={true}
                            keyboardShortcuts={true}
                            clipboard={true}
                            history={true}
                        />
                    </div>
                    <div className="ml-4">
                        <SubmitIssueDialog />
                    </div>
                </div>

                <ExcelTable<Person>
                    data={data}
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
                        selectColumn: true
                    }}
                />

                {/* Status bar is optional - can be enabled by tracking state from ExcelTable */}
                {/* <TableStatusBar /> */}

                {/* Drag indicator is optional - can be enabled by tracking state from ExcelTable */}
                {/* <DragSelectionIndicator ... /> */}
            </div>
        </div>
    )
}
