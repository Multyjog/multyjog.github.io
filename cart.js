document.addEventListener('DOMContentLoaded', function () {
    user.load()
    renderCart()
    user.orders.forEach(function (item) {
        item.renderCartItem()
        item.registerCartEvents()
    })
    if (user.isCartEmpty()) {
        let banner = document.querySelector(".cart-banner")
        banner.classList.remove("hidden");
    }
})