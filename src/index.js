
// Import du fichier de données
import data from '../data/NbDeMortParAnnee.json';
// Import des données JSON
import dataAlt from '../data/NbDeMortParAltitude.json';

document.addEventListener("DOMContentLoaded", function () {
    const svgObject = document.querySelector('.fond');
    svgObject.addEventListener("load", function () {
        const svgDocument = svgObject.contentDocument;

        // Création d'un dictionnaire pour associer les IDs avec les données
        const infoMap = {};
        dataAlt.forEach(item => {
            const id = item.Titre.replace(/\s+/g, ""); // Enlever les espaces
            infoMap[id] = item;
        });

        // Attacher des gestionnaires de clic pour chaque groupe par ID
        ['Sommet', 'CampBase', 'Camp4', 'Camp1', 'Camp2', 'Camp3'].forEach(id => {
            const element = svgDocument.getElementById(id);
            if (element && infoMap[id]) {
                element.style.cursor = "pointer"; // Change le curseur pour indiquer que c'est cliquable
                element.addEventListener("click", function () {
                    displayInfo(infoMap[id]);
                });
            }
        });
    });

    // Fonction pour afficher les informations
    function displayInfo(info) {
        const rectangle = document.querySelector(".rectangle");
        const titreElement = document.querySelector(".titre p");
        const paragrapheElement = document.querySelector(".paragraphe p");
        const altitudeElement = document.querySelector(".altitude h1");
        const mortsElement = document.querySelector(".morts h1");
        const imageElement = document.querySelector(".image-container img");

        // Mise à jour des éléments avec les données
        titreElement.textContent = info.Titre;
        paragrapheElement.textContent = info.Texte;
        altitudeElement.textContent = `${info.Altitudes} m`;
        mortsElement.textContent = `${info['Nb personnes']}`;
        imageElement.src = `/${info['Image']}.`;
        imageElement.alt = `Image de ${info.Titre}`;

        // Afficher le rectangle
        rectangle.style.display = "flex";
    }

    // Gestionnaire pour fermer le rectangle
    document.querySelector(".close-container").addEventListener("click", function () {
        document.querySelector(".rectangle").style.display = "none";
    });
});








//Code pour le graphique
// Créer l'élément SVG avec des dimensions plus petites
const svg = d3.select("#chart")
    .attr("width", 500)  // Nouvelle largeur du SVG
    .attr("height", 300); // Nouvelle hauteur du SVG

// Définir les marges et les dimensions du graphique plus petites
const margin = { top: 10, right: 10, bottom: 60, left: 40 };
const width = svg.attr("width") - margin.left - margin.right;
const height = svg.attr("height") - margin.top - margin.bottom;

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
const tickValues = data.map(d => d.Annees).filter((d, i) => i % 10 === 0);

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
    .attr("y", height + margin.top + 42) // Position Y du titre (sous l'axe x)
    .attr("text-anchor", "start") // Alignement du texte (début)
    .style("fill", "black") // Couleur du texte
    .style("font-size", "24px") // Taille de la police
    .style("font-family", "Inika, serif") // Changer la police de caractères
    .text("Nombre de morts par année");

// Ajouter une légende à l'axe y
svg.append("text")
    .attr("transform", `translate(${margin.left - 25}, ${margin.top + 30}) rotate(-90)`) // Translation et rotation pour placer le texte à gauche de l'axe y
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
