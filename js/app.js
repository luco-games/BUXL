function getData () {

    var randomvalues = new Uint32Array(1);
    var datalength = data.length + 1;
    window.crypto.getRandomValues(randomvalues);

    var selecteddata = data[randomvalues%datalength]

    var myTmpl = $.templates("#tmpl");

    var html = myTmpl.render(selecteddata);

    $("#content").html(html);

    document.getElementById("reload").addEventListener("click", getData); 
}

getData();
