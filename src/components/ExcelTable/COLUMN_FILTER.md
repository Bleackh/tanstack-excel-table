# Column Filter Configuration

## Cara Mengatur Filter Per Kolom

Setiap kolom bisa diatur apakah filter-nya aktif atau tidak menggunakan property `enableColumnFilter`.

## Contoh Penggunaan

### ✅ Mengaktifkan Filter (Default)

```tsx
columnHelper.accessor('name', { 
    header: 'Name',
    enableColumnFilter: true, // Filter aktif
})

// Atau tanpa property (default adalah true)
columnHelper.accessor('name', { 
    header: 'Name',
    // Filter otomatis aktif
})
```

### ❌ Menonaktifkan Filter

```tsx
columnHelper.accessor('id', {
    header: 'ID',
    enableColumnFilter: false, // Filter tidak aktif
})
```

## Contoh Lengkap

```tsx
const columns: ColumnDef<Person, any>[] = [
    // Checkbox - TIDAK ada filter
    columnHelper.display({
        id: 'select',
        header: ({ table }) => <Checkbox ... />,
        enableSorting: false,
        enableColumnFilter: false, // ❌ Tidak bisa difilter
    }),
    
    // ID - TIDAK ada filter (karena biasanya tidak perlu)
    columnHelper.accessor('id', {
        header: 'ID',
        enableColumnFilter: false, // ❌ Tidak bisa difilter
    }),
    
    // Name - ADA filter
    columnHelper.accessor('name', { 
        header: 'Name',
        enableColumnFilter: true, // ✅ Bisa difilter
    }),
    
    // Age - ADA filter dengan custom filterFn
    columnHelper.accessor('age', {
        header: 'Age',
        filterFn: 'equalsString', // Custom filter function
        enableColumnFilter: true, // ✅ Bisa difilter
    }),
    
    // City - ADA filter (default)
    columnHelper.accessor('city', { 
        header: 'City',
        // enableColumnFilter: true (default, tidak perlu ditulis)
    }),
    
    // Status - TIDAK ada filter
    columnHelper.accessor('status', {
        header: 'Status',
        enableColumnFilter: false, // ❌ Tidak bisa difilter
    }),
]
```

## Properties Terkait Filter

### 1. `enableColumnFilter`
- **Type**: `boolean`
- **Default**: `true`
- **Deskripsi**: Mengaktifkan/menonaktifkan filter untuk kolom tersebut

### 2. `filterFn`
- **Type**: `string | FilterFn`
- **Default**: `'auto'`
- **Deskripsi**: Fungsi untuk memfilter data
- **Built-in Options**:
  - `'includesString'`: Pencarian substring (default)
  - `'equalsString'`: Pencarian exact match
  - `'arrIncludes'`: Array includes
  - `'arrIncludesAll'`: Array includes all
  - `'arrIncludesSome'`: Array includes some
  - `'equals'`: Strict equality
  - `'weakEquals'`: Loose equality
  - `'inNumberRange'`: Number range

### 3. `enableSorting`
- **Type**: `boolean`
- **Default**: `true`
- **Deskripsi**: Mengaktifkan/menonaktifkan sorting untuk kolom tersebut

## Kapan Menonaktifkan Filter?

### ❌ Nonaktifkan filter untuk:
1. **ID Column**: Biasanya tidak perlu difilter karena unique
2. **Checkbox Column**: Display column yang tidak ada data
3. **Action Column**: Column dengan button/action
4. **Auto-generated Column**: Seperti row number
5. **Image Column**: Column yang menampilkan gambar
6. **Status Icon**: Jika hanya menampilkan icon tanpa text

### ✅ Aktifkan filter untuk:
1. **Name/Title Column**: User sering search by name
2. **Category/Type Column**: Filtering by category
3. **City/Location Column**: Filtering by location
4. **Date Column**: Filtering by date range
5. **Text Content**: Any searchable text field
6. **Numeric Values**: Age, price, quantity, etc.

## Custom Filter Function

Untuk kolom dengan tipe data khusus:

```tsx
// Number - exact match
columnHelper.accessor('age', {
    header: 'Age',
    filterFn: 'equalsString', // Exact match untuk angka
    enableColumnFilter: true,
})

// String - partial match (default)
columnHelper.accessor('name', {
    header: 'Name',
    filterFn: 'includesString', // Partial match (default)
    enableColumnFilter: true,
})

// Boolean
columnHelper.accessor('isActive', {
    header: 'Active',
    filterFn: 'equals', // Exact boolean match
    enableColumnFilter: true,
})

// Custom filter function
columnHelper.accessor('price', {
    header: 'Price',
    filterFn: (row, columnId, filterValue) => {
        const value = row.getValue(columnId) as number
        const [min, max] = filterValue.split('-').map(Number)
        return value >= min && value <= max
    },
    enableColumnFilter: true,
})
```

## Global vs Column Filter

### Global Filtering (Feature Level)
```tsx
<ExcelTable
  features={{
    filtering: true, // Enable/disable ALL filters
  }}
/>
```

### Column Filtering (Column Level)
```tsx
const columns = [
  columnHelper.accessor('name', {
    enableColumnFilter: true, // Enable untuk kolom ini
  }),
  columnHelper.accessor('id', {
    enableColumnFilter: false, // Disable untuk kolom ini
  }),
]
```

## Visual Behavior

Ketika `enableColumnFilter: false`:
- ❌ Input filter tidak muncul di header row kedua
- ❌ Kolom tidak bisa difilter oleh user
- ✅ Data tetap bisa di-sort (jika enableSorting: true)
- ✅ Cell tetap bisa di-edit, copy, paste, dll

Ketika `enableColumnFilter: true`:
- ✅ Input filter muncul di header row kedua
- ✅ User bisa mengetik untuk filter data
- ✅ Filter otomatis apply saat user mengetik
- ✅ Clear filter dengan menghapus text di input

## Tips

1. **Performance**: Nonaktifkan filter untuk kolom yang jarang digunakan
2. **UX**: Aktifkan filter untuk kolom yang sering dicari user
3. **Consistency**: Gunakan filterFn yang sesuai dengan tipe data
4. **Mobile**: Pertimbangkan menonaktifkan filter di mobile untuk space

## Contoh Real-World

```tsx
// Employee Table
const employeeColumns = [
    columnHelper.display({ id: 'select', enableColumnFilter: false }), // Checkbox
    columnHelper.accessor('id', { enableColumnFilter: false }), // No filter - ID jarang dicari
    columnHelper.accessor('name', { enableColumnFilter: true }), // Filter - sering dicari
    columnHelper.accessor('email', { enableColumnFilter: true }), // Filter - sering dicari
    columnHelper.accessor('department', { enableColumnFilter: true }), // Filter - untuk group
    columnHelper.accessor('salary', { enableColumnFilter: false }), // No filter - sensitive data
    columnHelper.accessor('avatar', { enableColumnFilter: false }), // No filter - image
]
```
