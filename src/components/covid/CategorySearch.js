import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import React,{ useState } from 'react';
import {categoriesObj} from '../data/covidCategoriesName'



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

    const CategorySearch = (props) => {
        const [field, setField] = useState('');


    return(
        <div>
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            Select a Category <span></span>   
            </Dropdown.Toggle>
                    <Dropdown.Menu as={CustomMenu}>
                {Object.entries(categoriesObj).map(([key,value],i) => {
                return(
                    <div>
                        <Dropdown.Item eventKey={i + 1} onClick={(event)=>{props.onFieldSelected(key)
                        setField(value)
                        }} >{value}</Dropdown.Item>
                    </div>
                )
                })}
            </Dropdown.Menu>
        </Dropdown>
        test {field}
    </div>
    
    
    )
    };

export default CategorySearch;