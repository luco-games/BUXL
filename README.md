# Buxl

Wie geht BUXL?
--------
Finde alle Wörter, die aus 4 Buchstaben gebildet werden können!

Wie viele Kombinationen möglich sind, siehst du unten an den leeren dunkel blauen Feldern. Buchstaben, die auf dem selben Kippstein abgebildet sind, lassen sich nicht gleichzeitig auswählen.

Dir gefällt die aktuelle Buxl-Buchstaben-Auswahl, vergib ein Herz und du kannst es jederzeit ansehen; dazu klicke auf die Liste.

#### Du kommst nicht weiter?

Tippe den Smiley an und du bekommst einen Tipp.

Entwickler
-----------
BUXL funktioniert komplett clientbasiert (JavaScript). Alle Daten werden im Session Storage oder in Cookies abgespeichert. Somit ist BUXL jederzeit offline verfügbar und spielbar.

Die Wordliste ist zu finden unter `vendor/wordlist.txt`. Damit daraus `data/combopairs.js` entsteht, muss die Wortliste durch den `vendor/generate_wordlist.py` Generator. Unter `data/tagcloud.html` entsteht eine Wortwolke und eine Liste welche Wörter nicht verarbeitet werden konnten.

Das JavaScript wurde nach dem MVC Muster erstellt und durch [uglify-es](https://www.npmjs.com/package/uglify-es) minimalisiert.

#### Änderungen
Bei Änderungen einfach folgendes ausführen:

    $ bash ./build.sh

Libs
----
#### Javascript:

Generell versuchen wir so wenig externe Bibliotheken wie möglich einzusetzen. Hier sind die die zum Einsatz kommen:
* [animejs](https://animejs.com/) : Damit entstehen die Animationen auf BUXL
* [jsrender](https://www.jsviews.com/) : Eine Templateengine die für das Ein- und Ausblenden von Textblöcken (Hilfe, Impressum, Datenschutz) zuständig ist.

#### Python:
noch keine

Lizenz
----
GPLv3, siehe `LICENSE`- Datei
