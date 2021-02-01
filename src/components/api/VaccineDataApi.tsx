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
    Administered_Dose2_Per_100K: number,
}

interface vaccineProps{
    stateName: string;
    vaccineProperty: keyof VaccineDataState;
    map?: boolean
}

const VaccineData = (prop:vaccineProps) => {
    const [vaccine, SetVaccine] = useState<VaccineDataState[]>([])
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

    // Use this only for Maps
    if(prop.map){
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
    )}

    let vaccineData = vaccine.find(state => state.Location === prop.stateName);
    if(!vaccineData)
        return <p>Data not found!</p>

    return(
        <div>
            {vaccineData[prop.vaccineProperty]}
        </div>
    )
    
};

export default VaccineData;