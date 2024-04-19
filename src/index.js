// Import des données
import data from '../data/NbDeMortParAnnee.json';

document.addEventListener("DOMContentLoaded", function () {
    const svgObject = document.querySelector('.fond');
    svgObject.addEventListener("load", function () {
        const svgDocument = svgObject.contentDocument;

        // Sélectionner l'élément <path> dans le document SVG
        const sommet = svgDocument.getElementById("Sommet");

        // Sélection du rectangle rouge
        const rectangleRouge = document.querySelector(".rectangle");

        // Ajout d'un gestionnaire de clic sur l'élément <path>
        sommet.addEventListener("click", function () {
            // Afficher le rectangle rouge en changeant son style display
            rectangleRouge.style.display = "block";
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

// Créer l'élément SVG
const svg = d3.select("#chart");

// Définir les marges et les dimensions du graphique
const margin = { top: 20, right: 20, bottom: 75, left: 50 };
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
const yAxis = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .call(d3.axisLeft(yScale));

yAxis.selectAll("text")
    .attr("fill", "black"); // Changer la couleur du texte en noir

yAxis.selectAll("line")
    .attr("stroke", "black"); // Changer la couleur des barres en noir

const xAxis = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
    .call(d3.axisBottom(xScale).tickValues(tickValues));

xAxis.selectAll("text")
    .attr("fill", "black"); // Changer la couleur du texte en noir

xAxis.selectAll("line")
    .attr("stroke", "black"); // Changer la couleur des barres en noir

svg.selectAll(".domain") // Changer la couleur des lignes des axes
    .attr("stroke", "black"); // Changer la couleur du contour en noir

// Ajouter un titre au graphique
svg.append("text")
    .attr("x", margin.left) // Position X du titre (marge gauche)
    .attr("y", height + margin.top + 55) // Position Y du titre (sous l'axe x)
    .attr("text-anchor", "start") // Alignement du texte (début)
    .style("fill", "black") // Couleur du texte
    .style("font-size", "28px") // Taille de la police
    .style("font-family", "Inika, serif") // Changer la police de caractères
    .text("Nombre de morts par année");

// Ajouter une légende à l'axe y
svg.append("text")
    .attr("transform", `translate(${margin.left - 25}, ${margin.top}) rotate(-90)`) // Translation et rotation pour placer le texte à gauche de l'axe y
    .attr("text-anchor", "middle") // Alignement du texte au milieu
    .style("fill", "black") // Couleur du texte
    .style("font-size", "14px") // Taille de la police
    .style("font-family", "Inika, serif") // Changer la police de caractères
    .text("Décès");

// Ajouter une légende à l'axe x
svg.append("text")
    .attr("x", margin.left - 30 + width) // Position X de la légende
    .attr("y", height + margin.top + 35) // Position Y de la légende (sous l'axe x)
    .attr("text-anchor", "middle") // Alignement du texte au milieu
    .style("fill", "black") // Couleur du texte
    .style("font-size", "14px") // Taille de la police
    .style("font-family", "Inika, serif") // Changer la police de caractères
    .text("Années");
