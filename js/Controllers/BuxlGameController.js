var BuxlGameController = function BuxlGameController () 
{
    this.events = [];
};

BuxlGameController.prototype.onEvent = function onEvent ( eventName, _this, e)
{

    for (var _eventName in this.events)
    {
        if (this.events.hasOwnProperty(_eventName)) {
            return this.events[_eventName](_this, e);    
        }
    }

    return "event not found";
};

BuxlGameController.prototype.onSelectLetterEvent = function onSelectLetterEvent (context, e) 
{
    var btnCurrent = e.currentTarget;

    currentLetterHash = btnCurrent.dataset.gameBtnId;
    currentLetterType = currentLetterHash.substring(0, 1);
    currentLetterId = currentLetterHash.substring(1);
    
    oppositeLetterHash = ((currentLetterType === "f") ? "b" : "f") + currentLetterId;
    console.log(oppositeLetterHash);
    
    if (context.model.selectedLetterExists(currentLetterHash))
    {
        context.model.delSelectedLetter (currentLetterHash);
        context.view.setSelectedLetterInactive (currentLetterHash, oppositeLetterHash);
    } 
    else
    {

        if (context.model.selectedLetterExists(oppositeLetterHash))
        {
            context.model.swapSelectedLetter(oppositeLetterHash, currentLetterHash);
            context.view.swapLetter (oppositeLetterHash, currentLetterHash);
        } else {
            context.model.setSelectedLetter(currentLetterHash);
            context.view.setSelectedLetter (currentLetterHash, oppositeLetterHash);
        }
    }

    var selectedLetters = context.model.getSelectedLetters();
    context.view.setSelectedLetters (selectedLetters);

    if (selectedLetters.length === context.model.getWordLength())
    {
        var res = isInArray(selectedLetters, context.model.getSolutions());

        if (res) 
        {
            if (context.model.addSolved())
                console.log("Solved finished");
            else
                console.log("Already Solved finished");
        }

        if (context.model.getUnsolvedCount() === 0)
            console.log("Game finished");

        context.view.render(context.model.getCurrentBuxl());
        context.model.delAllSelectedLetters ();
    }
};

BuxlGameController.prototype.route = function route (route) 
{
    this.view.render(this.model.getCurrentBuxl()); 
};

BuxlGameController.prototype.registerController = function registerController (buxlView) 
{
    this.view = buxlView;
    this.model = this.view.elements.targetModel;

    var randomvalues = new Uint32Array(1);
    var datalength = this.model.getBuxlsCount();
    window.crypto.getRandomValues(randomvalues);

    var currentGameHash = randomvalues%datalength;
    this.model.setCurrentBuxl(currentGameHash);

    this.events["onSelectLetterEvent"] = this.onSelectLetterEvent;

    this.view.render(this.model.getCurrentBuxl()); 
};
