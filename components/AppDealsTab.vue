<script setup lang="ts">
    import { 
        FilterComp, 
        RoomImageComp, 
        RoomBodyComp 
    } from '#components';

    const filter_rooms = [
       { filter_name:'Free Breakfast', icon:'spons.svg' },
       { filter_name:'Free Cancellation', icon:'box-checklist.svg' }
    ];
    
    const isShowPopUpModal = ref(true);
    const handleShowPopUp = () => {
        isShowPopUpModal.value = false;
    }
</script>
<template>
    <div class="flex justify-center my-2">
        <div class="flex justify-start items-center mb-4">
            <div class="mr-2">
                <img src="/icons/filter.svg" alt="filter" class="w-4 h-4"/>
            </div>
            <div class="mr-2">
            Filter rooms by
            </div>
            <div class="ml-2">
                <div class="flex justify-between items-center border-blue-500 border px-2 py-1 rounded-full cursor-pointer">
                    <div class="mx-2 text-sm text-blue-500">Clear All</div>
                    <div class="flex justify-center items-center bg-blue-500 w-[20px] h-[20px] rounded-full text-white font-bold">2</div>
                </div>
            </div>
            <div v-for="(item, index) in filter_rooms" class="mx-2">
                 <FilterComp :icon="item.icon" :filter_name="item.filter_name" class="cursor-pointer hover:bg-gray-100"/> 
            </div>
        </div>
    </div>
    <div class="grid grid-cols-12 gap-4">
            <div class="col-span-4 cursor-pointer">
                <RoomImageComp @click="handleShowPopUp"/>
                <ModalPopUpComp v-if="isShowPopUpModal"/>
            </div>
            <div class="col-span-8 border border-gray rounded">
                    <div class="border-gray border-b py-4">
                        <RoomTitleComp/>
                    </div>
                    <div class="px-4 py-4"> 
                        <RoomBodyComp/>      
                    </div>
            </div>
    </div>
</template>