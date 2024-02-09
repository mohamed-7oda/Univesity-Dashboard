function fetchDataAndUpdateBar() {
    fetch('/get-databar')
        .then(response => response.json())
        .then(data => {
            updateDataBar(data);
        })
        .catch(error => console.error('Error:', error));
}


function updateDataBar(data) {
    am5.ready(function() {


        // Create root element
        var root = am5.Root.new("bardiv");
        
        // Set themes
        root.setThemes([
          am5themes_Animated.new(root)
        ]);
        
        // Create chart
        var chart = root.container.children.push(
          am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            paddingLeft: 0,
            layout: root.verticalLayout
          })
        );
        
        // Add scrollbar
        chart.set(
          "scrollbarX",
          am5.Scrollbar.new(root, {
            orientation: "horizontal"
          })
        );
        
        // Create axes
        var xRenderer = am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minGridDistance: 60
        });
        var xAxis = chart.xAxes.push(
          am5xy.CategoryAxis.new(root, {
            categoryField: "year",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
          })
        );
        xRenderer.grid.template.setAll({
          location: 1
        })
        
        xAxis.data.setAll(data);
        
        var yAxis = chart.yAxes.push(
          am5xy.ValueAxis.new(root, {
            min: 0,
            extraMax: 0.1,
            renderer: am5xy.AxisRendererY.new(root, {
              strokeOpacity: 0.1
            })
          })
        );
        
        
        // Add series
        var series1 = chart.series.push(
          am5xy.ColumnSeries.new(root, {
            name: "Income",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "income",
            categoryXField: "year",
            tooltip: am5.Tooltip.new(root, {
              pointerOrientation: "horizontal",
              labelText: "{name} in {categoryX}: {valueY} {info}"
            })
          })
        );
        
        series1.columns.template.setAll({
          tooltipY: am5.percent(10),
          templateField: "columnSettings"
        });
        
        series1.data.setAll(data);
        
        var series2 = chart.series.push(
          am5xy.LineSeries.new(root, {
            name: "Expenses",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "expenses",
            categoryXField: "year",
            tooltip: am5.Tooltip.new(root, {
              pointerOrientation: "horizontal",
              labelText: "{name} in {categoryX}: {valueY} {info}"
            })
          })
        );
        
        series2.strokes.template.setAll({
          strokeWidth: 3,
          templateField: "strokeSettings"
        });
        
        
        series2.data.setAll(data);
        
        series2.bullets.push(function () {
          return am5.Bullet.new(root, {
            sprite: am5.Circle.new(root, {
              strokeWidth: 3,
              stroke: series2.get("stroke"),
              radius: 5,
              fill: root.interfaceColors.get("background")
            })
          });
        });
        
        chart.set("cursor", am5xy.XYCursor.new(root, {}));
        
        // Add legend
        var legend = chart.children.push(
          am5.Legend.new(root, {
            centerX: am5.p50,
            x: am5.p50,
            alignLabels: false
          })
        );
        legend.data.setAll(chart.series.values);

        legend.labels.template.setAll({
          fill: am5.color("#ffffff")
        })
        
        // Make stuff animate on load
        chart.appear(1000, 100);
        series1.appear();


        xAxis.get("renderer").labels.template.setAll({
          fill: root.interfaceColors.get("alternativeText")
        });
        
        xAxis.setAll({
          background: am5.Rectangle.new(root, {
            fill: root.interfaceColors.get("white"),
            fillOpacity: 0.7
          })
        });


        yAxis.get("renderer").labels.template.setAll({
          fill: root.interfaceColors.get("alternativeText")
        });
        
        yAxis.setAll({
          background: am5.Rectangle.new(root, {
            fill: root.interfaceColors.get("white"),
            fillOpacity: 0.7
          })
        });
        
        
        });
}




document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndUpdateBar()
});