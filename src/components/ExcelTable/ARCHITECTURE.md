# ExcelTable Component Architecture

## Overview
Komponen ExcelTable telah dipisahkan menjadi beberapa komponen yang lebih modular dan reusable.

## Komponen Struktur

### 1. **ExcelTable** (Core Component)
File: `ExcelTable/ExcelTable.tsx`

Komponen utama yang hanya berisi table dan logika bisnis. Tidak ada UI tambahan seperti instructions atau status bar.

**Props:**
```typescript
{
  data: TData[]
  columns: ColumnDef<TData, any>[]
  onDataChange?: (data: TData[]) => void
  features?: {
    clipboard?: boolean
    history?: boolean
    dragFill?: boolean
    sorting?: boolean
    filtering?: boolean
    rowSelection?: boolean
    keyboardShortcuts?: boolean
  }
  className?: string
  maxHistoryStates?: number
  renderCell?: (props) => ReactNode
  onCellEdit?: (params) => void
  onSelectionChange?: (selection) => void
}
```

**Render:**
- Hanya table dengan border dan shadow
- Tidak ada wrapper layout, instructions, atau status bar

### 2. **TableInstructions** (Optional UI Component)
File: `ExcelTable/TableInstructions.tsx`

Komponen untuk menampilkan informasi dan keyboard shortcuts.

**Props:**
```typescript
{
  title?: string
  description?: string
  dragFill?: boolean
  keyboardShortcuts?: boolean
  clipboard?: boolean
  history?: boolean
}
```

**Render:**
- Card dengan title dan description
- Daftar basic operations
- Daftar keyboard shortcuts

### 3. **TableStatusBar** (Optional UI Component)
File: `ExcelTable/TableStatusBar.tsx`

Komponen untuk menampilkan status seleksi, clipboard, dan history.

**Props:**
```typescript
{
  selectedRange?: CellSelection | null
  selectedCell?: { rowIndex: number; colId: string } | null
  clipboardData?: ClipboardData | null
  clipboard?: boolean
  history?: boolean
  historyIndex?: number
  historyLength?: number
  onUndo?: () => void
  onRedo?: () => void
}
```

**Render:**
- Card dengan badges untuk selection, clipboard, dan history
- Buttons untuk Undo/Redo

### 4. **DragSelectionIndicator** (Optional UI Component)
File: `ExcelTable/DragSelectionIndicator.tsx`

Komponen untuk menampilkan indikator ketika sedang drag fill.

**Props:**
```typescript
{
  dragSelection: DragSelection
}
```

**Render:**
- Card dengan animasi pulse
- Menampilkan From dan To koordinat
- Pesan instruksi release mouse

## Usage Examples

### Simple Usage (Table Only)
```tsx
import { ExcelTable } from '@/components/ExcelTable'

export default function MyTable() {
  return (
    <ExcelTable
      data={data}
      columns={columns}
      features={{
        clipboard: true,
        history: true,
        dragFill: true,
      }}
    />
  )
}
```

### With Instructions
```tsx
import { ExcelTable, TableInstructions } from '@/components/ExcelTable'

export default function MyTable() {
  return (
    <div className="p-8">
      <TableInstructions
        title="My Custom Table"
        description="Interactive spreadsheet"
      />
      <ExcelTable data={data} columns={columns} />
    </div>
  )
}
```

### Full Featured (with all components)
```tsx
import {
  ExcelTable,
  TableInstructions,
  TableStatusBar,
  DragSelectionIndicator
} from '@/components/ExcelTable'

export default function MyTable() {
  const [selectedCell, setSelectedCell] = useState(null)
  const [dragSelection, setDragSelection] = useState(null)
  // ... other states

  return (
    <div className="p-8">
      <TableInstructions
        title="Full Featured Table"
        description="Complete example"
      />
      
      <ExcelTable
        data={data}
        columns={columns}
        onSelectionChange={(sel) => setSelectedCell(sel)}
      />
      
      <TableStatusBar
        selectedCell={selectedCell}
        historyIndex={historyIndex}
        historyLength={historyLength}
      />
      
      {dragSelection && (
        <DragSelectionIndicator dragSelection={dragSelection} />
      )}
    </div>
  )
}
```

## Benefits

✅ **Modular**: Setiap komponen bisa digunakan secara terpisah
✅ **Flexible**: Bisa custom layout sesuai kebutuhan
✅ **Reusable**: ExcelTable fokus pada table logic saja
✅ **Optional UI**: Bisa pilih UI components yang dibutuhkan
✅ **Clean**: Separation of concerns yang jelas

## Migration Notes

Jika sebelumnya menggunakan props `title`, `description`, `showInstructions`, `showStatusBar`:
- Gunakan komponen `TableInstructions` secara terpisah
- Hapus props tersebut dari `ExcelTable`
- Wrap dengan layout div jika perlu styling container
