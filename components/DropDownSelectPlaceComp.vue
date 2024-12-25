<script setup lang="ts">
    import BedHotelIcon from '~/public/icons/bedhotel.svg';
    import LandMarkIcon from '~/public/icons/landmark.svg';
    import AreaIcon from '~/public/icons/area.svg';

    const props = defineProps({
        informasi_tempat:{
            type: Object,
            default:{}
        }
    })

    const getIconComponent = (type: string) => {
        switch (type) {
            case 'point_of_interest':
               return LandMarkIcon;
            case 'city':
               return LandMarkIcon;    
            case 'neighborhood':
               return AreaIcon;
            default:
               return BedHotelIcon;
        }
    };

    const getColorFill = (type: string) => {
        switch (type) {
            case 'point_of_interest':
               return '#238636';
            case 'city':
               return '#238636';
            case 'neighborhood':
               return '#238636'; // Hijau (sama seperti di atas)
            default:
               return '#007aff'; // Biru
        }
    };

    const getStringValue = (type:string) => {
        switch (type) {
            case 'point_of_interest':
               return 'LANDMARK';
            case 'neighborhood':
               return 'AREA';
            case 'property':
               return 'HOTEL';  
            default:
               return type;  
        }
    }

    const getColorClass = (type:string) => {
        switch (type) {
            case 'point_of_interest':
               return 'bg-green-200'; // Hijau
            case 'neighborhood':
               return 'bg-green-200';
            case 'city':
               return 'bg-green-200'; // Hijau (sama seperti di atas)
            default:
               return 'bg-blue-200';  
        }
    }

</script>
<template>
     <div class="scrolled absolute top-[90%] bg-white shadow-xl border-t">
        <ul>
            <li class="hover:bg-gray-100 px-2 py-2 rounded" v-for="([key, value], index) in Object.entries(props.informasi_tempat)" :key="value.id" @click="$emit('getData', {id:value.id, locationType:value.location_type, name:value.name, name_suffix:value.name_suffix, slug:value.slug})">
                <div class="flex justify-start items-center rounded" :class="getColorClass(value.location_type)">
                    <component :is="getIconComponent(value.location_type)" :fill="getColorFill(value.location_type)" class="w-6 h-6 mx-2"/>
                    <div :style="`color:${getColorFill(value.location_type)}`" class="text-xs py-1">{{ getStringValue(value.location_type).toUpperCase() }}</div>
                </div>
                <div class="text-ellipsis flex-1 overflow-hidden whitespace-nowrap font-semibold">{{ value.name }}</div>
                <div class="text-ellipsis flex-1 overflow-hidden whitespace-nowrap font-semibold text-sm text-gray-500">{{ value.name_suffix }}</div>       
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