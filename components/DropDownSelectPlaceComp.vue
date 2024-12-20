<script setup lang="ts">
    import BedHotelIcon from '~/public/icons/bedhotel.svg';
</script>
<template>
     <div class="scrolled">
        <ul>
            <li class="hover:bg-gray-100 px-2 py-2 rounded">
                <div class="flex justify-start items-center bg-blue-200 rounded min-w-[88px] w-[50px]">
                    <component :is="BedHotelIcon" :fill="'#007aff'" class="w-6 h-6 mx-2"/>
                    <div class="text-blue-500">Hotel</div>
                </div>
                <div class="text-ellipsis flex-1 overflow-hidden whitespace-nowrap font-semibold">Fairmont Jakarta</div>
                <div class="text-ellipsis flex-1 overflow-hidden whitespace-nowrap font-semibold text-sm text-gray-500">Jakarta, Indonesia</div>       
            </li>
            <li class="hover:bg-gray-100 px-2 py-2 rounded">
                <div class="flex justify-start items-center bg-blue-200 rounded min-w-[88px] w-[50px]">
                    <component :is="BedHotelIcon" :fill="'#007aff'" class="w-6 h-6 mx-2"/>
                    <div class="text-blue-500">Hotel</div>
                </div>
                <div class="text-ellipsis flex-1 overflow-hidden whitespace-nowrap font-semibold">Fairmont Jakarta</div>
                <div class="text-ellipsis flex-1 overflow-hidden whitespace-nowrap font-semibold text-sm text-gray-500">Jakarta, Indonesia</div>       
            </li>
            <li class="hover:bg-gray-100 px-2 py-2 rounded">
                <div class="flex justify-start items-center bg-blue-200 rounded min-w-[88px] w-[50px]">
                    <component :is="BedHotelIcon" :fill="'#007aff'" class="w-6 h-6 mx-2"/>
                    <div class="text-blue-500">Hotel</div>
                </div>
                <div class="text-ellipsis flex-1 overflow-hidden whitespace-nowrap font-semibold">Fairmont Jakarta</div>
                <div class="text-ellipsis flex-1 overflow-hidden whitespace-nowrap font-semibold text-sm text-gray-500">Jakarta, Indonesia</div>       
            </li>
        </ul>
     </div>
</template>
<style scoped>
        .scrolled {
            width: 100%;
            min-height: 200px;  /* Lebar kotak */
            height: 100px; /* Tinggi kotak */
            overflow-y: scroll; /* Menambahkan scroll vertikal */
            border: 1px solid #000; /* Border kotak */
            border-radius: 10px;
        }

        ul {
            padding-left: 4px;
            margin: 4px;
        }

        li {
            margin-bottom: 10px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        li:hover {
            background-color: #f5f5f5; /* Warna latar belakang saat hover */
            cursor: pointer; /* Menampilkan kursor pointer saat hover */
        }
</style>