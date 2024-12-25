<script setup lang="ts">
    import { ref } from 'vue';
    import { 
        FilterComp, 
        RoomImageComp, 
        RoomBodyComp,
        ModalPopUpComp,
        ModalPopUpScreenshotAndCopyComp,
        ModalPopUpMiniScreenshotAndCopyComp,
        RoomTitleComp 
    } from '#components';
    import { handleBeforeLeave, handleEnter } from '~/utils/animations/Dropdown';
    import { formatRupiah, convertToPercentage } from '~/utils/global/formatCurrency';
    import { useHotelStore } from '~/stores/Hotel';
    import GarpuIcon from '~/public/icons/garpu.svg';
    import BoxCheckList from '~/public/icons/box-checklist.svg';
    import { useRouter, useRoute } from 'vue-router';
    import { GetAPIHotelWisataApp, GetAPIProduct } from '~/api/wisata_app';
    const router = useRouter();
    const route = useRoute();

    const hotelStore = useHotelStore();

    hotelStore.initializeQuery(route);

    const filter_rooms = [
       { filter_name:'Free Breakfast', icon: GarpuIcon },
       { filter_name:'Free Cancellation', icon: BoxCheckList }
    ];
    
    const modals = ref<{[key:number]:boolean}>({});

    const toggleModal = (index:number) => {
        modals.value[index] = !modals.value[index];
    }
    
    const isShowPopUpModal = ref<boolean[]>([]);
    const isShowPopUpModalMini = ref(false);
    const isShowPopUpModalScreenshotAndCopy = ref<boolean[]>([]);
    const isActiveTab = ref<string>('Text');
    const handleShowPopUp = (index:number) => {
        isShowPopUpModal.value[index] = true;
        document.body.classList.add('no-scroll');   
    }

    

    const handleClosePopUp = (index:number) => {
        isShowPopUpModal.value[index] = false;
        // Aktifkan kembali scroll saat modal ditutup
        document.body.classList.remove('no-scroll');
    }

    const handleShowPopUpScreenshotAndCopy = (activeTab:string, index:number) => {
        isActiveTab.value = activeTab;
        isShowPopUpModalScreenshotAndCopy.value[index] = true;
        document.body.classList.add('no-scroll');
        modals.value[index] = false;
    }

    const handleClosePopUpScreenshotAndCopy = (index:number) => {
        isShowPopUpModalScreenshotAndCopy.value[index] = false;
        // Aktifkan kembali scroll saat modal ditutup
        document.body.classList.remove('no-scroll');
    }

    


    const isActiveFilter = ref<boolean[]>([]);
    const free_breakfast = ref<boolean>(false);
    const free_cancellation = ref<boolean>(false);
    const counter = ref<number>(0);

    const updateQuery = () => {
        GetAPIHotelWisataApp(hotelStore.propertyHotelID).then((res) => {
                hotelStore.propertyHotel = res[hotelStore.propertyHotelID];
        }).catch(err => {
                console.log(err, "err");
        })

        GetAPIProduct(hotelStore.propertyHotelID, hotelStore.checkin, hotelStore.checkout, hotelStore.guest_per_room, hotelStore.number_of_room, free_cancellation.value, free_breakfast.value).then(res => {
                hotelStore.propertyDetailHotel = res;
            }).catch(err => {
                console.log(err, "error");
            })

        hotelStore.initializeQuery(route);
    }

    const handleFilter = (index: number) => {
        // Toggle filter state
        isActiveFilter.value[index] = !isActiveFilter.value[index];

        // Update free_breakfast and free_cancellation based on index
        free_breakfast.value = !!isActiveFilter.value[0];
        free_cancellation.value = !!isActiveFilter.value[1];

        // Update counter based on active filters
        counter.value = isActiveFilter.value.filter((active) => active).length;

        // Prepare query object
        const query: Record<string, any> = {
            checkin: hotelStore.checkin,
            checkout: hotelStore.checkout,
            guest_per_room: hotelStore.guest_per_room,
            number_of_room: hotelStore.number_of_room,
        };

        // Add free_breakfast and free_cancellation to query only if true
        if (free_breakfast.value) {
            query.free_breakfast = free_breakfast.value;
        }

        if (free_cancellation.value) {
            query.free_cancellation = free_cancellation.value;
        }

        // Update path
        hotelStore.updatePath(router, `/stay/${hotelStore.slug}`, query);

        updateQuery();
    };



    const clearFilter = () => {
        isActiveFilter.value = [];
        free_breakfast.value = false;
        free_cancellation.value = false;
        counter.value = 0;
        // Prepare query object without free_breakfast and free_cancellation
        const query: Record<string, any> = {
            checkin: hotelStore.checkin,
            checkout: hotelStore.checkout,
            guest_per_room: hotelStore.guest_per_room,
            number_of_room: hotelStore.number_of_room,
        };

        // Update path without free_breakfast and free_cancellation
        hotelStore.updatePath(router, `/stay/${hotelStore.slug}`, query);
        
        updateQuery();
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
            <div class="ml-2" v-if="counter !== 0">
                <div class="flex justify-between items-center border-blue-500 border px-2 py-1 rounded-full cursor-pointer">
                    <div class="mx-2 text-sm text-blue-500" @click="clearFilter">Clear All</div>
                    <div class="flex justify-center items-center bg-blue-500 w-[20px] h-[20px] rounded-full text-white font-bold">{{ counter }}</div>
                </div>
            </div>
            <div v-for="(item, index) in filter_rooms" class="ml-2">
                 <!-- Free Break fast dan Free Cancellation Filter -->
                 <FilterComp :class="isActiveFilter[index] ? 'text-blue-500 bg-blue-100':'hover:bg-gray-100'" :icon="item.icon" :filter_name="item.filter_name" class="cursor-pointer " @click="handleFilter(index)" :fill-color="isActiveFilter[index] ? '#1359e3':''"/> 
            </div>
        </div>
    </div>
    <div class="grid grid-cols-12 gap-4 mb-8" v-for="(item, index) in hotelStore.propertyDetailHotel?.offers" :key="index+'hoteldescription'">
            <div class="col-span-4 cursor-pointer">
                <RoomImageComp @click="handleShowPopUp(index)" :room_images="item.room_images"/> 
                <div :class="isShowPopUpModal[index] ? 'bg-opacity-50 z-40 fixed inset-0':''">
                    <transition name="fade" @before-enter="handleEnter" @before-leave="handleBeforeLeave">
                        <div v-if="isShowPopUpModal[index]" class="fixed inset-0">
                            <ModalPopUpComp :index="index" @close="handleClosePopUp(index)"/>
                        </div>
                    </transition> 
                </div>
                <div :class="isShowPopUpModalScreenshotAndCopy[index] ? 'bg-opacity-50 z-40 fixed inset-0':''">
                    <transition name="fade" @before-enter="handleEnter" @before-leave="handleBeforeLeave">
                        <div v-if="isShowPopUpModalScreenshotAndCopy[index]" class="fixed inset-0">
                            <ModalPopUpScreenshotAndCopyComp
                            :index="index" 
                            :room_name="item.room_name"
                            :room_bed_groups="item.room_bed_groups"
                            :room_size_sqm="item.room_size_sqm"
                            :cancel_policy_description="item.cancel_policy_description"
                            :rate_nightly="item.rate_nightly"
                            :price_total="item.price_total"  
                            :is-active="isActiveTab" @close="handleClosePopUpScreenshotAndCopy(index)"/>
                        </div>
                    </transition> 
                </div>
            </div>
            <div class="col-span-8 border border-gray rounded">
                    <div class="border-gray border-b py-4">
                        <RoomTitleComp @click="handleShowPopUp" :room_name="item.room_name" :room_bed_groups="item.room_bed_groups" :room_size_sqm="item.room_size_sqm"/>
                    </div>
                    <div class="px-4 py-4 relative border-b"> 
                        <RoomBodyComp
                        :index="index" 
                        :strikethrough_rate_nightly="formatRupiah(item.pricing_data.strikethrough_rate_nightly)" 
                        :meal_plan_description="item.meal_plan_description"
                        :rate_nightly="formatRupiah(item.pricing_data.rate_nightly)"
                        :price_total="formatRupiah(item.pricing_data.price_total)"
                        :wisata_point="item.pricing_data.wisata_point"
                        :room_available="item.room_available"
                        :cancel_policy_description="item.cancel_policy_description"
                        :cashback_rate="convertToPercentage(item.pricing_data.cashback_rate)" @copy="handleShowPopUpScreenshotAndCopy('Text', index)" 
                        @screenshot="handleShowPopUpScreenshotAndCopy('Image', index)" 
                        @seeActions="toggleModal(index)"/>
                        <ModalPopUpMiniScreenshotAndCopyComp v-if="modals[index]"
                        :index="index" @copy="handleShowPopUpScreenshotAndCopy('Text', index)" @screenshot="handleShowPopUpScreenshotAndCopy('Image', index)" class="absolute right-6"/>      
                    </div>
                   
            </div>
            <div class="bg-black fixed text-3xl z-10 top-0 inset-0 opacity-30" v-if="isShowPopUpModal[index] || isShowPopUpModalScreenshotAndCopy[index]">
            </div>
    </div>
    
</template>