import React, { useState } from 'react';
import CovidSearchState from './CovidSearchState';
import MapChart from './Map';
import CovidData from '../api/CovidDataApi';
import { Dropdown, DropdownButton, Card, ListGroup, ListGroupItem, CardDeck} from 'react-bootstrap'


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
            <CovidSearchState onStateSelected={stateSelected} onCountySelected={countySelected}/>

            <CovidData map={true} />

            {county?
                    <div><h4>{county} County Overview </h4>
                    <hr/> 

                    <CardDeck>
                        <Card>
                            <Card.Img variant="top" src="holder.js/100px160" />
                            <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a wider card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src="holder.js/100px160" />
                            <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This card has supporting text below as a natural lead-in to additional
                                content.{' '}
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src="holder.js/100px160" />
                            <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a wider card with supporting text below as a natural lead-in to
                                additional content. This card has even longer content than the first to
                                show that equal height action.
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                    </CardDeck>

                    {/* community icon */}
                    School Composit <CovidData stateName={state} countyName={county} info={'school_composite'}/>
                    Population Density in 2019 <CovidData stateName={state} countyName={county} info={'population_density_2019'}/>
                    Average Household Size <CovidData stateName={state} countyName={county} info={'avg_hh_size'}/>
                    Percent Uninsured in 2019 <CovidData stateName={state} countyName={county} info={'percent_uninsured_2019'}/>
                    Poverty Rate 2019 <CovidData stateName={state} countyName={county} info={'poverty_rate_2019'}/>
                    Percent 65 plus <CovidData stateName={state} countyName={county} info={'percent_65_plus'}/>

                    {/* hospital icon */}
                    Total Hospitals Reporting <CovidData stateName={state} countyName={county} info={'total_hospitals_reporting'}/>
                    percent_adult_inpatient_beds_used_confirmed_covid <CovidData stateName={state} countyName={county} info={'percent_adult_inpatient_beds_used_confirmed_covid'}/>
                    </div>: null
                }

        </div>
    )
}

export default CovidComponenet;