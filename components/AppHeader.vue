<script setup lang="ts">
import { ref } from 'vue';
import { AppSearchDetail } from '#components';
useSeoMeta({
  ogImage: '/icons/search.svg'
})

const isShowedSearchDetail = ref(false);
const isScrolled = ref(false);

const handleOutsideSearchDetailClick = () => {
    isShowedSearchDetail.value = false;
}

const handleShowedSearchDetailClick = () => {
    isShowedSearchDetail.value = !isShowedSearchDetail.value;
}

// Fungsi untuk menangani event scroll
const handleScroll = () => {
  if (window.scrollY > 10) { // Gantilah angka 10 dengan jumlah scroll yang Anda inginkan
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }
};

// Daftarkan event listener scroll saat komponen di-mount
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

// Hapus event listener saat komponen di-unmount
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleEnter = (el:any) => {
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

const handleBeforeLeave = (el: any):void => {
  // Mulai dengan mengatur elemen menjadi transparan dan sedikit terangkat (untuk efek geser)
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease"; // Transisi untuk opacity dan pergeseran

  // Untuk membuat animasi lebih halus, kita turunkan opacity ke 0 dan geser elemen ke bawah
  el.style.opacity = "0"; // Set opacity menjadi 0 untuk efek fade out
  el.style.transform = "translateY(-20px)"; // Geser elemen ke bawah saat hilang
};


</script>
<template>
            <div class="sticky top-0 bg-white z-20" :class="isScrolled ? 'shadow':''" @click="handleOutsideSearchDetailClick">
                <div class="max-1032-container flex justify-between my-2 z-20  bg-white">
                    <div class="py-2">
                        <img src="https://project-exterior-technical-test-app.up.railway.app/img/logo.png" alt="Wisata App" class="w-[180px]"/>
                    </div>
                    <div class="py-2" >
                        <button @click.stop="handleShowedSearchDetailClick" class="px-4 py-2 flex justify-center items-center bg-gray-100 hover:bg-gray-200 rounded w-[590px] max-w-screen-lg">
                        <img src="/icons/search.svg" alt="icon" class="w-[15px] mx-2"/>
                        <span class="mx-1">G7 Hotel </span> <span class="mx-1">-</span> <span class="mx-2">4 - 8 Mar 2025</span>
                        </button>
                    </div>
                    <div class="py-2">
                        <button class="bg-blue-600 text-white px-3 py-2 rounded">
                            Sign in
                        </button>
                    </div>
                </div>
                <!-- <div class="z-20 sticky top-0" :class="isShowedSearchDetail ? 'visible':'collapse'">
                   <AppSearchDetail :class="isShowedSearchDetail ? 'visible':'collapse'"/>
                </div> -->
                <transition name="fade" @before-enter="handleEnter" @before-leave="handleBeforeLeave">
                  <div v-if="isShowedSearchDetail" class="z-20 sticky top-0">
                    <AppSearchDetail />
                  </div>
                </transition>
            </div>
            
            <div class="w-screen h-screen absolute z-10 " :class="isShowedSearchDetail ? 'bg-opacity-40 bg-black visible':'invisible'" @click="handleOutsideSearchDetailClick">

            </div>

</template>
