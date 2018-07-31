import findWordPairs, json, io, hashlib

wordlist_file = open("wordlist.txt")

wordlist = wordlist_file.read().splitlines()

fWP = findWordPairs.findWordPairs(wordlist) 
result = fWP.generatePairs()

data = []
solutions = []

for key in result:
    json_arr = {}
    json_arr["bottom"] = result[key][0]
    json_arr["top"] = result[key][1]
    hashword = "".join(result[key][0])
    hashword += "".join(result[key][1])
    json_arr["hash"] = hashlib.sha256(hashword.encode("utf-8")).hexdigest()
    solution = list(key)
    solutions.extend(solution)
    json_arr["solution"] = solution
    json_arr["solved"] = []
    data.append(json_arr)
    
with io.open('../data/combopairs.js', 'w', encoding='utf-8') as f:
  f.write("var data = %s;" % json.dumps(data))

print ("Following words could not be processed:")
for word in wordlist:
    if word not in solutions:
        print (word)
