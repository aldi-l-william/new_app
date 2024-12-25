 export const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return (...args: any[]) => {
        if (timer) clearTimeout(timer); // Reset timer jika pengguna mengetik lagi
        timer = setTimeout(() => {
            func(...args); // Jalankan fungsi setelah delay
        }, delay);
    };
}