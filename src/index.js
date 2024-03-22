// Fonction pour changer la couleur de remplissage de l'élément SVG
function changeColor() {
    // Accéder au document SVG via l'objet <object> et son attribut contentDocument
    const svgObject = document.querySelector('.fond');
    const svgDocument = svgObject.contentDocument;

    // Sélectionner l'élément <path> dans le document SVG
    const rectangle = svgDocument.getElementById("RectangleTest");

    // Changer la couleur de remplissage de l'élément <path>
    rectangle.style.fill = "blue"; // Nouvelle couleur
}

// Exemple d'animation : changement de couleur après un délai de 2 secondes
setTimeout(changeColor, 2000);

const fs = require('fs');
const d3 = require('d3');

const filePath = './data/NbDeMortParAltitute.csv';

fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
        console.error('Error reading file:', error);
        return;
    }

    // Utiliser d3.csvParse() pour analyser les données CSV
    const results = d3.csvParse(data);

    console.log(results);
});
