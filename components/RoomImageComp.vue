<script setup lang="ts">
   import { defineProps } from 'vue';
   import type { RoomImages } from '~/interface/HotelDetail';

   const props = defineProps({
      room_images:{
        type: Array as () => RoomImages[],
        required:true
      }
   })
</script>
<template>
    <div @click="$emit('click')">

        <div class="relative" >
                    <img :src="props?.room_images[0]?.size_sm" class="rounded-t-md max-h-[170px] w-full h-[200px]" />
                    <div class="flex justify-start items-center bg-white rounded absolute px-2 py-1 bottom-4 left-4">
                        <div class="mr-1">
                           <img src="/icons/box.svg" alt="box" class="w-4 h-4" />
                        </div>
                        <div class="text-sm">
                            See Photos
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-3 pt-1 gap-1">
                    <div class="col-span-1">
                        <img :src="props?.room_images[1]?.size_sm" class="rounded-bl-md max-h-[100px] h-[200px] w-full" />
                    </div>
                    <div class="col-span-1 w-full">
                        <img :src="props?.room_images[2]?.size_sm" class="max-h-[100px] h-[200px]" />
                    </div>
                    <div class="col-span-1">
                        <img :src="props?.room_images[3]?.size_sm" class="rounded-br-md max-h-[100px] h-[200px] w-full"/>
                    </div>
                </div>
    </div>
</template>