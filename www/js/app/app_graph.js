var appGraph = {
    init: function(){
        $('#chartcontent').empty();
        $('#subchartcontent').empty();
        this._initGyoshuContent();
    },
    _initGyoshuContent: function(){
        var canvas = $('<canvas/>').attr({'id':'chartobj','width': this._width, 'height': this._width});
        $('#chartcontent').append(canvas);
        var ctx = document.getElementById('chartobj').getContext('2d');
        var gyoshuChart = this._pieChart(ctx, this._gyoshuData());
        var _this = this;
        canvas.click(function(evt){
            var activePoints = gyoshuChart.getSegmentsAtEvent(evt);
            _this._initKabuContent(activePoints[0].label);
            $.mobile.changePage($('#subgraph'), {transition:'slide'});
        });
    },
    _initKabuContent: function(label){
        var index = gyoshu.index(label);
        $('#subchartcontent').empty();
        var canvas = $('<canvas/>').attr({'id':'subchartobj','width': this._width, 'height': this._width});
        $('#subchartcontent').append(canvas);
        var ctx = document.getElementById('subchartobj').getContext('2d');
        this._pieChart(ctx, this._kabuData(index));
    },
    _pieChart: function(ctx, datas){
        return new Chart(ctx).Pie(datas, {
            animation: false,
            tooltipTemplate: "<%if (label){%><%=label%>:<%=value%>%<%}%>",
            onAnimationComplete: function(){
                this.showTooltip(this.segments, true);
            },
            tooltipEvents: [],
            showTooltips: true
        });
    },
    _gyoshuData: function(){
        var colors = this._colorData();
        var count = 0;
        var sum = 0;
        var datas = [];
        $.each(gyoshu.data(), function(i, name){
            var listkabu = database.read(i);
            if(listkabu.length === 0){
            } else {
                var kabu_sum = 0;
                $.each(listkabu, function(j, val){
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
                sum += kabu_sum;
                count++;
            }
        });
        return this._percent(datas, sum);
    },
    _kabuData: function(index){
        var colors = this._colorData();
        var sum = 0;
        var datas = [];
        var listkabu = database.read(index);
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
        return this._percent(datas, sum);
    },
    _colorData: function() {
        return [
            ["#F7464A", "#FF5A5E"],
            ["#46BFBD", "#5AD3D1"],
            ["#FDB45C", "#FFC870"],
            ["#949FB1", "#A8B3C5"],
            ["#4D5360", "#616774"]
        ];
    },
    _percent: function(datas, sum){
        $.each(datas, function(i, data){
            datas[i].value = ((datas[i].value/sum)*100).toFixed(2);
        });
        return datas;
    },
    _width: screen.availWidth*0.9
};
