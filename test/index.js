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
    const interestTableBody = document.querySelector("#interest-table tbody");
    const principalInput = document.getElementById("principal");
    const rateInput = document.getElementById("rate");
    const yearsInput = document.getElementById("years");
    //const monthsInput = document.getElementById("months");

    let principal = Number(principalInput.value);
    let rate = Number(rateInput.value / 100);
    let years = Number(yearsInput.value);
    //let months = Number(monthsInput.value);

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

    /*
    if (months < 0 || isNaN(months)) {
        months = 0;
        monthsInput.value = 0;
    }*/

    // Clear previous table rows
    interestTableBody.innerHTML = '';

    // Convert months into a fraction of a year
    //const monthsInYears = months / 12;

    let totalInterest = 0;
    let totalAmount = principal;

    for (let i = 1; i <= years; i++) {
        // Calculate interest for this year
        const interestThisYear = totalAmount * rate;

        // Add interest for this year to total interest
        totalInterest += interestThisYear;

        // Update total amount with interest for this year
        totalAmount += interestThisYear;

        // Create a new row for the table
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${i}</td>
            <td>${interestThisYear.toLocaleString(undefined, { style: "currency", currency: selectedCurrency })}</td>
            <td>${totalInterest.toLocaleString(undefined, { style: "currency", currency: selectedCurrency })}</td>
            <td>${totalAmount.toLocaleString(undefined, { style: "currency", currency: selectedCurrency })}</td>`;

        // Append the new row to the table body
        interestTableBody.appendChild(newRow);
    }

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