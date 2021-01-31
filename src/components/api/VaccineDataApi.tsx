import React, { useEffect, useState } from 'react';
import axios from 'axios';

type VaccineDataState = {
    Date: Date,
    Location: string,
    LongName: string,
    Doses_Distributed: number,
    Doses_Administered: number,
    Dist_Per_100K: number,
    Admin_Per_100K: number,
    Administered_Dose1: number,
    Administered_Dose1_Per_100K: number,
    Administered_Dose2: number,
    Administered_Dose2_Per_100K: number
}


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
    const vaccineListMap = vaccine.map((state: VaccineDataState, i): any => {
        return(
            <li>
                {state.LongName}, 
                {state.Location}, 
                {state.Doses_Distributed};
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