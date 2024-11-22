// script.js

document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expensesContainer = document.getElementById('expenses-container');
    const addExpenseBtn = document.getElementById('add-expense');

    // Initialize Charts
    const ctxBar = document.getElementById('barChart').getContext('2d');
    const ctxPie = document.getElementById('pieChart').getContext('2d');

    let barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['Budget', 'Total Expenses', 'Remaining Budget'],
            datasets: [{
                label: 'Amount (₱)',
                data: [0, 0, 0],
                backgroundColor: ['#ff69b4', '#ff85c2', '#ffe5f0'],
                borderColor: ['#000', '#000', '#000'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    let pieChart = new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                label: 'Expenses',
                data: [],
                backgroundColor: [],
                borderColor: ['#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });

    // Function to add a new expense field
    function addExpenseField() {
        const expenseItem = document.createElement('div');
        expenseItem.classList.add('expense-item', 'mb-3');
        expenseItem.innerHTML = `
            <div class="row">
                <div class="col-6">
                    <input type="text" class="form-control" placeholder="Expense Category" required>
                </div>
                <div class="col-4">
                    <input type="number" class="form-control" placeholder="Amount (₱)" required>
                </div>
                <div class="col-2">
                    <button type="button" class="btn btn-danger remove-expense">&times;</button>
                </div>
            </div>
        `;
        expensesContainer.appendChild(expenseItem);

        // Add event listener to the new remove button
        expenseItem.querySelector('.remove-expense').addEventListener('click', () => {
            expenseItem.remove();
        });
    }

    // Event listener for adding new expense fields
    addExpenseBtn.addEventListener('click', addExpenseField);

    // Event listener for removing expense fields
    expensesContainer.querySelectorAll('.remove-expense').forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.expense-item').remove();
        });
    });

    // Handle form submission
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get budget
        const budget = parseFloat(document.getElementById('budget').value);

        // Get expenses
        const expenseItems = expensesContainer.querySelectorAll('.expense-item');
        let totalExpenses = 0;
        let expenseLabels = [];
        let expenseData = [];
        let expenseColors = [];

        expenseItems.forEach((item, index) => {
            const category = item.querySelector('input[type="text"]').value.trim();
            const amount = parseFloat(item.querySelector('input[type="number"]').value);

            if (category && !isNaN(amount)) {
                totalExpenses += amount;
                expenseLabels.push(category);
                expenseData.push(amount);
                // Generate random pastel colors for the pie chart
                const pastelColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`;
                expenseColors.push(pastelColor);
            }
        });

        // Calculate remaining budget
        const remainingBudget = budget - totalExpenses;

        // Update Bar Chart
        barChart.data.datasets[0].data = [budget, totalExpenses, remainingBudget >= 0 ? remainingBudget : 0];
        barChart.update();

        // Update Pie Chart
        pieChart.data.labels = expenseLabels;
        pieChart.data.datasets[0].data = expenseData;
        pieChart.data.datasets[0].backgroundColor = expenseColors;
        pieChart.update();
    });
});
