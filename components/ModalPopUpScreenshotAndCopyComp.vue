<script setup lang="ts">
  import CrossIcon from '~/public/icons/cross.svg';
  import ShareIcon from '~/public/icons/share.svg';
  import ImageIcon from '~/public/icons/imageicon.svg';
  import TextIcon from '~/public/icons/texticon.svg';
  import ZoomInIcon from '~/public/icons/zoom-in.svg';
  import ZoomInControlIcon from '~/public/icons/zoom-in-control.svg';
  import ZoomOutIcon from '~/public/icons/zoom-out.svg';
  import ZoomOutControlIcon from '~/public/icons/zoom-out-control.svg';
  import CopyPasteIcon from '~/public/icons/copypaste.svg';
  import CopyImageIcon from '~/public/icons/copyimage.svg';
  import DownloadIcon from '~/public/icons/donwload.svg';
  import InfoCopyIcon from '~/public/icons/infocopy.svg';
  import { TitleWithStarComp } from '#components';
  import { defineProps } from 'vue';
  import { useHotelStore } from '~/stores/Hotel';
  import { formatRupiah } from '~/utils/global/formatCurrency';
  import { ref } from 'vue';
  import html2canvas from 'html2canvas';
  
  import '@coddicat/vue-pinch-scroll-zoom/style.css';
  import PinchScrollZoom, {
     PinchScrollZoomDefaultControls,
  type PinchScrollZoomEmitData,
  type PinchScrollZoomExposed
  } from '@coddicat/vue-pinch-scroll-zoom';
  import { formatDateRange, calculateDaysBetweenDates } from '~/utils/global/countDays';

   const hotelStore = useHotelStore();

   const props = defineProps({
      isActive:{
         type:String,
         default:'Text'
      },
      index:{
         type:Number,
         required:true
      }
   })

   console.log(props.index, "indexku")

   const isActiveAddress = ref(true);
   const isHotelReviews = ref(true);
   const isRoomInfo = ref(true);
   const isTotalPrice = ref(true);
   

   const zoomer = ref<PinchScrollZoomExposed>();
   const maxScale = ref<number>(1.2);
   const minScale = ref<number>(1);

// Fungsi untuk menetapkan nilai default
const setDefaultZoom = () => {
  if (zoomer.value) {
      zoomer.value?.setData({
         scale: 1,
         originX: 400,
         originY: 380,
         translateX: 0,
         translateY: 0
      });
  }
};

// Memastikan setDefaultZoom dijalankan setelah komponen siap
onMounted(() => {
  setDefaultZoom();
});

const state = ref({
    eventName: '',
    eventData: {},
    scale: 1,
    originX: 0,
    originY: 0,
    translateX: 0,
    translateY: 0,
  });

function onEvent(name: string, e: PinchScrollZoomEmitData): void {
   state.value = {
      eventName: name,
      eventData: e,
      scale: e.scale,
      originX: e.originX,
      originY: e.originY,
      translateX: e.translateX,
      translateY: e.translateY,
    };
}

const isActive = ref<string>(props.isActive);
const isCopyImage = ref<boolean>(false);
    
const centralize = () => {
   reset();
}

const clickCount = ref(0);

// Nilai default
const defaultValue = {
  scale: 1,
  originX: 400,
  originY: 380,
  translateX: 0,
  translateY: 0,
};

// Fungsi untuk menambahkan nilai scale, translateX, dan translateY
const addScale = () => {
  if (clickCount.value < 2) {
    clickCount.value++; // Increment click count

    // Update defaultValue dengan menambah scale, translateX, dan translateY
    defaultValue.scale += 0.1;
    defaultValue.translateX += 20;
    defaultValue.translateY += 20;

    // Terapkan perubahan pada zoomer
    zoomer.value?.setData({
      scale: defaultValue.scale,
      originX: defaultValue.originX,
      originY: defaultValue.originY,
      translateX: defaultValue.translateX,
      translateY: defaultValue.translateY,
    });
  }
};

