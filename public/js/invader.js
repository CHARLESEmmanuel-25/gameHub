/* 
  Super Bonus :
  - aujoute la propriété des styles + une propriété qui va contenir le style selectionné (en cours)
  - Ajouter en HTML une div, qui va contenir les différentes couleurs
  - style la palette en css
  - au click d'une couleur, cela selectionne la couleur et change la valeur de styleSelected
  - au click d'un pixel, ajoute la class du style selectionné (couleur que l'on va définir en CSS)
  - au click d'un meme pixel, supprime la class couleur qui a été ajouté precedement (quelque soit)
*/

const app = {
  form: null,
  gridArea: null,
  pixelSize: 20,
  gridSize: 8,
  //* ajoute des données globales
  styles: ['plain', 'empty', 'light', 'highlight'],
  styleSelected: 'empty',
  init: function () {
    // recupere les éléments dans le init()
    // pour etre sur que le html est bien chargé et donc que les élements sont construit
    app.form = document.querySelector('form');
    app.gridArea = document.querySelector('#invader');
    // EXECUTION DES FONCTIONS AU LANCEMENT
    // initialisation du formulaire html
    app.fillForm();
    // génération d'une grille par défaut
    app.generateArea(app.gridSize);
    //* génération de la palette
    app.generatePalette();
  },
  generateArea: function () {
    // on va imbriquer 2 boucles pour créer autant de lignes et de colonnes que nécessaire
    // Les lignes
    for (let index = 0; index < app.gridSize; index++) {
      // on crée un conteneur par ligne
      const row = document.createElement('div');
      // on va sortir toutes les instructions relatives aux styles dans une fonction n'ayant que cette responsabilité
      app.setRowStyle(row);
      // une fois la ligne créé, les colonnes de chaque lignes
      // on crée autant de colonnes que nécessaire pour chaque ligne
      for (let i = 0; i < app.gridSize; i++) {
        // Colonnes de chaque ligne
        // on crée un pixel
        const pixel = document.createElement('div');
        // on définit les styles du pixel dans une fonction dédiée
        app.setPixelStyle(pixel);
        // on ajoute le pixel à la ligne
        row.appendChild(pixel);
        // on écoute l'événement "click" sur le nouveau pixel
        pixel.addEventListener('click', app.handlePixelClick);
      }
      // on ajoute la ligne au container qui recoit la grille
      app.gridArea.appendChild(row);
    }
  },
  setRowStyle: function (row) {
    row.setAttribute('class', 'row'); // ou row.className = 'row'
  },
  setPixelStyle: function (pixel) {
    // on rajoute 2 classes à notre pixel :
    // la première générique la bordure et le type de pointeur
    pixel.classList.add('pixel');
    // la deuxième pour rajouter une couleur de base au pixel
    pixel.classList.add('pixel--empty');
    pixel.style.width = `${app.pixelSize}px`;
    pixel.style.height = `${app.pixelSize}px`;
  },
  handlePixelClick: function (event) {
    // on peut récupérer l'élement sur lequel l'événement s'est déclénché via target
    // console.log(event.target);
    const pixel = event.target;
    // methode 1:
    // verifie si la class est présente ou non, add ou remove la class suivant la condition
    /* if (pixel.classList.contains('pixel--plain')) {
        // si tu as la class 'pixel--plain'
        // supprime la
        pixel.classList.remove('pixel--plain');
        // ajoute la class 'pixel--empty'
        pixel.classList.add('pixel--empty');
      } else {
        // ajoute la class 'pixel--plain'
        pixel.classList.add('pixel--plain');
        // supprime la class 'pixel--empty'
        pixel.classList.remove('pixel--empty');
      } */

    //* Change bien la couleur, mais une seul fois ???
    //* c'est normal, on enchaine l'ajout de class couleur sans supprimer les précédentes !

    //* Methode 1 :
    //* reset la class a 'pixel'
    //* puis ajoute la nouvelle class
    /* pixel.className = 'pixel';
      pixel.classList.add(`pixel--${app.styleSelected}`); */
    //* gros incovéninent, si on ajoute d'autres class ?? Cela va toutes les supprimer !!!

    //* Methode 2 :
    //* faire un remove classList de pixel--"style", POUR CHAQUE STYLE existant
    //* qu'il soit sur l'élément ou non
    //* DEMO FOR...OF
    //* PUIS forEach
    app.styles.forEach((currentStyle) => {
      pixel.classList.remove(`pixel--${currentStyle}`);
    });
    pixel.classList.add(`pixel--${app.styleSelected}`);
  },
  clearGridArea: function () {
    app.gridArea.innerHTML = '';
  },
  fillForm: function () {
    // on factorise la création d'input dans une fonction
    // comme ca si l'on veut en créer plusieur ;)
    app.generateInput('Taille de la grille');

    // On ajoute un champ en plus pour choisir la taille des pixels
    app.generateInput('Taille des pixels');

    // on crée le bouton du formulaire
    const button = document.createElement('button');
    // autre possibilité d'ajouter des attributs
    button.type = 'submit';
    button.id = 'submit';
    button.textContent = 'Valider';
    app.form.appendChild(button);
    // on écoute la soumission du form, plus pratique pour la soumission au clavier
    app.form.addEventListener('submit', app.handleSubmit);
  },
  generateInput: function (placeholder) {
    const input = document.createElement('input');
    // pour ajouter les attributs, j'utilise la méthode setAttribute()
    input.setAttribute('type', 'number'); // input.type = 'number'
    input.setAttribute('id', 'grid-size'); // input.id = 'grid-size'
    input.setAttribute('placeholder', placeholder); // input.placeholder = placeholder
    // ajoute l'input dans l'élément <form>
    app.form.appendChild(input);
  },
  handleSubmit: function (event) {
    // on empêche la soumission par défaut
    event.preventDefault();

    // soit on se déplace dans les enfants de event.target c'est à dire le form
    /* console.log(event.target.childNodes[1].value); */
    // soit on refait un sélecteur

    // selectionne tous les inputs à l'intérieur du formulaire
    // querySelectorAll renvoie un tableau d'élément
    const formInput = event.target.querySelectorAll('input');
    console.log(formInput);
    app.gridSize = formInput[0].value; // index 0 correspond a input size
    app.pixelSize = formInput[1].value; // index 0 correspond a input pixel
    // Pas besoin d'envoyer la valeur dans la methode, parce que c'est une variable globale
    // on peut s'assurer que les champs ne sont pas vides
    if (app.gridSize || app.pixelSize) {
      // vide à la grille à la soumission
      app.clearGridArea();
      // plus besoin non plus de passer un parametre à la fonction generateArea
      // car gridSize est dispo en globale
      app.generateArea();
    }
  },
  generatePalette: function () {
    const paletteElement = document.createElement('div');
    paletteElement.className = 'palette';

    for (const style of app.styles) {
      const paletteButton = document.createElement('button');
      //* style global au button de la palette
      paletteButton.classList.add('palette-color');
      //* style spécifique au style
      paletteButton.classList.add('palette--' + style);
      //* DATASET = passer des données dans une balise html
      //* https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
      //* pour chaque élément, je lui donne une valeur grace à l'attribut html dataset
      paletteButton.dataset.color = style;
      //* je défini empty comme style par defaut en active
      if (style === 'empty') {
        paletteButton.classList.add('palette-color--active');
      }
      //* place la palette dans le html
      paletteElement.appendChild(paletteButton);
      //* je met en place l'écouteur au click
      paletteButton.addEventListener('click', app.handleColorPicker);
    }
    //* je place la palette dans le body
    document.querySelector('body').appendChild(paletteElement);
    //* Mais ca le mets apres le script ??
    //* on peut alors utiliser after(), place l'élément palette APRES #invader
    // app.gridArea.after(palette);
  },
  handleColorPicker: function (event) {
    //* recupere l'élement qui a la class active
    const oldColorElement = document.querySelector('.palette-color--active');
    //* je le supprime
    oldColorElement.classList.remove('palette-color--active');
    const paletteButton = event.target;
    //* recupere la valeur de l'attribut que j'ai défini dans l'élément grace à dataset
    const colorPicked = paletteButton.dataset.color;
    //* je le passe comme valeur de styleSelected
    app.styleSelected = colorPicked;
    //* redéfinis le button comme active
    paletteButton.classList.add('palette-color--active');
  },
};

document.addEventListener('DOMContentLoaded', app.init);
