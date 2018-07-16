wordlist_file = open("wordlist.txt")
wordlist_new_file = open("wordlist_new.txt")

wordlist = wordlist_file.read().splitlines()
wordlist_new_ar = wordlist_new_file.read().splitlines()

wordlist_new = set()

for word in wordlist_new_ar:
    if word not in wordlist:
        wordlist_new.add(word)


letters = []
possibleWords = set()

for word in wordlist_new:
    for letter in word:
        if letter not in letters:
            letters.append(letter)
        else:
            letters = []
            break

    if letters:
        possibleWords.add("".join(letters))
        letters = []


for word in possibleWords:
    print (word)
