var appList = {
    init: function(){
        $('#listcontent').empty();
        var list = $('<ul/>').attr({'id':'kabulist', 'data-role':'listview', 'data-inset':'true'});
        var sum_invest = 0;
        var sum_haito = 0;
        var exist_flg = false;
        $.each(gyoshu.data(), function(i, val){
            var listkabu = database.read(i);
            if(listkabu.length === 0){
            } else {
                exist_flg = true;
                var divider = $('<li/>').attr({'data-role':'list-divider'}).text(val);
                list.append(divider);
                $.each(listkabu, function(i, val){
                    var name = val.name;
                    var line = $('<li/>');
                    var link = $('<a/>').attr({'href':'#input', 'data-transition':'none', 'onclick':'appInput.edit("'+name+'",'+val.avg+','+val.count+','+val.haito+',"'+val.gyoshu+'",'+i+');'}).text(name);
                    var count = $('<span/>').attr({'class':'ui-li-count'}).text(val.rimawari+"%");
                    link.append(count);
                    line.append(link);
                    list.append(line);
                    sum_invest += val.avg * val.count;
                    sum_haito += val.haito * val.count;
                });
            }
        });
        $('#listcontent').append(list);
        list.listview();

        $('#sum_invest').text("¥" + this._num(sum_invest));
        $('#sum_haito').text("¥" + this._num(sum_haito));
        $('#avg_rimawari').text(((sum_haito/sum_invest)*100).toFixed(2)+"%");

        if(!exist_flg){
            $.mobile.changePage($('#input'), {transition:'slide'});
        }
    },
    _num: function(str) {
        var num = new String(str).replace(/,/g, "");
        while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
        return num;
    }
};

