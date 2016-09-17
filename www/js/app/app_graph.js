var appGraph = {
    init: function(){
        var selectedGyoshu = this._selectedGyoshuData(gyoshu.data());
        this._initContent(selectedGyoshu);
        this._initSlider();
    },
    _initContent: function(selectedGyoshu){
        $('#chartcontent').empty();
        var ul = $('<ul/>').attr({'class':'lightslider'});
        ul.append(this._gyoshuChartContent());
        ul.append(this._kabuChartContent(selectedGyoshu));
        ul.append(this._categoryChartContent());
        ul.append(this._catgyoshuChartContent());
        $('#chartcontent').append(ul);
        this._initPeiChart('gyoshuchart', selectedGyoshu);
        this._initPeiChart('kabuchart', this._kabuData(selectedGyoshu[0].index));
        this._initPeiChart('categorychart', this._categoryData());
        this._initPeiChart('catgyoshuchart', this._catgyoshuData(0));
        var _this = this;
        $('#selectgyoshu').selectmenu();
        $('#selectgyoshu').change(function(){
            var index = $('#selectgyoshu').val();
            _this._initPeiChart('kabuchart', _this._kabuData(index));
        });
        $('#selectcatgyoshu').selectmenu();
        $('#selectcatgyoshu').change(function(){
            var index = $('#selectcatgyoshu').val();
            _this._initPeiChart('catgyoshuchart', _this._catgyoshuData(index));
        });
    },
    _gyoshuChartContent: function(){        
        return $('<li/>').append($('<div/>').attr({'id':'gyoshuchart'}));
    },
    _kabuChartContent: function(selectedGyoshu){
        var select = this._selectGyoshu(selectedGyoshu);
        var chart = $('<div/>').attr({'id':'kabuchart'});
        var content = $('<li/>');
        content.append(select);
        content.append(chart);
        return content;
    },
    _categoryChartContent: function(){        
        return $('<li/>').append($('<div/>').attr({'id':'categorychart'}));
    },
    _catgyoshuChartContent: function(){        
        var select = this._selectGategory();
        var chart = $('<div/>').attr({'id':'catgyoshuchart'});
        var content = $('<li/>');
        content.append(select);
        content.append(chart);
        return content;
    },
    _initSlider: function(){
        $(".lightslider").lightSlider({
            item: 1,
            controls: false,
            adaptiveHeight:true
        });
    },
    _initPeiChart: function(content_id, datas){
        $('#'+content_id).empty();
        var canvas = $('<canvas/>').attr({'id':content_id+'obj','width': this._width, 'height': this._width});
        $('#'+content_id).append(canvas);
        var ctx = document.getElementById(content_id+'obj').getContext('2d');
        this._pieChart(ctx, datas);
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
    _selectedGyoshuData: function(gyoshu_data){
        var colors = this._colorData();
        var count = 0;
        var sum = 0;
        var datas = [];
        var gyoshu_master = gyoshu.data();
        $.each(gyoshu_data, function(i, name){
            var listkabu = database.read(gyoshu_master.indexOf(name));
            if(listkabu.length === 0){
            } else {
                var kabu_sum = 0;
                $.each(listkabu, function(j, val){
                    kabu_sum += val.haito * val.count;
                });
                var color = colors[count % colors.length];
                var data = {
                    index: i,
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
        return this._percentData(datas, sum);
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
        return this._percentData(datas, sum);
    },
    _categoryData: function(){
        var colors = this._colorData();
        var sum = 0;
        var count = 0;
        var datas = [];
        $.each(gyoshu.category(), function(i, category){
            var cat_val = 0;
            $.each(category[1], function(i, gyoshu_index){
                var listkabu = database.read(gyoshu_index);
                $.each(listkabu, function(j, kabu){
                    cat_val += kabu.haito * kabu.count;
                });
            });
            var color = colors[count % colors.length];
            var data = {
                value: cat_val,
                color: color[0],
                highlight: color[1],
                label: category[0]
            };
            datas.push(data);
            sum += cat_val;
            count += 1;
        });
        return this._percentData(datas, sum);
    },
    _catgyoshuData: function(index){
        var catgyoshu = gyoshu.category();
        var gyoshus = gyoshu.data();
        var selectedGyoshu = [];
        $.each(catgyoshu[index][1], function(i, val){
            selectedGyoshu.push(gyoshus[val]);
        });
        return this._selectedGyoshuData(selectedGyoshu);
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
    _selectGyoshu: function(selectedGyoshu){
        var select = $('<select/>').attr({'id':'selectgyoshu'});
        $.each(selectedGyoshu, function(i, val){
            var option = $('<option/>').attr({'value': val.index.toString()}).text(val.label);
            select.append(option);
        });
        return select;
    },
    _selectGategory: function(){
        var select = $('<select/>').attr({'id':'selectcatgyoshu'});
        $.each(gyoshu.category(), function(i, val){
            var option = $('<option/>').attr({'value': i.toString()}).text(val[0]);
            select.append(option);
        });
        return select;
    },
    _percentData: function(datas, sum){
        $.each(datas, function(i, data){
            datas[i].value = ((datas[i].value/sum)*100).toFixed(2);
        });
        return datas;
    },
    _width: screen.availWidth*0.9
};
