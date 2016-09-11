var database = {
    read: function(index){
        var storage = localStorage;
        var value = storage.getItem(this._storage_key+"-kabu-"+index.toString());
        var kabus = [];
        if (value) {
            value = JSON.parse(value);
            $.each(value, function(i, val) {
                kabus.push(val);
            });
        }
        return kabus;
    },
    write: function(){
        var storage = localStorage;
        var avg = Number($('#iavg').val());
        var count = Number($('#icount').val());
        var haito = Number($('#ihaito').val());
        var gyoshu = $('#igyoshu').val();
        var key = $('#ikey').val();
        var rimawari = ((haito/avg)*100).toFixed(2);
        var record = {
            name : $('#iname').val(),
            avg : avg,
            count : count,
            haito : haito,
            gyoshu : Number(gyoshu),
            rimawari: rimawari
        };
        var list = this.read(gyoshu);
        if(key === ""){
            list.push(record);
        }else{
            list[Number(key)] = record;
        }
        storage.setItem(this._storage_key+"-kabu-"+gyoshu, JSON.stringify(list));
    },
    remove: function(){
        var storage = localStorage;
        var gyoshu = $('#igyoshu').val();
        var key = $('#ikey').val();
        var list = database.read(gyoshu);
        list.splice(Number(key) , 1) ;
        storage.setItem(this._storage_key+"-kabu-"+gyoshu, JSON.stringify(list));
    },
    clear: function(){
        localStorage.clear();
    },
    _storage_key: 'haito-hikabu'
};
