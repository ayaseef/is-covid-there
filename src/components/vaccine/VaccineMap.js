import React, { memo, useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import allState from '../data/allStates.json'
// import { csv } from "d3-fetch";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const MapChart = (props) => {
    const data = props.data 
    const field = props.field || 'Admin_Per_100K'
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
        //arcs in an array which each element is an array of vercities
        //62694
        // first group is coordinates and after that is the relative coordinates (we need to get the arc data of the first position) so 40 (first one) will be the 41st arch data

        const centerAttribute = props.center? {center: props.center}: {} //spread operator can't be done on null
        console.log(centerAttribute)

    return (
        <ComposableMap data-tip="" projectionConfig={{ scale: 700 }}projection="geoAlbersUsa" >
            <ZoomableGroup zoom={1} >
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                    geographies.map(geo => {
                        const cur = data.find(s => { 
                            return (s.LongName === geo.properties.name)});
                        return (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={cur ? colorScale(cur[field]) : "#EEE"}
                        onMouseEnter={() => {
                            const { name, } = geo.properties;
                            const id  = geo.id;
                            setTooltipContent(
                                `${name} - ${cur[field]}
                                `); // cur here is our data
                            }}
                            onMouseLeave={() => {
                            setTooltipContent("");
                            }}
                            style={{
                            default: {
                                // fill: "#D6D6DA",
                                outline: "none"
                            },
                            hover: {
                                fill: "#4287f5",
                                // stroke: "solid" can we later outline it
                            },
                            pressed: {
                                // fill: "#E42",
                                outline: "none"
                            }
                            }}
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
