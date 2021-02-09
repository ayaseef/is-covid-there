import React, { useState } from 'react';
import VaccineData from '../api/VaccineDataApi';
import VaccineSearchState from './VaccineSearchState'


const VaccineComponenet = () :any => {
    const [state, setState] = useState("")
    const stateSelected = (stateName:string) :any => {
        setState(stateName)
    }
    return(
        <div>
            <VaccineSearchState onStateSelected={stateSelected}/> 
            <VaccineData map={true} />

            {state?
            <div> Doeses Distributed:
            <VaccineData stateName={state} info={'Doses_Distributed'}/> </div>: null}
        </div>
    )
}

export default VaccineComponenet;