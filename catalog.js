function renderProducts(products) {
    products.forEach(function (item) {
        item.render()
        item.registerEvents()
    })

    isCatalogEmpty = function () {
        return products.length == 0
    }

    if (isCatalogEmpty()) {
        let banner = document.querySelector(".catalog-banner")
        banner.classList.remove("hidden");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    user.load()
    renderCart()
    getProducts()
})
