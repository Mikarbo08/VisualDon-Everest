// Import des fichiers de données
import data from '../data/NbDeMortParAnnee.json';
import dataAlt from '../data/NbDeMortParAltitude.json';

// Import individuel des images
import imgAeroport from '../assets/img/Aeroport.jpg';
import imgCamp1 from '../assets/img/Camp1.jpg';
import imgCamp2 from '../assets/img/Camp2.jpeg';
import imgCamp3 from '../assets/img/Camp3.jpg';
import imgCamp4 from '../assets/img/Camp4.jpg';
import imgCampBase from '../assets/img/CampBase.jpg';
import imgEverest from '../assets/img/Everest.jpg';
import imgFirstClimber from '../assets/img/first_climber.jpg';
import imgInternet from '../assets/img/Internet.jpg';
import imgMorts from '../assets/img/Morts.jpg';
import imgPoubelle from '../assets/img/Poubelle.jpg';
import imgSommet from '../assets/img/Sommet.jpg';
import imgToilettes from '../assets/img/toilettes.jpg';

document.addEventListener("DOMContentLoaded", function () {
    const svgObject = document.querySelector('.fond');
    svgObject.addEventListener("load", function () {
        const svgDocument = svgObject.contentDocument;

        // Création d'un dictionnaire pour associer les IDs avec les données et images spécifiques
        const infoMap = {
            Sommet: { data: dataAlt.find(item => item.Titre === 'Sommet'), img: imgSommet },
            CampBase: { data: dataAlt.find(item => item.Titre === 'Camp de base'), img: imgCampBase },
            Camp1: { data: dataAlt.find(item => item.Titre === 'Camp I'), img: imgCamp1 },
            Camp2: { data: dataAlt.find(item => item.Titre === 'Camp II'), img: imgCamp2 },
            Camp3: { data: dataAlt.find(item => item.Titre === 'Camp III'), img: imgCamp3 },
            Camp4: { data: dataAlt.find(item => item.Titre === 'Camp IV'), img: imgCamp4 },
            Triangle1: { data: dataAlt.find(item => item.Id === 2), img: imgToilettes },
            Triangle2: { data: dataAlt.find(item => item.Id === 4), img: imgAeroport },
            Triangle3: { data: dataAlt.find(item => item.Id === 6), img: imgInternet },
            Triangle4: { data: dataAlt.find(item => item.Id === 8), img: imgMorts },
            Triangle5: { data: dataAlt.find(item => item.Id === 10), img: imgFirstClimber },
            Triangle6: { data: dataAlt.find(item => item.Id === 11), img: imgPoubelle },
            Rond: { data: dataAlt.find(item => item.Id === 13), img: imgEverest },
        };

        // Attacher des gestionnaires de clic pour chaque groupe par ID
        Object.keys(infoMap).forEach(id => {
            const element = svgDocument.getElementById(id);
            if (element && infoMap[id].data) {
                element.style.cursor = "pointer";
                element.addEventListener("click", () => displayInfo(infoMap[id]));
            }
        });
    });


    function displayInfo(info) {
        const rectangle = document.querySelector(".rectangle");
        const texteElements = rectangle.querySelectorAll("p, h1");
        const imageElement = document.querySelector(".image-container img");
        const closeButton = document.querySelector(".close-container img");
        const closeButtonWhite = document.querySelector(".close-container-white img");
        document.getElementById("fond-noir").style.display = "block";

        // Mise à jour des contenus
        rectangle.querySelector(".titre p").textContent = info.data.Titre;
        rectangle.querySelector(".paragraphe p").textContent = info.data.Texte;
        if (isNaN(info.data.Altitudes)) {
            rectangle.querySelector(".altitude h1").textContent = `${info.data.Altitudes}`;
        } else {
            rectangle.querySelector(".altitude h1").textContent = `${info.data.Altitudes} m`;
        }
        rectangle.querySelector(".morts h1").textContent = `${info.data['Nb personnes']}`;
        imageElement.src = info.img;
        imageElement.alt = `Image de ${info.data.Titre}`;

        // Changement des styles et gestion des boutons de fermeture
        if (info.data.Titre === "Anecdote") {
            rectangle.style.backgroundColor = "#003060";
            texteElements.forEach(element => element.style.color = "white");
            closeButton.style.display = "none";           // Cache le bouton par défaut
            closeButtonWhite.style.display = "block";    // Affiche le bouton blanc
        } else {
            rectangle.style.backgroundColor = "white";
            texteElements.forEach(element => element.style.color = "black");
            closeButton.style.display = "block";         // Affiche le bouton par défaut
            closeButtonWhite.style.display = "none";     // Cache le bouton blanc
        }

        rectangle.style.display = "flex";
    }
    document.querySelectorAll(".close-container, .close-container-white img").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelector(".rectangle").style.display = "none";
            document.getElementById("fond-noir").style.display = "none";
        });
    });

});


