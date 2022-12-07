

function overviewBarChart() {
    fetch("https://raw.githubusercontent.com/rrrrrrockpang/rrrrrrockpang.github.io/main/overview.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
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
            xaxis: {autotick: false},
            legend: {"orientation": "h", bgcolor: 'transparent', y: -0.2},
            title: {text: "Publication Output in CHI and NeurIPS, 2002-2021"}
        };

        Plotly.newPlot('overviewBarChart', data, layout);
    })
}

function similarityHeatmap() {
    fetch("https://raw.githubusercontent.com/rrrrrrockpang/rrrrrrockpang.github.io/main/overview.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
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
            xaxis: {autotick: false},
            legend: {"orientation": "h", bgcolor: 'transparent', y: -0.2},
            title: {text: "Publication Output in CHI and NeurIPS, 2002-2021"}
        };

        Plotly.newPlot('overviewBarChart', data, layout);
    })
}


$(document).ready(function() {
    $(".citation").each(function() {
        let id = $(this).attr("id");
        $(this).append(`
            [<a class="bib" data-trigger="hover" data-toggle="popover" data-placement="top" href="#bib` + id + `" data-original-title="" title="">` + id + `</a>]`);
    });

    overviewBarChart();

});


    
