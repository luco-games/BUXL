var BuxlGameModel = function BuxlGameModel (buxls)
{
    this.buxls = buxls;
    this.currentGameHash = -1;
    this.wordLength = -1;
    this.selectedLetters = [];
    this.unsolved = [];
    this.solved = [];
    this.unsolvedHiddenChar = "&ensp;";
    this.unsolvedHiddenChars = "";
    this.latestSolvedPosition = 0;
};

BuxlGameModel.prototype.getBuxls = function getBuxls ()
{
    return this.buxls;
};

BuxlGameModel.prototype.getBuxlsCount = function getBuxlsCount ()
{
    return Object.keys(this.buxls).length;
};

BuxlGameModel.prototype.getBuxl = function getBuxl (hash)
{
    return this.buxls[hash];
};

BuxlGameModel.prototype.getCurrentBuxl = function getCurrentBuxl ()
{
    var currentBuxl = this.buxls[this.currentGameHash];

    return {
        gameHash: this.currentGameHash,
        front: currentBuxl.front,
        back: currentBuxl.back,
        solutions: currentBuxl.solutions,
        solved: this.solved,
        unsolved: this.unsolved,
        unsolvedHiddenChars: this.unsolvedHiddenChars,
        latestSolvedPosition: this.latestSolvedPosition
    };
};

BuxlGameModel.prototype.setCurrentBuxlById = function setCurrentBuxlById (gameHashId)
{
    var keys = Object.keys( this.buxls );

    if (!keys[ gameHashId ])
        return this.setCurrentBuxl(null);
    else
        return this.setCurrentBuxl(keys [ gameHashId ]);
};

BuxlGameModel.prototype.setCurrentBuxl = function setCurrentBuxl (gameHash)
{
    this.selectedLetters = [];
    this.unsolved = [];
    this.solved = [];
    this.latestSolvedPosition = 0;

    if (gameHash && !this.buxls[gameHash])
         return false;
 
    console.log("Set buxl");
    this.currentGameHash = gameHash;
    this.wordLength = this.buxls[this.currentGameHash].solutions[0].length;
    this.unsolvedHiddenChars = this.unsolvedHiddenChar.repeat(this.wordLength);
    this.generateUnsolvedList();

    return true;
};

BuxlGameModel.prototype.generateUnsolvedList = function generateUnsovledList () 
{ 
    var solutions = this.buxls[this.currentGameHash].solutions;
    var solutionsLength = solutions.length;
    this.unsolved = [];

    for (var i = 0; i < solutionsLength; i++)
    {
        if (this.solved.indexOf(solutions[i]) === -1)
            this.unsolved.unshift(solutions[i]);
    }
};

BuxlGameModel.prototype.getUnsolvedCount = function getUnsolvedCount () 
{
    return this.unsolved.length;
};

BuxlGameModel.prototype.selectedLetterExists = function selectedLetterExists(id)
{
    for (i = 0; i < this.selectedLetters.length; i++) {
        if (this.selectedLetters[i] === id) {
            return true;
        }
    }
};

BuxlGameModel.prototype.setSelectedLetter = function setSelectedLetter (id) 
{
    for (var i = 0; i < this.selectedLetters.length; i++) 
    {
        if (this.selectedLetters[i] === "_") 
        {
            this.selectedLetters[i] = id;
            return i;
        }
    }

    this.selectedLetters.push(id);

    return i;
};

BuxlGameModel.prototype.getHashesByLetter = function getHashesByLetter (letter)  
{
    var currentBuxl = this.buxls[this.currentGameHash];
    var res = {};
    var front = false;

    for (var i = 0; i < currentBuxl.front.length; i ++)
    {
        if (currentBuxl.front[i] === letter)
        {
            res.selectedLetter = "f" + i;
            front = true;
            break;
        }

        if (currentBuxl.back[i] === letter)
        {
            res.selectedLetter = "b" + i;
            front = false;
            break;
        }
    }

    if (!res.selectedLetter)
        return null;

    res.oppositeLetter = (front ? "b" : "f") + i;

    return res;
};

BuxlGameModel.prototype.swapSelectedLetter = function swapSelectedLetter (curId, newId) 
{
    for (i = 0; i < this.selectedLetters.length; i++) {
        if (this.selectedLetters[i] === curId) {
            this.selectedLetters[i] = newId;
            return;
        }
    }
};

BuxlGameModel.prototype.delSelectedLetter = function delSelectedLetter (id)
{
    for (i = 0; i < this.selectedLetters.length; i++) 
    {
        if (this.selectedLetters[i] === id) {
            this.selectedLetters[i] = "_";
            return true;
        }
    }
};

BuxlGameModel.prototype.delAllSelectedLetters = function delAllSelectedLetters ()
{
    this.selectedLetters = [];
};

BuxlGameModel.prototype.getSelectedLetters = function getSelectedLetters ()
{
    var letters = "";

    for (i = 0; i < this.selectedLetters.length; i++) 
    {
	
        letters += this.getLetterById(this.selectedLetters[i]);
    }
    
    return letters;
};

BuxlGameModel.prototype.getLetterById = function getLetterById (id) 
{
    if (id === "_")
        return "_"; 

    var letterType = id.substring(0, 1);
    var letterId = id.substring(1);
    var currentBuxl = this.buxls[this.currentGameHash];

    if (!letterType)
        return null;
    else if (letterType === "f")
        return currentBuxl.front [ letterId ];
    else if (letterType === "b")
        return currentBuxl.back [ letterId ];

    return null;
};

BuxlGameModel.prototype.getWordLength = function getWordLength()
{
    return this.wordLength;
};

BuxlGameModel.prototype.getSolutions = function getSoltuions () 
{
    return this.buxls[this.currentGameHash].solutions;
};

BuxlGameModel.prototype.addSolved = function addSolved () 
{
    var selectedLetters = this.getSelectedLetters();
    var latestSolvedPosition = this.solved.indexOf(selectedLetters);

    if ( latestSolvedPosition === -1)
    {
        this.solved.unshift(selectedLetters);
        this.generateUnsolvedList();
        this.latestSolvedPosition = 0;
        return true;
    }
    else
    {
        this.latestSolvedPosition = latestSolvedPosition;
        return false;
    }
};
