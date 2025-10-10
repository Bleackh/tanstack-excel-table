# Panduan Perlindungan Branch dan Izin Merge

Panduan ini menjelaskan cara mengatur repository GitHub Anda agar semua orang dapat membuat pull request, tetapi hanya Anda (pemilik repository) yang dapat melakukan merge.

## 🔒 Langkah-Langkah Konfigurasi

### 1. Buka Pengaturan Branch Protection

1. Buka repository Anda di GitHub: `https://github.com/Bleackh/tanstack-excel-table`
2. Klik **Settings** (tab di bagian atas)
3. Di sidebar kiri, klik **Branches** (di bawah "Code and automation")
4. Klik **Add branch protection rule**

### 2. Konfigurasi Aturan untuk Branch `main`

Isi form dengan pengaturan berikut:

#### Branch name pattern:
```
main
```

#### Pengaturan yang Harus Diaktifkan:

✅ **1. Require a pull request before merging**
- Aktifkan checkbox ini
- Set "Required number of approvals": **1**
- Ini memastikan tidak ada yang bisa push langsung ke main

✅ **2. Require review from Code Owners**
- Aktifkan checkbox ini
- Bekerja dengan file CODEOWNERS yang sudah dibuat
- Hanya code owner (Anda) yang bisa approve PR

✅ **3. Restrict who can push to matching branches**
- **INI PENGATURAN PALING PENTING**
- Aktifkan checkbox ini
- Tambahkan username Anda: `Bleackh`
- Hanya nama yang ada di daftar ini yang bisa merge
- Jika hanya Anda di daftar, maka hanya Anda yang bisa merge

✅ **4. Require conversation resolution before merging**
- Aktifkan untuk memastikan semua komentar review sudah diselesaikan

✅ **5. Do not allow bypassing the above settings**
- Aktifkan untuk memastikan aturan berlaku untuk semua orang

#### Klik "Create" atau "Save changes"

---

## 👥 File CODEOWNERS

File `.github/CODEOWNERS` sudah dibuat secara otomatis. File ini:
- Menandai Anda sebagai pemilik semua kode
- Secara otomatis menambahkan Anda sebagai reviewer di setiap PR
- Membuat PR tidak bisa di-merge tanpa approval Anda

---

## ✅ Hasil Setelah Konfigurasi

Setelah mengikuti langkah-langkah di atas:

**✅ Siapa saja BISA:**
- Fork repository
- Membuat branch
- Membuat pull request
- Memberikan komentar
- Melihat semua kode

**❌ HANYA Anda yang BISA:**
- Approve pull request
- Merge pull request
- Push langsung ke branch main

---

## 🧪 Cara Menguji

Untuk memastikan konfigurasi bekerja:

1. Minta kontributor membuat test PR
2. Coba merge tanpa approval → Harus diblokir
3. Verifikasi bahwa kontributor tidak bisa merge PR mereka sendiri
4. Verifikasi hanya Anda yang bisa melihat tombol merge setelah approval

---

## ⚠️ Catatan Penting

1. **Paket GitHub:**
   - Beberapa fitur memerlukan GitHub Pro atau Team
   - Untuk repository publik, fitur dasar tersedia gratis
   - Untuk repository private, mungkin perlu paket berbayar

2. **Sebagai Pemilik Repository:**
   - Anda selalu bisa mengubah pengaturan ini
   - Anda bisa menonaktifkan sementara jika diperlukan

---

## 📚 File yang Dibuat

File-file berikut telah dibuat untuk membantu:

1. `.github/CODEOWNERS` - Menandai Anda sebagai code owner
2. `.github/BRANCH_PROTECTION_GUIDE.md` - Panduan lengkap (Bahasa Inggris)
3. `.github/BRANCH_PROTECTION_GUIDE_ID.md` - Panduan ini (Bahasa Indonesia)
4. `.github/PULL_REQUEST_TEMPLATE.md` - Template untuk PR

---

## 🆘 Butuh Bantuan?

Jika ada pertanyaan:
1. Lihat dokumentasi GitHub (link di panduan Bahasa Inggris)
2. Buka issue di repository
3. Hubungi GitHub Support

---

**Terakhir Diperbarui**: 2025
**Repository**: Bleackh/tanstack-excel-table
