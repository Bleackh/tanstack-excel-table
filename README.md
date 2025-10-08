# TanStack Excel Table

A powerful, Excel-like table component built with [TanStack Table](https://tanstack.com/table), [Next.js](https://nextjs.org), and [Shadcn UI](https://ui.shadcn.com). Create interactive data tables with Excel-like features including copy/paste, drag-fill, undo/redo, and more.

## ✨ Features

- ✅ **Copy/Paste/Cut** - Ctrl+C/V/X for clipboard operations
- ✅ **Undo/Redo** - Ctrl+Z/Y for history management
- ✅ **Drag Fill Handle** - Excel-like drag-to-fill functionality
- ✅ **Keyboard Navigation** - Arrow keys for seamless cell navigation
- ✅ **Direct Typing** - Click and type to edit cells instantly
- ✅ **Sorting & Filtering** - Built-in column sorting and filtering
- ✅ **Row Selection** - Checkbox selection for multiple rows
- ✅ **Pattern Detection** - Smart auto-increment for numeric sequences
- ✅ **Modern UI** - Beautiful components powered by Shadcn UI

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js 20+ 
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Bleackh/tanstack-excel-table.git
cd tanstack-excel-table
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📖 Usage

Check out the [ExcelTable Component Documentation](./src/components/ExcelTable/README.md) for detailed usage instructions, API reference, and examples.

### Quick Example

```tsx
import { ExcelTable } from '@/components/ExcelTable'
import { ColumnDef } from '@tanstack/react-table'

type Person = {
  id: number
  name: string
  age: number
  email: string
}

// Define columns using ColumnDef format for full control
const columns: ColumnDef<Person>[] = [
  {
    accessorKey: 'id',
    header: () => <div className="text-sm font-semibold">ID</div>,
    cell: ({ row }) => <div className="text-sm">{row.getValue('id')}</div>,
    enableColumnFilter: false,
  },
  {
    accessorKey: 'name',
    header: () => <div className="text-sm font-semibold">Name</div>,
    cell: ({ row }) => <div className="text-sm font-medium">{row.getValue('name')}</div>,
    meta: { headerLabel: 'Name' },
    filterFn: 'includesString',
    enableColumnFilter: true,
  },
  {
    accessorKey: 'age',
    header: () => <div className="text-sm font-semibold">Age</div>,
    cell: ({ row }) => <div className="text-sm text-center">{row.getValue('age')}</div>,
    meta: { headerLabel: 'Age' },
    filterFn: 'equalsString',
    enableColumnFilter: true,
  },
  {
    accessorKey: 'email',
    header: () => <div className="text-sm font-semibold">Email</div>,
    cell: ({ row }) => <div className="text-sm text-blue-600">{row.getValue('email')}</div>,
    meta: { headerLabel: 'Email' },
    filterFn: 'includesString',
    enableColumnFilter: true,
  },
]

const data: Person[] = [
  { id: 1, name: 'John Doe', age: 28, email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', age: 32, email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', age: 25, email: 'bob@example.com' },
]

export default function MyTable() {
  return <ExcelTable data={data} columns={columns} />
}
```

## 📚 Documentation

- [ExcelTable Component](./src/components/ExcelTable/README.md) - Main component documentation
- [Architecture](./src/components/ExcelTable/ARCHITECTURE.md) - Technical architecture details
- [Column Filtering](./src/components/ExcelTable/COLUMN_FILTER.md) - Filtering implementation
- [Scrollable Table](./src/components/ExcelTable/SCROLLABLE.md) - Scrolling behavior

## 🛠️ Built With

- [Next.js 15](https://nextjs.org/) - React framework
- [TanStack Table v8](https://tanstack.com/table) - Headless table library
- [Shadcn UI](https://ui.shadcn.com/) - UI component library
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## 📦 Scripts

```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 

**Note**: All pull requests must be reviewed and approved by the repository maintainer before merging to ensure code quality and consistency.

For detailed contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- [TanStack Table Documentation](https://tanstack.com/table/latest)
- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn UI Components](https://ui.shadcn.com/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
