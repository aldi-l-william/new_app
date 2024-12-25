<script setup lang="ts">
   import { defineProps } from 'vue';
   import { useHotelStore } from '~/stores/Hotel';

   const hotelStore = useHotelStore();
   
   const props = defineProps({
      size:{
        type:Number
      },
      percentage:{
        type:Number
      }
   })

   const level = (level:number) => {
      
      if(level > 80){
        return 'Excellent';
      }else if(level > 60 && level < 79){
        return 'Good';
      }else{
        return 'Bad';
      }
   }
</script>
<template>
    <div class="flex justify-start items-center">
        <DonutComp :percentage="props.percentage" :size="props.size"/>
        <div class="mx-1 ml-2">{{ level(hotelStore.propertyHotel?.catalog?.review_rating) }}</div>
        <div class="mx-1">-</div>
        <div class="mx-1 text-xs sm:text-sm">{{ hotelStore.propertyHotel?.catalog?.review_count }} reviews</div>
    </div>
</template>