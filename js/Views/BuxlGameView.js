var BuxlGameView = function BuxlGameView (controller, elements) {
    BuxlViewPrototype.call(this, controller, elements);
}

BuxlGameView.prototype = Object.create(BuxlViewPrototype.prototype);

BuxlGameView.prototype.setSelectedLetterInactive = function setSelectedLetterInactive (currentLetterHash, oppositeLetterHash)
{
    changeButtonByHash(currentLetterHash,"letter-selected","letter-inactive");
    changeButtonByHash(oppositeLetterHash,"letter-notselected","letter-inactive");
};

BuxlGameView.prototype.setSelectedLetter = function setSelectedLetter (currentLetterHash, oppositeLetterHash)
{
    var cssProperties = anime({
      targets: '[data-game-btn-id="'+ currentLetterHash +'"]',
      scale: 1.25,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      duration: 100
    });
    changeButtonByHash(currentLetterHash,"letter-inactive","letter-selected");
    changeButtonByHash(oppositeLetterHash,"letter-inactive","letter-notselected");
};

BuxlGameView.prototype.swapLetter = function swapLetter (currentLetterHash, newLetterHash)
{
    changeButtonByHash(currentLetterHash,"letter-selected","letter-notselected");
    changeButtonByHash(newLetterHash,"letter-notselected","letter-selected");
};

var changeButtonByHash = function changeButtonByHash (letterHash, currentClass, newClass) 
{
    var selectedBtn = document.querySelector('[data-game-btn-id="'+ letterHash +'"]');

    if (selectedBtn && selectedBtn.classList.contains(currentClass)) 
    {
       selectedBtn.classList.remove(currentClass);
       selectedBtn.classList.add(newClass);
    }
}

BuxlGameView.prototype.setSelectedLetters = function setSelectedLetters (letters) 
{
    for (i = 0; i < letters.length; i++) {
        var selectedSolution = document.querySelector('[data-solution-index="'+ i +'"]');
        if (selectedSolution)
            selectedSolution.innerHTML = letters[i];
    }
};

