document.addEventListener('DOMContentLoaded', () => {
    const savingPlanForm = document.getElementById('saving-plan-form');
    const totalBudgetInput = document.getElementById('total-budget');
    const addTaskBtn = document.getElementById('add-task');
    const budgetTableContainer = document.getElementById('budget-table-container');
    const budgetTableBody = document.getElementById('budget-table-body');
    const emergencyFundElement = document.getElementById('emergency-fund');
    const remainingBudgetElement = document.getElementById('remaining-budget');
    const emergencyInput = document.getElementById('emergency-input');

    let emergencyFund = 0; // Store emergency fund to persist between tasks

    // Function to add a new task row
    function addTaskRow() {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>
                <input type="date" class="form-control task-date" required> </td> <td> <input type="text" class="form-control task-name" placeholder="Enter task" required> </td> <td> <input type="number" class="form-control task-amount" placeholder="Enter amount (₱)" required> </td> `;
                budgetTableBody.appendChild(row);
            }
            
            // Add a task row when "Add Task" is clicked
            addTaskBtn.addEventListener('click', addTaskRow);
            
            // Handle form submission to calculate the saving plan
            savingPlanForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const totalBudget = parseFloat(totalBudgetInput.value);
                emergencyFund = parseFloat(emergencyInput.value) || emergencyFund; // Only update emergency fund if new value is provided
            
                emergencyFundElement.textContent = emergencyFund.toFixed(2);
            
                // Calculate total expenses and gather task data
                let totalExpenses = 0;
                const taskRows = budgetTableBody.querySelectorAll('tr');
                taskRows.forEach(row => {
                    const amount = parseFloat(row.querySelector('.task-amount').value);
                    totalExpenses += amount;
                });
            
                // Calculate remaining budget
                const remainingBudget = totalBudget - totalExpenses - emergencyFund;
                remainingBudgetElement.textContent = remainingBudget.toFixed(2);
            
                // Show the table and results
                budgetTableContainer.style.display = 'block';
            });
            
            // Toggle sidebar visibility
            const sidebar = document.getElementById('sidebar');
            const mainContent = document.getElementById('main-content');
            const toggleBtn = document.getElementById('toggle-btn');
            
            toggleBtn.addEventListener('click', () => {
                sidebar.classList.toggle('hide');
                mainContent.classList.toggle('expanded');
            });
        });            