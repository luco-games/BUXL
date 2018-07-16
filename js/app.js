var SolutionsLeft = 0;
var shuffledData = null;

function setText(btn, text) {
    btn.text( text );
}

function getText(btn) {
    return btn.text().replace(/[\n ]/g,'');
}

function renderSolution (old_char, new_char) {
    var solution = $("[data-solution]").attr("data-solution");
    var foundID = [];

    if (old_char === null) {
        foundID = solution.match("_");
        if (foundID === null) {
            foundID = [];
            foundID["index"] = solution.length;
        } 
    } else {
        var foundID = solution.match(old_char);
    }

    if (foundID === null)
        return;

    var result = solution.substr(0, foundID.index) + new_char + solution.substr(foundID.index + 1);

    $("[data-solution]").attr("data-solution", result );
    $(".solution[data-solution-index="+foundID.index+"]").text(new_char);
}

function replaceText(btn,orig, repltxt) {
    btn.attr("class",btn.attr("class").replace(orig, repltxt));
}

function selectLetterByLetterAndPosition (letter, position) {
    $("[data-game-btn-id=" + position + "]").each(function() {
        replaceText($(this), "letter-selected", "letter-inactive");
        replaceText($(this), "letter-notselected", "letter-inactive");
        $(this).attr("data-game-btn-enabled","false");
        var delete_char = getText($(this));
        renderSolution (delete_char, "_" );
    });

    selectLetterByLetter(letter);
}

function selectLetterByLetter (letter) {
    if (letter.match(/^[a-zA-ZßßÄÖÜäüö]+$/)) {
        var btn_origin = $("[data-game-btn-letter=" + letter.toUpperCase() + "]");
        if (btn_origin.length !== 0)
            selectLetter(btn_origin);
    }
}

function selectLetter(event) {
    var btn_origin = event;
    var id = $(btn_origin).attr("data-game-btn-id");
    var value = $(btn_origin).attr("data-game-btn-enabled");

    // Button is already enabled
    if ( value === "true") {
        var btn_target = $(".letter-notselected[data-game-btn-id=" + id + "]");
        var delete_char = getText(btn_origin);

        replaceText(btn_origin, "letter-selected", "letter-inactive");
        replaceText(btn_target, "letter-notselected", "letter-inactive");
        btn_origin.attr("data-game-btn-enabled","false");
        btn_target.attr("data-game-btn-enabled","false");

        renderSolution (delete_char, "_");
    // Button is inactive and should be enabled
    } else if ( value === "inactive" ) {
        var btn_target = $(".letter-selected[data-game-btn-id=" + id + "]");
        replaceText(btn_origin, "letter-notselected", "letter-selected");
        replaceText(btn_target, "letter-selected", "letter-notselected");
        btn_origin.attr("data-game-btn-enabled","true");
        btn_target.attr("data-game-btn-enabled","inactive");

        var replaceChar = getText(btn_target);
        var newValue = getText(btn_origin);
        renderSolution (replaceChar, newValue);
    // Button is not inactive and not enabled, never touched
    } else {
        replaceText (btn_origin, "letter-inactive", "letter-selected");
        var btn_target = $(".letter-inactive[data-game-btn-id=" + id + "]");
        var newValue = getText(btn_origin);

        replaceText(btn_target, "letter-inactive", "letter-notselected");
        btn_origin.attr("data-game-btn-enabled","true");
        btn_target.attr("data-game-btn-enabled","inactive");

        renderSolution (null, newValue);
    }

    // Every button is active or inactive, selected
    if ($("[data-game-btn-enabled=false]").length === 0) {

        var usersolution = getText($("[data-solution]"));

        // Wrong solution
        if ((jQuery.inArray(usersolution, shuffledData["solution"]) === -1)) {
            $(".gamewrap").effect( "shake", function() {
                renderData();
            });
        // Right solution, but already found
        } else if (jQuery.inArray(usersolution, shuffledData["solution"]) >= 0
                    && jQuery.inArray(usersolution, shuffledData["solved"]) >= 0) {
            $(".gamewrap").effect( "pulsate", 800, function() {
                renderData();
            });
        // Right solution, not found
        } else {
            if (SolutionsLeft === 1) {
                // Solved
                $(".letter-mass").delay(200).effect( "explode", 1000, function() {
                    shuffleData(); 
                });
            // Right solution, not found
            } else {
                $(".gamewrap").effect( "pulsate", 800, function() {
                    $(".solved").append($("<li>").text(usersolution));
                    shuffledData["solved"].unshift(usersolution);
                    renderData();
                });
            }
        }
    } 
}

function help() {
            var SolutionsLeftAr = [];
            var usersolution = $("[data-solution]").attr("data-solution");
            var position = -1;

            for (i=0; i < shuffledData["solution"].length; i++) {
                if (shuffledData["solved"].indexOf(shuffledData["solution"][i]) === -1 ) {
                    SolutionsLeftAr.unshift(shuffledData["solution"][i])
                }
            }

            if (usersolution.length === 0) {
                var randomvalues = new Uint32Array(1);
                var datalength = SolutionsLeftAr.length;
                window.crypto.getRandomValues(randomvalues);

                var newValue = SolutionsLeftAr[randomvalues%datalength][0];
                selectLetterByLetter(newValue);
            } else {
                var nextValue = "_";
                for (i=0; i < SolutionsLeftAr.length; i++) {
                    for (j=0; j < usersolution.length; j++) {
                        if (usersolution[j].match(SolutionsLeftAr[i][j])) {
                            nextValue = SolutionsLeftAr[i][j+1];
                        } else {
                            break;
                        }
                    }
                }
                selectLetterByLetter(nextValue);
            }
}

function shuffleData() {
    var randomvalues = new Uint32Array(1);
    var datalength = data.length;
    window.crypto.getRandomValues(randomvalues);

    shuffledData = data[randomvalues%datalength]
    shuffledData["solved"] = [];
    renderData();
}



function renderData () {

    var myTmpl = $.templates("#tmpl");
    var html = myTmpl.render(shuffledData);

    $("#content").html(html);

    SolutionsLeft = shuffledData["solution"].length - shuffledData["solved"].length

    if (SolutionsLeft === 1)
        $(".combilength").text("Es gibt eine Möglichkeit");
    else
        $(".combilength").text("Es gibt "+SolutionsLeft.toString()+" Möglichkeiten");

    $( "#reload" ).click(shuffleData);
    $( "#help" ).click(help);

    $( "[data-game-btn-id]").on("click touchend", function(e) { 
        e.stopPropagation();
        e.preventDefault();
        selectLetter($(this), shuffledData);
    }); 
}


$(function() {
    $( this ).on("keypress", function(e) {
            selectLetterByLetter(String.fromCharCode(e.which));
    });

    shuffleData();
});
