let BuxlGameModel = function BuxlGameModel (buxls)
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

BuxlGameModel.prototype.getBuxlsCount = function getBuxlsCount ()
{
    return Object.keys(this.buxls).length;
};

BuxlGameModel.prototype.getCurrentBuxl = function getCurrentBuxl ()
{
    let currentBuxl = this.getBuxl(this.currentGameHash);

    currentBuxl.solved = this.solved;
    currentBuxl.unsolved = this.unsolved;
    currentBuxl.unsolvedHiddenChars = this.unsolvedHiddenChars;
    currentBuxl.latestSolvedPosition = this.latestSolvedPosition;

    return currentBuxl; 
};

BuxlGameModel.prototype.getBuxl = function getBuxl (gameHash)
{
    let selectedBuxl = this.buxls[gameHash];
    
    if (! selectedBuxl)
        return null;

    return {
        gameHash: gameHash,
        front: selectedBuxl.f,
        back: selectedBuxl.b,
        solutions: selectedBuxl.s,
    };
};

BuxlGameModel.prototype.setCurrentBuxlById = function setCurrentBuxlById (gameHashId)
{
    let keys = Object.keys( this.buxls );

    if (!keys[ gameHashId ])
        return this.setCurrentBuxl(null);
    else
        return this.setCurrentBuxl(keys [ gameHashId ]);
};

BuxlGameModel.prototype.setCurrentBuxl = function setCurrentBuxl (gameHash)
{

    if (gameHash && !this.getBuxl(gameHash))
    {
        this.selectedLetters = [];
        this.unsolved = [];
        this.solved = [];
        this.latestSolvedPosition = 0;
        return false;
    }    
 
    if (this.currentGameHash !== gameHash)
    {
        this.selectedLetters = [];
        this.unsolved = [];
        this.solved = [];
        this.latestSolvedPosition = 0;
        this.currentGameHash = gameHash;
        this.wordLength = this.getBuxl(this.currentGameHash).solutions[0].length;
        this.unsolvedHiddenChars = this.unsolvedHiddenChar.repeat(this.wordLength);
        this.generateUnsolvedList();
    } 

    return true;
};

BuxlGameModel.prototype.generateUnsolvedList = function generateUnsovledList () 
{ 
    let solutions = this.getBuxl(this.currentGameHash).solutions;
    let solutionsLength = solutions.length;
    this.unsolved = [];

    for (let i = 0; i < solutionsLength; i++)
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
    for (let i = 0; i < this.selectedLetters.length; i++) {
        if (this.selectedLetters[i] === id) {
            return true;
        }
    }
};

BuxlGameModel.prototype.setSelectedLetter = function setSelectedLetter (id) 
{
    let i = 0;
    for (; i < this.selectedLetters.length; i++) 
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
    let currentBuxl = this.getBuxl(this.currentGameHash);
    let res = {};
    let front = false;
    let i = 0;

    for (; i < currentBuxl.front.length; i ++)
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
    for (let i = 0; i < this.selectedLetters.length; i++) {
        if (this.selectedLetters[i] === curId) {
            this.selectedLetters[i] = newId;
            return;
        }
    }
};

BuxlGameModel.prototype.delSelectedLetter = function delSelectedLetter (id)
{
    for (let i = 0; i < this.selectedLetters.length; i++) 
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
    let letters = "";

    for (let i = 0; i < this.selectedLetters.length; i++) 
    {
	
        letters += this.getLetterById(this.selectedLetters[i]);
    }
    
    return letters;
};

BuxlGameModel.prototype.getLetterById = function getLetterById (id) 
{
    if (id === "_")
        return "_"; 

    let letterType = id.substring(0, 1);
    let letterId = id.substring(1);
    let currentBuxl = this.getBuxl(this.currentGameHash);

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
    return this.getBuxl(this.currentGameHash).solutions;
};

BuxlGameModel.prototype.addSolved = function addSolved () 
{
    let selectedLetters = this.getSelectedLetters();
    let latestSolvedPosition = this.solved.indexOf(selectedLetters);

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
