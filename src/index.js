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

// Créer un conteneur pour l'info-bulle
const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Ajouter des événements pour afficher et masquer l'info-bulle
svg.selectAll(".bar")
    .on("mouseover", function (event, d) {
        tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        tooltip.html(`Année: ${d.Annees}<br/>Décès: ${d.NbPersonnes}`)
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function (d) {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    });