// Fungsi untuk menambahkan nilai scale, translateX, dan translateY
const minusScale = () => {
  if (clickCount.value > 0) {
    clickCount.value--; // Increment click count

    // Update defaultValue dengan menambah scale, translateX, dan translateY
    defaultValue.scale -= 0.1;
    defaultValue.translateX -= 20;
    defaultValue.translateY -= 20;

    // Terapkan perubahan pada zoomer
    zoomer.value?.setData({
      scale: defaultValue.scale,
      originX: defaultValue.originX,
      originY: defaultValue.originY,
      translateX: defaultValue.translateX,
      translateY: defaultValue.translateY,
    });
  }
};

const maxDefaultScale = () => {
  // Mengatur ulang click count
  clickCount.value = 2;
  // Mengatur nilai default kembali (untuk skala, translate, dll)
  defaultValue.scale = 1.2;
  defaultValue.translateX = 40;
  defaultValue.translateY = 40;

  // Mengembalikan zoom ke nilai default
  zoomer.value?.setData(defaultValue); 
}

// Fungsi untuk reset zoom dan klik count
const reset = () => {
  // Mengatur ulang click count
  clickCount.value = 0;
  // Mengatur nilai default kembali (untuk skala, translate, dll)
  defaultValue.scale = 1;
  defaultValue.translateX = 0;
  defaultValue.translateY = 0;

  // Mengembalikan zoom ke nilai default
  zoomer.value?.setData(defaultValue);
};

// Inisialisasi default zoom saat komponen dimuat
onMounted(() => {
  zoomer.value?.setData(defaultValue);
});




const textToCopy = ref<any>(null);

const copyToClipboard = () => {
  try {
    const html = textToCopy.value.innerText;
    navigator.clipboard.writeText(html);
    alert('Text Berhasil di salin!');
  } catch (err) {
    console.error('Error copying text to clipboard: ', err);
  }
};


const contentToDownload = ref<any>(null);
const handleDownloadImage = async () => {

   const content = contentToDownload.value;
   
   await html2canvas(content,{useCORS:true}).then((canvas) => {
      // Mengonversi canvas menjadi URL gambar
      const imgUrl = canvas.toDataURL('image/png');
      
      // Membuat elemen <a> untuk mengunduh gambar
      const link = document.createElement('a');
      link.href = imgUrl;
      link.download = 'content-screenshot.png'; // Nama file untuk diunduh
      link.click();
   });
}



const handleCopyImage = async () => {
  const content = contentToDownload.value;

  // Menggunakan html2canvas untuk membuat canvas dari elemen
  html2canvas(content, { useCORS: true }).then((canvas) => {
    // Konversi canvas ke Blob
    canvas.toBlob(async (blob) => {
      if (!blob) {
        console.error("Failed to create image blob");
        return;
      }

      try {
        // Membuat ClipboardItem
        const clipboardItem = new ClipboardItem({ "image/png": blob });

        // Menulis ke clipboard
        navigator.clipboard.write([clipboardItem]);
        alert("Gambar berhasil disalin ke clipboard!");
      } catch (error) {
        console.error("Gagal menyalin gambar ke clipboard:", error);
        alert("Gagal menyalin gambar ke clipboard");
      }
    }, "image/png");
  });
};

</script>
  
