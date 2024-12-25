
export interface HeroImageUrl {
    lg: string;
    md: string;
    sm: string;
    th: string;
    ori: string;
}
  
export interface Catalog {
    fax: string;
    city: string;
    brand: string;
    chain: string;
    phone: string;
    category: string;
    postal_code: string;
    star_rating: number;
    review_count: number;
    review_rating: number;
    hero_image_url: HeroImageUrl;
  }

export interface LinkProperty{
  href:string;
  method:string;
}  

export interface LinkGambar{
  [key:string] : LinkProperty;
}  

export interface Gambar{
  caption: string;
  category: number;
  hero_image: boolean;
  links: LinkGambar;
}
  
export interface Room{
  id:string;
  images:Gambar[];
}

export interface RoomData{
   [key: string]: Room
}

export interface Image{
  caption:string;
  group:string;
  url:HeroImageUrl;
}
  
export interface HotelData {
    id: string;
    slug: string;
    type: string;
    name: string;
    name_suffix: string;
    country_code: string;
    address_line: string;
    latitude: number;
    longitude: number;
    catalog: Catalog;
    room: RoomData;
    image: Image[];
  }
  
export interface HotelCollection {
    [key: string]: HotelData;
}