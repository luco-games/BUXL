#!/bin/env python3

class findWordPairs:
    inputWords = []
    possibleWords = set()
    comboPairs = {}

    def __init__(self, wordlist):
        self.inputWords = wordlist

    def generatePairs(self):
        self.findPossibleWords()
        result_combos = self.findCombinations()
        for word in result_combos:
            if len(result_combos[word]) > 2:
                top, bottom = self.findPair(list(result_combos[word]))
                if len(top) == 4 and len(bottom) == 4:
                    t_result_combos =  tuple(result_combos[word])
                    self.comboPairs[t_result_combos] = []
                    self.comboPairs[t_result_combos].append(top)
                    self.comboPairs[t_result_combos].append(bottom)

        return self.comboPairs

    def convertStringToSet(self, word):           
        result = set()

        for letter in word:
            result.add(letter)

        return result

    def removeLetter(self, combos, letter):
        if letter:
            if letter in combos:
                del combos[letter]
            for combo in combos:
                if letter in combos[combo]:
                    combos[combo].remove(letter)

    def genEmpty2DArray(self, length):
        result = []

        for i in range(0,length):
            result.append([])
        
        return result

    def reArange(self, combos, letter, letter2):
        sortedList = self.genEmpty2DArray(20)
        is_empty = True

        self.removeLetter(combos, letter)
        self.removeLetter(combos, letter2)

        for combo in combos:
            list_length = len(combos[combo])
            if list_length > 0:
                sortedList[list_length - 1].append({combo:combos[combo]})
                is_empty = False
            else:
                is_empty = True

        return sortedList, is_empty


    def is_in (self, word1, word2):
        for letter in word1:
            if letter not in word2:
                return False
        return True
    
    def is_not_in (self, word1, word2):
        for letter in word1:
            if letter in word2:
                return False
        return True

    def removePossibleWords(self, words):
        for word in words:
            self.possibleWords.discard(word)

    def findPossibleWords(self):
        letters = []

        for word in self.inputWords:
            for letter in word:
                if letter not in letters:
                    letters.append(letter)
                else:
                    letters = []
                    break

            if letters:
                self.possibleWords.add("".join(letters))
                letters = []

    def findCombinations(self):
        combinations = {}
        result_combos = {}
        for word in self.possibleWords:
            for word2 in self.possibleWords:
                if (not word2 in combinations):
                    if self.is_not_in(word2, word):
                        if word not in combinations:
                            combinations[word] = set()
                        combinations[word].add(word2)

        for word in combinations:
            if len(combinations[word]) > 1:
                for compareword in combinations[word]:
                    letters = []
                    letters.append(word)
                    letters.append(compareword)   
                    comboword = "".join(letters)
                    result_combos[comboword] = set()
                    for word2 in self.possibleWords:
                        if self.is_in(word2, comboword):
                            result_combos[comboword].add(word2)

        return result_combos

    def findPair(self, words):
        letterset = set()
        combos = {}

        for word in words:
           for letter in word:
                letterset.add(letter)

        for word in words:
           for letter in word:
                combos[letter] = set()
                combos[letter].update(letterset)

        for word in words:
           for letter in word:
                combos[letter].difference_update(self.convertStringToSet(word))
        min_letter = words[0][0]
        min_length = len(combos[min_letter])
        
        for combo in combos:
            if len(combos[combo]) < min_length:
                min_letter = combo
                min_length = len(combos[combo])

        top = []
        bottom = []

        sortedList, empty = self.reArange(combos, "","")
        
        while (not empty):
            letter_top = ""
            letter_bottom = ""
            for elem in sortedList:
                if len(elem) > 0:
                    for key in elem[0]:
                        letter_top = key
                        letter_bottom = elem[0][key].pop()
                        top.append(letter_top)
                        bottom.append(letter_bottom)
                if letter_top and letter_bottom:
                   sortedList, empty = self.reArange(combos, letter_top, letter_bottom)
                   break

        if (len(top) == 4 and len(bottom) == 4):
            self.removePossibleWords(words)
            return top, bottom

        return [],[]
