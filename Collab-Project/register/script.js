let id=0;
document.getElementById('enrollmentForm').addEventListener('submit', displayData);

function displayData(event) {
    event.preventDefault(); // Prevent form submission

    const formData = new FormData(event.target);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Store data in local storage
    let storedData = JSON.parse(localStorage.getItem('formData')) || [];
    storedData.push(data);
    localStorage.setItem('formData', JSON.stringify(storedData));

    // Clear previous table data and display new data
    updateTable();
    
    // Optionally clear the form after submission
    event.target.reset();
}

function updateTable() {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = ''; // Clear previous data

    const storedData = JSON.parse(localStorage.getItem('formData')) || [];

    storedData.forEach(data => {
        for (const [key, value] of Object.entries(data)) {
            const row = document.createElement('tr');
            const cell1 = document.createElement('td');
            const cell2 = document.createElement('td');

            cell1.textContent = key;
            cell2.textContent = value;

            row.appendChild(cell1);
            row.appendChild(cell2);
            tableBody.appendChild(row);
        }
    });
}

// Load data from local storage when the page loads
document.addEventListener('DOMContentLoaded', updateTable);
