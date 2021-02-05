import React, { useState } from 'react';
import CovidSearchState from './CovidSearchState';
import MapChart from './Map';
import CovidData from '../api/CovidDataApi';
import { Dropdown, DropdownButton} from 'react-bootstrap'


const CovidComponenet = () :any => {
    const [state, setState] = useState("");
    const [county, setCounty] = useState("");

    const stateSelected = (stateName:string) :any => {
        setState(stateName)
    }
    const countySelected = (countyName:string) :any => {
        setCounty(countyName)
    }
    return(
        <div>
            All Covid componentes
            <CovidSearchState onStateSelected={stateSelected} onCountySelected={countySelected}/>
            {state} {county}
        
            <CovidData stateName={'Washington'} countyName={'King'} info={'State_name'} map={true}/>

        </div>
    )
}

export default CovidComponenet;