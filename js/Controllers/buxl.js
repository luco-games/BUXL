var BuxlGameController = function BuxlGameController () {};

var isInArray = function isInArray (value, array) {
    for (var ar of array) {
        console.log("check " + value + " "  + ar);
        if (value === ar)
            return true;
    }
    return false;
}

BuxlGameController.prototype.buxlSelectLetter = function buxlSelectLetter (context, e) 
{
    var btnCurrent = e.currentTarget;

    currentLetter = btnCurrent.dataset.gameBtnLetter;
    currentLetterId = btnCurrent.dataset.gameBtnId;
    
    var letters = context.model.getLettersById (currentLetterId);

    if (letters[0] === currentLetter)
        oppositeLetter = letters[1]
    else
        oppositeLetter = letters[0]


    if (context.model.letterExists(currentLetter))
    {

        context.model.removeLetter (currentLetter);
        context.view.buxlSetLetterInactive (currentLetter, oppositeLetter);

    } else {

        if (context.model.letterExists(oppositeLetter))
        {
            context.model.swapSelectedLetter(oppositeLetter, currentLetter);
            context.view.buxlSwapActiveLetter (oppositeLetter, currentLetter);
        } else {
            context.model.setSelectedLetter(currentLetter);
            context.view.buxlSetSelectedLetter (currentLetter, oppositeLetter);
        }
    }

    var selectedLetters = context.model.getSelectedLetters();
    context.view.buxlSetSelectedLetters (selectedLetters);

    if (context.model.isWordFinished()) {
        var selectedLetters = context.model.getSelectedLetters()
        var res = isInArray(selectedLetters, context.model.getSolutions());
        if (res) {
            context.model.addSolved();
        }

        if (context.model.getSolutions().length === context.model.getSolved().length) {
            console.log("Game finished");
        }
        context.model.resetSelectedLetters();
        context.view.render(context.model.getCurrentBuxl(),context.events);
    }

};

BuxlGameController.prototype.route = function route (route) 
{
    this.currentBUXL = this.model.getCurrentBuxl(route);
    this.view.render(this.currentBUXL, this.events); 
};

BuxlGameController.prototype.registerBuxlGameController = function registerBuxlGameController (buxlView) 
{
    this.view = buxlView;
    this.model = this.view.elements.targetModel;

    this.model.setCurrentBuxl();
    this.currentBUXL = this.model.getCurrentBuxl();

    this.events = [];
    var _this = this;

    letterButton = {
        target : ".letter-mass",
        triggers: "click touchend",
        _this : _this,
        f: _this.buxlSelectLetter
    };

    this.events.push(letterButton);

    this.view.render(this.currentBUXL, this.events); 
};
