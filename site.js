let totalSumContainer
let newTotalSum = 0
document.addEventListener('DOMContentLoaded', function () {
    totalSumContainer = document.getElementById("total");
    newTotalSum = parseInt(localStorage.getItem('mySum') || 0)
    renderCart()
})

function addProduct() {
    newTotalSum += 22200
    localStorage.setItem('mySum', newTotalSum)
    renderCart()
}
function renderCart() {
    let dollar = parseInt(newTotalSum / 100)
    let cents = newTotalSum - (dollar * 100)
    let centsZero = "0"
    if (cents > 9){
        centsZero = ""
    }
    let message = "$" + dollar + "." + centsZero + cents
    
    totalSumContainer.innerHTML = message

}