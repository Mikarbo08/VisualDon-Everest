// Fonction pour changer la couleur de remplissage de l'élément SVG
function changeColor() {
    // Accéder au document SVG via l'objet <object> et son attribut contentDocument
    const svgDocument = document.querySelector('.fond').contentDocument;

    // Sélectionner l'élément <path> dans le document SVG
    const rectangle = svgDocument.getElementById("RectangleTest");

    // Changer la couleur de remplissage de l'élément <path>
    rectangle.style.fill = "blue"; // Nouvelle couleur
}

// Exemple d'animation : changement de couleur après un délai de 1 seconde
setTimeout(changeColor, 2000);