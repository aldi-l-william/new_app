export const calculateDaysBetweenDates = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Validasi tanggal
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Invalid date format. Use a valid date format such as YYYY-MM-DD.');
  }

  // Hitung perbedaan waktu dalam milidetik
  const timeDifference = end.getTime() - start.getTime();

  // Konversi perbedaan waktu menjadi hari
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  // Tambahkan 1 hari untuk menyertakan tanggal awal
  return daysDifference + 1;
}


export const formatMonth = (monthIndex: number): string => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 
    'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
  ];
  return months[monthIndex] || '';
}

export const formatDateRange = (checkin: string, checkout: string): string => {
  if (!checkin || !checkout) return '';

  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);

  const dayCheckin = checkinDate.getDate();
  const dayCheckout = checkoutDate.getDate();
  const month = formatMonth(checkinDate.getMonth());
  const year = checkinDate.getFullYear();

  return `${dayCheckin} - ${dayCheckout} ${month} ${year}`;
}

