import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MapChart from '../covid/Map';
import Spinner from 'react-bootstrap/Spinner'
import CategorySearch from '../covid/CategorySearch'
import ReactTooltip from "react-tooltip";
import { categoriesObj} from '../data/covidCategoriesName'


type CovidDataState = {
    fips_code: number,
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

interface covidProps{
    stateName: string;
    countyName: string;
    info: keyof CovidDataState;
    map?: boolean
}

const CovidData = (prop:covidProps) => {
    const [covid, SetCovid] = useState<CovidDataState[]>([])
    const [errorMessage,SetErrorMessage] = useState(null)
    const [loading, setLoading] = useState(true)
    const [field, setField] = useState('')
    const [content, setContent] = useState("");
    const [center, setCenter] = useState('')



    useEffect(() => {
        axios.get("https://covid-cdc-api.herokuapp.com/covid-data")
        .then((response) => {
            const apiCovidData = response.data.integrated_county_latest_external_data;
            SetCovid(apiCovidData);
            setLoading(false);

        })
        .catch((error) => {
            SetErrorMessage(error.message);
            // console.log(errorMessage);
        })
    }, []);

    const fieldSelected = (category:string) :any => {
        setField(category)
    }



    const testing:string = "Washington"
    // setCenter(testing)

    if(prop.map){
        return(
            <div>
                Select a Categories
                {/* we need to reword the categories */}
                <CategorySearch  onFieldSelected={fieldSelected}/> 

                {loading? 
                    <Spinner animation="border" role="status" variant="primary">
                        <span className="sr-only">Loading...</span>
                    </Spinner> : <div>
                        <MapChart data={covid} field={field} setTooltipContent={setContent} /> 
                    <ReactTooltip>{content}</ReactTooltip></div>}
                {/* <MapChart data={covid} /> */}
                
            </div>
        )
    }
    else if (prop.countyName && prop.stateName && prop.info){
    let covidData:any = covid.find(state => state.State_name === prop.stateName && state.County === prop.countyName);
    if(!covidData)
        return <p>Info not found!</p>

    return(
        <div>
            {covidData[prop.info]}
        </div>
    )}
    else {
        return(
            <div>Data not found!</div>
        )
    }

};


export default CovidData;