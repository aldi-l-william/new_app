<script setup lang="ts">
    import BoxChecklistIcon from '~/public/icons/box-checklist.svg';
    import SponCoretIcon from '~/public/icons/spon-coret.svg';
</script>
<template>
        <div class="flex justify-between">
            <div class="flex justify-between items-center">
                <div class="mr-2">
                    <component :is="SponCoretIcon" :fill="'grey'"/>
                </div>
                <div>
                    Without breakfast
                </div>
            </div>
            <div class="flex justify-between">
               <RoomMenuComp @copy="$emit('copy')"/>
            </div>
        </div>
        <div class="flex justify-start items-center text-green-500">
            <div class="mr-2">
                <component
                    :is="BoxChecklistIcon"
                    :fill="'#238636'" 
                    class="w-6 h-6"
                />
            </div> 
            <div>
                Free cancellation before 01 Mar 2025
            </div> 
        </div>
        <div class="flex justify-start my-2">
            <div class="bg-red-500 text-white text-sm font-bold rounded px-1 py-1 mr-2">
                <div>Save 11% TODAY!</div>
            </div>
            <div class="bg-red-100 text-red-500 font-semibold text-sm px-1 py-1 rounded">
                <div>1 ROOM LEFT</div>
            </div>
        </div>
        <div class="line-through text-gray-400 text-sm">
            Rp 414.999
        </div>
        <div>
            Rp<span class="text-lg font-semibold"> 376.000</span> / night *
        </div>
        <div class="flex justify-between">
            <div class="text-md text-gray-400">
                Total: Rp 1.504.000
            </div>
            <div>
                <button class="bg-blue-500 text-white px-6 py-1 rounded">Book Now</button>
            </div>
        </div>
        <div class="text-sm text-gray-400">
            aftex tax & fees
        </div>
        <div class="flex justify-between">
            <div class="text-sm text-gray-400">* Member-only price, valid in app only</div>
            <div class="text-blue-500 text-sm">Collect 12 points</div>
        </div>
</template>