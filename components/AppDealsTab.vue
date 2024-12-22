<script setup lang="ts">
    import { 
        FilterComp, 
        RoomImageComp, 
        RoomBodyComp,
        ModalPopUpComp,
        ModalPopUpScreenshotAndCopyComp 
    } from '#components';

    const filter_rooms = [
       { filter_name:'Free Breakfast', icon:'spons.svg' },
       { filter_name:'Free Cancellation', icon:'box-checklist.svg' }
    ];
    
    const isShowPopUpModal = ref(false);
    const isShowPopUpModalScreenshotAndCopy = ref(false);
    const handleShowPopUp = () => {
        isShowPopUpModal.value = true;
        document.body.classList.add('no-scroll');   
    }

    

    const handleClosePopUp = () => {
        isShowPopUpModal.value = false;
        // Aktifkan kembali scroll saat modal ditutup
        document.body.classList.remove('no-scroll');
    }

    const handleShowPopUpScreenshotAndCopy = () => {
        isShowPopUpModalScreenshotAndCopy.value = true;
        document.body.classList.add('no-scroll');
    }

    const handleClosePopUpScreenshotAndCopy = () => {
        isShowPopUpModalScreenshotAndCopy.value = false;
        // Aktifkan kembali scroll saat modal ditutup
        document.body.classList.remove('no-scroll');
    }

    // Function for entering animation
    const handleEnter = (el: any) => {
        // Mengatur posisi awal dan skala elemen
        el.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        el.style.transform = 'scale(0)';
        el.style.opacity = '0';

        // Setelah transisi dimulai, animasi skala dan opacity
        requestAnimationFrame(() => {
            el.style.transform = 'scale(1)';
            el.style.opacity = '1';
        });
    };

    // Function for leaving animation
    const handleBeforeLeave = (el:any) => {
        // Mengatur transisi dan memulai efek keluar
        el.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        el.style.transform = 'scale(1)';
        el.style.opacity = '1';
        
        // Setelah animasi selesai, elemen mengecil
        requestAnimationFrame(() => {
            el.style.transform = 'scale(0)';
            el.style.opacity = '0';
        });
    };
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
            <div v-for="(item, index) in filter_rooms" class="ml-2">
                 <FilterComp :icon="item.icon" :filter_name="item.filter_name" class="cursor-pointer hover:bg-gray-100"/> 
            </div>
        </div>
    </div>
    <div class="grid grid-cols-12 gap-4">
            <div class="col-span-4 cursor-pointer">
                <RoomImageComp @click="handleShowPopUp"/> 
                <div :class="isShowPopUpModal ? 'bg-black bg-opacity-50 z-40 fixed inset-0':''">
                    <transition name="fade" @before-enter="handleEnter" @before-leave="handleBeforeLeave">
                    <div v-if="isShowPopUpModal" class="fixed inset-0">
                        <ModalPopUpComp  @close="handleClosePopUp"/>
                    </div>
                </transition> 
                </div>
                <div :class="isShowPopUpModalScreenshotAndCopy ? 'bg-black bg-opacity-50 z-40 fixed inset-0':''">
                    <transition name="fade" @before-enter="handleEnter" @before-leave="handleBeforeLeave">
                    <div v-if="isShowPopUpModalScreenshotAndCopy" class="fixed inset-0">
                        <ModalPopUpScreenshotAndCopyComp  @close="handleClosePopUpScreenshotAndCopy"/>
                    </div>
                </transition> 
                </div>
            </div>
            <div class="col-span-8 border border-gray rounded">
                    <div class="border-gray border-b py-4">
                        <RoomTitleComp @click="handleShowPopUp"/>
                    </div>
                    <div class="px-4 py-4"> 
                        <RoomBodyComp @copy="handleShowPopUpScreenshotAndCopy"/>      
                    </div>
            </div>
    </div>
</template>