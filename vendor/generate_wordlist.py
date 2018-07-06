import findWordPairs, json, io

wordlist_file = open("wordlist.txt")

wordlist = wordlist_file.read().splitlines()

fWP = findWordPairs.findWordPairs(wordlist) 
result = fWP.generatePairs()

data = []

for key in result:
    json_arr = {}
    json_arr["bottom"] = result[key][0]
    json_arr["top"] = result[key][1]
    json_arr["solution"] = list(key)
    data.append(json_arr)
    
with io.open('../data/combopairs.js', 'w', encoding='utf-8') as f:
  f.write("var data = %s;" % json.dumps(data))
