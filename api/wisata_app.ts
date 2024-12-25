import type { HotelCollection } from "~/interface/Hotel";

export const GetAPIHotelWisataApp = (id: string): Promise<HotelCollection> => {
  return new Promise((resolve, reject) => {
    const url = `https://project-technical-test-api.up.railway.app/property/content?id=${id}&include=image&include=general_info&include=important_info`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse response as JSON
      })
      .then((data) => {
        resolve(data as HotelCollection); // Cast data to the correct type
      })
      .catch((error) => {
        reject(error); // Reject the promise if an error occurs
      });
  });
};

export const GetAPIProduct = (id: string, checkin:string, checkout:string, guest_per_room:number, number_of_room:number, free_cancellation:boolean = false, free_breakfast:boolean = false): Promise<HotelCollection> => {
  return new Promise((resolve, reject) => {
    let url = `https://project-technical-test-api.up.railway.app/stay/availability/${id}?checkin=${checkin}&checkout=${checkout}&guest_per_room=${guest_per_room}&number_of_room=${number_of_room}`;

    // Add parameters dynamically based on their values
    if (free_cancellation) {
      url += `&free_cancellation=${free_cancellation}`;
    }

    if (free_breakfast) {
      url += `&free_breakfast=${free_breakfast}`;
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse response as JSON
      })
      .then((data) => {
        resolve(data as HotelCollection); // Cast data to the correct type
      })
      .catch((error) => {
        reject(error); // Reject the promise if an error occurs
      });
  });
};


