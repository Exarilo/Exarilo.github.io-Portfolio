const searchButton = document.querySelector('button[type="submit"]');
const searchInput = document.getElementById('query');

const image = document.getElementById('exa-icon');
let clickCount = 0; 


var isInitialLoad = true; 
window.onload = function() {
  adjustComboBoxSize();
  isInitialLoad = false;
  initializeModal();
};

function adjustComboBoxSize() {
  var select = document.getElementById("search-select");
  var selectedOption = select.options[select.selectedIndex];

  var textWidth = getTextWidth(selectedOption.text, window.getComputedStyle(select).font) + 35;

  if (!isInitialLoad) {
    select.style.transition = "width 0.3s";
  } else {
    select.style.transition = "none";
  }

  select.style.width = textWidth + "px";
}


function getTextWidth(text, font) {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
}

image.addEventListener('click', () => {
    clickCount++; 
    
    if (clickCount >= 10) {
        image.style.opacity = 0; 
        image.style.pointerEvents = 'none'; 
        setTimeout(() => {
            image.style.display = 'none';
        }, 2000);
    }
});

const performSearch = () => {
  const searchTerm = searchInput.value.trim().toLowerCase(); // Suppression des espaces inutiles
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const title = card.querySelector('.title')?.innerText.toLowerCase() || ''; // Prévention si .title manque
    const dataLabel = card.getAttribute('data-label')?.toLowerCase() || ''; // Vérifiez si data-label existe
    const matches = title.includes(searchTerm) || dataLabel.includes(searchTerm);

    card.style.display = matches ? 'block' : 'none';
  });
};



searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('input', performSearch);
searchInput.addEventListener('keyup', event => {
    if (event.key === 'Enter') performSearch();
});

function initializeModal(modalId) {
  var modal = document.getElementById('modal-' + modalId); 

  if (modal) {
    modal.style.display = "block"; 
    document.body.style.overflow = "hidden";

    var modalSandboxes = modal.querySelectorAll(".modal-area");
    modalSandboxes.forEach(function(sandbox) {
      sandbox.addEventListener("click", function(e) {
        if (e.target === this) {
          modal.style.display = "none"; 
          document.body.style.overflow = "auto"; 
        }
      });
    });

    var closeButtons = modal.querySelectorAll(".bt-close-modal, .close-modal");
    closeButtons.forEach(function(button) {
      button.addEventListener("click", function() {
        modal.style.display = 'none';
        document.body.style.overflow = "auto"; 
      });
    });
  }
}

