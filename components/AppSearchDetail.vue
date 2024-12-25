<script setup lang="ts">
    import { guardReactiveProps, ref } from 'vue';
    import SearchIcon from '~/public/icons/search.svg';
    import { 
        InputSearchCustomComp,
        DropDownSelectPlaceComp,
        InputDateCheckinCheckoutComp,
        SelectCountDropDownComp 
    } from '#components';
    import { debounce } from '~/utils/fetch/Debounce';
    import { formatMonth } from '~/utils/global/queryUrl';
    import { GetAPIHotelWisataApp, GetAPIProduct } from '~/api/wisata_app';
    import type { HotelData } from '~/interface/Hotel';
    import { useHotelStore } from '~/stores/Hotel';
    import { useRoute, useRouter } from 'vue-router';
    const route = useRoute();
    const router = useRouter();

    // dari pinia
    const hotelStore = useHotelStore();
    // Panggil initializeQuery saat komponen di-mount
    hotelStore.initializeQuery(route);

    const keyword = ref<string>(`${hotelStore.propertyHotel.name},${hotelStore.propertyHotel.name_suffix}`);
    const location = ref<Object>({});

    const slug = ref<any>(route.params.slug as string);
    // Menyimpan tanggal yang dipilih dari child
    const selectedDate = ref<string>('');
  
    
    const emit = defineEmits(['propertyDataUpdated']);

    // Debounced function for API call
    const fetchLocations = debounce(async () => {
        const { data } = await useAsyncData(
            'get-location',
            () => $fetch('https://project-technical-test-api.up.railway.app/location/search', {
                query: {
                    query: keyword.value
                }
            })
        );

        const { data:property } = await useAsyncData(
            'get-location',
            () => $fetch('https://project-technical-test-api.up.railway.app/property/search', {
                query: {
                    query: keyword.value
                }
            })
        );
   
        interface location {
            fuzzy_ration:number;
            highlight_data:object;
            hit_quality:number;
            id:string;
            location_type:string;
            name:string;
            name_suffix:string;
            slug:string;
        }

        const arrayIds:location[] = data.value as location[];
        const arrayIdsProperty:location[] = property.value as location[];
        const mergedArrayIds = [...arrayIds, ...arrayIdsProperty];
       
        if(mergedArrayIds){
            location.value = mergedArrayIds;
        }

    }, 500);

    const property_id = ref('');
    const getPropertyData = async (data:{ id:string; locationType:string; name:string; name_suffix:string; slug:string }) => {
        hotelStore.slug = data.slug;
        property_id.value = data.id;
        keyword.value = `${data.name},${data.name_suffix}`;
        activeDropdown.value = '';
    }
    
    // Watch keyword and call debounced function
    watch(keyword, (newValue) => {
        fetchLocations(newValue);
    });

    // Gunakan satu ref untuk dropdown yang aktif
    const activeDropdown = ref<string>(''); 

    // Fungsi untuk menangani klik pada input pencarian
    const handleInputClick = (event: MouseEvent) => {
        activeDropdown.value = 'search';  // Set dropdown yang aktif ke 'search'
        event.stopPropagation();  // Mencegah klik di luar input
    }

    // Fungsi untuk menangani klik pada input tanggal
    const handleInputDateClick = (event: MouseEvent) => {
        activeDropdown.value = 'date';  // Set dropdown yang aktif ke 'date' 
        event.stopPropagation();  // Mencegah klik di luar input
    }

    // Fungsi untuk menangani klik pada input tamu
    const handleInputGuestClick = (event: MouseEvent) => {
        activeDropdown.value = 'guest';
        event.stopPropagation();  // Set dropdown yang aktif ke 'guest'
    }

    const handleCloseCalendar = () => {
       console.log('Calendar closed');
       activeDropdown.value = '';
    };


    const ambiltanggal = (dateString: string) => {

       
        const regex = /(\d+)\s*-\s*(\d+)\s*(\w+)\s*(\d{4})/;
        const match = dateString.match(regex);

        if (match) {
            const [ , startDay, endDay, month, year ] = match;

            // Fungsi untuk mengonversi bulan menjadi angka
            const monthMapping: { [key: string]: string } = {
                Jan: '01',
                Feb: '02',
                Mar: '03',
                Apr: '04',
                May: '05',
                Jun: '06',
                Jul: '07',
                Aug: '08',
                Sep: '09',
                Oct: '10',
                Nov: '11',
                Des: '12', // Desember
            };

            const numericMonth = monthMapping[month];

            // Format tanggal mulai dan tanggal akhir ke format "YYYY-MM-DD"
            const startDate = `${year}-${numericMonth}-${startDay.padStart(2, '0')}`;
            const endDate = `${year}-${numericMonth}-${endDay.padStart(2, '0')}`;

            hotelStore.checkin = startDate;
            hotelStore.checkout = endDate;
        } else {
            console.error('Invalid date string format');
        }



        
    }

    const handleSelectedDate = (formatted:string) => {
        ambiltanggal(formatted);
        selectedDate.value = formatted;
    };

    const selectedCounter = ref<string>('Single Room x 1');
    // array = 0 itu room array 1 itu guest
    const handleGetCounter = (counter:number[]) => {
        selectedCounter.value = `${counter[1] === 1 ? 'Single Room' : (counter[1] === 2 ? 'Double Room': (counter[1] === 3 ? 'Triple Room':`Group of ${counter[1]}`))} x ${counter[0]}`;
    }

    // Terima data dari child sebagai array
    const handleEmitFromChild = (counter: number[]) => {
        hotelStore.number_of_room = counter[0];
        hotelStore.guest_per_room = counter[1];
        handleGetCounter(counter);
    };

    const handleQueryRoom = () => {
        hotelStore.updateHotelState(property_id.value);

        hotelStore.updatePath(router, `/stay/${hotelStore.slug}`, {
            checkin: hotelStore.checkin,
            checkout: hotelStore.checkout,
            guest_per_room: hotelStore.guest_per_room,
            number_of_room: hotelStore.number_of_room,
        });

        GetAPIHotelWisataApp(property_id.value).then((res) => {
                hotelStore.propertyHotel = res[property_id.value];
        }).catch(err => {
                console.log(err, "err");
        })

        GetAPIProduct(property_id.value, hotelStore.checkin, hotelStore.checkout, hotelStore.guest_per_room, hotelStore.number_of_room).then(res => {
                hotelStore.propertyDetailHotel = res;
            }).catch(err => {
                console.log(err, "error");
            })

        hotelStore.initializeQuery(route); 
    };


      // Perbarui `selectedDate` setiap kali `checkin` atau `checkout` berubah
      watchEffect(() => {
        if (hotelStore.checkin && hotelStore.checkout) {
            const checkinDate = new Date(hotelStore.checkin);
            const checkoutDate = new Date(hotelStore.checkout);
            const dayCheckin = checkinDate.getDate();
            const dayCheckout = checkoutDate.getDate();
            const month = formatMonth(checkinDate.getMonth());
            const year = checkinDate.getFullYear();
            selectedDate.value = `${dayCheckin} - ${dayCheckout} ${month} ${year}`;
        } else {
            selectedDate.value = '';
        }

        handleGetCounter([hotelStore.number_of_room, hotelStore.guest_per_room]);
    });

