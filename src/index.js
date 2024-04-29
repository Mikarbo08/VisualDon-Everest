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

// Maintenant que toutes les images sont importées, on peut les utiliser directement dans le code
document.addEventListener("DOMContentLoaded", function () {
    const svgObject = document.querySelector('.fond');
    const svgLines = document.querySelectorAll('.cls-1'); // Sélectionner les lignes SVG
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

    // Fonction pour afficher les informations et ajuster les couleurs
    function displayInfo(info) {
        const rectangle = document.querySelector(".rectangle");
        const texteElements = rectangle.querySelectorAll("p, h1");
        const svgLines = document.querySelectorAll(".cls-1"); // Sélectionner les lignes SVG pour modifier le stroke
        const imageElement = document.querySelector(".image-container img");

        // Mise à jour des contenus
        rectangle.querySelector(".titre p").textContent = info.data.Titre;
        rectangle.querySelector(".paragraphe p").textContent = info.data.Texte;
        rectangle.querySelector(".altitude h1").textContent = `${info.data.Altitudes} m`;
        rectangle.querySelector(".morts h1").textContent = `${info.data['Nb personnes']}`;
        imageElement.src = info.img;
        imageElement.alt = `Image de ${info.data.Titre}`;

        // Changement des styles en fonction du titre
        if (info.data.Titre === "Anecdote") {
            rectangle.style.backgroundColor = "#003060";
            texteElements.forEach(element => element.style.color = "white");
            svgLines.forEach(line => line.style.stroke = "white"); // Changer la couleur des lignes SVG en blanc
        } else {
            rectangle.style.backgroundColor = "white";
            texteElements.forEach(element => element.style.color = "black");
            svgLines.forEach(line => line.style.stroke = "black"); // Rétablir la couleur des lignes SVG en noir
        }

        rectangle.style.display = "flex";
    }


    // Gestionnaire pour fermer le rectangle
    document.querySelector(".close-container").addEventListener("click", () => {
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
