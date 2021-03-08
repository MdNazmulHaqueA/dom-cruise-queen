//Initially hide the booking details and Checkout Contents
function hideBlock(id) {
    document.getElementById(id).style.display = "none";
}
hideBlock("showOnSubmit");
hideBlock("showOnCheckout");

// Function for showing hidden block when needed
function showBlock(id) {
    document.getElementById(id).style.display = "block";
}

// Dealing with input seat numbers - initial empty string handled
function getSeatNumbers(id) {
    let seatInput = document.getElementById(id);
    let seatNumber = 0;

    if (seatInput.value != "") {
        seatNumber = parseInt(seatInput.value);
    }
    return seatNumber;
}

// Showing seat numbers on UI after clicking + or -
function setSeatNumbers(id, valueNumber) {
    document.getElementById(id).value = valueNumber;
}

// Showing Values / Texts
function showChangedAmountOrText(id, amount) {
    document.getElementById(id).innerText = amount;
}

// Calculate individual costs - SubTotal, Vat and GrandTotal and return for future use!
function getCosts() {
    const fClassSeatCount = getSeatNumbers("first-class-seats");
    const eClassSeatCount = getSeatNumbers("economy-class-seats");
    const subTotal = fClassSeatCount * 150 + eClassSeatCount * 100;
    const vat = Math.round(subTotal * 0.1);
    const grandTotal = subTotal + vat;
    return [fClassSeatCount, eClassSeatCount, subTotal, vat, grandTotal];
}

// + - event handler function
function costCalculator(className, isIncrease) {
    // Seat Number Increment-Decrement operation
    const seats = getSeatNumbers(className + "-seats");
    let seatCount = seats;
    if (isIncrease == true) {
        seatCount += 1;
    } else if (isIncrease == false && seatCount > 0) {
        seatCount -= 1;
    }
    setSeatNumbers(className + "-seats", seatCount); // Showing Seat numbers in UI

    // Cost Calculations and  Showing them in UI
    const calculateCost = getCosts();
    showChangedAmountOrText("sub-total", calculateCost[2]);
    showChangedAmountOrText("vat", calculateCost[3]);
    showChangedAmountOrText("grand-total", calculateCost[4]);
}

// Booking Summary Page
function marginTopOnMainContent(topValue) {
    return (document.querySelector(".main-content").style.marginTop = topValue);
}

// Book Now Event handler function
function orderDetails() {
    const costSummary = getCosts();
    // costSummary[4] refers to the grandTotal, when grandTotal is 0, user can't access order details page
    if (costSummary[4] != 0) {
        //Changing heading for the order details page
        showChangedAmountOrText("booking-heading", "Your Order Details");
        hideBlock("calculation-area");
        hideBlock("showOnCheckout");
        showBlock("showOnSubmit");
        showChangedAmountOrText("f-class-seats", costSummary[0]);
        showChangedAmountOrText("e-class-seats", costSummary[1]);
        showChangedAmountOrText("sub-cost", costSummary[2]);
        showChangedAmountOrText("total-vat", costSummary[3]);
        showChangedAmountOrText("total-cost", costSummary[4]);
        marginTopOnMainContent("100px");
    } else {
        alert("You Have to Pick at least one Seat!");
    }
}

// CheckOut Page functionalities
function checkoutMsg() {
    hideBlock("booking-heading");
    hideBlock("booking-info-area");
    hideBlock("showOnSubmit");
    showBlock("showOnCheckout");
    document.body.style.backgroundAttachment = "fixed";
    marginTopOnMainContent("200px");
}
