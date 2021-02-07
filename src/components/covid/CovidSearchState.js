import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';

import 'bootstrap/dist/css/bootstrap.min.css';
import React,{ useState } from 'react';
import { statesCounties } from '../data/counties';
import { allStates } from '../data/states'


// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
        e.preventDefault();
        onClick(e);
        }}
    >
        {children}
        &#x25bc;
    </a>
    ));

    // forwardRef again here!
    // Dropdown needs access to the DOM of the Menu to measure it
    const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value, setValue] = useState('');
        return (
        <div
            ref={ref}
            style={style}
            className={className}
            aria-labelledby={labeledBy}
        >
            <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
            />
            <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
                (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)|| child.props.children.toUpperCase().startsWith(value),
            )}
            </ul>
        </div>
        );
    },
    );

    //callback that will show which state was picked
    // iterate and select a callback onClick and chose the state
    const CovidSearchState = (props) => {
        const [state, setState] = useState("")
        const [county, setCounty] = useState("")


        //filter data for the counties of a specific state and will return an array
        const stateCounties = statesCounties[state]
        // setCounties(statesCounties);

    return(
    <div>
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            Select a State <span></span>   
            </Dropdown.Toggle>
            <Dropdown.Menu as={CustomMenu}>
                {allStates.map((state,i) => {
                return(
                    <Dropdown.Item eventKey={i + 1} onClick={(event)=>{props.onStateSelected(state);
                        setState(state)
                    }} >{state}</Dropdown.Item>

                )
                })}
            </Dropdown.Menu>
        </Dropdown>
        <div>Selected State: {state}</div>
        <div>
        {state? 
            <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            Select a county <span></span>   
            </Dropdown.Toggle>
            <Dropdown.Menu as={CustomMenu}>
                {stateCounties.map((county, i) => {
                return(
                    <Dropdown.Item eventKey={i + 1} onClick={(event)=>{props.onCountySelected(county);
                    setCounty(county)
                    }} >{county}</Dropdown.Item>
                )
                })}
            </Dropdown.Menu>
            </Dropdown> : 'Please enter a state to see list of counties'}
            Selected County: {county}
            </div>

    </div>
    )
    };

export default CovidSearchState;