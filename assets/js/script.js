console.log("JS chargé"); // Vérifie que le JS est bien relié à la page HTML

// === VARIABLES GLOBALES ===

// Écran d'affichage de la calculatrice
let screenContent = document.getElementById("display");

// Éléments DOM
let calculator = document.querySelector(".calculator");
let btnPower = document.querySelector(".btnPower");

// État de la calculatrice
let isPowerOn = false; // Par défaut : éteinte

// Variables pour les opérations
let firstValue = "";
let secondValue = "";
let result = "";
let currentOperator = "";
let shouldResetScreen = false; // Indique si on doit vider l’écran au prochain chiffre

// === BOUTON ON / OFF ===

btnPower.addEventListener("click", () => {
  isPowerOn = !isPowerOn; // Inversion de l'état (true ⇄ false)

  if (isPowerOn) {
    calculator.classList.remove("off"); // Supprime la classe qui désactive l'interface
    screenContent.textContent = "0";    // Réinitialise l'affichage
    firstValue = "";
    secondValue = "";
    result = "";
    currentOperator = "";
  } else {
    calculator.classList.add("off");    // Rend l'interface inactive
    screenContent.textContent = "";     // Écran vide
  }
});

// === BOUTONS CHIFFRES ===

let numberButtons = document.querySelectorAll(".btnNumber");

numberButtons.forEach(btnNumber => {
  btnNumber.addEventListener("click", () => {
    if (!isPowerOn) return; // Ignore le clic si la calculatrice est éteinte

    if (shouldResetScreen) {
      screenContent.textContent = "";
      shouldResetScreen = false;
    }

    let chiffre = btnNumber.textContent;

    if (screenContent.textContent === "0") {
      screenContent.textContent = chiffre;
    } else {
      screenContent.textContent += chiffre;
    }
  });
});

// === BOUTONS OPÉRATEURS ===

let operatorButtons = document.querySelectorAll(".btnOperator");

operatorButtons.forEach(btnOperator => {
  btnOperator.addEventListener("click", () => {
    if (!isPowerOn) return;

    firstValue = screenContent.textContent;
    currentOperator = btnOperator.textContent;
    shouldResetScreen = true;
  });
});

// === BOUTON ÉGAL (=) ===

let btnEqual = document.querySelector(".btnEqual");

btnEqual.addEventListener("click", () => {
  if (!isPowerOn) return;

  secondValue = screenContent.textContent;

  switch (currentOperator) {
    case "+":
      result = Number(firstValue) + Number(secondValue);
      break;
    case "-":
      result = Number(firstValue) - Number(secondValue);
      break;
    case "×":
      result = Number(firstValue) * Number(secondValue);
      break;
    case "÷":
      if (Number(secondValue) === 0) {
        screenContent.textContent = "Error";
        return;
      }
      result = Number(firstValue) / Number(secondValue);
      break;
    default:
      return;
  }

  screenContent.textContent = result;
  shouldResetScreen = true;
});

// === BOUTON CLEAR (C) ===

let btnClear = document.querySelector(".btnClear");

btnClear.addEventListener("click", () => {
  if (!isPowerOn) return;

  screenContent.textContent = "0";
  firstValue = "";
  secondValue = "";
  result = "";
  shouldResetScreen = false;
});

// === BOUTON DÉCIMAL (.) ===

let btnDecimal = document.querySelector(".btnDecimal");

btnDecimal.addEventListener("click", () => {
  if (!isPowerOn) return;

  if (shouldResetScreen) {
    screenContent.textContent = "0.";
    shouldResetScreen = false;
    return;
  }

  if (!screenContent.textContent.includes(".")) {
    screenContent.textContent += ".";
  }
});

// === BOUTON POURCENTAGE (%) ===

let btnPercent = document.querySelector(".btnPercent");

btnPercent.addEventListener("click", () => {
  if (!isPowerOn) return;

  let currentValue = Number(screenContent.textContent);
  let percentValue = currentValue / 100;
  screenContent.textContent = percentValue;
  shouldResetScreen = true;
});
