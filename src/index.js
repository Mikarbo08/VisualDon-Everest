import data from '../data/NbDeMortParAnnee.json';

// Function to plot the graph
function plotGraph(data) {
    // Extract years and number of people
    const years = data.map(item => item.Annees);
    const nbPersonnes = data.map(item => item.NbPersonnes);

    // Get the canvas element
    const ctx = document.getElementById('myChart').getContext('2d');

    // Create the chart
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [{
                label: 'Number of deaths',
                data: nbPersonnes,
                borderColor: '#EA5704',
                backgroundColor: '#EA5704',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Call the function to plot the graph
plotGraph(data);
