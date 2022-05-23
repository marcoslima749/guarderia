import React from 'react';

import Gaviota from './gaviota.svg';

export const Principal = () => {
return(

        <div className="principal">
            <h1 className="titulo">YATCH CLUB DELTA</h1>
            <h4 className="subtitulo">Los mejores servicios en un entorno soñado.</h4>
            <img height="400px"  className="gaviota" src={Gaviota} alt="Gaviota en vuelo" />
        </div>
    )
}