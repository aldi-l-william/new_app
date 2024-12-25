export interface RoomImages{
  caption:string;
  size_sm:string;
}

export interface PricingData{
  strikethrough_rate_nightly:number;
  rate_nightly:number;
  price_total:number;
  net_rate_nightly:number;
  wisata_point:number;
  net_price_total:number;
  cashback_rate:number;
}

export interface HotelOffers{
   room_images: RoomImages[];
   room_size_sqm: number;
   room_name:string;
   room_bed_groups:string;
   rate_nightly:number;
   price_total:number;
   cancel_policy_description:string;
   meal_plan_description:string;
   pricing_data: PricingData;
   room_available:number;
}

export interface HotelDetailCollection{
    offers: HotelOffers[];
}