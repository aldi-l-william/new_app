<script setup lang="ts">
import { StarRatingComp } from '#components';
import { useHotelStore } from '~/stores/Hotel';

const hotelStore = useHotelStore();

</script>
<template>
    <div class="flex justify-start items-center">
        <h1 class="mr-2 items-center font-bold">{{ hotelStore.propertyHotel?.name || '' }}</h1>
        <StarRatingComp/>
    </div>
</template>