</script>
<template>
    <div class="flex justify-center">
        <div class="p-4 grid grid-cols-12 gap-2 max-w-425 sm:max-w-1032 w-full mx-auto p-0 rounded-b-lg bg-white shadow-md absolute">
            <div class="col-span-12 sm:col-span-5 sm:relative">
                <InputSearchCustomComp @click="handleInputClick" v-model="keyword"/>
                <DropDownSelectPlaceComp v-if="activeDropdown === 'search'" :informasi_tempat="location" @getData="getPropertyData"/>
            </div>
            <div class="col-span-12 sm:col-span-3 sm:relative">
                <InputDateCheckinCheckoutComp @click="handleInputDateClick" v-model="selectedDate"/>
                <SelectDateDropDownComp v-if="activeDropdown === 'date'" @closeCalendar="handleCloseCalendar" @selectedDate="handleSelectedDate"/>
            </div>
            <div class="col-span-12 sm:col-span-3 sm:relative">
                <SelectGuestRoomsComp @click="handleInputGuestClick" v-model="selectedCounter" />
                <SelectCountDropDownComp v-if="activeDropdown === 'guest'" @getCount="handleEmitFromChild"/>
            </div>
            <div class="col-span-12 sm:col-span-1 w-full">
                <button @click="handleQueryRoom" class="flex justify-center sm:justify-between items-center bg-blue-500 text-white px-1 py-[14px] rounded-md w-full text-sm">
                    <div>
                        <component :is="SearchIcon" :fill="'white'" class="w-4 h-4" />
                    </div>
                    <div class="ml-2">
                        Search
                    </div>
                </button>
            </div>  
        </div>
    </div>  
</template>