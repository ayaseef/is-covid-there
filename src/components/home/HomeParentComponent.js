import React, { useState} from 'react';
import AppDescription from './Description';
import Img from 'react-image'
import './Home.css'

const HomeComponenet = ()  => {
  const [speed, setSpeed] = useState(3)
    return(
        <div className={'homePage'}>
            <br></br>
            <h1 id={'title'}> Is C<img style={{animation: `spin ${speed}s linear infinite`}} src={'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/microbe_1f9a0.png'}alt='covid'/>VID There? </h1>
            
            <AppDescription/>
        </div>
    )
}

export default HomeComponenet;