// Ambil data dari LocalStorage
const cart = JSON.parse(localStorage.getItem('cart'));
const total = parseInt(localStorage.getItem('total'));

// Tampilkan detail checkout
const checkoutDetails = document.getElementById('checkout-details');
if (cart && cart.length > 0) {
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.name} - Rp${formatRupiah(item.price)} x ${item.quantity}`;
        checkoutDetails.appendChild(itemDiv);
    });
    document.getElementById('total-price').textContent = `Total Pembayaran: Rp${formatRupiah(total)}`;
} else {
    checkoutDetails.textContent = 'Keranjang kosong.';
}

// Tambahkan event listener untuk tombol bayar
document.getElementById('pay-btn').addEventListener('click', () => {
    const paymentMethod = document.getElementById('payment-method').value;
    if (cart && cart.length > 0) {
        document.getElementById('confirmation-message').textContent = `Pembayaran berhasil menggunakan metode ${getPaymentMethodName(paymentMethod)}. Terima kasih!`;
        localStorage.clear(); // Hapus data keranjang setelah pembayaran
    } else {
        alert('Tidak ada item untuk dibayar.');
    }
});

// Fungsi untuk mengubah metode pembayaran ke nama yang lebih jelas
function getPaymentMethodName(method) {
    switch (method) {
        case 'cash':
            return 'Cash';
        case 'credit':
            return 'Kartu Kredit';
        case 'transfer':
            return 'Transfer Bank';
        case 'ewallet':
            return 'E-Wallet';
        default:
            return 'Metode Tidak Dikenal';
    }
}

// Fungsi format Rupiah
function formatRupiah(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
