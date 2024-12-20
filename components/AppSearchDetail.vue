<script setup lang="ts">
    import { ref } from 'vue';
    import SearchIcon from '~/public/icons/search.svg';
    import { 
        InputSearchCustomComp,
        DropDownSelectPlaceComp,
        InputDateCheckinCheckoutComp 
    } from '#components';

    const isScrolled = ref(false);
    const isShowed = ref(false);
    const SearchText = ref('');

    const handleInputClick = (event:MouseEvent) => {
        isScrolled.value = true;
        document.body.style.cursor = 'text'; 
        event.stopPropagation();
    }

    const handleOutsideClick = () => {
        isScrolled.value = false;
        isShowed.value = false;
        document.body.style.cursor = 'default'; 
    }

    const handleInputDateClick = (event:MouseEvent) => {
        isShowed.value = true;
        document.body.style.cursor = 'text'; 
        event.stopPropagation();
    }
</script>
<template>
    <div class="flex justify-center" @click="handleOutsideClick">
        <div class="max-1032-container rounded-b-lg flex justify-between absolute bg-white shadow-md">
       <div class="mr-2 my-4 mx-4">
           <InputSearchCustomComp @click="handleInputClick" v-model="SearchText"/>
           <DropDownSelectPlaceComp v-if="isScrolled"/>
       </div>
       <div class="mr-2 my-4">
           <InputDateCheckinCheckoutComp @click="handleInputDateClick" />
           <SelectDateDropDownComp v-if="isShowed" />
       </div>
       <div class="mr-2 my-4">
           <SelectGuestRoomsComp />
       </div>
       <div class="my-[36px] mx-4">
          <button class="flex justify-start items-center bg-blue-500 text-white px-6 py-4 rounded-md">
            <div class="mr-2">
                <component :is="SearchIcon" :fill="'white'" />
            </div>
            <div>
                Search
            </div>
          </button>
       </div>  
        </div>
    </div>  
</template>