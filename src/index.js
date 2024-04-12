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