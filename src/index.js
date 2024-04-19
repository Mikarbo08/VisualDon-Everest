//Import

import data from '../data/NbDeMortParAnnee.json';



document.addEventListener("DOMContentLoaded", function () {
    // Attendre que le SVG soit complètement chargé
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



// Créer l'élément SVG
const svg = d3.select("#chart");

// Définir les marges et les dimensions du graphique
const margin = { top: 20, right: 20, bottom: 50, left: 50 };
const width = +svg.attr("width") - margin.left - margin.right;
const height = +svg.attr("height") - margin.top - margin.bottom;

// Créer l'échelle des axes
const xScale = d3.scaleBand()
    .range([0, width])
    .padding(0.1)
    .domain(data.map(d => d.Annees));

const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(data, d => d.NbPersonnes)]);

// Ajouter les barres au graphique
svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.Annees))
    .attr("y", d => yScale(d.NbPersonnes))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - yScale(d.NbPersonnes))
    .attr("fill", "#EA5704");

// Définir les étiquettes à afficher sur l'axe x (par exemple, chaque deuxième année)
const tickValues = data.map(d => d.Annees).filter((d, i) => i % 5 === 0);

// Ajouter les axes au graphique
svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .call(d3.axisLeft(yScale));

svg.append("g")
    .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
    .call(d3.axisBottom(xScale).tickValues(tickValues));
