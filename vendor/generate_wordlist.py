import findWordPairs, json, io, hashlib

wordlist_file = open("wordlist.txt")

wordlist = wordlist_file.read().splitlines()

fWP = findWordPairs.findWordPairs(wordlist) 
result = fWP.generatePairs()

data = {}
allsolutions = []

for key in result:
    hashword = "".join(result[key][0])
    hashword += "".join(result[key][1])
    gameHash = hashlib.sha256(hashword.encode("utf-8")).hexdigest()[:15]

    json_arr = {}
    json_arr["front"] = result[key][0]
    json_arr["back"] = result[key][1]

    solutions = list(key)
    allsolutions.extend(solutions)
    json_arr["solutions"] = solutions

    data[gameHash] = json_arr;
    
with io.open('../data/combopairs.js', 'w', encoding='utf-8') as f:
  f.write("var data = %s;" % json.dumps(data))

print ("Following words could not be processed:")
for word in wordlist:
    if word not in allsolutions:
        print (word)

print ("Combinations: %s" % len(result))
