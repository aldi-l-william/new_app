<script setup lang="ts">
  import { ref, nextTick, defineProps } from 'vue';
  import 'vue3-carousel/dist/carousel.css';
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
  import PreviousIcon from '~/public/icons/previous.svg';
  import NextIcon from '~/public/icons/next.svg';
  import { updateLoadingText, interval, loadingText } from '~/utils/animations/Dropdown';

  const isLoading = ref(false); 

  import { useHotelStore } from '~/stores/Hotel';

  const hotelStore = useHotelStore();

  // Mulai update ketika komponen dimount
  onMounted(() => {
    updateLoadingText();
  });

  // Membersihkan interval saat komponen unmount
  onBeforeUnmount(() => {
    if (interval !== null) {
      clearInterval(interval);
    }
  });

  // Konfigurasi untuk carousel
  const config = {
    wrapAround: true,
    itemToShow: 1,
  };

  // Menggunakan nextTick untuk memastikan carousel di-render setelah modal ditampilkan
  const handleNewRender = () => {
    // Menunggu DOM untuk diperbarui sebelum mengakses atau memanipulasi elemen
    nextTick(() => {
      if (isLoading.value) {
        console.log("Carousel ditampilkan dan DOM diperbarui!");
        isLoading.value = false;
      }
    });
  };

  setTimeout(() => {
    isLoading.value = true;
    handleNewRender();
  },800);

 
const carouselRef = ref();
const slides = ref([1, 2, 3, 4]);
const currentSlide = ref(0);

const next = () => carouselRef.value.next();
const prev = () => carouselRef.value.prev();

const close = () => {
    isLoading.value = true;
}

// Fungsi untuk mencegah klik di dalam carousel agar tidak menutup modal
const handleCarouselClick = (event: MouseEvent) => {
    event.stopPropagation();
};
</script>


<template>
    <!-- Carousel hanya muncul jika activeCarousel bernilai true -->
    <div class="bg-black absolute inset-0 z-40" @click="close; $emit('closed')">
        <div>
          <carousel ref="carouselRef" v-bind="config" v-model="currentSlide" v-if="!isLoading"> 
            <slide v-for="(slide, index) in hotelStore.propertyHotel.image" :key="index+'slide'">
                <div class="flex justify-center items-center w-7/12 h-screen">
                    <img :src="slide?.url?.lg" class="h-[500px] w-full" @click="handleCarouselClick"/>
                </div>
            </slide>
          </carousel>
        </div>
    </div>  
    <div class="absolute top-96 w-full flex justify-center items-center z-50" v-if="!isLoading">
      <div class="flex justify-between w-9/12">
        <button @click="prev" class="text-white">
          <component :is="PreviousIcon" fill="#FFFFFF" class="w-6 h-6 bg-black rounded-full opacity-70"/>
        </button>
        <button @click="next" class="text-white">
          <component :is="NextIcon" fill="#FFFFFF" class="w-6 h-6 bg-black rounded-full opacity-70"/>
        </button>
      </div> 
    </div>
</template>
