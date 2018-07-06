function getFreshData() {
    var randomvalues = new Uint32Array(1);
    var datalength = data.length + 1;
    window.crypto.getRandomValues(randomvalues);

    var selecteddata = data[randomvalues%datalength]
    selecteddata["solved"] = [];
    getData(selecteddata);
}

function getData (selecteddata) {

    var myTmpl = $.templates("#tmpl");

    var html = myTmpl.render(selecteddata);

    $("#content").html(html);
    var leftSolutions = selecteddata["solution"].length - selecteddata["solved"].length;
    if (leftSolutions === 1)
        $(".combilength").text("Es gibt eine Möglichkeit");
    else
        $(".combilength").text("Es gibt "+leftSolutions.toString()+" Möglichkeiten");

    document.getElementById("reload").addEventListener("click", getFreshData); 

    $( "[data-game-button-id]" ).click(function() {
      var id = $(this).attr("data-game-button-id");
      if ($(this).attr("data-game-button-pressed") === "true") {
        var btn_origin = $(".letter-selected[data-game-button-id=" + id + "]");
        var btn_target = $(".letter-notselected[data-game-button-id=" + id + "]");

        if ($(this).attr("data-game-choosedbutton") === "false") {
              //var usersolution = $(".solution").text().slice(0,-1);
              var copy_from = btn_origin.text().replace(/[\n ]/g,'');
              var copy_to = btn_target.text().replace(/[\n ]/g,'');
              var usersolution = $(".solution").text().replace(copy_from, copy_to);
              btn_origin.attr("class", btn_origin.attr("class").replace("letter-selected", "letter-notselected"));
              btn_target.attr("class", btn_target.attr("class").replace("letter-notselected", "letter-selected"));
              $(this).attr("data-game-choosedbutton","true");
        } else {
            var delete_char = btn_origin.text().replace(/[\n ]/g,'');
            var usersolution = $(".solution").text().replace(delete_char,"_");
            btn_origin.attr("class",btn_origin.attr("class").replace("letter-selected","letter-gray"));
            btn_target.attr("class",btn_target.attr("class").replace("letter-notselected","letter-gray"));
            btn_origin.attr("data-game-button-pressed","false");
            btn_target.attr("data-game-button-pressed","false");
            $(this).attr("data-game-choosedbutton", "false");
        }
        $(".solution").text(usersolution);
      } else {
          $("[data-game-button-id=" + id + "]").attr("class",$("[data-game-button-id=" + id + "]").attr("class").replace('letter-gray','letter-notselected'));
          $(this).attr("class",$(this).attr("class").replace('letter-notselected','letter-selected'));
          $(this).attr("data-game-choosedbutton","true");
          $("[data-game-button-id=" + id + "]").attr("data-game-button-pressed","true");
          var usersolution_letter = $(this).text().replace(/[\n ]/g,'');
          if ($(".solution").text().match("_") === null) {
              $(".solution").append(usersolution_letter);
          } else {
             var res = $(".solution").text().replace('_', usersolution_letter);
             $(".solution").text(res);
          }

          if ($("[data-game-button-pressed=false]").length === 0) {

            var usersolution = $(".solution").text();

            if ((jQuery.inArray(usersolution, selecteddata["solution"]) === -1)) {
                $(".gamewrap").effect( "shake", function() {
                    getData(selecteddata);
                });
            } else if (jQuery.inArray(usersolution, selecteddata["solution"]) >= 0
                    && jQuery.inArray(usersolution, selecteddata["solved"]) >= 0) {
                $(".gamewrap").effect( "pulsate", function() {
                    getData(selecteddata);
                });
            } else {
                $(".gamewrap").effect( "pulsate", function() {
                    $(".solved").append($("<li>").text(usersolution));
                    selecteddata["solved"].push(usersolution);
                    getData(selecteddata);
                });
            }
          }
      }
    });
}

getFreshData();


