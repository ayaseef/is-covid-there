import React, { useState } from 'react';
import VaccineSearchState from './VaccineSearchState'


const VaccineComponenet = () :any => {
    const [state, setState] = useState("")
    const stateSelected = (stateName:string) :any => {
        setState(stateName)
    }
    return(
        <div>
            All Vaccine componentes
            <VaccineSearchState onStateSelected={stateSelected}/>
            {state}
        </div>
    )
}

export default VaccineComponenet;