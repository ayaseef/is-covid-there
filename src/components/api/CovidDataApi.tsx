import React, { useEffect, useState } from 'react';
import axios from 'axios';

type CovidDataState = {
    State_name: string,
    County: string,
    Cases_7_day_count_change: number,
    deaths_7_day_count_change: number,
    population_density_2019: number,
    avg_hh_size: number,
    percent_uninsured_2019: number,
    poverty_rate_2019: number,
    Percent_65_plus: number,
    Case_death_start_date: Date, //just for us
    Case_death_end_date: Date, //just for us
    Testing_start_date: Date, //just for us
    Testing_end_date: Date, //just for us
    Hospital_data_collection_date: Date, //just for us
    total_hospitals_reporting: number,
    admissions_covid_confirmed_last_7_days: number,
    admissions_covid_confirmed_last_7_days_per_100_beds: number,
    percent_adult_inpatient_beds_used_confirmed_covid: number,
    Hospitals_included_in_percent_adult_inpatient_beds_used_confirmed_covid: number, //just for us
    percent_adult_icu_beds_used_confirmed_covid: number,
    Hospitals_included_in_percent_adult_icu_beds_used_confirmed_covid: number, //just for us
    percent_positive_14_day: number,
    school_composite: string

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