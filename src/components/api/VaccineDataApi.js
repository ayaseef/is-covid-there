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

    // Maps (to be formated later for proper mapping)
    const vaccineListMap = vaccine.map((state, i) => {
        return(
            <li>
                {state.LongName}, {state.Location},{state.Doses_Distributed};
            </li>
        )
    })

    return(
        <div>
            {vaccineListMap}
        </div>
    )
};

export default VaccineData;