let totalSumContainer
let newTotalSum = 0

document.addEventListener('DOMContentLoaded', function () {
    totalSumContainer = document.getElementById("total");
    newTotalSum = parseInt(localStorage.getItem('mySum') || 0)
    renderCart()
    let products = API.getProducts().map( // для каждого элемента массива выполняет функцию и возвращает новый массив 
        function (item) {
            return new Product(item)
        }
    )
    products.forEach(function (item) {
        item.render()
    })
    let addButtons = Array.from(document.getElementsByClassName("add-to-cart-trigger"))
    addButtons.forEach(function (addButton) {
        addButton.addEventListener('click', addProduct)
    })
})

function addProduct(event) {
    let addButton = event.target
    newTotalSum += parseInt(addButton.dataset.price)
    localStorage.setItem('mySum', newTotalSum)
    console.log(newTotalSum)
    renderCart()
}

function renderCart() {
    totalSumContainer.innerHTML = renderSum(newTotalSum)
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



function Product(item) {
    this.id = item.id
    this.title = item.title
    this.price = item.price
    this.render = function () {
        let invCard = document.getElementById("hiddenCard")
        let invCardParent = invCard.parentNode
        let clnInvCard = invCard.cloneNode(true)
        clnInvCard.id = "product_" + this.id
        let cardTitle = clnInvCard.getElementsByClassName("card-title")[0]
        cardTitle.innerHTML = this.title
        let cardCosts = clnInvCard.getElementsByClassName("card-costs")[0]
        cardCosts.innerHTML = renderSum(this.price)
        let addButton = clnInvCard.getElementsByClassName("add-to-cart-trigger")[0]
        addButton.dataset.price = this.price

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
    }
}
API = { //Это сервер в перспективе
    getProducts: function () { //Это его метод
        return [
            { id: 0, title: "BABKIN STUL", price: 10000 },
            { id: 1, title: "VIPooP", price: 60000 },
            { id: 2, title: "CHERKASH INTELLIGENTA", price: 30000 },
            { id: 3, title: "TVOROZNIY KAL", price: 15000 },
            { id: 4, title: "ANALNYA ZHIZHA", price: 20000 },
            { id: 5, title: "LICHINKA TVOEY MAMASHI", price: 50000 },
        ]
    }
}


// let totalSumContainer
// let newTotalSum

// function totalSum() {
//     newTotalSum += 22200
//     let dollar = parseInt(newTotalSum / 100)
//     let cents = newTotalSum - (dollar * 100)
//     let message = "$" + dollar + "." + cents
//     totalSumContainer.innerHTML = message

// }
// document.addEventListener('DOMContentLoaded', function () {
//     newTotalSum = 0
//     totalSumContainer = document.getElementById("total");
// });

// let calculator = {
//     sum() {
//       return this.a + this.b;
//     },

//     mul() {
//       return this.a * this.b;
//     },

//     read() {
//       this.a = +prompt('a?', 0);
//       this.b = +prompt('b?', 0);
//     }
//   };

// function Calculator(a, b) {
//     this.a = a;
//     this.b = b;
//     this.sum = function () {
//         return this.a + this.b;
//     }
// }

// let calculator = new Calculator(2, 2);
// let calculator2 = new Calculator(5, 3);
// calculator.sum()
// calculator2.sum()

// function Accumulator(startingValue) {
//     this.value = startingValue;
//     this.read = function (mul) {
//         this.value = this.value + mul
//         return this.value
//     }
//     this.prompt = function () {
//         return this.read(+prompt())

//     }
//     this.readTwo = function (mul, mulTwo) {
//         this.read(mul)
//         return this.read(mulTwo)
//     }
//     this.reset = function (value) {
//         this.value = value
//     }
//     this.isPositive = function () {
//         return this.value > 0
//     }
//     this.render = function (element){
//         element.innerHTML = "accumulator has value: " + this.value
//     }

// }

// let accumulator = new Accumulator(45)

