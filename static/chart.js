function fetchDataAndUpdateChart() {
    fetch('/get-datachart')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          updateChart(data);
        })
        .catch(error => console.error('Error:', error));
}


function updateChart(data_df) {
 
    console.log(data_df)
    am5.ready(function() {
        
        var root = am5.Root.new("chartdiv");

        root.setThemes([
            am5themes_Animated.new(root),
          ]);


        var chart = root.container.children.push( 
          am5percent.PieChart.new(root, {
            layout: root.verticalHorizontal,
            centerX: am5.percent(50),
            x: am5.percent(50)
          }) 
        );
        
        // Create series
        var series = chart.series.push(
          am5percent.PieSeries.new(root, {
            name: "Series",
            valueField: "value",
            categoryField: "class",
            alignLabels: false
          })
        );
        series.data.setAll(data_df);


        series.labels.template.setAll({
          fill: am5.color("#ffffff")
        })
        

  
            
    });
}

document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndUpdateChart()
    
});
 