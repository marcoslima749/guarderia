import React from "react";

import { Boton } from '../components/Boton';

import colores from '../components/palette (10).svg';


import "./HojaDeEstilo.css";

export const HojaDeEstilo = () => {
  return (
    <div className="estilos__container">

      <h1 className="estilos__titulo-pagina">Hoja de Estilo</h1>

      <div className="tipografia-container">
        <div className="tipografia tipografia-uno">
          <h1 className="tipografia-uno__titulo">
            Título
          </h1>
          <h2 className="tipografia-uno__subtitulo">
            Subtítulo
          </h2>
          <p className="tipografia-uno__parrafo">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
            voluptatem temporibus error porro fugiat tempora nesciunt ullam
            autem! Ea ut ad molestiae accusamus id dignissimos soluta dicta
            excepturi aspernatur omnis?
          </p>
        </div>
        <div className="tipografia tipografia-dos">
          <h1 className="tipografia-dos__titulo">
            Título
          </h1>
          <h2 className="tipografia-dos__subtitulo">
            Subtítulo
          </h2>
          <p className="tipografia-dos__parrafo">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
            voluptatem temporibus error porro fugiat tempora nesciunt ullam
            autem! Ea ut ad molestiae accusamus id dignissimos soluta dicta
            excepturi aspernatur omnis?
          </p>
        </div>
      </div>

      {/* <div className="estilos__colores">
        <div className="estilos__colores__color">
          <p className="estilos__colores__color__relevancia">principal</p>
          <div className="estilos__colores__color__fill"></div>
          <p className="estilos__colores__color__valor">#FFFFFF</p>
        </div>
        <div className="estilos__colores__color">
          <p className="estilos__colores__color__relevancia">principal</p>
          <div className="estilos__colores__color__fill"></div>
          <p className="estilos__colores__color__valor">#FFFFFF</p>
        </div>
        <div className="estilos__colores__color">
          <p className="estilos__colores__color__relevancia">principal</p>
          <div className="estilos__colores__color__fill"></div>
          <p className="estilos__colores__color__valor">#FFFFFF</p>
        </div>
        <div className="estilos__colores__color">
          <p className="estilos__colores__color__relevancia">principal</p>
          <div className="estilos__colores__color__fill"></div>
          <p className="estilos__colores__color__valor">#FFFFFF</p>
        </div>
        <div className="estilos__colores__color">
          <p className="estilos__colores__color__relevancia">principal</p>
          <div className="estilos__colores__color__fill"></div>
          <p className="estilos__colores__color__valor">#FFFFFF</p>
        </div>
        <div className="estilos__colores__color">
          <p className="estilos__colores__color__relevancia">principal</p>
          <div className="estilos__colores__color__fill"></div>
          <p className="estilos__colores__color__valor">#FFFFFF</p>
        </div>
      </div> */}
    <div className="estilos__botones">
      <Boton path="#" caption="Botón De Prueba" />
    </div>
    <img src={colores} alt="colores" className="estilos__colores" />

    </div>
  );
};
