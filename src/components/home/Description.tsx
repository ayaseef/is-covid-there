import React from 'react';


const AppDescription = () :any => {
    return(
        <div className={'description'}>
            <br/>
            <br/>                
            {/* Always use proper punctuation and grammar.
            Introduce your app clearly and succinctly.
            Describe your app's most notable features. 
            Use conversational language.
            Think about your target customer and highlight features that will appeal to that customer.
            Explain how and why your app will benefit users.
            Show off—don't forget to include the attributes that make your app stand out and feel free to do so in detail..  */}
            {/* <p> Detalied Vaccine Data on Map - Hospitals Data on Map - School Responses data - Community Data on Map -  Reliable data from CDC</p> */}
            <p>Traveling or moving during COVID is such a tough decision to make! 
            It's not easy to understand the COVID situation in a specific place inside the US as there are lots of confusing information.</p>

            <p>'Is COVID There?' aims to present the spread of COVID-19 and vaccination data using up-to-date information from the Center of Disease Control and Prevention (CDC) in an easy and user-friendly manner.</p>
            <ul className="featureList">
                <li> 1 feature </li>
                <li> 2 feature </li>
                <li> 3 feature </li>
            </ul>

            <p>Please keep in mind, the recommendation during COVID is to stay home and not to travel. But in case of extreme emergency, we do hope that 'Is COVID There?' will help in making the best decision for moving or traveling.</p>

            <p>Please stay safe!</p>
        </div>
    )
}

export default AppDescription;