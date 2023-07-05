// Read and process "fede.csv" dataset
d3.csv("fede.csv", d3.autoType).then((fedeData) => {
    // Plot the line for "fede.csv" dataset
    let fedeLine = Plot.line(fedeData, {
        x: (_, i) => i + 1,
        y: (d) => d.Rank,
        stroke: "#F8FF7A",
        strokeWidth: 3,
        opacity: 1
    });

    // Read and process "lucas.csv" dataset
    d3.csv("lucas.csv", d3.autoType).then((lucasData) => {
        // Plot the line for "lucas.csv" dataset
        let lucasLine = Plot.line(lucasData, {
            x: (_, i) => i + 1,
            y: (d) => d.Rank,
            stroke: "#00EFFE",
            strokeWidth: 3,
            opacity: 1
        });

        // Combine the lines and dot marks, and create the chart
        let chart = Plot.plot({
            marks: [fedeLine, lucasLine],
            x: {
                axis: null
            },
            y: {
                axis: null
            },
            style: {
                padding: "10px",
                background: "#121212"
            }
        });

        d3.select("#chart").append(() => chart);

        // Add event listeners for mouseover and mouseout
        d3.selectAll("#chart svg path")
            .on("mouseover", function () {
                // Increase the line width on hover
                d3.select(this).attr("stroke-width", 5);
            })
            .on("mouseout", function () {
                // Reset the line width when not hovering
                d3.select(this).attr("stroke-width", 3);
            });
    });
});
