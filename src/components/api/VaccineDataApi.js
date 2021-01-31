import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VaccineData = () => {
    const [vaccine, SetVaccine] = useState([])
    const [errorMessage,SetErrorMessage] = useState(null)

    useEffect(() => {
        axios.get("https://covid-cdc-api.herokuapp.com/vaccines")
        .then((response) => {
            const apiVaccineData = response.data.vaccination_data;
            SetVaccine(apiVaccineData);
        })
        .catch((error) => {
            SetErrorMessage(error.message);
            console.log(errorMessage);
        })
    }, []);

    // just for testing
    const vaccineList = vaccine.map((state, i) => {
        return(
            <li>
                {state.LongName}
            </li>
        )
    })

    return(
        <div>
            {vaccineList}
        </div>
    )
};

export default VaccineData;