import { defineStore } from 'pinia';


export const useHotelStore = defineStore('counter', {

  state:() => {
      return {
        propertyHotelID:'',
        checkin:'',
        checkout:'',
        guest_per_room:1,
        number_of_room:1,
        slug:'',
        propertyHotel:{},
        propertyDetailHotel:{}
      }
  },
  
  actions: {
    initializeQuery(route:any) {
      // Dapatkan route aktif
      this.slug = route.params.slug as string || '';
      const propertyId = this.slug.split('-');
      this.propertyHotelID = propertyId[propertyId.length - 1];
      this.checkin = route.query.checkin as string || '2024-12-1'; // Ambil query "checkin"
      this.checkout = route.query.checkout as string || '2024-12-31'; // Ambil query "checkout"
      this.guest_per_room = Number(route.query.guest_per_room) || 1;
      this.number_of_room = Number(route.query.number_of_room) || 1;
    },
    updateHotelState(propertyHotelID:string){
      this.propertyHotelID = propertyHotelID;
    },
    updatePath(router:any, newPath:string, query: Record<string, any> = {}){
      // history di browser tercatat sehingga bisa back kembali ke halaman sebelumnya
      router.push({path:newPath, query});
    },
    replacePath(router:any, newPath:string, query: Record<string, any> = {}){
      // history di browser tidak tercatat
      router.replace({path: newPath, query});
    },
    reloadPage() {
      window.location.reload();
    },
  }

})