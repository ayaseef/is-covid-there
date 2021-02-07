import React from 'react';


const Resources = () :any => {
    return(
        <div>
            <ul>
                <li><a href={'https://covid.cdc.gov/covid-data-tracker/COVIDData/getAjaxData?id=integrated_county_latest_external_data'}>CDC APIs for Covid Cases </a></li>
                <li><a href={'https://covid.cdc.gov/covid-data-tracker/COVIDData/getAjaxData?id=vaccination_data'}>CDC APIs for Vaccination Data </a></li>
            </ul>
        </div>
    )
}

export default Resources;