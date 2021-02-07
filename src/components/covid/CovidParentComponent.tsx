import React, { useState } from 'react';
import CovidSearchState from './CovidSearchState';
import MapChart from './Map';
import CovidData from '../api/CovidDataApi';
import { Dropdown, DropdownButton} from 'react-bootstrap'


const CovidComponenet = () :any => {

    return(
        <div>
            <CovidData map={true}/>

        </div>
    )
}

export default CovidComponenet;