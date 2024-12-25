<script setup lang="ts">
  import { CarouselImageComp, CarouselMobileComp } from '#components';
  import CrossIcon from '~/public/icons/cross.svg';
  import { defineProps } from 'vue';
  import BedIcon from '~/public/icons/bed.svg';
  import BoxIcon from '~/public/icons/box.svg';
  import BathIcon from '~/public/icons/bathroom.svg';
  import EnterIcon from '~/public/icons/entertainment.svg';
  import FoodIcon from '~/public/icons/foodanddrink.svg';
  import InternetIcon from '~/public/icons/internet.svg';
  import MoreIcon from '~/public/icons/more.svg';
  import BackIcon from '~/public/icons/backleft.svg';
  import { useHotelStore } from '~/stores/Hotel';

  const hotelStore = useHotelStore();

  const props = defineProps({
    index:{
      type:Number,
      required:true
    }
  })

  const filteredAmenities:any = computed(() =>
    Object.values(hotelStore.propertyHotel?.general_info?.amenities).filter((amenity:any) => amenity.categories)
  );

  const capitalizeFirstLetter = (text:string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  
</script>
  
<template>
    <!-- Modal Pop Up Versi Desktop -->
    <div class="hidden sm:block">
      <div>
      <!-- Modal Overlay and Content with transitions -->
      <div 
        class="fixed inset-0 flex justify-center items-center z-20 transition-opacity duration-300 ease-in-out"
      >
        <div 
          class="bg-white rounded-xl w-[900px] h-[74%] transition-transform duration-300 ease-in-out transform"
        >
          <div class="grid grid-cols-11 bg-black rounded-xl">
              <div class="col-span-6 my-20">
                  <CarouselImageComp :index="props.index"/>
              </div>
              <div class="col-span-5">
                   <div class="flex justify-between items-center bg-white rounded-tr-xl">
                       <div class="p-3 font-semibold">Room Details</div>
                       <div class="p-3">
                        <component :is="CrossIcon" :fill="'#007aff'" class="w-8 h-8 p-1 rounded-full hover:bg-blue-100" @click="$emit('close')"/>
                       </div>
                   </div>
                   <div class="bg-white h-[500px] overflow-y-auto border border-gray-300 p-4 rounded-br-xl">
                         <div class=" font-semibold">{{ hotelStore.propertyDetailHotel?.offers[props.index]?.room_name }}</div>

                         <div class=" flex justify-normal items-center mb-4">
                           <div class="mr-4"><component :is="BedIcon" fill="#808080" class="w-4 h-4" /></div> 
                           <div class="mr-4">{{ hotelStore.propertyDetailHotel?.offers[props.index]?.room_bed_groups }}</div>
                           <div class="mr-4"><component :is="BoxIcon" fill="#808080" class="w-4 h-4" /></div>
                           <div>{{ hotelStore.propertyDetailHotel?.offers[props.index]?.room_size_sqm }}m2</div>
                         </div>

                         <div class="my-4 font-semibold">Room Amenities</div>
                         <div v-for="(amenity, index) in filteredAmenities" :key="index+'amenities'">
                            <div class="flex justify-normal items-center">
                              <div>{{ capitalizeFirstLetter(amenity.categories.join(", ")) }}</div>
                            </div>
                            <div>
                              <ul class="list-disc pl-6">
                                <li class="pr-4 text-sm text-gray-500">{{ amenity.name }}</li>
                              </ul>
                            </div>
                         </div>
                         

                   </div>
              </div>
          </div>
          
        </div>
      </div>
      </div> 
    </div>
    <!-- Modal Pop Up Versi Mobile -->
    <div class="block sm:hidden">
        <div class="flex justify-normal items-center bg-white py-3 w-full sticky top-0 shadow-xl">
              <button @click="$emit('close')">
                <component :is="BackIcon" fill="#007aff" class="w-4 h-4"/>
              </button>
              <div class="flex justify-center items-center">
                  <div class="font-semibold">Room Detail</div>
              </div>
        </div>
        <div class="overflow-y-auto h-screen z-30">
          <div class="relative">
             <CarouselMobileComp :index="props.index"/>
          </div>
          <div class="bg-white border border-gray-300 p-4 rounded-br-xl">
                         <div class=" font-semibold">{{ hotelStore.propertyDetailHotel?.offers[props.index]?.room_name }}</div>

                         <div class=" flex justify-normal items-center mb-4">
                           <div class="mr-4"><component :is="BedIcon" fill="#808080" class="w-4 h-4" /></div> 
                           <div class="mr-4">{{ hotelStore.propertyDetailHotel?.offers[props.index]?.room_bed_groups }}</div>
                           <div class="mr-4"><component :is="BoxIcon" fill="#808080" class="w-4 h-4" /></div>
                           <div>{{ hotelStore.propertyDetailHotel?.offers[props.index]?.room_size_sqm }}m2</div>
                         </div>

                         <div class="my-4 font-semibold">Room Amenities</div>
                         <div v-for="(amenity, index) in filteredAmenities" :key="index+'amenities'">
                            <div class="flex justify-normal items-center">
                              <div>{{ capitalizeFirstLetter(amenity.categories.join(", ")) }}</div>
                            </div>
                            <div>
                              <ul class="list-disc pl-6">
                                <li class="pr-4 text-sm text-gray-500">{{ amenity.name }}</li>
                              </ul>
                            </div>
                         </div>
                         

          </div>
        </div>  
    </div>
    
</template>
  
  