#remove!/bin/env python3

def wordtoset(word):           
    a = set()
    for letter in word:
        a.add(letter)
    return a

def removeletter(combos,letter):
    if letter:
        if letter in combos:
            del combos[letter]
        for combo in combos:
            if letter in combos[combo]:
                combos[combo].remove(letter)

def rearange(combos, letter, letter2):
    sortedlist = [[],[],[],[],[],[],[]]
    empty = True

    removeletter(combos,letter)
    removeletter(combos,letter2)

    for combo in combos:
        list_length = len(combos[combo])
        if list_length > 0:
            sortedlist[list_length - 1].append({combo:combos[combo]})
            empty = False
        else:
            empty = True

    return sortedlist, empty

def is_not_in (word1, word2):
    for letter in word1:
        if letter in word2:
            return False
    return True

def is_in (word1, word2):
    for letter in word1:
        if letter not in word2:
            return False
    return True

def findpair(liste, possible_words):
    combos = {}
    letterset = set()

    for word in liste:
        for letter in word:
            letterset.add(letter)

    for word in liste:
        for letter in word:
            combos[letter] = set()
            combos[letter].update(letterset)

    for word in liste:
        for letter in word:
            combos[letter].difference_update(wordtoset(word))

    min_letter = liste[0][0]
    min_length = len(combos[min_letter])

    for combo in combos:
        if len(combos[combo]) < min_length:
            min_letter = combo
            min_length = len(combos[combo])


    oben = []
    unten = []

    sortedlist, empty = rearange(combos,"","")

    while (not empty):
        letter_oben = ""
        letter_unten = ""
        for elem in sortedlist:
            if len(elem) > 0:
                for key in elem[0]:
                    letter_oben = key
                    letter_unten = elem[0][key].pop()
                    oben.append(letter_oben)
                    unten.append(letter_unten)
            if letter_oben and letter_unten:
                sortedlist, empty = rearange(combos,letter_oben, letter_unten)
                break

    if (len(oben) == 4 and len(unten) == 4):
        removepossiblewords(possible_words, liste)
        print ("==> %s" % liste)
        print ("  %s" % oben)
        print ("  %s" % unten)

def removepossiblewords(possible_words, liste):
    for word in liste:
        possible_words.discard(word)

wordlist_file = open("wordlist.txt")

wordlist = wordlist_file.read().splitlines()

possible_wordlist =  set()

is_in_word = False

letters = []

combo_words = {}

final_list = {}

# Woerter ohne doppelten Buchstaben, bspw. BALL
for word in wordlist:
    for letter in word:
        if letter not in letters:
            letters.append(letter)
        else:
            letters = []
            break

    if letters:
        possible_wordlist.add("".join(letters))
        letters = []

#print (" Begin Kombinationen ")

# 
for word in possible_wordlist:
    for word2 in possible_wordlist:
        if (not word2 in combo_words):
            if is_not_in(word2, word):
                if word not in combo_words:
                    combo_words[word] = set()
                combo_words[word].add(word2)


for word in combo_words:
    if len(combo_words[word]) > 1:
        for compareword in combo_words[word]:
            letters = []
            letters.append(word)
            letters.append(compareword)   
            eightword = "".join(letters)
            final_list[eightword] = set()
            for word2 in possible_wordlist:
                if is_in(word2, eightword):
                    final_list[eightword].add(word2)

for word in final_list:
    if len(final_list[word]) > 2:
        findpair(list(final_list[word]), possible_wordlist)

print(possible_wordlist)
