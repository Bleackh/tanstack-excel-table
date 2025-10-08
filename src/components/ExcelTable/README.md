# ExcelTable Component

Komponen table reusable dengan fitur seperti Microsoft Excel, dibangun dengan TanStack Table dan Shadcn UI.

## ✨ Features
### Disable Specific Features

```tsx
<ExcelTable
    data={data}
    columns={columns}
    features={{
        clipboard: false,      // Disable copy/paste
        history: false,        // Disable undo/redo
        dragFill: false,       // Disable drag fill
        sorting: true,         // Keep sorting enabled
        filtering: true,       // Keep filtering enabled
        rowSelection: false,   // Disable row selection
        selectColumn: false,   // Hide select column with checkboxes
        keyboardShortcuts: false // Disable keyboard shortcuts
    }}
/>
```

### Hide Select Column

If you want to hide the checkbox select column completely:

```tsx
<ExcelTable
    data={data}
    columns={columns}
    features={{
        selectColumn: false,   // ❌ Hide entire select column
        rowSelection: false,   // ❌ Also disable row selection functionality
    }}
/>
```e/Cut** - Ctrl+C/V/X untuk copy, paste, dan cut cells
- ✅ **Undo/Redo** - Ctrl+Z/Y untuk undo dan redo perubahan
- ✅ **Drag Fill Handle** - Seperti di Excel, drag pojok kanan bawah cell untuk auto-fill
- ✅ **Keyboard Navigation** - Arrow keys untuk navigasi antar cells
- ✅ **Direct Typing** - Pilih cell dan langsung ketik untuk edit
- ✅ **Sorting** - Klik header column untuk sort data
- ✅ **Filtering** - Filter input di setiap column header
- ✅ **Row Selection** - Checkbox untuk select multiple rows
- ✅ **Pattern Detection** - Auto-increment untuk numeric sequences saat drag fill
- ✅ **Shadcn UI** - Menggunakan komponen Shadcn UI yang modern dan accessible

## 📦 Installation

Pastikan dependencies sudah terinstall:

