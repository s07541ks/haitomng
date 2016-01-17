var STORAGE_KEY = 'haito-hikabu';

function clearDB(){
    alert("clear");
    localStorage.clear();
}
function readKabu(gyoshu){
    var storage = localStorage;
    var value = storage.getItem(STORAGE_KEY+"-kabu-"+gyoshu.toString());
    var kabus = [];
    if (value) {
        value = JSON.parse(value);
        $.each(value, function(i, val) {
            kabus.push(val);
        });
    }
    return kabus;
}

function writeKabu(){
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
    var list = readKabu(gyoshu);
    if(key === ""){
        list.push(record);
    }else{
        list[Number(key)] = record;
    }
    storage.setItem(STORAGE_KEY+"-kabu-"+gyoshu, JSON.stringify(list));
}

function removeKabu(){
    var storage = localStorage;
    var gyoshu = $('#igyoshu').val();
    var key = $('#ikey').val();
    var list = readKabu(gyoshu);
    list.splice(Number(key) , 1) ;
    storage.setItem(STORAGE_KEY+"-kabu-"+gyoshu, JSON.stringify(list));
}
