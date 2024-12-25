<script setup lang="ts">
import { ref } from 'vue';
import { AppSearchDetail } from '#components';
import { useRoute, useRouter } from 'vue-router';
import { formatMonth } from '~/utils/global/queryUrl';
import LeftIcon from '~/public/icons/backleft.svg';
import { useHotelStore } from '~/stores/Hotel';

const router = useRouter();

const hotelStore = useHotelStore();

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

const route = useRoute();
const checkout = ref<string | string[]>(route.query.checkout as string);
const checkin = ref<string | string[]>(route.query.checkin as string);
// Format tanggal menjadi "1 - 24 Des 2024"
const formattedDate = computed(() => {
  if (checkin && checkout) {
    const checkinDate = new Date(checkin.value as string);
    const checkoutDate = new Date(checkout.value as string);
    const dayCheckin = checkinDate.getDate();
    const dayCheckout = checkoutDate.getDate();
    const month = formatMonth(checkinDate.getMonth());
    const year = checkinDate.getFullYear();
    return `${dayCheckin} - ${dayCheckout} ${month} ${year}`;
  }
  return '';
});

const goBack = () => {
    router.back();
}


</script>
<template>
            <div class="sticky top-0 bg-white" :class="isScrolled ? (hotelStore.zIndexAppHeader ? 'shadow z-10':'shadow z-20'):'z-20'">
                <div class="sticky top-0 sm:max-w-1032 w-full mx-auto p-0 flex justify-between items-center sm:items-start bg-white">
                    <div class="mb-2 sm:mb-0 py-2">
                        <img src="https://project-exterior-technical-test-app.up.railway.app/img/logo.png" alt="Wisata App" class="w-[180px] hidden sm:block"/>
                        <component :is="LeftIcon" :fill="'#3b82f6'" class="w-4 h-4 block sm:hidden" @click="goBack"/>
                    </div>
                    <div class="sm:py-2">
                        <button @click.stop="handleShowedSearchDetailClick" class="sm:px-4 py-3 sm:py-2 flex justify-center items-center bg-gray-300 hover:bg-gray-400 rounded w-[400px] max-w-[200px] sm:w-[590px] sm:max-w-screen-lg text-sm sm:text-normal font-semibold">
                        <img src="/icons/search.svg" alt="icon" class="w-[15px] mx-2"/>
                        <span class="mx-1">
                          <!-- Mobile: Hanya tampilkan huruf pertama, Desktop: tampilkan seluruh nama -->
                          <span class="sm:hidden">{{ hotelStore.propertyHotel?.name?.charAt(0) || 'N' }}</span>
                          <span class="hidden sm:inline">{{ hotelStore.propertyHotel?.name || 'No Data' }}</span>
                        </span> <span class="mx-1">-</span> <span class="mx-2">{{ formattedDate }}</span>
                        </button>
                    </div>
                    <div class="sm:py-2">
                        <button class="bg-blue-500 text-white w-20 mx-2 px-3 py-[10px] sm:px-3 sm:py-2 rounded">
                            Sign in
                        </button>
                    </div>
                </div>
                <!-- <div class="z-0 sticky top-0" :class="isShowedSearchDetail ? 'visible':'collapse'">
                   <AppSearchDetail :class="isShowedSearchDetail ? 'visible':'collapse'"/>
                </div> -->
                <transition name="fade" @before-enter="handleEnter" @before-leave="handleBeforeLeave">
                  <div v-if="isShowedSearchDetail" class="z-0 sticky top-0">
                    <AppSearchDetail />
                  </div>
                </transition>
            </div>
            
            <div class="w-screen h-screen fixed z-0" :class="isShowedSearchDetail ? 'bg-opacity-40 bg-black visible':'invisible'" @click="handleOutsideSearchDetailClick">

            </div>

</template>
