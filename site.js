let user = new User()
function renderCart() {
    let totalSumContainer = document.getElementById("total");
    totalSumContainer.innerHTML = renderSum(user.getCartSum())
}

function renderSum(price) {
    let dollar = parseInt(price / 100)
    let cents = price - (dollar * 100)
    let centsZero = "0"
    if (cents > 9) {
        centsZero = ""
    }
    let message = "$" + dollar + "." + centsZero + cents
    return message
}

function modalRender(product) {
    let modal = document.querySelector("#firstmodalCenter")
    let modalPrice = modal.querySelector(".modal-price")
    let modalTitle = modal.querySelector(".modal-title")
    let modalWeight = modal.querySelector(".modal-weight")
    let modalButton = modal.querySelector(".modal-button")
    let newModalButton = modalButton.cloneNode(true);
    modalButton.parentNode.replaceChild(newModalButton, modalButton);
    newModalButton.addEventListener('click', function () {
        user.addOrder(product)

    })
    modalTitle.innerHTML = product.title
    modalPrice.innerHTML = renderSum(product.price)
    modalWeight.innerHTML = product.weight

}

function User() {
    this.email = "ddasdasd@.com"
    this.orders = []
    this.asObj = function () {
        return {
            orders: this.orders.map(function (product) {
                return product.asObj()
            }) // return the list
        }
    }
    this.save = function () {
        localStorage.setItem("user", JSON.stringify(this.asObj()))
    }
    this.load = function () {
        let saveData = localStorage.getItem("user")
        if (!saveData) return
        let savedUser = JSON.parse(saveData)
        this.orders = savedUser.orders.map(function (product) {
            return new Product(product)
        })

    }
    this.getCartSum = function () {
        let result = 0
        this.orders.forEach(function (product) {
            result += product.price * product.quantity
        })
        return result
    }
    this.addOrder = function (product) {
        if (this.hasProductInCart(product)) {
            Toastify({
                text: product.title + " already in your cart!",
                duration: 3000,
                close: true,
            }).showToast()
            return
        }
        this.orders.push(product)
        this.save()
        renderCart()
        let myToast = Toastify({
            text: "Added " + product.title + " in your cart!",
            duration: 3000,
            close: true,
        })
        myToast.showToast()
    }
    this.delOrder = function (product) {
        let newOrders = this.orders.filter(function (order) {
            return order.id !== product.id
        })
        this.orders = newOrders

        if (this.isCartEmpty()) {
            let banner = document.querySelector(".cart-banner")
            banner.classList.remove("hidden");
        }
        renderCart()
        this.save()
    }
    this.hasProductInCart = function (product) {
        let existingIds = this.orders.map(function (order) {
            return order.id
        })
        return existingIds.includes(product.id)
    }
    this.isCartEmpty = function () {
        return this.orders.length == 0
    }
}

function Product(item) {
    this.quantity = item.quantity || 1
    this.id = item.id
    this.title = item.title
    this.price = item.price
    this.card = undefined
    this.weight = item.weight
    this.asObj = function () {
        return {
            quantity: this.quantity,
            id: this.id,
            title: this.title,
            price: this.price,
            weight: this.weight,
        }
    }
    this.registerEvents = function () {
        let product = this
        let addButton = this.card.querySelector(".add-to-cart-trigger")
        addButton.addEventListener('click', function () {
            user.addOrder(product)
        })
        let cardTitle = this.card.querySelector(".card-title")
        cardTitle.addEventListener('click', function () {
            modalRender(product)
        })

    }
    this.render = function () {
        let invCard = document.getElementById("hiddenCard")
        let invCardParent = invCard.parentNode
        let clnInvCard = invCard.cloneNode(true)
        clnInvCard.id = "product_" + this.id
        let cardTitle = clnInvCard.getElementsByClassName("card-title")[0]
        cardTitle.innerHTML = this.title
        let cardCosts = clnInvCard.getElementsByClassName("card-cost")[0]
        cardCosts.innerHTML = renderSum(this.price)
        let cardWeight = clnInvCard.getElementsByClassName("card-weight")[0]
        cardWeight.innerHTML = this.weight

        let carousel = clnInvCard.querySelector(".carousel")
        let carouselId = "carousel_" + this.id
        carousel.id = carouselId

        let carouselImgs = Array.from(clnInvCard.querySelectorAll("li"))
        carouselImgs.forEach(function (carouselImg) {
            carouselImg.dataset.target = "#" + carouselId
        })
        clnInvCard.querySelector(".carousel-control-prev").setAttribute("href", "#" + carouselId)
        clnInvCard.querySelector(".carousel-control-next").setAttribute("href", "#" + carouselId)

        invCardParent.appendChild(clnInvCard)
        this.card = clnInvCard
    }
    this.renderCartItem = function () {
        let invCartCard = document.getElementById("hidden-cart-card")
        let invCartCardParent = invCartCard.parentNode
        let clnInvCC = invCartCard.cloneNode(true)
        clnInvCC.id = "product_" + this.id
        let cCardTitle = clnInvCC.getElementsByClassName("ccard-title")[0]
        cCardTitle.innerHTML = this.title
        let cCardCost = clnInvCC.getElementsByClassName("ccard-cost")[0]
        cCardCost.innerHTML = renderSum(this.price)
        let cCardWeight = clnInvCC.getElementsByClassName("ccard-weight")[0]
        cCardWeight.innerHTML = this.weight
        let inputQuantity = clnInvCC.getElementsByClassName("quantity-input")[0]
        inputQuantity.value = this.quantity

        invCartCardParent.appendChild(clnInvCC)
        this.cartCard = clnInvCC

    }
    this.registerCartEvents = function () {
        let product = this
        let quantityInput = this.cartCard.querySelector(".quantity-input")
        quantityInput.addEventListener('change', function () {
            product.quantity = parseInt(quantityInput.value)
            renderCart()
            user.save()
        })
        let closeButton = this.cartCard.querySelector(".close-button")
        closeButton.addEventListener('click', function () {
            user.delOrder(product)
            product.cartCard.remove()

        })

    }
}
API = { //This is our future server
    getProducts: function () { //This is his method
        return [
            { id: 0, title: "BABKIN STUL", price: 10000, weight: "120g" },
            { id: 1, title: "VIPooP", price: 60000, weight: "70g" },
            { id: 2, title: "CHERKASH INTELLIGENTA", price: 30000, weight: "5 pieces" },
            { id: 3, title: "TVOROZNIY KAL", price: 15000, weight: "100g" },
            { id: 4, title: "ANALNYA ZHIZHA", price: 20000, weight: "500ml" },
            { id: 5, title: "LICHINKA TVOEY MAMASHI", price: 50000, weight: "82kg" },
        ]
    }
}


