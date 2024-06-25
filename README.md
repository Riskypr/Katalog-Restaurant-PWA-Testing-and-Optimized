# Katalog-Restaurant-PWA-Testing-and-Optimized

web app Katalog Restoran dengan menerapkan automation test

## Persyaratan

Pastikan Anda telah menginstal software berikut sebelum menjalankan proyek ini:

- [Node.js](https://nodejs.org/) (versi 12 atau lebih baru)
- [npm](https://www.npmjs.com/) (biasanya terinstal dengan Node.js)

## Instalasi

1. Clone repositori ini:

   ```sh
   git clone [https://github.com/username/nama-proyek.git](https://github.com/Riskypr/Katalog-Restaurant-PWA-Testing-and-Optimized.git)
   ```

2. Instal dependensi:

   ```sh
   npm install
   ```

## cara menjalankan proyek

Menjalankan aplikasi dalam mode pengembangan. Nanti akan otomatis kebuka url [http://localhost:8080](http://localhost:9000) di browser Anda.

 ```sh
 npm run start-dev
```

Membangun aplikasi untuk produksi ke folder `dist`. Ini mengoptimalkan build untuk performa terbaik.

```sh
npm run build
```

Menjalankan ESLint untuk memeriksa kode dan memastikan bahwa itu memenuhi standar kualitas kode yang ditentukan.

```sh
npm run lint
```

Menjalankan Integration Test menggunakan Jest.

```sh
npm run test
```

Membuka Cypress Test Runner untuk menjalankan tes end-to-end.

```sh
npm run cypress:open
```

Menjalankan skrip `sharp.js` untuk memproses kompres gambar. Pastikan dijalankan terlebih dahulu

```sh
npm run build-image
```
