import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { allowedNodeEnvironmentFlags } from 'process';

// define the data type of what we are receiving from the API
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
// before we write the function we need to define it's arguments(or parameters) by using interface
// funtion(stateName,info)return that info for that state
interface vaccineProps{
    stateName: string;
    info: keyof VaccineDataState;  //one of the keys of VaccineDataState type
    map?: boolean;
    statesOnly?: boolean;
}


// one huge function that does everything!
const VaccineData = (prop:vaccineProps) => {
    // create useState variable to capture the data as state (because it changes)
    // useState is setting a variable and then making that variable change
    const [vaccine, setVaccine] = useState<VaccineDataState[]>([])
    const [errorMessage, SetErrorMessage] = useState(null)

    // get the data from API in AXIO, useEffect
    useEffect(() => {
        axios.get("https://covid-cdc-api.herokuapp.com/vaccines")
        // store the data from API useState (it will keep changing daily because data is updated daily)
        .then((response) => {
            const tempVaccine = response.data.vaccination_data;
            setVaccine(tempVaccine);
        })
        .catch((error) => {
            SetErrorMessage(error.message)
            // console.log(errorMessage)
        })
    }, []);
    // we need the data to be designed properly in order to easily be displayed in a map
    if(prop.map){
        const vaccineListMap = vaccine.map((state: VaccineDataState, i): any =>{
            return(
                <div>
                    "{state.LongName}", 
                    {/* {state.Date},
                    {state.Doses_Administered} */}
                </div>
            )
        })

        return(
            <div>
                {vaccineListMap}
            </div>
        )
    }
    

    // create a function (state, info) it will return the info for that specific state
    let vaccineData = vaccine.find(state => state.LongName === prop.stateName);
    if(!vaccineData)
    return <p> Data not found! </p>

    return(
        <div>
            {vaccineData[prop.info]}
        </div>
    )
}



export default VaccineData