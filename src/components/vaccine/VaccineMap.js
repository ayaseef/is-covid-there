import React, { memo, useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup,  Marker,
    Annotation } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { geoCentroid } from "d3-geo";

import allStates from '../data/allStates.json'
// import { csv } from "d3-fetch";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21]
};

const MapChart = (props) => {
    const data = props.data 
    const field = props.field || 'Admin_Per_100K' // Change to the field of vaccines
    const setTooltipContent = props.setTooltipContent

    const colorScale = scaleQuantile()
        .domain(data.map(d => d[field]))
        .range([ //change the color range here
        "#ffedea",
        "#ffcec5",
        "#ffad9f",
        "#ff8a75",
        "#ff5533",
        "#e2492d",
        "#be3d26",
        "#9a311f",
        "#782618"
        // yellow, orange, red
        // '#fff30a',
        // '#ffd60a',
        // '#ffbe0a',
        // '#ffa10a',
        // '#ff7c0a',
        // '#ff330a',
        // '#a80a0a'
        ]);

        const offsets = {
            VT: [50, -8],
            NH: [34, 2],
            MA: [30, -1],
            RI: [28, 2],
            CT: [35, 10],
            NJ: [34, 1],
            DE: [33, 0],
            MD: [47, 10],
            DC: [49, 21] };

    return (
        <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
            {({ geographies }) => (
            <>
                {geographies.map(geo => (
                <Geography
                    key={geo.rsmKey}
                    stroke="#FFF"
                    geography={geo}
                    fill="#DDD"
                />
                ))}
                {geographies.map(geo => {
                const centroid = geoCentroid(geo);
                const cur = data.find(s => s.LongName === geo.name);
                return (
                    <g key={geo.rsmKey + "-name"}>
                    {cur &&
                        centroid[0] > -160 &&
                        centroid[0] < -67 &&
                        (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                        <Marker coordinates={centroid}>
                            <text y="2" fontSize={14} textAnchor="middle">
                            {cur.id}
                            </text>
                        </Marker>
                        ) : (
                        <Annotation
                            subject={centroid}
                            dx={offsets[cur.id][0]}
                            dy={offsets[cur.id][1]}
                        >
                            <text x={4} fontSize={14} alignmentBaseline="middle">
                            {cur.LongName}
                            </text>
                        </Annotation>
                        ))}
                    </g>
                );
                })}
            </>
            )}
        </Geographies>
        </ComposableMap>
    );
};
    
export default MapChart;