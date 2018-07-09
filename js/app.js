function setText(btn, text) {
    btn.text( text );
}

function getText(btn) {
    return btn.text().replace(/[\n ]/g,'');
}


function replaceText(btn,orig, repltxt) {
    btn.attr("class",btn.attr("class").replace(orig, repltxt));
}

function shuffleData() {
    var randomvalues = new Uint32Array(1);
    var datalength = data.length + 1;
    window.crypto.getRandomValues(randomvalues);

    var shuffledData = data[randomvalues%datalength]
    shuffledData["solved"] = [];
    renderData(shuffledData);
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

    var result = solution.substr(0, foundID.index) + new_char + solution.substr(foundID.index + 1);

    $("[data-solution]").attr("data-solution", result );
    $(".solution[data-solution-index="+foundID.index+"]").text(new_char);
}

function renderData (shuffledData) {

    var myTmpl = $.templates("#tmpl");
    var html = myTmpl.render(shuffledData);

    $("#content").html(html);

    var SolutionsLeft = shuffledData["solution"].length - shuffledData["solved"].length;

    if (SolutionsLeft === 1)
        $(".combilength").text("Es gibt eine Möglichkeit");
    else
        $(".combilength").text("Es gibt "+SolutionsLeft.toString()+" Möglichkeiten");

    if (SolutionsLeft === 0) {
        $(".gamewrap").effect( "explode", "1000", function() {
            shuffleData(); 
        });
    }

    document.getElementById("reload").addEventListener("click", shuffleData); 

    $( "[data-game-btn-id]" ).click(function() {
        var id = $(this).attr("data-game-btn-id");
        var value = $(this).attr("data-game-btn-enabled");
        var btn_origin = $(this);

        if ( value === "true") {
            var btn_target = $(".letter-notselected[data-game-btn-id=" + id + "]");
            var delete_char = getText(btn_origin);

            replaceText(btn_origin, "letter-selected", "letter-inactive");
            replaceText(btn_target, "letter-notselected", "letter-inactive");
            btn_origin.attr("data-game-btn-enabled","false");
            btn_target.attr("data-game-btn-enabled","false");

            renderSolution (delete_char, "_");
        } else if ( value === "inactive" ) {
            var btn_target = $(".letter-selected[data-game-btn-id=" + id + "]");
            replaceText(btn_origin, "letter-notselected", "letter-selected");
            replaceText(btn_target, "letter-selected", "letter-notselected");
            btn_origin.attr("data-game-btn-enabled","true");
            btn_target.attr("data-game-btn-enabled","inactive");

            var replaceChar = getText(btn_target);
            var newValue = getText(btn_origin);
            renderSolution (replaceChar, newValue);
        } else {
            replaceText (btn_origin, "letter-inactive", "letter-selected");
            var btn_target = $(".letter-inactive[data-game-btn-id=" + id + "]");
            var newValue = getText(btn_origin);

            replaceText(btn_target, "letter-inactive", "letter-notselected");
            btn_origin.attr("data-game-btn-enabled","true");
            btn_target.attr("data-game-btn-enabled","inactive");

            renderSolution (null, newValue);
        }

        if ($("[data-game-btn-enabled=false]").length === 0) {

            var usersolution = getText($("[data-solution]"));

            if ((jQuery.inArray(usersolution, shuffledData["solution"]) === -1)) {
                $(".gamewrap").effect( "shake", function() {
                    renderData(shuffledData);
                });
            } else if (jQuery.inArray(usersolution, shuffledData["solution"]) >= 0
                        && jQuery.inArray(usersolution, shuffledData["solved"]) >= 0) {
                $(".gamewrap").effect( "pulsate", 800, function() {
                    renderData(shuffledData);
                });
            } else {
                $(".gamewrap").effect( "pulsate", 800, function() {
                    $(".solved").append($("<li>").text(usersolution));
                    shuffledData["solved"].unshift(usersolution);
                    renderData(shuffledData);
                });
            }
        } 
    
    });
}

shuffleData();
