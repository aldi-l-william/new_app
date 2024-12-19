<script setup>
import { StarRatingComp } from '#components';
import { DonutComp } from '#components';

</script>
<template>
    <div class="max-1032-container">
         <div class="px-20 py-8 border-b flex justify-start">
            <div>
                <img src="https://i.travelapi.com/lodging/17000000/16500000/16494400/16494356/026e2ee3_z.jpg" class="rounded-full w-[168px] h-[168px] object-cover object-center"/>
            </div>
            <div class="ml-24">
                <div class="flex justify-start items-center">
                    <h1 class="mr-2 items-center font-bold text-lg">G7 Hotel</h1>
                    <StarRatingComp :rating="4.4"/>
                </div>
                <div class="py-1">Hotel</div>
                <div class="py-1">Jl. H. Samanhudi No.47, Jakarta, Indonesia 10710</div>
                <div class="flex justify-start items-center">
                    <DonutComp :percentage="78"/>
                    <div class="mx-1 ml-2">Good</div>
                    <div class="mx-1">-</div>
                    <div class="mx-1">29 reviews</div>
                </div>
                
            </div>
            
         </div>
        
    </div>
</template>
