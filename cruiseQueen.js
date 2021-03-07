function getSeatNumbers(id) {
    let seatInput = document.getElementById(id);
    let seatNumber = 0;
    // handling the initial empty string input
    if (seatInput.value != "") {
        seatNumber = parseInt(seatInput.value);
    }
    return seatNumber;
}

function setSeatNumbers(id, valueNumber) {
    document.getElementById(id).value = valueNumber;
}

function showCalculatedAmount(id, text) {
    document.getElementById(id).innerText = text;
}

function calculateSubTotal() {
    const fClassSeatCount = getSeatNumbers("first-class-seats");
    const eClassSeatCount = getSeatNumbers("economy-class-seats");
    const subtotal = fClassSeatCount * 150 + eClassSeatCount * 100;
    return subtotal;
}

function calculateCost(className, isIncrease) {
    // Seat Number Increment-Decrement operation and Showing in UI
    const seats = getSeatNumbers(className + "-seats");
    let seatCount = seats;
    if (isIncrease == true) {
        seatCount += 1;
    } else if (isIncrease == false && seatCount > 0) {
        seatCount -= 1;
    }
    setSeatNumbers(className + "-seats", seatCount);

    // Sub Cost Calculation and Showing in UI
    const subCost = calculateSubTotal();
    showCalculatedAmount("sub-total", subCost);

    // Vat Calculation and Showing in UI
    const vat = Math.round(subCost * 0.1);
    showCalculatedAmount("vat", vat);

    // Total Cost Calculation and Showing in UI
    const grandTotal = subCost + vat;
    showCalculatedAmount("grand-total", grandTotal);
}
