<script setup lang="ts">
   import { defineProps } from 'vue';
   import type { RoomImages } from '~/interface/HotelDetail';
   import BoxIcon from '~/public/icons/box.svg';

   const props = defineProps({
      room_images:{
        type: Array as () => RoomImages[],
        required:true
      }
   })
</script>
<template>
    <div @click="$emit('click')" class="relative">
               <div class="grid grid-cols-12 gap-1">
                    <div class="col-span-9 sm:col-span-12">
                        <img :src="props?.room_images[0]?.size_sm" class="sm:rounded-t-md max-h-[170px] w-full h-[200px]" /> 
                    </div>
                    <div class="col-span-3 sm:col-span-12 grid grid-cols-12">
                        <div class="col-span-12 sm:col-span-4">
                            <img :src="props?.room_images[1]?.size_sm" class="sm:rounded-bl-md max-h-[57px] sm:max-h-[80px] h-[200px] w-full" />
                        </div>
                        <div class="col-span-12 sm:col-span-4">
                            <img :src="props?.room_images[2]?.size_sm" class="max-h-[57px] sm:max-h-[80px] h-[200px]" />
                        </div>
                        <div class="col-span-12 sm:col-span-4">
                            <img :src="props?.room_images[3]?.size_sm" class="sm:rounded-br-md max-h-[57px] sm:max-h-[80px] h-[200px] w-full"/>
                        </div>
                    </div>
                    
                </div>
                <div class="flex justify-start items-center bg-white rounded absolute px-2 py-1 bottom-4 sm:bottom-28 left-4">
                    <div class="mr-1">
                        <component :is="BoxIcon" class="w-4 h-4" fill=""/>
                    </div>
                    <div class="text-sm">
                        See Photos
                    </div>
                </div>
    </div>
</template>