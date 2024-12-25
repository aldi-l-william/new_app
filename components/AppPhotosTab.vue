<script setup lang="ts">
   import { ref } from 'vue';
   import { ModalPhotosComp } from '#components';
   import { handleBeforeLeave, handleEnter } from '~/utils/animations/Dropdown';

   import { useHotelStore } from '~/stores/Hotel';

   const hotelStore = useHotelStore();

   const close = () => {
     isShowCarousel.value = false;
     isClass.value = false;
   }

   const isClass = ref(false);
   const isShowCarousel = ref(false);

   const showCarousel = (index:number) => {
     isClass.value = true;
     setTimeout(() => {
          if(isClass.value === true){
               setTimeout(() => {
                    isShowCarousel.value = true;
               },500)
          }
     }, 500);
   }
</script>
<template>
     <div class="max-1032-container">
          <div class="grid grid-cols-12 gap-6 my-4">
               <div v-for="(item, index) in hotelStore.propertyHotel.image" class="col-span-4 cursor-pointer hover:opacity-80" @click="showCarousel(index)">
                    <img :src="item?.url?.lg ||'https://project-exterior-technical-test-app.up.railway.app/img/fallback-global.png'" class="h-[325px] w-[325px]"/>
               </div>
          </div>
          <div>
               <div :class="{'bg-black bg-opacity-50 z-40 fixed inset-0': isClass }">
                    <transition name="fade" @before-enter="handleEnter" @before-leave="handleBeforeLeave"> 
                         <ModalPhotosComp @closed="close" v-if="isShowCarousel === true"/>
                    </transition>
               </div>
          </div>
     </div>
</template>


<style scoped>
/* Definisikan transisi di sini */
.fade-enter-active, .fade-leave-active {
   transition: opacity 1s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
   opacity: 0;
}
</style>