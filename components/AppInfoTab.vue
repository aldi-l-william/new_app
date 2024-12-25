<script setup lang="ts">
   import { useHotelStore } from '~/stores/Hotel';
   const hotelStore = useHotelStore();
</script>
<template>
     <div>
        <div class="text-2xl font-semibold mb-4">Checkin</div>
        <ul class="list-disc mb-12">
           
           <li>Begin Time: {{ hotelStore.propertyHotel?.important_info?.checkin?.begin_time }}</li>
           <li>End Time: {{ hotelStore.propertyHotel?.important_info?.checkin?.end_time }}</li>
           <li>
               Instructions: <span v-html="hotelStore.propertyHotel?.important_info?.checkin?.instructions"></span>
           </li>
           <li>
               Special Instructions : {{ hotelStore.propertyHotel?.important_info?.checkin?.special_instructions }}
           </li>
        </ul>

        <div class="text-2xl font-semibold mb-4">Checkout</div>
        <ul class="list-disc mb-12">  
           <li>Time: {{ hotelStore.propertyHotel?.important_info?.checkout?.time }}</li>
        </ul>

        <div class="text-2xl font-semibold mb-4">Fees: </div>
        <ul class="list-disc mb-12">
           <li><span v-html="hotelStore.propertyHotel?.important_info?.fees?.optional"></span></li>
        </ul>

        <div class="text-2xl font-semibold mb-4">
             Policies
        </div>
        <ul class="list-disc mb-12">
          <li>Know before you go: <span v-html="hotelStore.propertyHotel?.important_info?.policies.know_before_you_go"></span></li>
        </ul>        
     </div>  
</template>