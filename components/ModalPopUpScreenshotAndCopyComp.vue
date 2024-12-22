<script setup lang="ts">
  import CrossIcon from '~/public/icons/cross.svg';
  import ShareIcon from '~/public/icons/share.svg';
  import ImageIcon from '~/public/icons/imageicon.svg';
  import TextIcon from '~/public/icons/texticon.svg';
  
  const isActive = ref<string>('Text');
  

</script>
  
<template>
    <div>
      <!-- Modal Overlay and Content with transitions -->
      <div 
        class="fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out"
      >
        <div 
          class="bg-white rounded-xl w-[720px] transition-transform duration-300 ease-in-out transform"
        >
          <div class="grid grid-cols-12 rounded-lg">
              <div class="col-span-12 flex justify-between p-4 border-b">
                   <div></div>
                   <div class="flex justify-between items-center">
                      <div class="mx-2">
                         <component :is="ShareIcon" fill="#2563eb" />
                      </div>
                      <div class="font-semibold">
                         Share This Offer
                      </div>
                   </div>
                   <div>
                       <component :is="CrossIcon" :fill="'#808080'" class="w-[35px] h-[35px] p-1 rounded-full hover:bg-gray-100" @click="$emit('close')"/>
                   </div>
              </div>
              <div class="col-span-6">
                  <div class="flex justify-normal">
                      <TabBottomComp :is-active="isActive" :text="'Text'" @activated="isActive = 'Text'" :icon="TextIcon"/>
                      <TabBottomComp :is-active="isActive" :text="'Image'" @activated="isActive = 'Image'" :icon="ImageIcon"/>
                  </div>
                  <div v-if="isActive === 'Text'" class="bg-gray-100 p-3 h-full max-h-[490px] rounded-bl-lg">
                     <div>
                        Fairmont Jakarta
                     </div>
                     <div>
                        Excellent (92 of 100) - 254 reviews
                     </div>
                     <div>
                        4 - 8 Mar 2025 - 4 nights
                     </div>
                     <div>
                        &nbsp;
                     </div>
                     <div>
                        Fairmont, Room, 2 Double Beds
                     </div>
                     <div>
                        2 Double Beds, 49m2
                     </div>
                     <div>
                        Free Breakfast - Free cancellation before 01 Mar 2025
                     </div>
                     <div>
                        Rp 3.525.900 / night
                     </div>
                     <div>
                        Total - Rp 14.103.600 (1 room, 4 nights)
                     </div>
                     <div>
                        &nbsp;
                     </div>
                     <div>
                        *Price is subject to change without prior notice
                     </div>
                  </div>
              </div>
              <div class="col-span-6">
                   <div class="flex justify-between items-center bg-white rounded-tr-xl">
                       <div class="p-3 font-semibold">Room Details</div>
                       <div class="p-3">
                           
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
  
  