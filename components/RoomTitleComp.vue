<template>
        <div class="flex justify-between px-4">
            <div class="font-bold">Standard room</div>
            <div class="rounded-full hover:bg-blue-100 px-3 text-blue-500 font-bold cursor-pointer" @click="$emit('click')">See details</div>
        </div>
        <div class="flex justify-start items-center px-4">
            <div>
                <img src="/icons/bed.svg" alt="bed" class="w-4 h-4"/>
            </div>
            <div class="mx-1">
                2 Twin Beds or 1 Double Bed
            </div>
            <div class="mx-1">
                <img src="/icons/small-box.svg" alt="small box" class="w-4 h-4" />
            </div>
            <div>
                15 m2
            </div>
        </div>
</template>