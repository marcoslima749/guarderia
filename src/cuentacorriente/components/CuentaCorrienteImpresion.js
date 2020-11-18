import React, { useReducer, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import './CuentaCorrienteImpresion.css';

export const CuentaCorrienteImpresion = ({setImprimir, children}) => {

  /*
    const contenedor = useRef(document.createElement('div'));
    const ventanaExterna = useRef(null);
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
    /*
            
            ventanaExterna.current = window.open("","","menubar=no,status=no,titlebar=no,toolbar=no")
            
            const ventanaActual = ventanaExterna.current;

            copyStyles(document, ventanaActual.document)


            if(ventanaActual){
                ventanaActual.document.body.appendChild(contenedor.current);
            }
            
            return () => ventanaActual.close();

            */
            window.addEventListener("afterprint",() => setImprimir(false));
          //  window.print();
        },[setImprimir]);
 return(

createPortal(   <div className="ctacte-impresion__background">
                  <div className="ctacte-impresion__container">
                      
                        <svg className="ctacte-impresion__logo__svg" width="704" height="753" viewBox="0 0 704 753" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M704 0H0V753H704V0Z" fill="#EDE9E9"/>
                          <path d="M704 371H0V753H704V371Z" fill="#0C67AD"/>
                          <path d="M466.076 371L437.29 382.379C421.332 388.737 401.933 396.1 394.111 398.777L380.031 403.463L380.657 418.857C380.97 429.232 384.412 440.611 391.921 455.336C414.136 498.173 412.572 506.205 367.516 577.155L331.846 632.709L328.404 619.657C321.521 594.892 320.895 562.764 327.153 536.325C332.785 511.895 332.785 511.56 325.901 490.811C314.637 455.671 314.012 431.24 323.711 404.132C325.276 400.116 322.46 397.773 312.134 395.096C284.913 387.733 279.907 387.399 261.446 394.427C251.121 398.108 242.36 401.12 242.047 401.12C241.421 401.12 241.734 394.427 242.986 386.06L244.863 371H466.076Z" fill="#B2CDEB"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M466.342 371L437.556 359.621C421.598 353.263 402.199 345.9 394.377 343.223L380.297 338.537L380.923 323.143C381.236 312.768 384.678 301.389 392.187 286.664C414.402 243.827 412.838 235.795 367.782 164.845L332.112 109.291L328.67 122.343C321.787 147.108 321.161 179.236 327.419 205.675C333.051 230.105 333.051 230.44 326.167 251.189C314.903 286.329 314.277 310.76 323.977 337.868C325.541 341.884 322.725 344.227 312.4 346.904C285.179 354.267 280.172 354.601 261.712 347.573C251.387 343.892 242.626 340.88 242.313 340.88C241.687 340.88 242 347.573 243.252 355.94L245.129 371H466.342Z" fill="#0C67AD"/>
                        </svg>
                      
                      <h1 className="ctacte-impresion__titulo">CLUB DE YATES NAVAL MOTOR</h1>
                      <h2 className="ctacte-impresion__subtitulo">OPERADORA RIO LUJAN SRL</h2>
                      <div className="ctacte-impresion__separador"></div>
                      <div className="ctacte-impresion__children">
                          {children}
                      </div>

                      <footer className="ctacte-impresion__footer">Pie de Página</footer>
                      
                  </div>
                </div>
            , document.getElementById('impresion') /*contenedor.current*/)
 )   
}