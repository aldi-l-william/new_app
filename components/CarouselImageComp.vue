<script setup lang="ts">
  import { ref, nextTick, defineProps } from 'vue';
  import 'vue3-carousel/dist/carousel.css';
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
  import PreviousIcon from '~/public/icons/previous.svg';
  import NextIcon from '~/public/icons/next.svg';
  import { updateLoadingText, interval, loadingText } from '~/utils/animations/Dropdown';
  import { useHotelStore } from '~/stores/Hotel';
  
  const props = defineProps({
     index:{
      type:Number,
      required:true
     }
  })

  const hotelStore = useHotelStore();

  const isShowCarousel = ref(false);
  const isLoading = ref(true); 
  
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
      if (isShowCarousel.value) {
        console.log("Carousel ditampilkan dan DOM diperbarui!");
        isLoading.value = false;
      }
    });
  };

 setTimeout(() => {
    isShowCarousel.value = true;
    handleNewRender();
 },500);

 
const carouselRef = ref();
const slides = ref([1, 2, 3, 4]);
const currentSlide = ref(0);

const next = () => carouselRef.value.next();
const prev = () => carouselRef.value.prev();
</script>


<template>
     <!-- Indikator Loading di dalam carousel -->
    <div v-if="isLoading" class="absolute left-0 top-0 right-[45%] bottom-0 flex justify-center items-center z-50">
      <div class="text-white text-xl">{{ loadingText }}</div>
    </div>
    <!-- Carousel hanya muncul jika isShowCarousel bernilai true -->
    <carousel ref="carouselRef" v-bind="config" v-else="isShowCarousel" v-model="currentSlide"> 
      <slide v-for="slide in hotelStore.propertyDetailHotel?.offers[props.index]?.room_images" :key="slide">
        <img :src="slide.size_sm" class="w-full max-h-[370px]"/>
      </slide>
    </carousel>
    <div class="absolute left-0 top-0 right-[45%] bottom-0 flex justify-center items-center z-50">
      <div class="flex justify-between w-full px-4">
        <button @click="prev" class="text-white">
          <component :is="PreviousIcon" fill="#FFFFFF" class="w-6 h-6 bg-black rounded-full opacity-70"/>
        </button>
        <button @click="next" class="text-white">
          <component :is="NextIcon" fill="#FFFFFF" class="w-6 h-6 bg-black rounded-full opacity-70"/>
        </button>
      </div> 
    </div>
    <!-- Indikator urutan gambar (1/5, 2/5, dst) -->
    <div class="absolute bottom-1 left-[50%] transform -translate-x-1/2 font-semibold bg-gray-900 px-2 py-1 rounded-xl">
      <span class="text-white">{{ currentSlide + 1 }} / {{ hotelStore.propertyDetailHotel?.offers[props.index]?.room_images.length }}</span>
    </div>
</template>
