/**
 * Type definitions untuk ExcelTable component
 */

import { ColumnDef } from '@tanstack/react-table'

// Extend TanStack Table's ColumnMeta to include our custom properties
declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData, TValue> {
        headerLabel?: string // String label untuk filter placeholder
        editable?: boolean   // Allow column to be edited (default: true)
        editComponent?: 'input' | 'select' | 'date' | 'textarea' | 'custom' // Type of editor component
        editOptions?: {
            options?: Array<{ label: string; value: string | number }> // Options for select
            placeholder?: string // Placeholder text
            rows?: number // Rows for textarea
            customRender?: (params: {
                value: unknown
                onChange: (value: unknown) => void
                onBlur: () => void
                onKeyDown: (e: React.KeyboardEvent) => void
            }) => React.ReactNode // Custom editor renderer
        }
    }
}

export type CellSelection = {
    startRow: number
    endRow: number
    startCol: string
    endCol: string
}

export type DragSelection = {
    startRow: number
    endRow: number
    startCol: string
    endCol: string
}

export type ClipboardData = {
    data: Record<string, unknown>[]
    selection: CellSelection
    operation: 'copy' | 'cut'
}

export type ExcelTableProps<TData extends Record<string, unknown> = Record<string, unknown>> = {
    /** Data array yang akan ditampilkan di table */
    data: TData[]

    /** Column definitions untuk TanStack Table */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns: ColumnDef<TData, any>[]

    /** Callback ketika data berubah */
    onDataChange?: (data: TData[]) => void

    /** Enable/disable features */
    features?: {
        /** Enable copy/paste/cut functionality (default: true) */
        clipboard?: boolean
        /** Enable undo/redo functionality (default: true) */
        history?: boolean
        /** Enable drag fill handle (default: true) */
        dragFill?: boolean
        /** Enable sorting (default: true) */
        sorting?: boolean
        /** Enable filtering (default: true) */
        filtering?: boolean
        /** Enable row selection with checkbox (default: true) */
        rowSelection?: boolean
        /** Enable keyboard shortcuts (default: true) */
        keyboardShortcuts?: boolean
        /** Show select column with checkboxes (default: true) */
        selectColumn?: boolean
    }

    /** Custom styling */
    className?: string

    /** Maximum history states to keep (default: 50) */
    maxHistoryStates?: number

    /** Custom cell renderer */
    renderCell?: (params: {
        value: unknown
        rowIndex: number
        columnId: string
        isEditing: boolean
    }) => React.ReactNode

    /** Callback when cell is edited */
    onCellEdit?: (params: {
        rowIndex: number
        columnId: string
        oldValue: unknown
        newValue: unknown
    }) => void

    /** Callback when selection changes */
    onSelectionChange?: (selection: CellSelection | null) => void
}
