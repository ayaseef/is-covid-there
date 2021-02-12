import React, { memo, useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import {categoriesObj} from '../data/covidCategoriesName'

// import { csv } from "d3-fetch";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
const MapChart = (props) => {
    const data = props.data 
    const field = props.field || 'Cases_7_day_count_change'
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
        ]);
        //arcs in an array which each element is an array of vercities
        //62694
        // first group is coordinates and after that is the relative coordinates (we need to get the arc data of the first position) so 40 (first one) will be the 41st arch data

        // const centerAttribute = props.center? {center: props.center}: {} //spread operator can't be done on null
        const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

        function handleZoomIn() {
            if (position.zoom >= 4) return;
            setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }));
        }
    
        function handleZoomOut() {
        if (position.zoom <= 1) return;
        setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }));
        }
    
        function handleMoveEnd(position) {
        setPosition(position);
        }

        function handleWheel(e){
        }
        const myStyle = {
            maxWidth: 1200 + "px"
        }

    return (
        <div onWheel={handleWheel} style={myStyle}>
        <ComposableMap data-tip="" projectionConfig={{ scale: 1000 }}projection="geoAlbersUsa" >
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                    geographies.map(geo => {
                        const cur = data.find(s => { 
                            return (s.fips_code == geo.id)});
                        return (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={cur ? colorScale(cur[field]) : "#EEE"}
                        onMouseEnter={() => {
                            const { name, } = geo.properties;
                            const id  = geo.id;
                            setTooltipContent(
                                `${cur.State_name}, ${name} -
                                ${categoriesObj[field]}: ${cur[field]}
                                `) // cur here is our data
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
        </ComposableMap>
        </div>
    );
};

export default MapChart;
