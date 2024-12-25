<script setup lang="ts">
import { 
    TitleWithStarComp, 
    ValueReputationReviewComp
} from '#components';

import { useHotelStore } from '~/stores/Hotel';

const hotelStore = useHotelStore();

const props = defineProps({
    items:{
        type: Object,
        default:{}
    }
})

</script>
<template>
    <!-- Versi Desktop -->
    <div class="hidden sm:block max-w-1032 mx-auto p-0 w-full">
         <div class="px-20 py-8 border-b flex justify-start">
            <div>
                <img :src="hotelStore.propertyHotel.catalog?.hero_image_url?.lg" class="rounded-full w-[168px] h-[168px] object-cover object-center"/>
            </div>
            <div class="ml-24">
                <TitleWithStarComp/>
                <div class="py-1 text-xs text-gray-500 font-semibold">{{ hotelStore.propertyHotel.type?.toUpperCase() || ''}}</div>
                <div class="py-1">{{ hotelStore.propertyHotel.address_line || '' }}</div>
                <ValueReputationReviewComp :percentage="hotelStore.propertyHotel.catalog?.review_rating || 0" :size="35"/> 
            </div>
         </div>
    </div>
    <!-- Versi Mobile -->
    <div class="block sm:hidden">
        <TitleWithStarComp class="mx-4 mt-6"/>
        <div class="grid grid-cols-12 p-4">
            <div class="col-span-5">
                <img :src="hotelStore.propertyHotel.catalog?.hero_image_url?.lg" class="rounded-full w-[100px] h-[100px] object-cover object-center"/>
            </div>
            <div class="col-span-7">
                <div class="py-1 text-xs text-gray-500 font-semibold">{{ hotelStore.propertyHotel.type?.toUpperCase() || ''}}</div>
                <div class="py-1 text-sm">{{ hotelStore.propertyHotel.address_line || '' }}</div>
                <ValueReputationReviewComp :percentage="hotelStore.propertyHotel.catalog?.review_rating || 0" :size="25"/> 
            </div>
        </div>
    </div>
</template>
