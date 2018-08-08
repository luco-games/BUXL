var BuxlGameController = function BuxlGameController ()
{
    BuxlControllerPrototype.call(this);
};

BuxlGameController.prototype = Object.create(BuxlControllerPrototype.prototype);

BuxlGameController.prototype.onKeyPressLetterEvent = function onKeyPressLetterEvent (e)
{
    e.stopImmediatePropagation();

    var letter = String.fromCharCode(e.which);

    if (letter.match("\\?"))
    {
        this.solutionManagerEvent (e);
        return;
    }

    if (! letter.match(/^[a-zA-ZẞßÄÖÜäüö]+$/))
        return;

    letter = letter.match(/^ß$/) ? "ẞ" : letter.toUpperCase();

    var letterHashes = this.model.getHashesByLetter (letter);

    if (letterHashes)
        this.performSelectLetter (letterHashes.selectedLetter, letterHashes.oppositeLetter);
};

BuxlGameController.prototype.onSelectLetterEvent = function onSelectLetterEvent (e)
{
    e.stopPropagation();
    e.preventDefault();

    var btnSelected = e.currentTarget;

    selectedLetterHash = btnSelected.dataset.gameBtnId;
    selectedLetterType = selectedLetterHash.substring(0, 1);
    selectedLetterId = selectedLetterHash.substring(1);
    
    oppositeLetterHash = ((selectedLetterType === "f") ? "b" : "f") + selectedLetterId;

    this.performSelectLetter (selectedLetterHash, oppositeLetterHash);
};

BuxlGameController.prototype.performSelectLetter = function performSelectLetter (currentLetterHash, oppositeLetterHash)
{
    if (this.model.selectedLetterExists(currentLetterHash))
    {
        this.model.delSelectedLetter (currentLetterHash);
        this.view.setSelectedLetterInactive (currentLetterHash, oppositeLetterHash);
    } 
    else
    {

        if (this.model.selectedLetterExists(oppositeLetterHash))
        {
            this.model.swapSelectedLetter(oppositeLetterHash, currentLetterHash);
            this.view.swapLetter (oppositeLetterHash, currentLetterHash);
        } else {
            this.model.setSelectedLetter(currentLetterHash);
            this.view.setSelectedLetter (currentLetterHash, oppositeLetterHash);
        }
    }

    var selectedLetters = this.model.getSelectedLetters();
    this.view.setSelectedLetters (selectedLetters);

    if (selectedLetters.length === this.model.getWordLength())
    {
        var res = this.model.getSolutions().indexOf(selectedLetters);

        if (res !== -1)
        {
            var newHit = this.model.addSolved();

            if (this.model.getUnsolvedCount() === 0)
            { 
                var solvedModelData = this.model.getCurrentBuxl();
                this.createNewRandomGame();
                this.view.animateGameFinished(solvedModelData, this.model.getCurrentBuxl());
            } else {
                if (newHit)
                    this.view.animateSolved(this.model.getCurrentBuxl());
                else
                    this.view.animateSolved(this.model.getCurrentBuxl());
            }
        }
        else
        {
            this.view.animateWrongWord(this.model.getCurrentBuxl());
        }

        this.model.delAllSelectedLetters ();
    }
}; 

BuxlGameController.prototype.solutionManagerEvent = function solutionManagerEvent (e)
{
    e.stopPropagation();
    e.preventDefault();

    var randomvalues = new Uint32Array(1);
    var unsolved = this.model.unsolved.slice();
    var selectedLetters = this.model.selectedLetters;
    window.crypto.getRandomValues(randomvalues);

    var nextValue = this.model.unsolved[randomvalues%unsolved.length][0];

    var freeze = false;

    for (var j = 0; j < selectedLetters.length; j++) {
        for (var i = 0; i < unsolved.length; i++) {
            var curLetter = this.model.getLetterById(selectedLetters[j]);
            if (curLetter.match(unsolved[i][j])) {
                if (!freeze)
                    nextValue = unsolved[i][j+1];
            } else if (curLetter.match('_')){
                if (!freeze) {
                    freeze = true;
                    nextValue = unsolved[i][j];
                }
                break;
            } else {
                unsolved.splice(i,1);
                j--;
                break;
            }
        }
    }
    
    if (unsolved.length === 0)
    {
        this.view.animateHintError();
    }
    else
    {
        var letterHashes = this.model.getHashesByLetter (nextValue);
        this.view.animateHint ( letterHashes.selectedLetter );
    }
};


BuxlGameController.prototype.createNewRandomGame = function createNewRandomGame ()
{
    var randomvalues = new Uint32Array(1);
    var datalength = this.model.getBuxlsCount();
    window.crypto.getRandomValues(randomvalues);

    var currentGameHash = randomvalues%datalength;
    this.model.setCurrentBuxlById(currentGameHash);
};

BuxlGameController.prototype.route = function route (route, gameHash)
{
    if (gameHash)
    {
        if(this.model.setCurrentBuxl(gameHash))
            this.view.render(this.model.getCurrentBuxl(), true);
        else
            this.view.routeTo("buxl", null);
    }
    else
    {
        this.createNewRandomGame();
        this.view.animateGameReload(this.model.getCurrentBuxl());
    }
};

BuxlGameController.prototype.register = function register (buxlView, buxlModel)
{
    BuxlControllerPrototype.prototype.register.call(this, buxlView, buxlModel);

    this.events.onSelectLetterEvent = this.onSelectLetterEvent;
    this.events.onKeyPressLetterEvent = this.onKeyPressLetterEvent;
    this.events.onClickSolutionEvent = this.solutionManagerEvent;
};
