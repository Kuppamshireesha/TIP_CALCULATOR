document.addEventListener('DOMContentLoaded', function () {
    // Get the elements you need
    const billInput = document.querySelector('.label');
    const tipButtons = document.querySelectorAll('.btn');
    const customTipInput = document.querySelector('#customTip');
    const peopleInput = document.querySelector('.label1');
    const tipPerson = document.querySelector('#tipPerson');
    const totalPerson = document.querySelector('#totalPerson');
    const resetButton = document.querySelector('#resetValues');
    const calculateButton = document.querySelector('#calculateButton');

    // Initialize variables to track input completion
    let billCompleted = false;
    let tipCompleted = false;
    let peopleCompleted = false;

    // Function to calculate tip and total
    function calculateTip(bill, tipPercentage, numberOfPeople) {
        const tip = (bill * tipPercentage) / 100;
        const total = (bill + tip) / numberOfPeople;
        return { tip, total };
    }

    // Function to update the results
    function updateResults() {
        if (billCompleted && ((tipCompleted || customTipInput.value) && peopleCompleted)) {
            const bill = parseFloat(billInput.value) || 0;
            const numberOfPeople = parseFloat(peopleInput.value) || 1;
            let tipPercentage = 0;

            if (customTipInput.value) {
                tipPercentage = parseFloat(customTipInput.value);
            } else {
                tipButtons.forEach(button => {
                    if (button.classList.contains('active')) {
                        tipPercentage = parseFloat(button.innerText);
                    }
                });
            }

            const { tip, total } = calculateTip(bill, tipPercentage, numberOfPeople);
            tipPerson.innerText = tip.toFixed(2);
            totalPerson.innerText = total.toFixed(2);
        }
    }

    // Function to reset values
    function resetValues() {
        billInput.value = '';
        customTipInput.value = '';
        peopleInput.value = '';
        tipPerson.innerText = '0.00';
        totalPerson.innerText = '0.00';
        tipButtons.forEach(button => {
            button.classList.remove('active');
        });

        // Reset input completion variables
        billCompleted = false;
        tipCompleted = false;
        peopleCompleted = false;
        calculateButton.disabled = true;
    }

    // Add event listeners
    billInput.addEventListener('input', () => {
        billCompleted = billInput.value !== '';
        updateResults();
    });
    
    tipButtons.forEach(button => {
        button.addEventListener('click', () => {
            tipButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            tipCompleted = true;
            updateResults();
        });
    });
    
    customTipInput.addEventListener('input', () => {
        tipCompleted = customTipInput.value !== '';
        updateResults();
    });

    peopleInput.addEventListener('input', () => {
        peopleCompleted = peopleInput.value !== '';
        updateResults();
    });

    resetButton.addEventListener('click', resetValues);
    calculateButton.addEventListener('click', updateResults);
});
