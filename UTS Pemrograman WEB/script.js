const cart = [];

// Tambahkan event listener ke tombol "Tambahkan ke Keranjang"
document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));
        addToCart(name, price);
    });
});

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    if (cart.length === 0) {
        cartDiv.innerHTML = '<p>Keranjang kosong.</p>';
        return;
    }
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.name} - Rp${formatRupiah(item.price)} x ${item.quantity}`;
        const addBtn = document.createElement('button');
        addBtn.textContent = '+';
        addBtn.onclick = () => increaseQuantity(index);
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '-';
        removeBtn.onclick = () => decreaseQuantity(index);
        itemDiv.appendChild(addBtn);
        itemDiv.appendChild(removeBtn);
        cartDiv.appendChild(itemDiv);
    });
}

function increaseQuantity(index) {
    cart[index].quantity += 1;
    updateCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
}

function checkout() {
    if (cart.length === 0) {
        alert('Keranjang kosong!');
        return;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    localStorage.setItem('total', total);
    window.location.href = 'checkout.html';
}

function formatRupiah(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Event listener untuk tombol checkout
document.getElementById('checkout-btn').addEventListener('click', checkout);
// Event listener tombol tambah
const addButtons = document.querySelectorAll('.add-btn');

addButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.textContent = 'Ditambahkan!';
        button.style.backgroundColor = '#28a745';
        setTimeout(() => {
            button.textContent = 'Tambah ke Keranjang';
            button.style.backgroundColor = '#007bff';
        }, 1500);
    });
});
