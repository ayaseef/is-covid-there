import React, { useState } from 'react';
import CovidSearchState from './CovidSearchState';
import MapChart from './Map';
import CovidData from '../api/CovidDataApi';
import { Dropdown, DropdownButton, Card, ListGroup, ListGroupItem, CardDeck} from 'react-bootstrap';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';





const CovidComponenet = () :any => {
    const [state, setState] = useState("");
    const [county, setCounty] = useState("");

    const stateSelected = (stateName:string) :any => {
        setState(stateName)
    }
    const countySelected = (countyName:string) :any => {
        setCounty(countyName)
    }

    // const yourDate = new Date()
    // const date = moment( yourDate, 'DD-MM-YYYY')



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
                        <Card.Title>Hospital </Card.Title>
                        <hr/>
                        <Card.Text>
                            Number of Reporting Hospitals:<span> </span>
                            <CovidData stateName={state} countyName={county} info={'total_hospitals_reporting'}/>
                            <hr/>
                            Change of Covid Cases in 7 days:<span> </span> <CovidData stateName={state} countyName={county} info={'Cases_7_day_count_change'}/>
                            <hr/>
                            Change of Covid Deaths in 7 days:<span> </span><CovidData stateName={state} countyName={county} info={'deaths_7_day_count_change'}/>
                            <hr/>
                            Confirmed Covid Addmissions in the Last 7 Days:<span> </span><CovidData stateName={state} countyName={county} info={'admissions_covid_confirmed_last_7_days'}/>
                            <hr/>
                            Percentage of Inpatient Beds Used for Confirmed COVID Adults cases:<span> </span><CovidData stateName={state} countyName={county} info={'percent_adult_inpatient_beds_used_confirmed_covid'}/>%
                            <hr/>
                            Percentage of ICU Beds Used for Confirmed COVID Adults Cases:<span> </span> <CovidData stateName={state} countyName={county} info={'percent_adult_icu_beds_used_confirmed_covid'}/>%
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <small className="text-muted">Last updated on <CovidData stateName={state} countyName={county} info={'report_date'}/></small>
                        </Card.Footer>
                    </Card>

                    <Card>
                        <Card.Img variant="top" src="holder.js/100px160" />
                        <Card.Body>
                        <Card.Title>Community</Card.Title>
                        <hr/>
                        <Card.Text>
                        Population Density in 2019<span> </span>
                            <CovidData stateName={state} countyName={county} info={'population_density_2019'}/>
                            <hr/>
                            Average Household Size<span> </span>
                        <CovidData stateName={state} countyName={county} info={'avg_hh_size'}/>
                        <hr/>
                        Percent of Uninsured Population in 2019<span> </span>
                        <CovidData stateName={state} countyName={county} info={'percent_uninsured_2019'}/>
                        <hr/>
                        Poverty Rate 2019<span> </span>
                        <CovidData stateName={state} countyName={county} info={'poverty_rate_2019'}/>
                        <hr/>
                        Percent  of 65 plus<span> </span>
                        <CovidData stateName={state} countyName={county} info={'percent_65_plus'}/>
                        <hr/>
                        School Composit<span> </span>
                        <CovidData stateName={state} countyName={county} info={'school_composite'}/>
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <small className="text-muted">Last updated on <CovidData stateName={state} countyName={county} info={'report_date'}/></small>
                        </Card.Footer>
                    </Card>
                </CardDeck>
                    </div>: null
            }
        </div>
    )
}

export default CovidComponenet;