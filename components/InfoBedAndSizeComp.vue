<script setup lang="ts">
import BedIcon from '~/public/icons/bed.svg';
import SmallBoxIcon from '~/public/icons/small-box.svg';

const props = defineProps({
    room_bed_groups:{
        type:String
    },
    room_size_sqm:{
        type: String
    }
})

</script>
<template>
    <div class="flex justify-normal items-center">
            <div>
                <component :is="BedIcon" />
            </div>
            <div class="mx-1">
                {{ props.room_bed_groups }}
            </div>
            <div class="mx-1">
                <component :is="SmallBoxIcon" />
            </div>
            <div>
                {{ props.room_size_sqm }} m2
            </div>
        </div>
</template>