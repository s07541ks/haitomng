function initGyoshu(){
    var select = $('#igyoshu');
    $.each(gyoshu(), function(i, val){
        var option = $('<option/>').attr({'value': i.toString()}).text(val);
        select.append(option);
    });
    select.selectmenu();
}

function gyoshuByLabel(label){
    var result = 0;
    $.each(gyoshu(), function(i, val){
        if (val === label){
            result = i;
            return false;
        }
    });
    return result;
}

function gyoshu(){
    var data = [
        "水産・農林業",
        "鉱業",
        "建設業",
        "食料品",
        "繊維製品",
        "パルプ・紙",
        "化学",
        "医薬品",
        "石油・石炭製品",
        "ゴム製品",
        "ガラス・土石製品",
        "鉄鋼",
        "非鉄金属",
        "金属製品",
        "機械",
        "電気機器",
        "輸送用機器",
        "精密機器",
        "その他製品",
        "電気・ガス業",
        "陸運業",
        "海運業",
        "空運業",
        "倉庫・運輸関連業",
        "情報・通信",
        "卸売業",
        "小売業",
        "銀行業",
        "証券業",
        "保険業",
        "その他金融業",
        "不動産業",
        "サービス業"
    ];
    return data;
}
