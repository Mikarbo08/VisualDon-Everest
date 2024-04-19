// Import du fichier de données
import data from '../data/NbDeMortParAnnee.json';

// Attendre que le SVG soit complètement chargé
document.addEventListener("DOMContentLoaded", function () {
    const svgObject = document.querySelector('.fond');
    svgObject.addEventListener("load", function () {
        const svgDocument = svgObject.contentDocument;

        // Sélectionner l'élément <path> dans le document SVG
        const sommet = svgDocument.getElementById("Sommet");

        // Ajouter un gestionnaire de clic pour ajouter un rectangle devant l'élément <path>
        sommet.addEventListener("click", function () {
            // Dimensions de la fenêtre
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            // Créer un élément <rect> dans le SVG
            const rect = svgDocument.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("width", windowWidth);   // Largeur du rectangle = largeur de la fenêtre
            rect.setAttribute("height", windowHeight); // Hauteur du rectangle = hauteur de la fenêtre
            rect.setAttribute("x", 0);             // Position X du rectangle = 0 (coin supérieur gauche de l'écran)
            rect.setAttribute("y", 0);             // Position Y du rectangle = 0 (coin supérieur gauche de l'écran)
            rect.setAttribute("fill", "red");        // Couleur de remplissage du rectangle

            // Ajouter le rectangle au SVG
            svgDocument.documentElement.appendChild(rect);
        });
    });
});

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
