import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';

import 'bootstrap/dist/css/bootstrap.min.css';
import React,{ useState } from 'react';


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
        const states = [
            'Alaska',
            'Alabama',
            'Arkansas',
            'American Samoa',
            'Arizona',
            'Bureau of Prisons',
            'California',
            'Colorado',
            'Connecticut',
            'District of Columbia',
            'Dept of Defense',
            'Delaware',
            'Florida',
            'Federated States of Micronesia',
            'Georgia',
            'Guam',
            'Hawaii',
            'Iowa',
            'Idaho',
            'Indian Health Svc',
            'Illinois',
            'Indiana',
            'Kansas',
            'Kentucky',
            'Louisiana',
            'Massachusetts',
            'Maryland',
            'Maine',
            'Marshall Islands',
            'Michigan',
            'Minnesota',
            'Missouri',
            'Northern Mariana Islands',
            'Mississippi',
            'Montana',
            'North Carolina',
            'North Dakota',
            'Nebraska',
            'New Hampshire',
            'New Jersey',
            'New Mexico',
            'Nevada',
            'New York State',
            'Ohio',
            'Oklahoma',
            'Oregon',
            'Pennsylvania',
            'Puerto Rico',
            'Rhode Island',
            'Republic of Palau',
            'South Carolina',
            'South Dakota',
            'Tennessee',
            'Texas',
            'Utah',
            'Virginia',
            'Veterans Health',
            'Virgin Islands',
            'Vermont',
            'Washington',
            'Wisconsin',
            'West Virginia',
            'Wyoming',
            'United States',
            'Long Term Care']

    return(
    <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        Select a State <span></span>   
        </Dropdown.Toggle>

        <Dropdown.Menu as={CustomMenu}>
            {states.map((state,i) => {
            return(
                <Dropdown.Item eventKey={i + 1} onClick={(event)=>{props.onStateSelected(state)}} >{state}</Dropdown.Item>
            )
            })}
        </Dropdown.Menu>
    </Dropdown>
    
    )
    };

export default VaccineSearchState;