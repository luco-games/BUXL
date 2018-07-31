var BuxlModel = function BuxlModel (buxls)
{
    this.buxls = buxls;
    this.currentGameHash = -1;
    this.wordLength = -1;
    this.selectedLetters = [];
    this.unsolved = [];
    this.solved = [];
};

BuxlModel.prototype.getBuxl = function getBuxl (hash)
{
    return this.buxls[hash];
};

BuxlModel.prototype.getCurrentBuxl = function getCurrentBuxl ()
{
    var currentBuxl = this.buxls[this.currentGameHash];
    return {
        top: currentBuxl.top,
        bottom: currentBuxl.bottom,
        solutions: currentBuxl.solution,
        solved: this.solved,
        unsolved: this.unsolved,
    };
};

BuxlModel.prototype.setCurrentBuxl = function setCurrentBuxl ()
{
    var randomvalues = new Uint32Array(1);
    var datalength = this.buxls.length;
    window.crypto.getRandomValues(randomvalues);

    this.currentGameHash = randomvalues%datalength;
    this.wordLength = this.buxls[this.currentGameHash].solution[0].length;
    this.setUnsolved();
};

BuxlModel.prototype.setUnsolved = function setUnsovled () {
    unsolvedCount = this.buxls[this.currentGameHash].solution.length - this.solved.length;

    this.unsolved = [];
    for (i = 0; i < unsolvedCount; i++) {
        this.unsolved.push("&ensp;".repeat(this.wordLength));
    }
}

BuxlModel.prototype.setSelectedLetter = function setSelectedLetter (letter) 
{
    for (i = 0; i < this.selectedLetters.length; i++) {
        if (this.selectedLetters[i] === "_") {
            this.selectedLetters[i] = letter;
            return i;
        }
    }
    this.selectedLetters.push(letter);
    return i;
}

BuxlModel.prototype.isWordFinished = function isWordFinished ()
{
    console.log(this.selectedLetters);
    if (this.selectedLetters.length === this.wordLength)
        return true;
    else
        return false;
}

BuxlModel.prototype.swapSelectedLetter = function swapSelectedLetter (currentLetter, newLetter) 
{
    for (i = 0; i < this.selectedLetters.length; i++) {
        if (this.selectedLetters[i] === currentLetter) {
            this.selectedLetters[i] = newLetter;
            return;
        }
    }
}

BuxlModel.prototype.removeSelectedLetter = function removeSelectedLetter (oldLetter, newLetter) 
{
    for (i = 0; i < this.selectedLetters.length; i++) {
        if (this.selectedLetters[i] === oldLetter) {
            this.selectedLetters[i] = "_";
            return;
        }
    }
}

BuxlModel.prototype.getSelectedLetters = function getSelectedLetters ()
{
    return this.selectedLetters.join('');
}

BuxlModel.prototype.getSolutions = function getSoltuions () 
{
    return this.getCurrentBuxl().solutions;
}

BuxlModel.prototype.resetSelectedLetters = function resetSelectedLetters () 
{
    this.selectedLetters = [];
    console.log("Reset");
    console.log(this.solved);
}

BuxlModel.prototype.addSolved = function addSolved () 
{
    this.solved.unshift(this.getSelectedLetters());
    this.setUnsolved();
}

BuxlModel.prototype.getLettersById = function getLettersById (id)
{
    return [this.getCurrentBuxl().top[id], this.getCurrentBuxl().bottom[id]];
}


BuxlModel.prototype.letterExists = function letterExists(letter)
{
    for (i = 0; i < this.selectedLetters.length; i++) {
        if (this.selectedLetters[i] === letter) {
            return true;
        }
    }
}

BuxlModel.prototype.removeLetter = function removeLetter(letter)
{
    for (i = 0; i < this.selectedLetters.length; i++) {
        if (this.selectedLetters[i] === letter) {
            this.selectedLetters[i] = "_";
            return true;
        }
    }
}
