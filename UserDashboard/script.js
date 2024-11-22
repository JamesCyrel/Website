// Line Chart: Monthly Expenses
var ctxLine = document.getElementById('lineChart').getContext('2d');
var lineChart = new Chart(ctxLine, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            label: 'Expenses ($)',
            data: [1200, 1500, 800, 1700, 1900, 1400],
            borderColor: '#ff69b4',  // Pink Line
            fill: false,
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'black'  // Text color
                }
            },
            title: {
                display: true,
                text: 'Monthly Expenses'
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'black'
                }
            },
            y: {
                ticks: {
                    color: 'black'
                }
            }
        }
    }
});

// Pie Chart: Expense Breakdown
var ctxPie = document.getElementById('pieChart').getContext('2d');
var pieChart = new Chart(ctxPie, {
    type: 'pie',
    data: {
        labels: ['Rent', 'Utilities', 'Groceries', 'Transport', 'Entertainment'],
        datasets: [{
            label: 'Expense Breakdown',
            data: [500, 200, 300, 100, 150],
            backgroundColor: [
                '#ff69b4',  // Pink
                '#343a40',  // Black
                '#f8f9fa',  // Light (for contrast)
                '#ff85c2',  // Light Pink
                '#ffc0cb'   // Light Coral
            ],
            hoverOffset: 4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'black'
                }
            },
            title: {
                display: true,
                text: 'Expense Breakdown'
            }
        }
    }
});
