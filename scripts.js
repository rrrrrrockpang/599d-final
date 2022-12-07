

function overviewBarChart() {
    fetch("https://raw.githubusercontent.com/rrrrrrockpang/rrrrrrockpang.github.io/main/overview.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let [year, chiCount, neuripsCount] = [[], [], []];

        for (let i = 0; i < data.length; i++) {
            if (data[i].conference === "CHI") {
                chiCount.push(data[i].number);
                year.push(data[i].year);
            }

            if (data[i].conference === "NeurIPS") {
                neuripsCount.push(data[i].number);
            }

        }

        var dataChi = {
            x: year,
            y: chiCount,
            name: '# of CHI Papers',
            type: 'bar'
        };
        var dataNeurips = {
            x: year,
            y: neuripsCount,
            name: '# of NeurIPS Papers',
            type: 'bar'
        };
        var data = [dataChi, dataNeurips];
        var layout = {
            barmode: 'group',
            xaxis: {autotick: false, title: "Year"},
            yaxis: {title: "# of Papers"},
            legend: {"orientation": "h", bgcolor: 'transparent', y: -0.2},
            title: {text: "Publication Output in CHI and NeurIPS, 2002-2021"}
        };

        Plotly.newPlot('overviewBarChart', data, layout);
    })
}

function heatmapTitles() {
    fetch("https://raw.githubusercontent.com/rrrrrrockpang/rrrrrrockpang.github.io/main/heatmap.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        
        let [z, cYears, nYears] = [[], [], []];

        for (let i = 0; i < data.length; i+=18) {
            zRow = [];
            for (let j = 0; j < 18; j++) {
                zRow.push(data[i+j].score);
            }
            z.push(zRow);

        }
        for (let i = 2001; i < 2021; i++) {
            cYears.push(i);
            if (i < 2019) {
                nYears.push(i);
            }
        }
        console.log(z);
        var data = [{
            z: z,
            x: nYears,
            y: cYears,
            type: 'heatmap',
            hoverongaps: false,
            colorscale: 'YlGnBu',
        }];
       
        var layout = {
            title: {text: "Cosine Similarity Between CHI and NeurIPS Paper Titles, 2002-2021"},
            xaxis: {autotick: false, title: "NeurIPS Year"},
            yaxis: {autotick: false, title: "CHI Year"},
        };

        Plotly.newPlot('heatmapTitles', data, layout);
    })
}


$(document).ready(function() {
    $(".citation").each(function() {
        let id = $(this).attr("id");
        $(this).append(`
            [<a class="bib" data-trigger="hover" data-toggle="popover" data-placement="top" href="#bib` + id + `" data-original-title="" title="">` + id + `</a>]`);
    });

    overviewBarChart();
    heatmapTitles();

});


    
