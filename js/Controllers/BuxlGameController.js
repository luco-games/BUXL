var BuxlGameController = function BuxlGameController () {
    BuxlControllerPrototype.call(this);
};

BuxlGameController.prototype = Object.create(BuxlControllerPrototype.prototype);

BuxlGameController.prototype.onKeyPressLetterEvent = function onKeyPressLetterEvent (context, e) 
{
    e.stopImmediatePropagation();

    var letter = String.fromCharCode(e.which);

    if (! letter.match(/^[a-zA-ZẞßÄÖÜäüö]+$/))
        return;

    letter = letter.match(/^ß$/) ? "ẞ" : letter.toUpperCase();

    var letterHashes = context.model.getHashesByLetter (letter);

    if (letterHashes)
        context.performSelectLetter (letterHashes.selectedLetter, letterHashes.oppositeLetter); 
};

BuxlGameController.prototype.onSelectLetterEvent = function onSelectLetterEvent (context, e) 
{
    e.stopPropagation();
    e.preventDefault();

    var btnSelected = e.currentTarget;

    selectedLetterHash = btnSelected.dataset.gameBtnId;
    selectedLetterType = selectedLetterHash.substring(0, 1);
    selectedLetterId = selectedLetterHash.substring(1);
    
    oppositeLetterHash = ((selectedLetterType === "f") ? "b" : "f") + selectedLetterId;

    context.performSelectLetter (selectedLetterHash, oppositeLetterHash);
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
        var res = isInArray(selectedLetters, this.model.getSolutions());

        if (res) 
        {
            var newHit = this.model.addSolved();

            if (this.model.getUnsolvedCount() === 0)
            { 
                this.createNewRandomGame();
                this.view.render(this.model.getCurrentBuxl());
                this.view.animateGameFinished();
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

BuxlGameController.prototype.solutionManagerEvent = function solutionManagerEvent (context, e)
{
    e.stopPropagation();
    e.preventDefault();

    var randomvalues = new Uint32Array(1);
    var unsolved = context.model.unsolved.slice();
    var selectedLetters = context.model.selectedLetters
    window.crypto.getRandomValues(randomvalues);

    var nextValue = context.model.unsolved[randomvalues%unsolved.length][0];

    var freeze = false;

    for (j=0; j < selectedLetters.length; j++) {
        for (i=0; i < unsolved.length; i++) {
            var curLetter = context.model.getLetterById(selectedLetters[j]);
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
        context.view.animateHintError();
    }
    else
    {
        var letterHashes = context.model.getHashesByLetter (nextValue);
        context.view.animateHint ( letterHashes.selectedLetter );
    }
};

BuxlGameController.prototype.shuffleEvent = function shuffleEvent (context, e)
{
    e.stopPropagation();
    e.preventDefault();

    context.createNewRandomGame();
    context.view.render(context.model.getCurrentBuxl()); 
};

BuxlGameController.prototype.createNewRandomGame = function createNewRandomGame () 
{
    var randomvalues = new Uint32Array(1);
    var datalength = this.model.getBuxlsCount();
    window.crypto.getRandomValues(randomvalues);

    var currentGameHash = randomvalues%datalength;
    this.model.setCurrentBuxl(currentGameHash);

    window.location.hash = '#buxl/'+currentGameHash;
};

BuxlGameController.prototype.route = function route (route) 
{
    if (! route)
        this.createNewRandomGame();
    else
        this.model.setCurrentBuxl(route);

    this.view.render(this.model.getCurrentBuxl()); 
};

BuxlGameController.prototype.register = function register (buxlView, buxlModel) 
{
    BuxlControllerPrototype.prototype.register.call(this, buxlView, buxlModel);
    this.events["onSelectLetterEvent"] = this.onSelectLetterEvent;
    this.events["onKeyPressLetterEvent"] = this.onKeyPressLetterEvent;
    this.events["onClickSolutionEvent"] = this.solutionManagerEvent;
    this.events["onClickShuffleEvent"] = this.shuffleEvent;
};
