import findWordPairs
import json

wordlist_file = open("wordlist.txt")

wordlist = wordlist_file.read().splitlines()

fWP = findWordPairs.findWordPairs(wordlist) 
result = fWP.generatePairs()

data = []

for key in result:
    json_arr = {}
    json_arr["bottom"] = result[key][0]
    json_arr["top"] = result[key][1]
    json_arr["solution"] = ", ".join(key)
    data.append(json_arr)
    
print (json.dumps(data))
