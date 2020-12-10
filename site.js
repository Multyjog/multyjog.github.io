let totalSumContainer 
let newTotalSum

function totalSum() {
    newTotalSum += 22200
    let dollar = parseInt(newTotalSum / 100)
    let cents = newTotalSum - (dollar * 100)
    let message = "$" + dollar + "." + cents
    totalSumContainer.innerHTML = message

}
document.addEventListener('DOMContentLoaded', function () {
    newTotalSum = 0
    totalSumContainer = document.getElementById("total");
});