function loadList(){
    $('#listcontent').empty();
    var list = $('<ul/>').attr({'id':'kabulist', 'data-role':'listview', 'data-inset':'true'});
    var exist_flg = false;
    $.each(gyoshu(), function(i, val){
        var listkabu = readKabu(i);
        if(listkabu.length === 0){
        } else {
            exist_flg = true;
            var divider = $('<li/>').attr({'data-role':'list-divider'}).text(val);
            list.append(divider);
            $.each(listkabu, function(i, val){
                var name = val.name;
                var line = $('<li/>');
                var link = $('<a/>').attr({'href':'#input', 'data-transition':'slide', 'onclick':'editKabu("'+name+'",'+val.avg+','+val.count+','+val.haito+',"'+val.gyoshu+'",'+i+');'}).text(name);
                var count = $('<span/>').attr({'class':'ui-li-count'}).text(val.rimawari+"%");
                link.append(count);
                line.append(link);
                list.append(line);
            });
        }
    });
    $('#listcontent').append(list);
    list.listview();
    if(!exist_flg){
        $.mobile.changePage($('#input'), {transition:'slide'});
    }
}
