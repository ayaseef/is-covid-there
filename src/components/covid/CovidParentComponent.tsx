import React, { useState } from 'react';
import CovidSearchState from './CovidSearchState'


const CovidComponenet = () :any => {
    const [state, setState] = useState("")
    const stateSelected = (stateName:string) :any => {
        setState(stateName)
    }
    return(
        <div>
            All Covid componentes
            <CovidSearchState onStateSelected={stateSelected}/>
        </div>
    )
}

export default CovidComponenet;