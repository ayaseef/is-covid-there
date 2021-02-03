import React, { useState } from 'react';
import CovidSearchState from './CovidSearchState'


const CovidComponenet = () :any => {
    const [state, setState] = useState("")
    const [county, setCounty] = useState("")

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
            {state}, {county}
        </div>
    )
}

export default CovidComponenet;