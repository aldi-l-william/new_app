<script setup lang="ts">
    import SponCoretIcon from '~/public/icons/spon-coret.svg';
    import GarpuIcon from '~/public/icons/garpu.svg';
    import { 
        DateCancellationComp, 
        PricePerNightComp 
    } from '#components';

    const props = defineProps({
        meal_plan_description:{
            type: String,
            default:'Without Breakfast'
        },
        strikethrough_rate_nightly:{
            type: String
        },
        rate_nightly:{
            type: String
        },
        price_total:{
            type: String
        },
        wisata_point:{
            type: Number
        },
        room_available:{
            type: Number
        },
        cashback_rate:{
            type: String
        },
        cancel_policy_description:{
            type: String
        },
        index:{
            type:Number,
            required:true
        }
    })
</script>
<template>
        <div class="flex justify-between">
            <div class="flex justify-between items-center">
                <div class="mr-2">
                    <component :is="props.meal_plan_description === '' ? SponCoretIcon : GarpuIcon" :fill="props.meal_plan_description === '' ? 'grey' : 'green'"/>
                </div>
                <div :class="props.meal_plan_description === '' ? '':'text-green-500'">
                    {{ props.meal_plan_description === '' ? 'Without Breakfast' : props.meal_plan_description }}
                </div>
            </div>
            <div class="flex justify-between">
                <RoomMenuComp :index="index" @copy="$emit('copy', props.index)" @screenshot="$emit('screenshot', props.index)" @seeActions="$emit('seeActions', props.index)" />
            </div>
        </div>
        <DateCancellationComp :cancel_policy_description="props.cancel_policy_description"/>
        <div class="flex justify-start my-2">
            <div class="bg-red-500 text-white text-sm font-bold rounded px-1 py-1 mr-2">
                <div>Save {{ props.cashback_rate }} TODAY!</div>
            </div>
            <div class="bg-red-100 text-red-500 font-semibold text-sm px-1 py-1 rounded">
                <div>{{ props.room_available }} ROOM LEFT</div>
            </div>
        </div>
        <div class="line-through text-gray-400 text-sm">
            {{ props.strikethrough_rate_nightly }}
        </div>
        <PricePerNightComp :rate_nightly="props.rate_nightly"/>
        <TotalPriceComp :price_total="props.price_total"/>
        <div class="text-sm text-gray-400">
            aftex tax & fees
        </div>
        <div class="flex justify-between">
            <div class="text-sm text-gray-400">* Member-only price, valid in app only</div>
            <div class="text-blue-500 text-sm">Collect {{ props.wisata_point }} points</div>
        </div>
</template>