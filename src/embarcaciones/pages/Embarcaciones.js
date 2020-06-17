import React, { useState, useEffect } from 'react';

export const Embarcaciones = ({clases}) => {
    let [embarcaciones, setEmbarcaciones]  = useState({});

    useEffect(()=> {

    }, [])


    return(
        <h1 className={`embarcaciones ${clases}`}>

        </h1>
    )
}