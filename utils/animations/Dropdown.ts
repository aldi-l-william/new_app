// Function for entering animation
export const handleEnter = (el: any) => {
    // Mengatur posisi awal dan skala elemen
    el.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    el.style.transform = 'scale(0)';
    el.style.opacity = '0';

    // Setelah transisi dimulai, animasi skala dan opacity
    requestAnimationFrame(() => {
        el.style.transform = 'scale(1)';
        el.style.opacity = '1';
    });
};

// Function for leaving animation
export const handleBeforeLeave = (el:any) => {
    // Mengatur transisi dan memulai efek keluar
    el.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    el.style.transform = 'scale(1)';
    el.style.opacity = '1';
    
    // Setelah animasi selesai, elemen mengecil
    requestAnimationFrame(() => {
        el.style.transform = 'scale(0)';
        el.style.opacity = '0';
    });
};

// Fungsi untuk memperbarui titik-titik dalam "Loading..."
export let interval: ReturnType<typeof setInterval> | null  = null;
export const loadingText = ref("Loading");
export const updateLoadingText = () => {
  let dotsCount = 0;
  interval = setInterval(() => {
    dotsCount = (dotsCount + 1) % 4; // 0, 1, 2, 3 (mod 4, karena 3 titik)
    loadingText.value = "Loading" + ".".repeat(dotsCount);
  }, 500); // Update setiap 500ms
};

export const handleEnterHeader = (el:any) => {
  // Mulai dengan mengatur elemen menjadi transparan dan sedikit terangkat (untuk efek geser)
  el.style.opacity = "0"; // Mulai dengan elemen yang transparan
  el.style.transform = "translateY(-20px)"; // Posisikan elemen sedikit ke bawah

  // Berikan transisi untuk opacity dan transform
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease"; // Transisi untuk opacity dan pergeseran

  // Setelah elemen di-render, animasi akan berjalan
  requestAnimationFrame(() => {
    el.style.opacity = "1"; // Setelah transisi dimulai, ubah opacity menjadi 1
    el.style.transform = "translateY(0)"; // Kembalikan elemen ke posisi semula
  });
};

export const handleBeforeLeaveHeader = (el: any):void => {
  // Mulai dengan mengatur elemen menjadi transparan dan sedikit terangkat (untuk efek geser)
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease"; // Transisi untuk opacity dan pergeseran

  // Untuk membuat animasi lebih halus, kita turunkan opacity ke 0 dan geser elemen ke bawah
  el.style.opacity = "0"; // Set opacity menjadi 0 untuk efek fade out
  el.style.transform = "translateY(-20px)"; // Geser elemen ke bawah saat hilang
};