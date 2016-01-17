function inputKabu(){
    writeKabu();
    loadList();
    $.mobile.changePage($('#list'), {transition:'slide'});
}

function deleteKabu(){
    removeKabu();
    loadList();
    $.mobile.changePage($('#list'), {transition:'slide'});
}

function editKabu(name, avg, count, haito, gyoshu, key){
    $('#iname').val(name);
    $('#iavg').val(avg);
    $('#icount').val(count);
    $('#ihaito').val(haito);
    var select = $('#igyoshu');
    select.val(gyoshu);
    $('#ikey').val(key);
    select.selectmenu('refresh',true);
}

function clearKabu(){
    $('#iname').val("");
    $('#iavg').val("");
    $('#icount').val("");
    $('#ihaito').val("");
    var select = $('#igyoshu');
    select.val("");
    $('#ikey').val("");
    select.selectmenu('refresh',true);
}
