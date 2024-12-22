<script setup lang="ts">
  import { CarouselImageComp } from '#components';
  import CrossIcon from '~/public/icons/cross.svg';
  
</script>
  
<template>
    <div>
      <!-- Modal Overlay and Content with transitions -->
      <div 
        class="fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out"
      >
        <div 
          class="bg-white rounded-xl w-[900px] h-[74%] transition-transform duration-300 ease-in-out transform"
        >
          <div class="grid grid-cols-11 bg-black rounded-xl">
              <div class="col-span-6 my-20">
                <div>
                  <CarouselImageComp/>
                </div>
              </div>
              <div class="col-span-5">
                   <div class="flex justify-between items-center bg-white rounded-tr-xl">
                       <div class="p-3 font-semibold">Room Details</div>
                       <div class="p-3">
                           <component :is="CrossIcon" :fill="'#007aff'" class="w-8 h-8 p-1 rounded-full hover:bg-blue-100" @click="$emit('close')"/>
                       </div>
                   </div>
                   <div class="bg-white h-[500px] overflow-y-auto border border-gray-300 p-4 rounded-br-xl">
Fairmont, Room, 2 Double Beds

 2 Double Beds
 49 m2
Room Amenities

Bedroom

Air conditioning
Premium bedding
Free cribs/infant beds
Bedsheets provided
Number of beds - 1
Wardrobe or closet
Change of bed sheets (on request)
Bathroom

Private bathroom
Hair dryer
Designer toiletries
Bidet
Separate bathtub and shower
Deep soaking bathtub
Rainfall showerhead
Towels provided
Change of towels (on request)
Entertainment

Television
Cable/satellite TV service
Pay movies
Premium TV channels
Digital TV service
Flat-panel TV
iPod docking station
Food and Drink

Minibar
Coffee/tea maker
Room service (24 hours)
Free bottled water
Full-sized refrigerator/freezer
Internet

Dial-up internet access
High-speed internet access
Free WiFi
Free wired internet
More

Alarm clock
Free newspaper
Daily housekeeping
Phone
Bathrobes
Iron/ironing board
In-room safe
Desk
Separate sitting area
Soundproofed rooms
Turndown service
Slippers
Smoking and Non-Smoking
Housekeeping on request
Laptop-friendly workspace
Eco-friendly cleaning products provided
Desk chair
Energy-saving features in guest rooms
                   </div>
              </div>
          </div>
          
        </div>
      </div>
    </div>
</template>
  
  