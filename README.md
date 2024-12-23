# AKA
Tubes AKA "Analisis Kompleksitas Algoritma Greedy pada Permasalahan Penjadwalan Aktivitas KelasAnalisis Kompleksitas Algoritma Greedy pada Permasalahan Penjadwalan Aktivitas untuk Optimasi Penggunaan Ruang Kelas"

Anggota :

Dennis Havinanda - 103012480022
Muhammad Syfiq Syauqi Ramadhan - 103012480030

Penjelasan Singkat Program :

Greedy Iteratif

Algoritma ini bekerja dengan mengurutkan aktivitas berdasarkan waktu selesai secara menaik. Setelah itu, algoritma memproses aktivitas satu per satu menggunakan perulangan. Aktivitas yang memenuhi kriteria, yaitu tidak konflik dengan aktivitas yang sudah dipilih sebelumnya, akan dimasukkan ke dalam jadwal. Pendekatan iteratif ini cepat dan hemat memori, menjadikannya lebih efisien untuk dataset berukuran besar.

Greedy Rekursif

Algoritma ini menggunakan pendekatan rekursi untuk menyelesaikan masalah. Aktivitas diurutkan berdasarkan waktu selesai, kemudian algoritma secara bertahap memilih aktivitas yang valid dan memanggil dirinya sendiri untuk memproses aktivitas yang tersisa. Pendekatan ini lebih elegan dan cocok untuk dataset kecil hingga sedang, tetapi memiliki overhead memori karena menggunakan call stack untuk setiap pemanggilan fungsi.
