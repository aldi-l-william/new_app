<script setup lang="ts">
   import { InfoBedAndSizeComp } from '#components';

   const props = defineProps({
     room_name:{
        type: String
     },
     room_bed_groups:{
        type:String
     },
     room_size_sqm:{
        type:Number
     }
   })
</script>
<template>
        <div class="flex justify-between px-4">
            <div class="font-bold">{{ props.room_name }}</div>
            <div class="rounded-full hover:bg-blue-100 px-3 text-blue-500 font-bold cursor-pointer" @click="$emit('click')">See details</div>
        </div>
        <div class="px-4 text-sm">
            <InfoBedAndSizeComp :room_bed_groups="props.room_bed_groups" :room_size_sqm="props.room_size_sqm"/>
        </div>
</template>