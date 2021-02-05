import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
// import { csv } from "d3-fetch";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
const MapChart = (props) => {
    const data = props.data 
    const field = props.field || 'Cases_7_day_count_change'

    const colorScale = scaleQuantile()
        .domain(data.map(d => d[field]))
        .range([
        "#ffedea",
        "#ffcec5",
        "#ffad9f",
        "#ff8a75",
        "#ff5533",
        "#e2492d",
        "#be3d26",
        "#9a311f",
        "#782618"
        ]);

    return (
        <ComposableMap projection="geoAlbersUsa">
            <ZoomableGroup zoom={1}>
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                    geographies.map(geo => {
                        const cur = data.find(s => { 
                            // console.log(s.fips_code)
                            // console.log(geo.id)
                            return (s.fips_code == geo.id)});
                        return (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={cur ? colorScale(cur[field]) : "#EEE"}
                    
                        />
                        );
                    })
                    }
                </Geographies>
            </ZoomableGroup>
        </ComposableMap>
    );
};

export default MapChart;