<template>
    <div>
      <!-- Modal Overlay and Content with transitions -->
      <div 
        class="fixed inset-0 flex justify-center items-center z-30 transition-opacity duration-300 ease-in-out"
      >
        <div 
          class="bg-white rounded-lg w-[720px] max-h-[606px] h-full transition-transform duration-300 ease-in-out transform"
        >
          <div class="grid grid-cols-12 rounded-lg">
              <div class="col-span-12 flex justify-between p-3 border-b">
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
                       <component :is="CrossIcon" :fill="'#808080'" class="w-[35px] h-[35px] p-1 rounded-full hover:bg-gray-100" @click="$emit('close', props.index)"/>
                   </div>
              </div>
              <div class="col-span-6">
                  <div class="flex justify-normal">
                      <TabBottomComp :is-active="isActive" :text="'Text'" @activated="isActive = 'Text'" :icon="TextIcon" class="text-xs font-semibold"/>
                      <TabBottomComp :is-active="isActive" :text="'Image'" @activated="isActive = 'Image'" :icon="ImageIcon" class="text-xs font-semibold"/>
                  </div>
                  <div ref="textToCopy" v-if="isActive === 'Text'" class="bg-gray-100 p-3 h-[1000px] max-h-[505px] rounded-bl-lg">
                     <div>
                        {{ hotelStore.propertyHotel?.name}}
                     </div>
                     <div v-if="isHotelReviews">
                        Excellent ({{ hotelStore.propertyHotel?.catalog?.review_rating }} of 100) - {{hotelStore.propertyHotel?.catalog?.review_count }} review<span v-if="hotelStore.propertyHotel?.catalog?.review_count > 1">s</span>
                     </div>
                     <div>
                        {{ formatDateRange(hotelStore.checkin, hotelStore.checkout) }} - {{ calculateDaysBetweenDates(hotelStore.checkin, hotelStore.checkout) }} nights
                     </div>
                     <div>
                        &nbsp;
                     </div>
                     <div>
                        {{ hotelStore.propertyDetailHotel?.offers[props.index]?.room_name }}
                     </div>
                     <div v-if="isRoomInfo">
                        {{ hotelStore.propertyDetailHotel?.offers[props.index]?.room_bed_groups }}, {{ hotelStore.propertyDetailHotel?.offers[props.index]?.room_size_sqm }} m2
                     </div>
                     <div>
                        {{  hotelStore.propertyDetailHotel?.offers[props.index]?.meal_plan_description }} - {{  hotelStore.propertyDetailHotel?.offers[props.index]?.cancel_policy_description }}
                     </div>
                     <div>
                        {{ formatRupiah(hotelStore.propertyDetailHotel?.offers[props.index]?.rate_nightly) }} / night
                     </div>
                     <div v-if="isTotalPrice">
                        Total - {{ formatRupiah(hotelStore.propertyDetailHotel?.offers[props.index]?.price_total)}} ({{ hotelStore.number_of_room }} room<span v-if="hotelStore.number_of_room > 1">s</span>, {{ calculateDaysBetweenDates(hotelStore.checkin, hotelStore.checkout) }} nights)
                     </div>
                     <div>
                        &nbsp;
                     </div>
                     <div>
                        *Price is subject to change without prior notice
                     </div>
                  </div>
                  <div v-if="isActive === 'Image'" class="bg-gray-100 max-h-[505px] h-full rounded-bl-lg relative">
                     <PinchScrollZoom
                        ref="zoomer"
                        :within="false"
                        :centered="true"
                        :key-controls="PinchScrollZoomDefaultControls"
                        :draggable="true"
                        :width="360"
                        :height="500"
                        :min-scale="minScale"
                        :max-scale="maxScale"
                        :content-width="0"
                        :content-height="0"
                        :wheel-velocity="0"
                        >  
                           <div class="m-4 p-3 bg-white">
                              <div class="text-sm">
                                 <TitleWithStarComp/>
                              </div>
                              
                              <div class="text-xs" v-if="isHotelReviews">
                                 <ValueReputationReviewComp :percentage="hotelStore.propertyHotel.catalog?.review_rating" :size="25"/>
                              </div>
                              
                              <div class="mb-1 text-xs">
                                  <span class="font-semibold mr-2">{{ formatDateRange(hotelStore.checkin, hotelStore.checkout) }}</span><span class="text-gray-500">- {{ calculateDaysBetweenDates(hotelStore.checkin, hotelStore.checkout) }} nights</span>
                              </div>
                              <img :src="hotelStore.propertyHotel?.catalog?.hero_image_url?.lg" width="360" height="490" class="w-[360px] h-[170px] rounded-md mb-1" />
                              <div class="mb-1 text-sm font-semibold">
                                 {{ hotelStore.propertyDetailHotel?.offers[props.index]?.room_name }}
                              </div>
                              <div class="text-xs mb-1" v-if="isRoomInfo">
                                 <InfoBedAndSizeComp 
                                 :room_bed_groups="hotelStore.propertyDetailHotel?.offers[props.index]?.room_bed_groups" 
                                 :room_size_sqm="hotelStore.propertyDetailHotel?.offers[props.index]?.room_size_sqm"/>
                              </div>
                              <div class="text-xs mb-1">
                                 <DateCancellationComp :cancel_policy_description="hotelStore.propertyDetailHotel?.offers[props.index]?.cancel_policy_description"/>
                              </div>
                              <div class="text-sm">
                                 <PricePerNightComp :rate_nightly="formatRupiah(hotelStore.propertyDetailHotel?.offers[props.index]?.rate_nightly)"/>
                              </div>
                              <div class="text-xs text-gray-500" v-if="isTotalPrice">
                                 Total - {{ formatRupiah(hotelStore.propertyDetailHotel?.offers[props.index]?.price_total)}} ({{ hotelStore.number_of_room }} room<span v-if="hotelStore.number_of_room > 1">s</span>, {{ calculateDaysBetweenDates(hotelStore.checkin, hotelStore.checkout) }} nights)
                              </div>
                              <div>
                                 &nbsp;
                              </div>
                              <div class="text-xs text-gray-500">
                                 *Price is subject to change without prior notice
                              </div>
                           </div>
                           
                        </PinchScrollZoom>
                        <div class="absolute bottom-0.5 right-3 flex justify-normal p-1">
                           <div @click="centralize()" class="bg-white rounded-l border-gray border">
                              <component :is="ZoomInIcon" fill="'#000000'" class="w-6 h-6 m-1"/>
                           </div>
                           <div class="bg-white border-gray border-r border-t border-b" @click="minusScale">
                              <component :is="ZoomInControlIcon" fill="'#000000'" class="w-6 h-6 m-1"/>
                           </div>
                           <div class="bg-white border-gray border-r border-t border-b" @click="addScale">
                              <component :is="ZoomOutControlIcon" fill="'#000000'" class="w-6 h-6 m-1"/>
                           </div>
                           <div class="bg-white rounded-r border-gray border-r border-t border-b" @click="maxDefaultScale">
                              <component :is="ZoomOutIcon" fill="'#000000'" class="w-6 h-6 m-1"/>
                           </div>
                        </div>
                  </div>
              </div>
              <div class="col-span-6">
                   <div class="bg-white rounded-tr-xl">
                       <ConfigDescriptionHotelComp :isCondition="isActiveAddress" settingName="Address"
                       @click="isActiveAddress = !isActiveAddress"/>
                       <ConfigDescriptionHotelComp :isCondition="isHotelReviews" settingName="Hotel reviews" @click="isHotelReviews = !isHotelReviews"/>
                       <ConfigDescriptionHotelComp :isCondition="isRoomInfo" settingName="Room info (bed type, room size, view)"
                       @click="isRoomInfo = !isRoomInfo"/>
                       <ConfigDescriptionHotelComp :isCondition="isTotalPrice" settingName="Total Price"
                       @click="isTotalPrice = !isTotalPrice"/>
                   </div>
                   <div class="py-3 flex justify-around border-t border-gray-300 fixed bottom-0 w-1/2">
                       <div class="border border-blue-500 flex justify-normal items-center hover:bg-blue-100 py-1 px-8 ml-2 rounded-md" @click="copyToClipboard">
                           <div><component :is="CopyPasteIcon" fill="#2563eb" class="w-4 h-4"/></div>
                           <div class="text-blue-500 text-sm">Copy as Text</div>
                       </div>
                       <div class="border border-blue-500 flex justify-normal items-center hover:bg-blue-100 py-1 px-6 mr-2 rounded-md" @click="isCopyImage = true">
                           <div><component :is="CopyImageIcon" fill="#2563eb" class="w-4 h-4"/></div>
                           <div class="text-blue-500">Copy as Image</div>
                       </div>
                   </div>
              </div>
          </div>     
        </div>
      </div>
      <div class="bg-gray-400 absolute inset-0 w-full z-30" v-if="isCopyImage" @click="isCopyImage = false">
         <div class="flex justify-center items-center w-full h-full">
            <div class="flex items-start justify-center w-4/12 h-3/4 max-h-[500px] bg-gray-100 relative z-40 rounded-xl" @click.stop>
               <div ref="contentToDownload" class="my-4 p-3 bg-white relative w-full h-full max-w-[250px] max-h-[320px] z-50 rounded-lg shadow-xl">
                              <div class="text-xs">
                                 <TitleWithStarComp/>
                              </div>
                              
                              <div class="text-xs" v-if="isHotelReviews">
                                 <ValueReputationReviewComp :percentage="hotelStore.propertyHotel.catalog?.review_rating" :size="20"/>
                              </div>
                              
                              <div class="mb-1 text-xs">
                                  <span class="font-semibold mr-2">{{ formatDateRange(hotelStore.checkin, hotelStore.checkout) }}</span><span class="text-gray-500">- {{ calculateDaysBetweenDates(hotelStore.checkin, hotelStore.checkout) }} nights</span>
                              </div>
                              <img :src="hotelStore.propertyHotel?.catalog?.hero_image_url?.lg" width="180" height="85" class="w-[400px] h-[85px] rounded-md mb-1" />
                              <div class="mb-1 text-xs font-semibold">
                                 {{ hotelStore.propertyDetailHotel?.offers[props.index]?.room_name }}
                              </div>
                              <div class="text-xs mb-1" v-if="isRoomInfo">
                                 <InfoBedAndSizeComp 
                                 :room_bed_groups="hotelStore.propertyDetailHotel?.offers[props.index]?.room_bed_groups" 
                                 :room_size_sqm="hotelStore.propertyDetailHotel?.offers[props.index]?.room_size_sqm"/>
                              </div>
                              <div class="text-xs mb-1">
                                 <DateCancellationComp :cancel_policy_description="hotelStore.propertyDetailHotel?.offers[props.index]?.cancel_policy_description"/>
                              </div>
                              <div class="text-xs">
                                 <PricePerNightComp :rate_nightly="formatRupiah(hotelStore.propertyDetailHotel?.offers[props.index]?.rate_nightly)"/>
                              </div>
                              <div class="text-xs text-gray-500" v-if="isTotalPrice">
                                 Total - {{ formatRupiah(hotelStore.propertyDetailHotel?.offers[props.index]?.price_total)}} ({{ hotelStore.number_of_room }} room<span v-if="hotelStore.number_of_room > 1">s</span>, {{ calculateDaysBetweenDates(hotelStore.checkin, hotelStore.checkout) }} nights)
                              </div>
                              <div>
                                 &nbsp;
                              </div>
                              <div class="text-xs text-gray-500">
                                 *Price is subject to change without prior notice
                              </div>
               </div>
               <div class="bg-white h-[200px] max-h-[150px] w-full absolute bottom-0 rounded-b-xl py-4">
                  <div class="flex justify-between items-center hover:bg-gray-100 mx-4 border rounded my-1" @click="handleCopyImage">
                     <div class="flex justify-normal items-center p-4">
                        <div class="mx-4"><component :is="CopyPasteIcon" fill="" class="w-4 h-4" /></div>
                        <div>Copy to Clipboard</div>
                     </div>
                     <div class="p-4">
                        <component :is="InfoCopyIcon" fill="" class="w-4 h-4" />
                     </div>
                  </div>
                  <div class="mx-4 hover:bg-gray-100 py-4 border my-1" @click="handleDownloadImage">
                     <div class="flex justify-normal items-center px-4">
                        <div class="mx-4">
                           <component :is="DownloadIcon" fill="" class="w-4 h-4" />
                        </div>
                        <div>Save image</div>
                     </div>
                  </div>
                  
               </div>
            </div>
            
         </div> 
      </div>
    </div>
</template>
<style scoped>

</style>
  
  