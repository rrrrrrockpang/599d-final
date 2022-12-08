

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
            title: {text: "Publication Output in CHI and NeurIPS, 2001-2021"}
        };

        Plotly.newPlot('overviewBarChart', data, layout);
    })
}

function heatmapTitles() {
    fetch("https://raw.githubusercontent.com/rrrrrrockpang/rrrrrrockpang.github.io/main/heatmapTitles.json")
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

        var data = [{
            z: z,
            x: nYears,
            y: cYears,
            type: 'heatmap',
            hoverongaps: false,
            colorscale: 'YlGnBu',
        }];
       
        var layout = {
            title: {text: "Cosine Similarity Between CHI and NeurIPS Paper Titles, 2001-2021"},
            xaxis: {autotick: false, title: "NeurIPS Year"},
            yaxis: {autotick: false, title: "CHI Year"},
            autosize: false,
            height: 600,
        };

        // Plotly.newPlot('heatmapTitles', data, layout);
    })
}

function heatmapAbstracts() {
    fetch("https://raw.githubusercontent.com/rrrrrrockpang/rrrrrrockpang.github.io/main/heatmapAbstracts.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        let [z, cYears, nYears] = [[], [], []];

        for (let i = 0; i < data.length; i+=19) {
            zRow = [];
            for (let j = 0; j < 19; j++) {
                zRow.push(data[i+j].Score);
            }
            z.push(zRow);

        }
        for (let i = 2001; i < 2021; i++) {
            cYears.push(i);
            if (i < 2020) {
                nYears.push(i);
            }
        }

        var data = [{
            z: z,
            x: nYears,
            y: cYears,
            type: 'heatmap',
            hoverongaps: false,
            colorscale: 'YlGnBu',
        }];
       
        var layout = {
            title: {text: "Cosine Similarity Between CHI and NeurIPS Paper Abstracts, 2001-2021"},
            xaxis: {autotick: false, title: "NeurIPS Year"},
            yaxis: {autotick: false, title: "CHI Year"},
            autosize: false,
            height: 600,
        };

        Plotly.newPlot('heatmapAbstracts', data, layout);

        for (let i = 2001; i < 2022; i++) {
            var chi_item = document.createElement('a');
            chi_item.setAttribute('class', 'dropdown-item');
            chi_item.setAttribute('onclick', 'lineChartAbstracts(chi_yr='+i+',neurips_yr=null)');
            chi_item.innerHTML = i;
            $('#chiDropdownYrs').append(chi_item)

            if (i < 2020) {
                var neurips_item = document.createElement('a');
                neurips_item.setAttribute('class', 'dropdown-item');
                neurips_item.setAttribute('onclick', 'lineChartAbstracts(chi_yr=null,neurips_yr='+i+')');
                neurips_item.innerHTML = i;
                $('#neuripsDropdownYrs').append(neurips_item);
            }
        }
    })
}

function lineChartAbstracts(chi_yr, neurips_yr) {
    fetch("https://raw.githubusercontent.com/rrrrrrockpang/rrrrrrockpang.github.io/main/heatmapAbstracts.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        let [x, y] = [[], []];
        let [selected_conf, x_axis, y_axis] = ['', '', ''];
        if (chi_yr) {
            selected_conf = 'CHI';
            x_axis = "NeurIPS Year";
            y_axis = "Cosine Similarity with " + chi_yr + " " + selected_conf;
            for (let i = 0; i < data.length; i+=1) {
                if (data[i].CHI == chi_yr) {
                    x.push(data[i].NeurIPS);
                    y.push(data[i].Score);
                }
            }
        }
        else {
            selected_conf = 'NeurIPS';
            x_axis = "CHI Year";
            y_axis = "Cosine Similarity with " + neurips_yr + " " + selected_conf;
            for (let i = 0; i < data.length; i+=1) {
                if (data[i].NeurIPS == neurips_yr) {
                    x.push(data[i].CHI);
                    y.push(data[i].Score);
                }
            }
        }
        
        var data = [{
            x: x,
            y: y,
            type: 'scatter',
            mode: 'lines',
            hoverongaps: false,
        }];
       
        var layout = {
            title: {text: "Cosine Similarity Between CHI and NeurIPS Paper Abstracts"},
            xaxis: {autotick: false, title: x_axis},
            yaxis: {range: [0.85, 1], title: y_axis},
            // autosize: false,
            // height: 400,
        };

        Plotly.newPlot('lineChartAbstracts', data, layout);
    })
}

function tfidfTopics(chi_yr, neurips_yr) {
    fetch("https://raw.githubusercontent.com/rrrrrrockpang/rrrrrrockpang.github.io/main/abstract_topics_tfidf.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        for (let i = 0; i < data.length; i+=1) {
            var chi_year = data[i]["chi_year"]
            var neurips_year = data[i]["neurips_year"]

            for (let j = 0; j < 4; j+=1) {
                var chi_cluster_data = data[i]["chi_clusters_topics"][j];
                var chi_row = document.createElement('tr');
                chi_row.innerHTML = "<td>CHI</td><td>"+chi_year+"</td><td>"+chi_cluster_data["feat"]+"</td><td>"+chi_cluster_data["n"]+"</td>"
                $('#topicsTable tbody').append(chi_row)

                var neurips_cluster_data = data[i]["neurips_clusters_topics"][j];
                var neurips_row = document.createElement('tr');
                neurips_row.innerHTML = "<td>NeurIPS</td><td>"+neurips_year+"</td><td>"+neurips_cluster_data["feat"]+"</td><td>"+neurips_cluster_data["n"]+"</td>"
                $('#topicsTable tbody').append(neurips_row)
            }
        }
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
    heatmapAbstracts();
    lineChartAbstracts(chi_yr=null, neurips_yr=null);

    tfidfTopics(null, null);

});


    
