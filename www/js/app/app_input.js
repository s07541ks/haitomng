var appInput = {
    init: function(){
      this.selectGyoshu();  
    },
    insert: function(){
        database.write();
        appList.init();
        $.mobile.changePage($('#list'), {transition:'slide'});
    },
    delete: function(){
        database.remove();
        appList.init();
        $.mobile.changePage($('#list'), {transition:'slide'});
    },
    edit: function(name, avg, count, haito, gyoshu, key){
        $('#input_delete').removeClass('ui-hide');
        $('#iname').val(name);
        $('#iavg').val(avg);
        $('#icount').val(count);
        $('#ihaito').val(haito);
        var select = $('#igyoshu');
        select.val(gyoshu);
        $('#ikey').val(key);
        select.selectmenu('refresh',true);
    },
    clear: function(){
        $('#input_delete').addClass('ui-hide');
        $('#iname').val("");
        $('#iavg').val("");
        $('#icount').val("");
        $('#ihaito').val("");
        var select = $('#igyoshu');
        select.val("");
        $('#ikey').val("");
        select.selectmenu('refresh',true);
    },
    selectGyoshu: function(){
        var select = $('#igyoshu');
        $.each(gyoshu.data(), function(i, val){
            var option = $('<option/>').attr({'value': i.toString()}).text(val);
            select.append(option);
        });
        select.selectmenu();
    }
};