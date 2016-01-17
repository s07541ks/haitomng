function drawChart(){
    var colors = getColors();
    var count = 0;
    var sum = 0;
    var datas = [];
    $.each(gyoshu(), function(i, name){
        var listkabu = readKabu(i);
        if(listkabu.length === 0){
        } else {
            var kabu_sum = 0;
            $.each(listkabu, function(i, val){
                kabu_sum += val.haito * val.count;
            });
            var color = colors[count % colors.length];
            var data = {
                value: kabu_sum,
                color: color[0],
                highlight: color[1],
                label: name
            };
            datas.push(data);
            count++;
            sum += kabu_sum;
        }
    });
    $.each(datas, function(i, data){
        datas[i].value = ((datas[i].value/sum)*100).toFixed(2);
    });
    $('#chartcontent').empty();
    $('#subchartcontent').empty();
    var canvas = $('<canvas/>').attr({'id':'chartobj','width':300, 'height':300});
    $('#chartcontent').append(canvas);
    var ctx = document.getElementById('chartobj').getContext('2d');
    var pieChart = new Chart(ctx).Pie(datas, {
        animation: false,
        tooltipTemplate: "<%if (label){%><%=label%>:<%=value%>%<%}%>",
        onAnimationComplete: function(){
            this.showTooltip(this.segments, true);
        },
        tooltipEvents: [],
        showTooltips: true
    });
    canvas.click(function(evt){
        var activePoints = pieChart.getSegmentsAtEvent(evt);
        var index = gyoshuByLabel(activePoints[0].label);
        $('#subchartcontent').empty();
        var canvas = $('<canvas/>').attr({'id':'subchartobj','width':300, 'height':300});
        $('#subchartcontent').append(canvas);
        var subDatas = subchartData(index);
        var ctx = document.getElementById('subchartobj').getContext('2d');
        var subPieChart = new Chart(ctx).Pie(subDatas, {
            animation: false,
            tooltipTemplate: "<%if (label){%><%=label%>:<%=value%>%<%}%>",
            onAnimationComplete: function(){
                this.showTooltip(this.segments, true);
            },
            tooltipEvents: [],
            showTooltips: true
        });
        $.mobile.changePage($('#subgraph'), {transition:'slide'});
    });
}

function subchartData(index){
    var colors = getColors();
    var sum = 0;
    var datas = [];
    var listkabu = readKabu(index);
    $.each(listkabu, function(i, val){
        var color = colors[i % colors.length];
        var value = val.haito * val.count;
        var data = {
            value: value,
            color: color[0],
            highlight: color[1],
            label: val.name
        };
        datas.push(data);
        sum += value;
    });
    $.each(datas, function(i, data){
        datas[i].value = ((datas[i].value/sum)*100).toFixed(2);
    });
    return datas;
}

function getColors() {
    var data = [
        ["#F7464A", "#FF5A5E"],
        ["#46BFBD", "#5AD3D1"],
        ["#FDB45C", "#FFC870"],
        ["#949FB1", "#A8B3C5"],
        ["#4D5360", "#616774"]
    ];
    return data;
}
