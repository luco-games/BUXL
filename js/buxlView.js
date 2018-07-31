var BuxlView = function BuxlView (elements)
{
   this.elements = elements;
   this.template = $.templates(this.elements.targetTemplate);
}

BuxlView.prototype.render = function render (modelData, events)
{
   this.events = events;
   var html = this.template.render(modelData);
   $(this.elements.targetView).html(html);

    for (i = 0; i < events.length; i++) {
        var triggers = events[i].triggers.split(' ');
        var elements = document.querySelectorAll(events[i].target);
        for ( var element of elements) {
            for (j = 0; j < triggers.length; j++) {
               var curEventFunction = events[i].f
               var curEventContext = events[i]._this
               element.addEventListener(triggers[j], function (e) {
                    curEventFunction (curEventContext, e);
               }, false);
            }
        }
    }
};

BuxlView.prototype.buxlSetSelectedLetter = function buxlSetSelectedLetter (currentLetter, oppositeLetter)
{
    changeButtonByLetter(currentLetter,"letter-inactive","letter-selected");
    changeButtonByLetter(oppositeLetter,"letter-inactive","letter-notselected");
};

BuxlView.prototype.buxlSwapActiveLetter = function buxlSwapActiveLetter (currentLetter, newLetter)
{
    changeButtonByLetter(currentLetter,"letter-selected","letter-notselected");
    changeButtonByLetter(newLetter,"letter-notselected","letter-selected");
    
};

BuxlView.prototype.buxlRemoveSelectedLetter = function buxlRemoveSelectedLetter (inactiveLetter, activeLetter)
{
    var activeLetterBtn = document.querySelector('[data-game-btn-letter="'+ activeLetter +'"]');
    if (activeLetterBtn && activeLetterBtn.classList.contains('letter-selected')) {
       activeLetterBtn.classList.remove('letter-selected');
       activeLetterBtn.classList.add('letter-inactive');
    }

    var inactiveLetterBtn = document.querySelector('[data-game-btn-letter="'+ inactiveLetter +'"]');
    if (inactiveLetterBtn && inactiveLetterBtn.classList.contains('letter-notselected')) {
       inactiveLetterBtn.classList.remove('letter-notselected');
       inactiveLetterBtn.classList.add('letter-inactive');
    }
       
};

BuxlView.prototype.buxlSetLetterInactive = function buxlSetLetterInactive (activeLetter, oppositeLetter)
{
    changeButtonByLetter(activeLetter,"letter-selected","letter-inactive");
    changeButtonByLetter(oppositeLetter,"letter-notselected","letter-inactive");
};


var changeButtonByLetter = function changeButtonByLetter (letter, currentClass, newClass) 
{
    var selectedBtn = document.querySelector('[data-game-btn-letter="'+ letter +'"]');
    if (selectedBtn && selectedBtn.classList.contains(currentClass)) {
       selectedBtn.classList.remove(currentClass);
       selectedBtn.classList.add(newClass);
    }
    
}

BuxlView.prototype.buxlSetSelectedLetters = function buxlSetSelectedLetters (letters) 
{
    console.log(letters.length);
    for (i = 0; i < letters.length; i++) {
        var selectedSolution = document.querySelector('[data-solution-index="'+ i +'"]');
        if (selectedSolution)
            selectedSolution.innerHTML = letters[i];
    }
};

