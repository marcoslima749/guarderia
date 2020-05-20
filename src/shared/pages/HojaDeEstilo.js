import React from "react";

import "./HojaDeEstilo.css";

export const HojaDeEstilo = () => {
  return (
    <div className="container">

      <h3 className="estilos__titulo-pagina">Hoja de Estilo</h3>

      <div className="estilos__tipografia-container">
        <div className="estilos__tipografia estilos__tipografia__tipografia-uno">
          <h1 className="estilos__tipografia__tipografia-uno__titulo">
            Título
          </h1>
          <h2 className="estilos__tipografia__tipografia-uno__subtitulo">
            Subtítulo
          </h2>
          <p className="estilos__tipografia__tipografia-uno__parrafo">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
            voluptatem temporibus error porro fugiat tempora nesciunt ullam
            autem! Ea ut ad molestiae accusamus id dignissimos soluta dicta
            excepturi aspernatur omnis?
          </p>
        </div>
        <div className="estilos__tipografia estilos__tipografia__tipografia-dos">
          <h1 className="estilos__tipografia__tipografia-dos__titulo">
            Título
          </h1>
          <h2 className="estilos__tipografia__tipografia-dos__subtitulo">
            Subtítulo
          </h2>
          <p className="estilos__tipografia__tipografia-dos__parrafo">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
            voluptatem temporibus error porro fugiat tempora nesciunt ullam
            autem! Ea ut ad molestiae accusamus id dignissimos soluta dicta
            excepturi aspernatur omnis?
          </p>
        </div>
      </div>

      <div className="estilos__colores">
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
      </div>
    </div>
  );
};