\`\`\`bash
# Install shadcn components
pnpm dlx shadcn@latest add button input checkbox badge card

# TanStack Table sudah terinstall
\`\`\`

## 🚀 Usage

### Basic Usage

\`\`\`tsx
import { ExcelTable } from '@/components/ExcelTable'
import { createColumnHelper } from '@tanstack/react-table'

type MyData = {
    id: number
    name: string
    value: number
}

const columnHelper = createColumnHelper<MyData>()

const columns = [
    columnHelper.accessor('id', { header: 'ID' }),
    columnHelper.accessor('name', { header: 'Name' }),
    columnHelper.accessor('value', { header: 'Value' }),
]

const data = [
    { id: 1, name: 'Item 1', value: 100 },
    { id: 2, name: 'Item 2', value: 200 },
]

function MyTable() {
    return (
        <ExcelTable
            data={data}
            columns={columns}
        />
    )
}
\`\`\`

### With All Props

\`\`\`tsx
function MyTable() {
    const handleDataChange = (newData: MyData[]) => {
        console.log('Data changed:', newData)
        // Save to database, etc.
    }

    const handleCellEdit = ({ rowIndex, columnId, oldValue, newValue }) => {
        console.log('Cell edited:', { rowIndex, columnId, oldValue, newValue })
        // Validation, API call, etc.
    }

    return (
        <ExcelTable<MyData>
            data={data}
            columns={columns}
            
            // Callbacks
            onDataChange={handleDataChange}
            onCellEdit={handleCellEdit}
            onSelectionChange={(selection) => console.log(selection)}
            
            // UI Customization
            title="My Custom Table"
            description="This is my custom table description"
            className="my-custom-class"
            
            // Features Control
            features={{
                clipboard: true,        // Enable copy/paste/cut
                history: true,          // Enable undo/redo
                dragFill: true,         // Enable drag fill handle
                sorting: true,          // Enable column sorting
                filtering: true,        // Enable column filters
                rowSelection: true,     // Enable row selection functionality
                selectColumn: true,     // Show/hide select column with checkboxes
                keyboardShortcuts: true // Enable keyboard shortcuts
            }}
            
            // Display Options
            showStatusBar={true}
            showInstructions={true}
            maxHistoryStates={50}
            
            // Custom Cell Renderer
            renderCell={({ value, rowIndex, columnId, isEditing }) => {
                if (isEditing) {
                    return <input defaultValue={value} />
                }
                return <span>{value}</span>
            }}
        />
    )
}
\`\`\`

### With Row Selection Checkbox

\`\`\`tsx
import { Checkbox } from '@/components/ui/checkbox'

const columns = [
    // Add checkbox column
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
        enableColumnFilter: false,
    }),
    columnHelper.accessor('id', { header: 'ID' }),
    columnHelper.accessor('name', { header: 'Name' }),
]
\`\`\`

### Control Column Editability

You can control which columns are editable using the `meta.editable` property:

\`\`\`tsx
const columns: ColumnDef<MyData>[] = [
    {
        accessorKey: 'id',
        header: () => <div>ID</div>,
        cell: ({ row }) => <div>{row.getValue('id')}</div>,
        meta: {
            editable: false,  // ❌ ID column is read-only (cannot be edited)
        },
    },
    {
        accessorKey: 'name',
        header: () => <div>Name</div>,
        cell: ({ row }) => <div>{row.getValue('name')}</div>,
        meta: {
            editable: true,   // ✅ Name column can be edited (default)
        },
    },
    {
        accessorKey: 'email',
        header: () => <div>Email</div>,
        cell: ({ row }) => <div>{row.getValue('email')}</div>,
        // No meta.editable specified = editable by default
    },
    {
        accessorKey: 'createdAt',
        header: () => <div>Created Date</div>,
        cell: ({ row }) => <div>{row.getValue('createdAt')}</div>,
        meta: {
            editable: false,  // ❌ Date column is read-only
        },
    },
]
\`\`\`

**Note:** 
- Default behavior: If `meta.editable` is not specified, the column is **editable by default**
- Set `meta.editable: false` to make a column **read-only**
- Read-only columns cannot be edited via double-click, Enter key, or direct typing

### Disable Specific Features

\`\`\`tsx
<ExcelTable
    data={data}
    columns={columns}
    features={{
        clipboard: false,      // Disable copy/paste
        history: false,        // Disable undo/redo
        dragFill: false,       // Disable drag fill
        sorting: true,         // Keep sorting enabled
        filtering: true,       // Keep filtering enabled
        rowSelection: false,   // Disable row selection
        keyboardShortcuts: false // Disable keyboard shortcuts
    }}
/>
\`\`\`

## 📖 Props API

### ExcelTableProps<TData>

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `TData[]` | **Required** | Array of data to display |
| `columns` | `ColumnDef[]` | **Required** | TanStack Table column definitions |
| `onDataChange` | `(data: TData[]) => void` | - | Callback when data changes |
| `onCellEdit` | `(params) => void` | - | Callback when cell is edited |
| `onSelectionChange` | `(selection) => void` | - | Callback when selection changes |
| `features` | `FeaturesConfig` | All `true` | Enable/disable features |
| `className` | `string` | `''` | Custom CSS class |
| `title` | `string` | `'Excel-Like Table'` | Table title |
| `description` | `string` | - | Table description |
| `showStatusBar` | `boolean` | `true` | Show/hide status bar |
| `showInstructions` | `boolean` | `true` | Show/hide instruction card |
| `maxHistoryStates` | `number` | `50` | Maximum undo/redo history |
| `renderCell` | `(params) => ReactNode` | - | Custom cell renderer |

### FeaturesConfig

\`\`\`ts
{
    clipboard?: boolean          // Copy/paste/cut (default: true)
    history?: boolean            // Undo/redo (default: true)
    dragFill?: boolean          // Drag fill handle (default: true)
    sorting?: boolean           // Column sorting (default: true)
    filtering?: boolean         // Column filters (default: true)
    rowSelection?: boolean      // Row selection functionality (default: true)
    selectColumn?: boolean      // Show/hide select column (default: true)
    keyboardShortcuts?: boolean // Keyboard shortcuts (default: true)
}
\`\`\`

### ColumnMeta

Each column can have additional metadata to control behavior:

\`\`\`ts
interface ColumnMeta {
    headerLabel?: string  // Label for filter placeholder (default: column id)
    editable?: boolean    // Allow column to be edited (default: true)
}
\`\`\`

**Example:**
\`\`\`tsx
{
    accessorKey: 'id',
    header: () => <div>ID</div>,
    meta: {
        headerLabel: 'ID',
        editable: false,    // Make this column read-only
    },
}
\`\`\`

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+C` | Copy selected cells |
| `Ctrl+V` | Paste clipboard content |
| `Ctrl+X` | Cut selected cells |
| `Ctrl+Z` | Undo last change |
| `Ctrl+Y` | Redo last undone change |
| `Delete` / `Backspace` | Delete selected cells |
| `Enter` | Edit selected cell |
| `Escape` | Cancel editing / Clear selection |
| `Arrow Keys` | Navigate between cells |
| `Shift+Click` | Select range of cells |
| Type any character | Start editing selected cell |

## 🎨 Customization

### Custom Cell Renderer

\`\`\`tsx
<ExcelTable
    data={data}
    columns={columns}
    renderCell={({ value, rowIndex, columnId, isEditing }) => {
        if (isEditing) {
            return (
                <input 
                    type="number"
                    defaultValue={value}
                    className="custom-input"
                />
            )
        }
        
        // Custom display formatting
        if (columnId === 'price') {
            return <span>${value}</span>
        }
        
        return <span>{value}</span>
    }}
/>
\`\`\`

### Custom Styling

\`\`\`tsx
<ExcelTable
    data={data}
    columns={columns}
    className="my-custom-table"
/>
\`\`\`

## 📝 Examples

Lihat file `src/components/TableExample.tsx` untuk contoh lengkap penggunaan komponen.

## 🔧 Troubleshooting

### Error: Module not found

Pastikan semua dependencies sudah terinstall:
- `@tanstack/react-table`
- Komponen shadcn UI (button, input, checkbox, badge, card)

### Undo/Redo tidak bekerja setelah drag

Pastikan Anda menggunakan versi terbaru dari komponen ini. Bug ini sudah diperbaiki dengan memindahkan penyimpanan history sebelum perubahan data.

### Filter input tidak bisa dihapus

Bug ini sudah diperbaiki. Pastikan menggunakan versi terbaru yang mengecek `INPUT` dan `TEXTAREA` elements.

## 📄 License

MIT
