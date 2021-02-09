import React, { useState } from 'react';
import VaccineData from '../api/VaccineDataApi';
import VaccineSearchState from './VaccineSearchState';
import { Dropdown, DropdownButton, Card, ListGroup, ListGroupItem, CardDeck} from 'react-bootstrap';



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
            <Card>
                        <Card.Img variant="top" src="holder.js/100px160" />
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
    )
}

export default VaccineComponenet;