//Import

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

document.addEventListener("DOMContentLoaded", function () {
    const svgObject = document.querySelector('.fond');
    svgObject.addEventListener("load", function () {
        const svgDocument = svgObject.contentDocument;

        // Sélectionner l'élément <path> dans le document SVG
        const sommet = svgDocument.getElementById("Sommet");

        // Sélection du rectangle rouge
        const rectangle = document.querySelector(".rectangle");

        // Ajout d'un gestionnaire de clic sur l'élément <path>
        sommet.addEventListener("click", function () {
            // Afficher le rectangle rouge en changeant son style display
            rectangle.style.display = "block";
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const rectangle = document.querySelector(".rectangle");
    const closeContainer = document.querySelector(".close-container");

    // Ajout d'un gestionnaire de clic sur l'élément close-container
    closeContainer.addEventListener("click", function () {
        rectangle.style.display = "none";
    });
});