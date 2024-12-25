export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0, // Anda dapat menyesuaikan jumlah desimal di sini
    maximumFractionDigits: 2, // Maksimal 2 digit desimal
  }).format(amount);
}

export const convertToPercentage = (rate: number): string => {
  // Pastikan nilai berada dalam rentang 0 hingga 1
  if (rate < 0 || rate > 1) {
    throw new Error('Nilai rate harus berada dalam rentang 0 hingga 1');
  }
  return `${(rate * 100).toFixed(0)}%`; // Mengalikan dengan 100 dan format dengan 2 desimal
}