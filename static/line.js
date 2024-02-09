function fetchDataAndUpdateLine() {
    fetch('/get-dataline')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          updateLine(data);
        })
        .catch(error => console.error('Error:', error));
}


function updateLine(data_df) {
 
    //console.log(data_df)
    am5.ready(function() {


        // Create root element
        var root = am5.Root.new("linediv");
        
        root.dateFormatter.setAll({
          dateFormat: "yyyy",
          dateFields: ["valueX"]
        });
        
        
        // Set themes
        root.setThemes([
          am5themes_Animated.new(root)
        ]);
        
        
        // Create chart
        var chart = root.container.children.push(am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          pinchZoomX:true
        }));
        
        
        // Add cursor
        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
          behavior: "none"
        }));
        cursor.lineY.set("visible", false);
        
        
        // Create axes
        var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
          maxDeviation:0.5,
          baseInterval: { timeUnit: "year", count: 1 },
          renderer: am5xy.AxisRendererX.new(root, {pan:"zoom", minorGridEnabled: true}),
          tooltip: am5.Tooltip.new(root, {})
        }));
        
        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
          maxDeviation:1,
          renderer: am5xy.AxisRendererY.new(root, {pan:"zoom"})
        }));
        
        // Add series
        var series = chart.series.push(am5xy.StepLineSeries.new(root, {
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          valueXField: "year",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueX}: {valueY}"
          })
        }));
        
        series.strokes.template.setAll({
          strokeWidth: 3
        });
        
        
        // Set up data processor to parse string dates
        series.data.processor = am5.DataProcessor.new(root, {
          dateFormat: "yyyy",
          dateFields: ["year"]
        });
        
        series.data.setAll(data_df);
        
        
        // Make stuff animate on load
        series.appear(1000);
        chart.appear(1000, 100);

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
    fetchDataAndUpdateLine()
    
});
 