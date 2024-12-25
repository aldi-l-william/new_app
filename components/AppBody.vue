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
    <div class="max-1032-container">
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
</template>
