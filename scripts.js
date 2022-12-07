

function overviewBarChart() {
    fetch("https://uwdata.github.io/future-scholarly-communication/22au/ex2/cse599d-paper-data.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
}

$(document).ready(function() {
    $(".citation").each(function() {
        let id = $(this).attr("id");
        $(this).append(`
            [<a class="bib" data-trigger="hover" data-toggle="popover" data-placement="top" href="#bib` + id + `" data-original-title="" title="">` + id + `</a>]`);
    });

    overviewBarChart();

    var data = [
        {
          z: [[1, null, 30, 50, 1], [20, 1, 60, 80, 30], [30, 60, 1, -10, 20]],
          x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          y: ['Morning', 'Afternoon', 'Evening'],
          type: 'heatmap',
          hoverongaps: false
        }
      ];
      
      Plotly.newPlot('chart', data);
});


    
