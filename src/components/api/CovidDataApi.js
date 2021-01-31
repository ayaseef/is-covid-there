import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

    // just for testing
    const covidList = covid.map((state, i) => {
        return(
            <li>
                {state.County}
            </li>
        )
    })

    return(
        <div>
            {covidList}
        </div>
    )
};

export default CovidData;