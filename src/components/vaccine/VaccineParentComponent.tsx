import React, { useState } from 'react';
import VaccineData from '../api/VaccineDataApi';
import VaccineSearchState from './VaccineSearchState';
import { Dropdown, DropdownButton, Card, ListGroup, ListGroupItem, CardDeck} from 'react-bootstrap';
import { FaSyringe } from "react-icons/fa";
import { IconContext } from "react-icons";
import './vaccineMap.css'



const VaccineComponenet = () :any => {
    const [state, setState] = useState("")
    const stateSelected = (stateName:string) :any => {
        setState(stateName)
    }
    return(
        <div className="mainDivFlex">
            <div className="mapDiv">
                <VaccineData map={true} />
            </div>

            <div className="infoDiv">
                <VaccineSearchState onStateSelected={stateSelected}/>
                <br/>
            {state?
            <Card>
                <IconContext.Provider value={{ color: "gray", size: "5em", className: "global-class-name" }}>
                <div>
                <FaSyringe />
                </div>
                </IconContext.Provider>
                    <Card.Body>
                    <Card.Title>Vaccine </Card.Title>
                    <hr/>
                    <Card.Text>
                        Doses Distributed:<span> </span>
                        <VaccineData stateName={state} info={'Doses_Distributed'}/>
                        <hr/>
                        Doses Administrated:<span> </span>
                        <VaccineData stateName={state} info={'Doses_Administered'}/>
                        <hr/>
                        Distribution of Dose 1 :<span> </span>
                        <VaccineData stateName={state} info={'Administered_Dose1'}/>
                        <hr/>
                        Distribution of Dose 2:<span> </span>
                        <VaccineData stateName={state} info={'Administered_Dose2'}/>                            
                    
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <small className="text-muted">Last updated on <VaccineData stateName={state}  info={'Date'}/></small>
                    </Card.Footer>
                </Card> : null}
            </div>
        </div>
    )
}

export default VaccineComponenet;