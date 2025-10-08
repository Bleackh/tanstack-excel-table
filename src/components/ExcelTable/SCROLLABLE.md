# Scrollable Table Feature

## Fitur yang Ditambahkan

### ✅ Vertical Scroll (Atas-Bawah)
- Table sekarang memiliki max-height dengan `max-h-[calc(100vh-200px)]`
- Ketika data melebihi tinggi yang tersedia, scroll bar vertikal akan muncul
- Header tetap terlihat saat scroll dengan `sticky top-0`

### ✅ Horizontal Scroll (Kiri-Kanan)  
- Table menggunakan `overflow-auto` untuk scroll otomatis
- Table memiliki `min-w-max` agar lebar mengikuti konten
- Ketika kolom terlalu banyak, scroll bar horizontal akan muncul

### ✅ Sticky Header
- Header row tetap terlihat di atas saat scroll vertikal
- Filter row juga sticky di bawah header (`sticky top-[57px]`)
- Menggunakan `z-10` untuk memastikan header di atas konten

## Implementasi Teknis

### Container Div
```tsx
<div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-auto max-h-[calc(100vh-200px)]">
```

**Properties:**
- `overflow-auto`: Enable scroll otomatis (horizontal dan vertikal)
- `max-h-[calc(100vh-200px)]`: Maksimal tinggi = viewport height - 200px
- Scroll vertikal muncul jika konten > max-height
- Scroll horizontal muncul jika konten > container width

### Table Element
```tsx
<table className="w-full text-sm select-none min-w-max">
```

**Properties:**
- `w-full`: Lebar 100% dari container
- `min-w-max`: Lebar minimum mengikuti konten (penting untuk horizontal scroll)
- Memastikan table tidak shrink ke ukuran container

### Sticky Header
```tsx
<thead className="... sticky top-0 z-10">
```

**Properties:**
- `sticky`: Position sticky
- `top-0`: Stick di posisi atas
- `z-10`: Z-index tinggi agar di atas row lain
- `bg-gray-50`: Background solid agar tidak transparan

### Sticky Filter Row
```tsx
<tr className="bg-white sticky top-[57px] z-10">
```

**Properties:**
- `sticky`: Position sticky
- `top-[57px]`: Stick 57px dari atas (tinggi header row)
- `z-10`: Z-index tinggi
- `bg-white`: Background solid

## Penggunaan

Table sekarang otomatis scrollable:

```tsx
<ExcelTable
  data={largeDataSet}  // Banyak rows
  columns={manyColumns}  // Banyak kolom
  features={{
    filtering: true,  // Filter row juga sticky
    sorting: true,
    // ... features lainnya
  }}
/>
```

## Catatan

- **Vertical scroll**: Muncul otomatis jika data > max-height
- **Horizontal scroll**: Muncul otomatis jika total lebar kolom > container width
- **Sticky header**: Selalu terlihat saat scroll
- **Responsive**: Height disesuaikan dengan viewport (calc(100vh-200px))

## Contoh Data

File `Table.tsx` sekarang memiliki:
- 55 rows data (untuk mendemonstrasikan vertical scroll)
- 8 kolom (select, id, name, age, city, email, phone, status) untuk horizontal scroll

## Customization

Untuk mengubah tinggi maksimal table:

```tsx
// Ubah di ExcelTable.tsx line ~541
<div className="... max-h-[calc(100vh-200px)]">
  
// Contoh custom heights:
max-h-[500px]           // Fixed 500px
max-h-[calc(100vh-300px)]  // Viewport - 300px
max-h-screen            // Full viewport height
```
