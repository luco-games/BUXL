import findWordPairs, json, io, hashlib, itertools

wordlist_file = open("vendor/wordlist.txt")

wordlist = wordlist_file.read().splitlines()

fWP = findWordPairs.findWordPairs(wordlist)
result = fWP.generatePairs()

data = {}
allsolutions = []
allsolutionsLength = []

for key in result:
    hashword = "".join(result[key][0])
    hashword += "".join(result[key][1])
    gH = hashlib.sha256(hashword.encode("utf-8")).hexdigest()[:15]

    if (gH in data):
        continue

    json_arr = {}
    json_arr["f"] = result[key][0]
    json_arr["b"] = result[key][1]

    solutions = list(key)
    allsolutions.extend(solutions)
    allsolutionsLength.append(len(solutions))

    if (len(solutions) == 1):
        print(gH)

    json_arr["s"] = solutions

    data[gH] = json_arr
    
with io.open('data/combopairs.js', 'w', encoding='utf-8') as f:
  f.write("var data=%s;" % json.dumps(data,separators=(',', ':')))

html_out = '<!doctype html>\n<html> <head> <meta charset="utf-8"> <title>BUXL</title> <meta name="description" content="Buxl, finde alle Kombinationen"> <meta name="author" content="JC"> <meta name="google" content="notranslate" /> </head> <body>\n'

html_out += "<p>Following words could not be processed:</p>\n"
for word in wordlist:
    if word not in allsolutions:
        html_out += "<b>{0}</b>\n".format(word)

html_out += "\n<p>Combinations: {0}</p>".format(len(result))
html_out += "\n</body>\n</html>"

overallSum = len(allsolutions) - 1;

resultLength = ["<p>{0} - Länge: {1}</p>\n".format(len(list(g[1])),g[0]) for g in itertools.groupby(sorted(allsolutionsLength))]
result = ["<span style='font-size:{0}px'>{1}</span>\n".format(len(list(g[1]))/overallSum * 10000, g[0]) for g in itertools.groupby(sorted(allsolutions))]

for resLength in resultLength:
    html_out += resLength

for res in result:
    html_out += res

with io.open('data/tagcloud.html', 'w', encoding='utf-8') as f:
  f.write(html_out)
