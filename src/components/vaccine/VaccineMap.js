import React, { memo, useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import allState from '../data/allStates.json'
import { categoriesVaccineObj } from '../data/vaccineCategories'
// import { csv } from "d3-fetch";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const MapChart = (props) => {
    const [center, setCenter] = useState ([0,0])
    const [zoom, setZoom] = useState (1)
    const [bypass, setBypass] = useState (false)

    const data = props.data 
    const field = props.field || 'Admin_Per_100K'
    const setTooltipContent = props.setTooltipContent

    const colorScale = scaleQuantile()
        .domain(data.map(d => d[field]))
        .range([ //change the color range here
        "#eafaff",
        "#c5effc",
        "#9de4fa",
        "#66d7fa",
        "#27c4f5",
        "#00b9f2",
        "#02a2d4",
        "#00779c"

        ]);
        //arcs in an array which each element is an array of vercities
        //62694
        // first group is coordinates and after that is the relative coordinates (we need to get the arc data of the first position) so 40 (first one) will be the 41st arch data

        // console.log(centerAttribute)
        // const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

        // function handleZoomIn() {
        //     if (position.zoom >= 4) return;
        //     setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }));
        // }
    
        // function handleZoomOut() {
        // if (position.zoom <= 1) return;
        // setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }));
        // }
    
        // function handleMoveEnd(position) {
        // setPosition(position);
        // }
        function handleMoveStart(newCenter){
            setCenter(newCenter); 
            setBypass(true);
        }

        function handleMoveEnd(newCenter){
            setCenter(newCenter); 
            setBypass(JSON.stringify(newCenter) !== JSON.stringify(center));
        }

        function handleGeographyClick(geography) {
            // Cut this short if the bypass is enabled...
            if (bypass) return
            // ... or do other stuff to compute the center and zoom if the bypass is not enabled
        }

        function handleWheel(e){
        }
        const myStyle = {
            maxWidth: 1200 + "px"
        }


    return (
        <div onWheel={handleWheel} style={myStyle}>
        <ComposableMap data-tip="" projectionConfig={{ scale: 1000 }}
        // width={800}
        // height={450}
        projection="geoAlbersUsa" >
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
                            // eslint-disable-next-line no-lone-blocks
                            {cur?
                            setTooltipContent(
                                `${name} -
                                ${categoriesVaccineObj[field]}: ${cur[field]}`
                                ): 
                                setTooltipContent(
                                    `${name} - no data provided`
                                    )}
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
