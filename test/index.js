let selectedCurrency = 'USD'; // Default selected currency

function selectCurrency(currency) {
    // Remove the 'selected' class from all buttons
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => button.classList.remove('selected'));
    
    // Add the 'selected' class to the clicked button
    const selectedButton = document.getElementById(currency);
    selectedButton.classList.add('selected');
    
    // Update the selected currency
    selectedCurrency = currency;
    
    // Recalculate and update the result
    calculate();
}

function calculate() {
    const totalAmountSpan = document.getElementById("total-amount");
    const profitSpan = document.getElementById("profit-amount");
    const principalInput = document.getElementById("principal");
    const rateInput = document.getElementById("rate");
    const yearsInput = document.getElementById("years");
    const monthsInput = document.getElementById("months");

    let principal = Number(principalInput.value);
    let rate = Number(rateInput.value / 100);
    let years = Number(yearsInput.value);
    let months = Number(monthsInput.value);

    if (principal < 0 || isNaN(principal)) {
        principal = 0;
        principalInput.value = 0;
    }

    if (rate < 0 || isNaN(rate)) {
        rate = 0;
        rateInput.value = 0;
    }

    if (years < 0 || isNaN(years)) {
        years = 0;
        yearsInput.value = 0;
    }

    if (months < 0 || isNaN(months)) {
        months = 0;
        monthsInput.value = 0;
    }

    // Convert months into a fraction of a year
    const monthsInYears = months / 12;

    // Calculate the total amount including months
    const totalYears = years + monthsInYears;
    const totalAmount = principal * Math.pow((1 + rate), totalYears);

    // Calculate the profit
    const profit = totalAmount - principal;

    totalAmountSpan.textContent = totalAmount.toLocaleString(undefined, {
        style: "currency",
        currency: selectedCurrency
    });

    profitSpan.textContent = profit.toLocaleString(undefined, {
        style: "currency",
        currency: selectedCurrency
    });
}