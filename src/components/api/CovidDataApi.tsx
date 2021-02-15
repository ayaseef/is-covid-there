import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MapChart from '../covid/Map';
import Spinner from 'react-bootstrap/Spinner'
import CategorySearch from '../covid/CategorySearch'
import ReactTooltip from "react-tooltip";
import { categoriesObj} from '../data/covidCategoriesName'
import CovidSearchState from '../covid/CovidSearchState';
import './Api.css';
import * as moment from 'moment';
import './CovidMap.css';
import NumberFormat from 'react-number-format';
import { profile } from 'console';






type CovidDataState = {
    fips_code: number,
    report_date: Date,
    State_name: string,
    County: string,
    Cases_7_day_count_change: number, // Hospital
    deaths_7_day_count_change: number,// Hospital
    population_density_2019: number, // Cummonity
    avg_hh_size: number, // Cummonity
    percent_uninsured_2019: number, // Cummonity
    poverty_rate_2019: number, // Cummonity
    percent_65_plus: number, // Cummonity
    Case_death_start_date: Date, //just for us
    Case_death_end_date: Date, //just for us
    Testing_start_date: Date, //just for us
    Testing_end_date: Date, //just for us
    Hospital_data_collection_date: Date, //just for us
    total_hospitals_reporting: number, // Hospital
    admissions_covid_confirmed_last_7_days: number, // Hospital
    admissions_covid_confirmed_last_7_days_per_100_beds: number, // Hospital
    percent_adult_inpatient_beds_used_confirmed_covid: number, // Hospital
    Hospitals_included_in_percent_adult_inpatient_beds_used_confirmed_covid: number, //just for us
    percent_adult_icu_beds_used_confirmed_covid: number, // Hospital
    Hospitals_included_in_percent_adult_icu_beds_used_confirmed_covid: number, //just for us
    percent_positive_14_day: number, //not consider it
    school_composite: string // School

}

interface covidProps{
    stateName?: string;
    countyName?: string;
    info?: keyof CovidDataState;
    map?: boolean;
    date?: boolean
}

const CovidData = (prop:covidProps) => {
    const [covid, SetCovid] = useState<CovidDataState[]>([])
    const [errorMessage,SetErrorMessage] = useState(null)
    const [loading, setLoading] = useState(true)
    const [field, setField] = useState('')
    const [content, setContent] = useState("");
    const [state, setState] = useState("");
    const [county, setCounty] = useState("");
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
        })
    }, []);

    const fieldSelected = (category:string) :any => {
        setField(category)
    }

    const stateSelected = (stateName:string) :any => {
        setState(stateName)
    }
    const countySelected = (countyName:string) :any => {
        setCounty(countyName)
    }
    const testing:string = "Washington"
    // setCenter(testing)

    function isNumeric(something:any){
        return typeof(something) === 'number';
    }

    const numberMask = (value:any) => (
        <NumberFormat
        value={parseInt(value)}
        displayType="text"
        thousandSeparator=","/>
    )

    if(prop.map){
        return(
            <div>
                <CategorySearch  onFieldSelected={fieldSelected}/> 

                {loading? 
                    <span className={'spinner'}><Spinner animation="border" role="status" variant="danger" >
                        <span className="sr-only">Loading...</span>
                    </Spinner></span> : <div>
                        <MapChart data={covid} field={field} setTooltipContent={setContent} /> 
                        {/* <p className={'mapAlert'}>This map is not intended to be used to self diagnose medical conditions.</p> */}
                    <ReactTooltip className={'tooltip'}>{content}</ReactTooltip></div>}
    
                
            </div>
        )
    }
    else if (prop.countyName && prop.stateName && prop.info){
    let covidData:any = covid.find(state => state.State_name === prop.stateName && state.County === prop.countyName);
    if(!covidData)
        return <p className={"loading"}>loading..</p>

    if(isNumeric(covidData[prop.info])){
        return(
            <span className={'data'}>
                <NumberFormat thousandSeparator={true} displayType={'text'} value={covidData[prop.info]}/>
            </span>
        )
    }

    if(prop.info === 'report_date'){
        const date = covidData.report_date
        const updateDate = new Date(covidData.report_date).toLocaleString()

        return(
            <span className={'data'}>
                {updateDate}
            </span>
        )
    }

    return(
        <span className={'data'}>
            {covidData[prop.info]}
        </span>
    )}

    else {
        return(
            <span className={"loading"}>loading..</span>
        )
    }

};


export default CovidData;