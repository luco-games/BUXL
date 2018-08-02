var BuxlGameView = function BuxlGameView (elements) {
    BuxlViewPrototype.call(this, elements);
}

BuxlGameView.prototype = Object.create(BuxlViewPrototype.prototype);

BuxlGameView.prototype.setSelectedLetterInactive = function setSelectedLetterInactive (currentLetterHash, oppositeLetterHash)
{
    anime({
      targets: '[data-game-btn-id="'+ currentLetterHash +'"]',
      scale: 0.8,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      duration: 100
    });

    changeButtonByHash(currentLetterHash,"letter-selected","letter-inactive");
    changeButtonByHash(oppositeLetterHash,"letter-notselected","letter-inactive");
};

BuxlGameView.prototype.setSelectedLetter = function setSelectedLetter (currentLetterHash, oppositeLetterHash)
{
    anime({
      targets: '[data-game-btn-id="'+ currentLetterHash +'"]',
      scale: 0.8,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      duration: 100
    });
    changeButtonByHash(currentLetterHash,"letter-inactive","letter-selected");
    changeButtonByHash(oppositeLetterHash,"letter-inactive","letter-notselected");
};

BuxlGameView.prototype.swapLetter = function swapLetter (currentLetterHash, newLetterHash)
{
    anime({
      targets: '[data-game-btn-id="'+ newLetterHash +'"]',
      scale: 0.8,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      duration: 100
    });
    changeButtonByHash(currentLetterHash,"letter-selected","letter-notselected");
    changeButtonByHash(newLetterHash,"letter-notselected","letter-selected");
};

BuxlGameView.prototype.setSelectedLetters = function setSelectedLetters (letters) 
{
    for (i = 0; i < letters.length; i++) {
        var selectedSolution = document.querySelector('[data-solution-index="'+ i +'"]');
        if (selectedSolution)
            selectedSolution.innerHTML = letters[i];
    }
};

BuxlGameView.prototype.animateWrongWord = function animateWrongWord (dataModel)
{
    var _this = this;
    anime({
      targets: '.letter-solution-mass',
      duration: 1000,
      backgroundColor: '#FF0000',  
      easing: 'easeOutBack'
    });

    anime({
      targets: '.gamewrap',
      translateX: ['-.60rem', '.60rem', '-.60rem'],
      duration: 500,
      loop: 2,
      easing: 'linear',
      direction: 'alternate',
      complete: _this.render.bind(_this, dataModel)
    });
};

BuxlGameView.prototype.animateSolved = function animateSolved (dataModel)
{
    var _this = this;
    setTimeout(_this.render.bind(_this, dataModel), 750);

    anime({
      targets: '.letter-solution-mass',
      duration: 500,
      backgroundColor: '#90EE90',  
      easing: 'easeOutBack'
    });

    anime({
      targets: '.letter-selected',
      duration: 150,
      opacity: .2,
      loop: 5,
      easing: 'linear'
    });

    setTimeout(function () {
        anime({
          targets: '.latestsolved',
          scale: 2,
          duration: 400,
          opacity: .6,
          direction: 'alternate',
          easing: 'easeInOutQuart',
         });
    }, 1000);
};

BuxlGameView.prototype.animateGameFinished = function animateGameFinished ()
{
    anime({
      targets: '.gamewrap > div > div > div',
      translateX: function() { return anime.random(-10, 10) + 'rem'; },
      translateY: function() { return anime.random(-10, 10) + 'rem'; },
      easing: 'easeInOutQuart',
      direction: 'alternate',
      duration: 500
    });
};

BuxlGameView.prototype.animateHint = function animateHint (letterHash) 
{
        anime({
          targets: '[data-game-btn-id="'+ letterHash +'"]',
          rotate: ['-35','35', '-35'],
          duration: 350,
          loop: 4,
          easing: 'easeInOutQuart',
          direction: 'alternate'
         });
};

BuxlGameView.prototype.animateHintError = function animateHintError () 
{
    anime({
      targets: '.letter-solution-mass',
      duration: 100,
      backgroundColor: '#FF0000',  
      easing: 'easeOutBack'
    });

    anime({
      targets: '.gamewrap > div > div > div',
      translateX: ['-.60rem', '.60rem', '-.60rem'],
      duration: 60,
      direction: 'alternate',
      loop: 4,
      easing: 'linear'
    });

};

var changeButtonByHash = function changeButtonByHash (letterHash, currentClass, newClass) 
{
    anime({
      targets: '.letter-solution-mass',
      duration: 100,
      backgroundColor: '#D3D3D3',  
      easing: 'easeOutBack'
    });

    var selectedBtn = document.querySelector('[data-game-btn-id="'+ letterHash +'"]');

    if (selectedBtn && selectedBtn.classList.contains(currentClass)) 
    {
       selectedBtn.classList.remove(currentClass);
       selectedBtn.classList.add(newClass);
    }
}
