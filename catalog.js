document.addEventListener('DOMContentLoaded', function () {
    user.load()
    renderCart()
    let products = API.getProducts().map( // for each element of massive complete the function and return a new massive 
        function (item) {
            return new Product(item)
        }
    )
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
})