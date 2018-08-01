var BuxlGameModel = function BuxlGameModel (buxls)
{
    this.buxls = buxls;
    this.currentGameHash = -1;
    this.wordLength = -1;
    this.unsolvedCount = -1;
    this.selectedLetters = [];
    this.unsolved = [];
    this.solved = [];
};

BuxlGameModel.prototype.getBuxls = function getBuxls ()
{
    return this.buxls;
};

BuxlGameModel.prototype.getBuxlsCount = function getBuxlsCount ()
{
    return this.buxls.length;
};

BuxlGameModel.prototype.getBuxl = function getBuxl (hash)
{
    return this.buxls[hash];
};

BuxlGameModel.prototype.getCurrentBuxl = function getCurrentBuxl ()
{
    var currentBuxl = this.buxls[this.currentGameHash];

    return {
        front: currentBuxl.front,
        back: currentBuxl.back,
        solutions: currentBuxl.solutions,
        solved: this.solved,
        unsolved: this.unsolved,
    };
};

BuxlGameModel.prototype.setCurrentBuxl = function setCurrentBuxl (gameHash)
{
    this.currentGameHash = gameHash;
    this.selectedLetters = [];
    this.unsolved = [];
    this.solved = [];
    this.wordLength = this.buxls[this.currentGameHash].solutions[0].length;
    this.generateUnsolvedList();
};

BuxlGameModel.prototype.generateUnsolvedList = function generateUnsovledList () 
{
    this.unsolvedCount = this.buxls[this.currentGameHash].solutions.length - this.solved.length;
    this.unsolved = [];

    for (i = 0; i < this.unsolvedCount; i++)
    {
        this.unsolved.push("&ensp;".repeat(this.wordLength));
    }
}

BuxlGameModel.prototype.getUnsolvedCount = function getUnsolvedCount () 
{
    return this.unsolvedCount.length;
}

BuxlGameModel.prototype.selectedLetterExists = function selectedLetterExists(id)
{
    for (i = 0; i < this.selectedLetters.length; i++) {
        if (this.selectedLetters[i] === id) {
            return true;
        }
    }
}

BuxlGameModel.prototype.setSelectedLetter = function setSelectedLetter (id) 
{
    for (i = 0; i < this.selectedLetters.length; i++) 
    {
        if (this.selectedLetters[i] === "_") 
        {
            this.selectedLetters[i] = id;
            return i;
        }
    }

    this.selectedLetters.push(id);

    return i;
}

BuxlGameModel.prototype.swapSelectedLetter = function swapSelectedLetter (curId, newId) 
{
    for (i = 0; i < this.selectedLetters.length; i++) {
        if (this.selectedLetters[i] === curId) {
            this.selectedLetters[i] = newId;
            return;
        }
    }
}

BuxlGameModel.prototype.delSelectedLetter = function delSelectedLetter (id)
{
    for (i = 0; i < this.selectedLetters.length; i++) 
    {
        if (this.selectedLetters[i] === id) {
            this.selectedLetters[i] = "_";
            return true;
        }
    }
}

BuxlGameModel.prototype.delAllSelectedLetters = function delAllSelectedLetters ()
{
    this.selectedLetters = [];
}

BuxlGameModel.prototype.getSelectedLetters = function getSelectedLetters ()
{
    var letters = "";

    for (i = 0; i < this.selectedLetters.length; i++) 
    {
        console.log (this.getLetterById(this.selectedLetters[i]));
        letters += this.getLetterById(this.selectedLetters[i]);
    }
    
    return letters;
}

BuxlGameModel.prototype.getLetterById = function getLetterById (id) 
{
    if (id === "_")
        return "_"; 

    var letterType = id.substring(0, 1);
    var letterId = id.substring(1);
    var currentBuxl = this.buxls[this.currentGameHash]

    if (!letterType)
        return null;
    else if (letterType === "f")
        return currentBuxl.front [ letterId ];
    else if (letterType === "b")
        return currentBuxl.back [ letterId ];

    return null;
}

BuxlGameModel.prototype.getWordLength = function getWordLength()
{
    return this.wordLength
}

BuxlGameModel.prototype.getSolutions = function getSoltuions () 
{
    return this.buxls[this.currentGameHash].solutions;
}

BuxlGameModel.prototype.addSolved = function addSolved () 
{
    var selectedLetters = this.getSelectedLetters();

    if (isInArray (selectedLetters, this.solved))
    {
        return false;
    }
    else
    {
        this.solved.unshift(selectedLetters);
        this.generateUnsolvedList();
        return true;
    }
}
