import React, { useReducer, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import './CuentaCorrienteImpresion.css';

export const CuentaCorrienteImpresion = ({cuentaCorriente, children}) => {

    const contenedor = useRef(document.createElement('div'));
    const ventanaExterna = useRef(null);
/*
    function copyStyles(sourceDoc, targetDoc) {
        Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
          if (styleSheet.cssRules) { // for <style> elements
            const newStyleEl = sourceDoc.createElement('style');
      
            Array.from(styleSheet.cssRules).forEach(cssRule => {
              // write the text of each rule into the body of the style element
              newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
            });
      
            targetDoc.head.appendChild(newStyleEl);
          } else if (styleSheet.href) { // for <link> elements loading CSS from a URL
            const newLinkEl = sourceDoc.createElement('link');
      
            newLinkEl.rel = 'stylesheet';
            newLinkEl.href = styleSheet.href;
            targetDoc.head.appendChild(newLinkEl);
          }
        });
      }

*/

    useEffect(
        ()=>{
            
            ventanaExterna.current = window.open("","","menubar=no,status=no,titlebar=no,toolbar=no")
            
            const ventanaActual = ventanaExterna.current;

//            copyStyles(document, ventanaActual.document)


            if(ventanaActual){
                ventanaActual.document.body.appendChild(contenedor.current);
            }
            
            return () => ventanaActual.close();

         //   window.addEventListener("afterprint",() => window.close());
         //   window.print();
        },[]);

 return(

createPortal(
                <div className="ctacte-impresion__container">
                    <div className="ctacte-impresion__logo"></div>
                    <h1 className="ctacte-impresion__titulo">CLUB DE YATES NAVAL MOTOR</h1>
                    <h2 className="ctacte-impresion__subtitulo">OPERADORA RIO LUJAN SRL</h2>
                    <div className="ctacte-impresion__separador"></div>
                    <div className="ctacte-impresion__children">
                        {children}
                    </div>

                    <footer className="ctacte-impresion__footer">Pie de Página</footer>
                    
                </div>
            , contenedor.current)
 )   
}