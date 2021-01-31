import React, { useEffect, useState } from 'react';
import axios from 'axios';

type CovidDataState = {
    County: string,
    State_name: string,
    Cases_7_day_count_change: number,
    deaths_7_day_count_change: number
}

const CovidData = () => {
    const [covid, SetCovid] = useState([])
    const [errorMessage,SetErrorMessage] = useState(null)

    useEffect(() => {
        axios.get("https://covid-cdc-api.herokuapp.com/covid-data")
        .then((response) => {
            const apiCovidData = response.data.integrated_county_latest_external_data;
            SetCovid(apiCovidData);
        })
        .catch((error) => {
            SetErrorMessage(error.message);
            console.log(errorMessage);
        })
    }, []);

    // Maps (to be formated later for proper mapping)
    const covidListMap = covid.map((state: CovidDataState, i): any => {
        return(
            <li>
                {state.County}, 
                {state.State_name}, 
                {state.Cases_7_day_count_change}, 
                {state.deaths_7_day_count_change};
            </li>
        )
    })

    return(
        <div>
            {covidListMap}
        </div>
    )
};

export default CovidData;