//Code pour le graphique
// Créer l'élément SVG avec des dimensions plus grandes
const svg = d3.select("#chart")
    .attr("width", 500)  // Nouvelle largeur du SVG
    .attr("height", 300); // Nouvelle hauteur du SVG

// Définir les marges et les dimensions du graphique plus grandes
const margin = { top: 20, right: 20, bottom: 80, left: 60 };
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

svg.selectAll(".domain")
    .attr("stroke", "black"); // Changer la couleur du contour en noir

// Ajouter un titre au graphique
svg.append("text")
    .attr("x", margin.left) // Position X du titre (marge gauche)
    .attr("y", height + margin.top + 60) // Position Y du titre (sous l'axe x)
    .attr("text-anchor", "start") // Alignement du texte (début)
    .style("fill", "black") // Couleur du texte
    .style("font-size", "24px") // Taille de la police
    .style("font-family", "Inika, serif") // Changer la police de caractères
    .text("Nombre de décès par année");

// Ajouter une légende à l'axe y
svg.append("text")
    .attr("transform", `translate(${margin.left - 30}, ${margin.top + height / 100}) rotate(-90)`) // Translation et rotation pour placer le texte à gauche de l'axe y
    .attr("text-anchor", "middle") // Alignement du texte au milieu
    .style("fill", "black") // Couleur du texte
    .style("font-size", "14px") // Taille de la police
    .style("font-family", "Inika, serif") // Changer la police de caractères
    .text("Décès");

// Ajouter une légende à l'axe x
svg.append("text")
    .attr("x", margin.left + width - 10) // Position X de la légende
    .attr("y", height + margin.top + 40) // Position Y de la légende (sous l'axe x)
    .attr("text-anchor", "middle") // Alignement du texte au milieu
    .style("fill", "black") // Couleur du texte
    .style("font-size", "14px") // Taille de la police
    .style("font-family", "Inika, serif") // Changer la police de caractères
    .text("Années");

// Sélectionnez l'élément infobulle et initialisez-le avec D3
const tooltip = d3.select("#tooltip");

// Ajouter les barres au graphique
const bars = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.Annees))
    .attr("y", d => yScale(Math.max(d.NbPersonnes, 0)))
    .attr("width", xScale.bandwidth())
    .attr("height", d => Math.max(height - yScale(d.NbPersonnes), 1))
    .attr("fill", "#EA5704")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseout", mouseout);

// Ajouter des boules pour les barres avec une cause
const markers = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .selectAll(".marker")
    .data(data.filter(d => d.Cause)) // Filtre pour obtenir uniquement les données avec une cause
    .enter().append("circle")
    .attr("class", "marker")
    .attr("cx", d => xScale(d.Annees) + xScale.bandwidth() / 2) // Centrer le cercle sur la barre
    .attr("cy", d => yScale(d.NbPersonnes) - 10) // Placer au-dessus de la barre
    .attr("r", 5) // Rayon du cercle
    .style("fill", "#15a8fb") // Couleur bleue pour plus de visibilité
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseout", mouseout);

// Ajouter une légende pour les bulles bleues
svg.append("circle")
    .attr("cx", width - 310)
    .attr("cy", height + margin.top - 213)
    .attr("r", 7)
    .style("fill", "#15a8fb");

svg.append("text")
    .attr("x", width - 300)
    .attr("y", height + margin.top - 207)
    .attr("text-anchor", "start")
    .style("fill", "black")
    .style("font-size", "14px")
    .style("font-weight", "bold")
    .style("font-family", "Inika, serif")
    .text("Cause insolite");

// Fonctions pour gérer les événements de la souris
function mouseover(event, d) {
    let tooltipHtml = `<strong>Année: ${d.Annees}</strong><br>Nombre de Décès: ${d.NbPersonnes}`;
    if (d.Cause) {
        tooltipHtml += `<br>Cause: ${d.Cause}`;
    } else if (d.NbPersonnes === 0) {
        tooltipHtml += `<br>Aucun décès enregistré`;
    }
    tooltip.style("display", "block")
        .html(tooltipHtml)
        .style("font-family", "Inika, serif")
        .style("left", `${event.pageX + 20}px`)
        .style("top", `${event.pageY - 40}px`);
}

function mousemove(event, d) {
    tooltip.style("left", `${event.pageX + 20}px`)
        .style("top", `${event.pageY - 40}px`);
}

function mouseout() {
    tooltip.style("display", "none");
}
