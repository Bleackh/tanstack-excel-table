'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getSortedRowModel,
    SortingState,
    getFilteredRowModel,
    ColumnFiltersState,
    ColumnDef,
} from '@tanstack/react-table'
import { MoveUp, MoveDown, MoveVertical } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ExcelTableProps, CellSelection, DragSelection, ClipboardData } from './types'

/**
 * ExcelTable - Komponen table reusable dengan fitur seperti Excel
 * 
 * Features:
 * - Copy/Paste/Cut dengan Ctrl+C/V/X
 * - Undo/Redo dengan Ctrl+Z/Y
 * - Drag fill handle seperti Excel
 * - Keyboard navigation dengan arrow keys
 * - Sorting dan filtering columns
 * - Row selection dengan checkbox
 * - Direct typing untuk edit cell
 * 
 * @example
 * ```tsx
 * <ExcelTable
 *   data={myData}
 *   columns={myColumns}
 *   onDataChange={handleDataChange}
 *   title="My Data Table"
 * />
 * ```
 */
export default function ExcelTable<TData extends Record<string, unknown>>({
    data: initialData,
    columns: columnsProp,
    onDataChange,
    features = {},
    maxHistoryStates = 50,
    renderCell,
    onCellEdit,
    onSelectionChange,
}: ExcelTableProps<TData>) {
    // Default features
    const {
        clipboard = true,
        history = true,
        dragFill = true,
        sorting = true,
        filtering = true,
        rowSelection = true,
        keyboardShortcuts = true,
    } = features

    const [data, setData] = useState<TData[]>(() => [...initialData])
    const [editingCell, setEditingCell] = useState<{ rowId: number; colId: string } | null>(null)
    const [selectedCell, setSelectedCell] = useState<{ rowIndex: number; colId: string } | null>(null)
    const [selectedRange, setSelectedRange] = useState<CellSelection | null>(null)
    const [dragStart, setDragStart] = useState<{ rowIndex: number; colId: string } | null>(null)
    const [dragSelection, setDragSelection] = useState<DragSelection | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [clipboardData, setClipboardData] = useState<ClipboardData | null>(null)
    const [historyState, setHistoryState] = useState<TData[][]>([[...initialData]])
    const [historyIndex, setHistoryIndex] = useState(0)
    const [sortingState, setSortingState] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [rowSelectionState, setRowSelectionState] = useState<Record<string, boolean>>({})

    // Notify parent when data changes
    useEffect(() => {
        if (onDataChange) {
            onDataChange(data)
        }
    }, [data, onDataChange])

    // Notify parent when selection changes
    useEffect(() => {
        if (onSelectionChange) {
            onSelectionChange(selectedRange)
        }
    }, [selectedRange, onSelectionChange])

    const deepCloneData = useCallback((data: TData[]): TData[] => {
        return data.map(row => ({ ...row }))
    }, [])

    const updateDataWithHistory = useCallback((newData: TData[]) => {
        if (!history) {
            setData(newData)
            return
        }

        const newHistory = historyState.slice(0, historyIndex + 1)
        newHistory.push(deepCloneData(newData))

        if (newHistory.length > maxHistoryStates) {
            newHistory.shift()
            setHistoryIndex(newHistory.length - 1)
        } else {
            setHistoryIndex(newHistory.length - 1)
        }

        setHistoryState(newHistory)
        setData(newData)
    }, [history, historyState, historyIndex, maxHistoryStates, deepCloneData])

    const getAccessorKey = (col: ColumnDef<TData>): string | undefined => {
        if ('accessorKey' in col && typeof col.accessorKey === 'string') {
            return col.accessorKey
        }
        if ('id' in col && typeof col.id === 'string') {
            return col.id
        }
        return undefined
    }

    const getColumnIndex = useCallback((columnId: string) => {
        return columnsProp.findIndex(col => {
            if ('accessorKey' in col && typeof col.accessorKey === 'string') {
                return col.accessorKey === columnId
            }
            if ('id' in col && typeof col.id === 'string') {
                return col.id === columnId
            }
            return false
        })
    }, [columnsProp])

    const getSelectedRange = useCallback((): CellSelection => {
        if (selectedRange) return selectedRange

        if (selectedCell) {
            return {
                startRow: selectedCell.rowIndex,
                endRow: selectedCell.rowIndex,
                startCol: selectedCell.colId,
                endCol: selectedCell.colId
            }
        }

        return {
            startRow: 0,
            endRow: 0,
            startCol: getAccessorKey(columnsProp[1]) || 'id',
            endCol: getAccessorKey(columnsProp[1]) || 'id'
        }
    }, [selectedRange, selectedCell, columnsProp])

    const undo = useCallback(() => {
        if (!history || historyIndex <= 0) return

        const prevIndex = historyIndex - 1
        const prevData = historyState[prevIndex]

        setHistoryIndex(prevIndex)
        setData(deepCloneData(prevData))
    }, [history, historyState, historyIndex, deepCloneData])

    const redo = useCallback(() => {
        if (!history || historyIndex >= historyState.length - 1) return

        const nextIndex = historyIndex + 1
        const nextData = historyState[nextIndex]

        setHistoryIndex(nextIndex)
        setData(deepCloneData(nextData))
    }, [history, historyState, historyIndex, deepCloneData])

    const copySelection = useCallback(() => {
        if (!clipboard) return

        const selection = getSelectedRange()
        const { startRow, endRow, startCol, endCol } = selection

        const startColIndex = getColumnIndex(startCol)
        const endColIndex = getColumnIndex(endCol)

        const minRow = Math.min(startRow, endRow)
        const maxRow = Math.max(startRow, endRow)
        const minCol = Math.min(startColIndex, endColIndex)
        const maxCol = Math.max(startColIndex, endColIndex)

        const copiedData: Record<string, unknown>[] = []

        for (let r = minRow; r <= maxRow; r++) {
            const rowData: Record<string, unknown> = {}
            for (let colIdx = minCol; colIdx <= maxCol; colIdx++) {
                const columnId = getAccessorKey(columnsProp[colIdx])
                if (columnId && data[r]) {
                    rowData[columnId] = (data[r] as Record<string, unknown>)[columnId]
                }
            }
            copiedData.push(rowData)
        }

        setClipboardData({
            data: copiedData,
            selection,
            operation: 'copy'
        })
    }, [clipboard, data, columnsProp, getSelectedRange, getColumnIndex])

    const cutSelection = useCallback(() => {
        if (!clipboard) return

        copySelection()
        setClipboardData(prev => prev ? { ...prev, operation: 'cut' } : null)

        const selection = getSelectedRange()
        const newData = deepCloneData(data)
        const { startRow, endRow, startCol, endCol } = selection

        const startColIndex = getColumnIndex(startCol)
        const endColIndex = getColumnIndex(endCol)

        const minRow = Math.min(startRow, endRow)
        const maxRow = Math.max(startRow, endRow)
        const minCol = Math.min(startColIndex, endColIndex)
        const maxCol = Math.max(startColIndex, endColIndex)

        for (let r = minRow; r <= maxRow; r++) {
            for (let colIdx = minCol; colIdx <= maxCol; colIdx++) {
                const columnId = getAccessorKey(columnsProp[colIdx])
                if (columnId && newData[r]) {
                    (newData[r] as Record<string, unknown>)[columnId] = ''
                }
            }
        }

        updateDataWithHistory(newData)
    }, [clipboard, copySelection, data, columnsProp, getSelectedRange, getColumnIndex, deepCloneData, updateDataWithHistory])

    const pasteSelection = useCallback(() => {
        if (!clipboard || !clipboardData) return

        const selection = getSelectedRange()
        const newData = deepCloneData(data)
        const { startRow, startCol } = selection

        const startColIndex = getColumnIndex(startCol)

        clipboardData.data.forEach((rowData, rIdx) => {
            const targetRow = startRow + rIdx
            if (targetRow >= newData.length) return

            Object.keys(rowData).forEach((key, cIdx) => {
                const targetColIndex = startColIndex + cIdx
                if (targetColIndex < columnsProp.length) {
                    const targetColumnId = getAccessorKey(columnsProp[targetColIndex])
                    if (targetColumnId && newData[targetRow]) {
                        (newData[targetRow] as Record<string, unknown>)[targetColumnId] = rowData[key]
                    }
                }
            })
        })

        updateDataWithHistory(newData)

        if (clipboardData.operation === 'cut') {
            setClipboardData(null)
        }
    }, [clipboard, clipboardData, data, columnsProp, getSelectedRange, getColumnIndex, deepCloneData, updateDataWithHistory])

    const deleteSelection = useCallback(() => {
        const selection = getSelectedRange()
        const newData = deepCloneData(data)
        const { startRow, endRow, startCol, endCol } = selection

        const startColIndex = getColumnIndex(startCol)
        const endColIndex = getColumnIndex(endCol)

        const minRow = Math.min(startRow, endRow)
        const maxRow = Math.max(startRow, endRow)
        const minCol = Math.min(startColIndex, endColIndex)
        const maxCol = Math.max(startColIndex, endColIndex)

        for (let r = minRow; r <= maxRow; r++) {
            for (let colIdx = minCol; colIdx <= maxCol; colIdx++) {
                const columnId = getAccessorKey(columnsProp[colIdx])
                if (columnId && newData[r]) {
                    (newData[r] as Record<string, unknown>)[columnId] = ''
                }
            }
        }

        updateDataWithHistory(newData)
    }, [data, columnsProp, getSelectedRange, getColumnIndex, deepCloneData, updateDataWithHistory])

    const navigateCell = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
        if (!selectedCell) return

        const { rowIndex, colId } = selectedCell
        const colIndex = getColumnIndex(colId)

        let newRowIndex = rowIndex
        let newColIndex = colIndex

        switch (direction) {
            case 'up':
                newRowIndex = Math.max(0, rowIndex - 1)
                break
            case 'down':
                newRowIndex = Math.min(data.length - 1, rowIndex + 1)
                break
            case 'left':
                newColIndex = Math.max(1, colIndex - 1)
                break
            case 'right':
                newColIndex = Math.min(columnsProp.length - 1, colIndex + 1)
                break
        }

        const newColId = getAccessorKey(columnsProp[newColIndex]) || columnsProp[newColIndex].id || 'id'
        setSelectedCell({ rowIndex: newRowIndex, colId: newColId })
    }, [selectedCell, data.length, columnsProp, getColumnIndex])

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!keyboardShortcuts) return
        if (editingCell) return

        const target = e.target as HTMLElement
        if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
            return
        }

        const isCtrl = e.ctrlKey || e.metaKey
        const isPrintableCharacter = e.key.length === 1 && !isCtrl && !e.altKey

        if (isPrintableCharacter && selectedCell) {
            e.preventDefault()
            const rowId = (data[selectedCell.rowIndex] as Record<string, unknown>).id as number
            setEditingCell({ rowId, colId: selectedCell.colId })
            return
        }

        switch (e.key) {
            case 'c':
                if (isCtrl && clipboard) {
                    e.preventDefault()
                    copySelection()
                }
                break
            case 'v':
                if (isCtrl && clipboard) {
                    e.preventDefault()
                    pasteSelection()
                }
                break
            case 'x':
                if (isCtrl && clipboard) {
                    e.preventDefault()
                    cutSelection()
                }
                break
            case 'z':
                if (isCtrl && !e.shiftKey && history) {
                    e.preventDefault()
                    undo()
                }
                break
            case 'y':
                if (isCtrl && history) {
                    e.preventDefault()
                    redo()
                }
                break
            case 'Z':
                if (isCtrl && e.shiftKey && history) {
                    e.preventDefault()
                    redo()
                }
                break
            case 'Delete':
            case 'Backspace':
                e.preventDefault()
                deleteSelection()
                break
            case 'Enter':
                e.preventDefault()
                if (selectedCell) {
                    const rowId = (data[selectedCell.rowIndex] as Record<string, unknown>).id as number
                    setEditingCell({ rowId, colId: selectedCell.colId })
                }
                break
            case 'Escape':
                e.preventDefault()
                setEditingCell(null)
                setSelectedCell(null)
                setSelectedRange(null)
                setClipboardData(null)
                break
            case 'ArrowUp':
                e.preventDefault()
                navigateCell('up')
                break
            case 'ArrowDown':
                e.preventDefault()
                navigateCell('down')
                break
            case 'ArrowLeft':
                e.preventDefault()
                navigateCell('left')
                break
            case 'ArrowRight':
                e.preventDefault()
                navigateCell('right')
                break
        }
    }, [keyboardShortcuts, editingCell, selectedCell, data, clipboard, history, copySelection, pasteSelection, cutSelection, undo, redo, deleteSelection, navigateCell])

    useEffect(() => {
        if (keyboardShortcuts) {
            document.addEventListener('keydown', handleKeyDown)
            return () => document.removeEventListener('keydown', handleKeyDown)
        }
    }, [keyboardShortcuts, handleKeyDown])

    const detectPattern = (values: (string | number)[]): (string | number)[] => {
        if (values.length < 2) return values

        const numericValues = values.map(v => typeof v === 'number' ? v : parseInt(v.toString()))
        if (numericValues.every(v => !isNaN(v))) {
            const diff = numericValues[1] - numericValues[0]
            const isSequence = numericValues.every((v, i) => i === 0 || v === numericValues[0] + diff * i)
            if (isSequence) {
                return values.map((_, i) => numericValues[0] + diff * i)
            }
        }

        return values
    }

    const handleInputChange = (rowIndex: number, columnId: string, value: string | number) => {
        const oldValue = (data[rowIndex] as Record<string, unknown>)[columnId]

        const newData = data.map((row, idx) => {
            if (idx === rowIndex) {
                return { ...row, [columnId]: value }
            }
            return { ...row }
        })

        updateDataWithHistory(newData)

        if (onCellEdit) {
            onCellEdit({ rowIndex, columnId, oldValue, newValue: value })
        }
    }

    const handleFillDrag = (selection: DragSelection) => {
        if (!dragFill || !selection) return

        const newData = deepCloneData(data)
        const { startRow, endRow, startCol, endCol } = selection

        const startColIndex = getColumnIndex(startCol)
        const endColIndex = getColumnIndex(endCol)

        const minRow = Math.min(startRow, endRow)
        const maxRow = Math.max(startRow, endRow)
        const minCol = Math.min(startColIndex, endColIndex)
        const maxCol = Math.max(startColIndex, endColIndex)

        const sourceValue = (newData[startRow] as Record<string, unknown>)[startCol]

        if (startCol === endCol) {
            const sourceValues: (string | number)[] = [sourceValue as string | number]

            if (startRow > 0) {
                const prevValue = (newData[startRow - 1] as Record<string, unknown>)[startCol]
                if (prevValue !== undefined) {
                    sourceValues.unshift(prevValue as string | number)
                }
            }

            const patternValues = detectPattern(sourceValues)

            for (let r = minRow; r <= maxRow; r++) {
                if (r === startRow) continue

                let valueToSet = sourceValue

                if (patternValues.length > 1) {
                    const diff = typeof patternValues[1] === 'number' && typeof patternValues[0] === 'number'
                        ? patternValues[1] - patternValues[0] : 0

                    if (diff !== 0 && typeof sourceValue === 'number') {
                        valueToSet = sourceValue + (diff * (r - startRow))
                    }
                }

                (newData[r] as Record<string, unknown>)[startCol] = valueToSet
            }
        } else {
            for (let colIdx = minCol; colIdx <= maxCol; colIdx++) {
                const columnId = getAccessorKey(columnsProp[colIdx])
                if (!columnId) continue

                for (let r = minRow; r <= maxRow; r++) {
                    if (r === startRow && columnId === startCol) continue

                    let valueToSet = sourceValue

                    if (columnId === startCol && typeof sourceValue === 'number') {
                        const rowDiff = r - startRow
                        valueToSet = sourceValue + rowDiff
                    }

                    (newData[r] as Record<string, unknown>)[columnId] = valueToSet
                }
            }
        }

        updateDataWithHistory(newData)
    }

    const table = useReactTable({
        data,
        columns: columnsProp,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: sorting ? getSortedRowModel() : undefined,
        getFilteredRowModel: filtering ? getFilteredRowModel() : undefined,
        state: {
            sorting: sortingState,
            columnFilters,
            rowSelection: rowSelectionState,
        },
        onSortingChange: sorting ? setSortingState : undefined,
        onColumnFiltersChange: filtering ? setColumnFilters : undefined,
        onRowSelectionChange: rowSelection ? setRowSelectionState : undefined,
        enableSortingRemoval: true,
        enableRowSelection: rowSelection,
        enableColumnFilters: filtering, // Enable column-level filter control
    })

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-auto max-h-[calc(100vh-200px)]">
            <table
                className="w-full text-sm select-none min-w-max"
                onMouseUp={() => {
                    if (dragStart && dragSelection && isDragging) {
                        handleFillDrag(dragSelection)
                    }
                    setDragStart(null)
                    setDragSelection(null)
                    setIsDragging(false)
                }}
                onMouseLeave={() => {
                    setDragStart(null)
                    setDragSelection(null)
                    setIsDragging(false)
                }}
            >
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 sticky top-0 z-10">
                    {table.getHeaderGroups().map(headerGroup => (
                        <React.Fragment key={headerGroup.id}>
                            <tr>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider border-r border-gray-200 last:border-r-0 bg-gray-50 relative text-left"
                                    >
                                        {header.id !== 'select' && sorting ? (
                                            <div
                                                className="cursor-pointer select-none transition-colors hover:text-gray-900"
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                                                    {header.column.getIsSorted() === 'asc' ? (
                                                        <MoveUp className="w-4 h-4 text-green-600" />
                                                    ) : header.column.getIsSorted() === 'desc' ? (
                                                        <MoveDown className="w-4 h-4 text-green-600" />
                                                    ) : (
                                                        <MoveVertical className="w-4 h-4 opacity-30" />
                                                    )}
                                                </span>
                                            </div>
                                        ) : (
                                            flexRender(header.column.columnDef.header, header.getContext())
                                        )}
                                    </th>
                                ))}
                            </tr>
                            {filtering && (
                                <tr className="bg-white sticky  z-10">
                                    {headerGroup.headers.map(header => (
                                        <th
                                            key={header.id}
                                            className="px-6 py-2 border-r border-gray-200 last:border-r-0 bg-white"
                                        >
                                            {header.column.getCanFilter() ? (
                                                <Input
                                                    type="text"
                                                    value={(header.column.getFilterValue() ?? '') as string}
                                                    onChange={(e) => header.column.setFilterValue(e.target.value)}
                                                    placeholder={`Filter ${header.column.columnDef.meta?.headerLabel ||
                                                        (typeof header.column.columnDef.header === 'string'
                                                            ? header.column.columnDef.header
                                                            : header.id)
                                                        }...`}
                                                    className="h-8"
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            ) : null}
                                        </th>
                                    ))}
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </thead>

                <tbody className="divide-y divide-gray-100">
                    {table.getRowModel().rows.map((row, rowIndex) => (
                        <tr key={row.id} className="hover:bg-blue-50/30 transition-colors duration-150">
                            {row.getVisibleCells().map(cell => {
                                const rowId = (row.original as Record<string, unknown>).id
                                const isEditing =
                                    editingCell?.rowId === rowId &&
                                    editingCell?.colId === cell.column.id

                                const isSelected =
                                    selectedCell?.rowIndex === rowIndex &&
                                    selectedCell?.colId === cell.column.id

                                const isInSelectedRange = selectedRange && (() => {
                                    const { startRow, endRow, startCol, endCol } = selectedRange
                                    const startColIndex = getColumnIndex(startCol)
                                    const endColIndex = getColumnIndex(endCol)
                                    const currentColIndex = getColumnIndex(cell.column.id)

                                    const minRow = Math.min(startRow, endRow)
                                    const maxRow = Math.max(startRow, endRow)
                                    const minCol = Math.min(startColIndex, endColIndex)
                                    const maxCol = Math.max(startColIndex, endColIndex)

                                    return rowIndex >= minRow && rowIndex <= maxRow &&
                                        currentColIndex >= minCol && currentColIndex <= maxCol
                                })()

                                const isInClipboard = clipboard && clipboardData && (() => {
                                    const { startRow, endRow, startCol, endCol } = clipboardData.selection
                                    const startColIndex = getColumnIndex(startCol)
                                    const endColIndex = getColumnIndex(endCol)
                                    const currentColIndex = getColumnIndex(cell.column.id)

                                    const minRow = Math.min(startRow, endRow)
                                    const maxRow = Math.max(startRow, endRow)
                                    const minCol = Math.min(startColIndex, endColIndex)
                                    const maxCol = Math.max(startColIndex, endColIndex)

                                    return rowIndex >= minRow && rowIndex <= maxRow &&
                                        currentColIndex >= minCol && currentColIndex <= maxCol
                                })()

                                const isInDragSelection = dragSelection && (() => {
                                    const { startRow, endRow, startCol, endCol } = dragSelection
                                    const startColIndex = getColumnIndex(startCol)
                                    const endColIndex = getColumnIndex(endCol)
                                    const currentColIndex = getColumnIndex(cell.column.id)

                                    const minRow = Math.min(startRow, endRow)
                                    const maxRow = Math.max(startRow, endRow)
                                    const minCol = Math.min(startColIndex, endColIndex)
                                    const maxCol = Math.max(startColIndex, endColIndex)

                                    return rowIndex >= minRow && rowIndex <= maxRow &&
                                        currentColIndex >= minCol && currentColIndex <= maxCol
                                })()

                                return (
                                    <td
                                        key={cell.id}
                                        className={`relative px-6 py-3 cursor-pointer border-r border-gray-100 last:border-r-0 transition-all duration-150 
                                                    ${isSelected ? 'bg-green-50 ring-2 ring-green-400 ring-inset' : ''} 
                                                    ${isEditing ? 'bg-blue-50 ring-2 ring-blue-300 ring-inset' : ''} 
                                                    ${isInSelectedRange && !isSelected ? 'bg-green-100/50' : ''}
                                                    ${isInClipboard ? (clipboardData?.operation === 'cut' ? 'bg-red-100/50 border-red-300 border-dashed' : 'bg-yellow-100/50 border-yellow-300 border-dashed') : ''}
                                                `}
                                        onClick={(e) => {
                                            if (cell.column.id === 'select') return

                                            if (e.shiftKey && selectedCell) {
                                                setSelectedRange({
                                                    startRow: selectedCell.rowIndex,
                                                    endRow: rowIndex,
                                                    startCol: selectedCell.colId,
                                                    endCol: cell.column.id
                                                })
                                            } else {
                                                setSelectedCell({ rowIndex, colId: cell.column.id })
                                                setSelectedRange(null)
                                            }
                                        }}
                                        onDoubleClick={() => {
                                            if (cell.column.id === 'select') return

                                            setEditingCell({ rowId: rowId as number, colId: cell.column.id })
                                            setSelectedCell({ rowIndex, colId: cell.column.id })
                                            setSelectedRange(null)
                                        }}
                                        onMouseDown={e => {
                                            if ((e.target as HTMLElement).classList.contains('fill-handle')) {
                                                setDragStart({ rowIndex, colId: cell.column.id })
                                                setIsDragging(true)
                                                e.preventDefault()
                                                e.stopPropagation()
                                            }
                                        }}
                                        onMouseEnter={() => {
                                            if (dragStart && isDragging) {
                                                setDragSelection({
                                                    startRow: dragStart.rowIndex,
                                                    endRow: rowIndex,
                                                    startCol: dragStart.colId,
                                                    endCol: cell.column.id
                                                })
                                            }
                                        }}
                                    >
                                        {isEditing ? (
                                            renderCell ? (
                                                renderCell({
                                                    value: (row.original as Record<string, unknown>)[cell.column.id],
                                                    rowIndex,
                                                    columnId: cell.column.id,
                                                    isEditing: true
                                                })
                                            ) : (
                                                <input
                                                    autoFocus
                                                    type="text"
                                                    className="w-full h-full px-0 py-0 bg-transparent border-none outline-none focus:ring-0 text-gray-800 font-medium"
                                                    defaultValue={String((row.original as Record<string, unknown>)[cell.column.id] || '')}
                                                    onBlur={e => {
                                                        const value = e.target.value
                                                        handleInputChange(rowIndex, cell.column.id, value)
                                                        setEditingCell(null)
                                                    }}
                                                    onKeyDown={e => {
                                                        if (e.key === 'Enter') {
                                                            const value = (e.target as HTMLInputElement).value
                                                            handleInputChange(rowIndex, cell.column.id, value)
                                                            setEditingCell(null)
                                                        }
                                                        if (e.key === 'Escape') {
                                                            setEditingCell(null)
                                                        }
                                                    }}
                                                />
                                            )
                                        ) : (
                                            <span className="text-gray-800 font-medium">
                                                {renderCell ? (
                                                    renderCell({
                                                        value: (row.original as Record<string, unknown>)[cell.column.id],
                                                        rowIndex,
                                                        columnId: cell.column.id,
                                                        isEditing: false
                                                    })
                                                ) : (
                                                    flexRender(cell.column.columnDef.cell, cell.getContext())
                                                )}
                                            </span>
                                        )}

                                        {isSelected && cell.column.id !== 'select' && dragFill && (
                                            <div
                                                className="fill-handle absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-sm cursor-crosshair hover:bg-green-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
                                                title="Drag untuk mengisi ke sel lain (seperti Excel)"
                                            ></div>
                                        )}

                                        {isInDragSelection && (
                                            <div className="absolute inset-0 bg-gradient-to-br from-green-100/60 to-green-200/60 border-2 border-green-400 pointer-events-none rounded-md"></div>
                                        )}

                                        {dragStart && dragStart.rowIndex === rowIndex && dragStart.colId === cell.column.id && (
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/60 to-blue-200/60 border-2 border-blue-500 pointer-events-none rounded-md"></div>
                                        )}
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
