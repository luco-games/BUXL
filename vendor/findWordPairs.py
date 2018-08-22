#!/bin/env python3
import collections, itertools

class findWordPairs:
    inputWords = []
    possibleWords = set()
    comboPairs = {}
    wordLength = -1

    def __init__(self, wordlist):
        self.inputWords = wordlist
        self.wordLength = len(wordlist[0])

    def generatePairs(self):
        self.findPossibleWords()
        result_combos = self.findCombinations()
        for wordlist in result_combos:
            self.findPair(wordlist, False)

        return self.comboPairs

    def convertStringToSet(self, word):           
        result = set()

        for letter in word:
            result.add(letter)

        return result


    def is_in (self, word1, word2):
        for letter in word1:
            if letter not in word2:
                return False
        return True
    
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

    def findWordsWithTheSameLetters(self):
        combinations = set()
        for word in self.possibleWords:
            possible_combinations = set()
            for word2 in self.possibleWords:
                if collections.Counter(word) == collections.Counter(word2):
                        possible_combinations.add(word2)
            combinations.add(frozenset(possible_combinations))
        return combinations

    def extendEveryWordlistWithEveryOtherWordlist(self, combinations):
        possible_combos = []

        for wordlist in combinations:
            if (len(wordlist) > 1):
                for wordlist2 in combinations:
                    combolist = list(wordlist)
                    if wordlist is not wordlist2:
                        combolist.extend(list(wordlist2))
                    possible_combos.append(combolist)

        return possible_combos 


    def generateLetterset(self, wordlist):
        letterset = set()

        for word in wordlist:
            for letter in word:
                letterset.add(letter)

        return letterset

    def findCombinations(self):
        result_combos = [] 
        possible_combos = []
    
        combinations = self.findWordsWithTheSameLetters()

        possible_combos = self.extendEveryWordlistWithEveryOtherWordlist(combinations)

        for wordlist in possible_combos:
            letterset = self.generateLetterset(wordlist)
            
            if (len(letterset) > self.wordLength):
                for word in self.possibleWords:
                    if self.is_in(word, letterset):
                        if word not in wordlist:
                            wordlist.append(word)
                            if not self.findPair(wordlist, True):
                                wordlist.remove(word)
                result_combos.append(wordlist)
                        
        return result_combos

    def sortElements(self, combos):
        sortedList = {}
        for k in sorted(combos, key=lambda k: len(combos[k])):
            if (len(combos[k]) > 0):
                sortedList[k] = combos[k]
        return sortedList

    def findPair(self, wordlist, dryrun):
        combos = {}

        letterset = self.generateLetterset(wordlist)

        for word in wordlist:
            for letter in word:
                combos[letter] = set()
                combos[letter].update(letterset)

        for word in wordlist:
            for letter in word:
                combos[letter].difference_update(self.convertStringToSet(word))
    
        sortedList = self.sortElements(combos)

        if (len(combos) != len(sortedList)):
            return False
        
        front = []
        back = []

        while True:
            try:
                letter_front =  next(iter(sortedList))
                letter_back = sortedList[letter_front].pop()

                for elem in sortedList:
                    if letter_back in sortedList[elem]:
                        sortedList[elem].remove(letter_back)
                
                if letter_back in sortedList:
                    del sortedList[letter_back]

                del sortedList[letter_front]

                front.append(letter_front)
                back.append(letter_back)

                sortedList = self.sortElements(sortedList)
            except StopIteration:
                break
        
        if len(front) == self.wordLength  and len(back) == self.wordLength:
            if not dryrun:
                t_result_combos =  tuple(wordlist)
                self.comboPairs[t_result_combos] = []
                self.comboPairs[t_result_combos].append(front)
                self.comboPairs[t_result_combos].append(back)
            return True

        return False

