import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';

import 'bootstrap/dist/css/bootstrap.min.css';
import React,{ useState } from 'react';
import { render } from 'react-dom';


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
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
            </ul>
        </div>
        );
    },
    );

    //callback that will show which state was picked
    // iterate and select a callback onClick and chose the state

    const VaccineSearchState = (props) => {
        const states = ['WA','AK']
    return(
    <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        Custom toggle
        </Dropdown.Toggle>

        <Dropdown.Menu as={CustomMenu}>
            {states.map((state,i) => {
            return(
                <Dropdown.Item eventKey={i + 1} onClick={(event)=>{props.onStateSelected(state)}} >{state}</Dropdown.Item>
            )
            })}
        <Dropdown.Item eventKey="1" onClick={(event)=>{console.log(event)}} >Red</Dropdown.Item>
        <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
        <Dropdown.Item eventKey="3" active>
            Orange
        </Dropdown.Item>
        <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    
    )
    };

export default VaccineSearchState;