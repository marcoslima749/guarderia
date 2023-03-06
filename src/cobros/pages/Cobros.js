import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useRouterMatch, useParams } from "react-router-dom";
import "./Cobros.css";
import { CampoEditable } from "../components/CampoEditable";
import { FlagModificado } from "../components/FlagModificado";
import { Boton } from "../../shared/components/Boton";

const moment = require("moment");

let nuevoCobro = {
  monto: '0',
  fecha_de_cobro: "",
  fecha_acreditacion: "",
  clientes_idclientes: "",
  forma_de_pago_idforma_de_pago: "",
  comprobante: "",
  id_SOS: "",
  concepto_ws: "",
  concepto_excel: "",
  codigo: "",
  num_documento: "",
  oficina: "",
  detalle_ws: "",
  detalle_excel: ""
};

export const Cobros = ({ setHeader }) => {
  let [cobro, setCobro] = useState([]);
  let [snapCobro, setSnapCobro] = useState([]);
  let [llaves, setLlaves] = useState([]);
  let [modificado, setModificado] = useState(false);
  let params = useParams();

  useEffect(() => {
    setHeader.setNombreHeader("CYNM");
    setHeader.setDescripcionHeader("Cobros");
    setHeader.setPanelHeader(null);

    //VERIFICAR LUEGO QUE NO SE NECESITE ACTUALIZAR LOS COBROS DE NUEVO



    axios.get("http://localhost:4000/api/db/cobros")
    .then((response) => {
      console.log("volviendo de la consulta por axios");
      console.log(response.data);
      setCobro(response.data);
      setLlaves(Object.keys(response.data[0] || {}));
    }).catch((error) => {
      throw error;
    });

  }, []);

  

  let handleChangeCobro = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;

    let newCobro = { ...cobro, [name]: value };
    setCobro(newCobro);
  };

  let guardarCambios = () => {
    let campos = [];
    llaves.forEach((llave) => {
      if (cobro[llave] !== snapCobro[llave]) {
        campos.push(llave);
      }
    });
    if (campos.length === 0) {
      //Los campos son iguales, no hay modificación
      console.log(
        "los campos son iguales, no hay modificacion. Embarcacion : ",
        cobro,
        " Snap: ",
        snapCobro
      );
      return;
    } else {
      //Hay campos modificados, mandar consulta
      //formatea las fechas para la base de datos
      if (
        campos.includes("contrato") ||
        campos.includes("seguro") ||
        campos.includes("baja")
      ) {
        cobro.contrato = moment(cobro.contrato).isValid()
          ? moment(cobro.contrato).format("YYYY[-]MM[-]DD")
          : null;
        cobro.seguro = moment(cobro.seguro).isValid()
          ? moment(cobro.seguro).format("YYYY[-]MM[-]DD")
          : null;
        console.log(
          "contrato: ",
          cobro.contrato,
          "seguro: ",
          cobro.seguro
        );
        //agregar la lógica para la baja
      }
      //COMENTADO PARA CORREGIR LOS CAMPOS
      // axios
      //   .put(`http://localhost:4000/api/db/embarcaciones/${cobro.Id}/m`, {
      //     embarcacion: cobro,
      //     campos,
      //   })
      //   .then((response) => {
      //     console.log("Base consultada correctamente, respuesta: ", response);
      //     //Iguala el snap al state actual para no tener que consultar a la base de nuevo
      //     setSnapCobro(cobro);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  };

  let descartarCambios = () => {
    setCobro(snapCobro);
  };

  let titulos = llaves
    .map((llave) => {
      return (
        <span
          key={Math.random()}
          className={`simple-hover cobros__titulo cobros__titulo-${llave}`}
        >
          {llave}
        </span>
      );
    });

    let filas = cobro.map((cobro) => {
      return (
        <div
          key={`${cobro.idcobro}-${cobro.clientes_idclientes}`}
          className="cobros__cobro"
        >
          {llaves
            .map((llave) => {
              return (
                <span
                  key={llave}
                  className={`${
                    llave === "idcobro" ||
                    llave === "clientes_idclientes"
                      ? "simple-hover"
                      : ""
                  } cobros__campo cobro__${llave}`}
                >
                  {llave === "Embarcacion" ? (
                    <Boton path={`/cobros/${cobro.idcobro}`}>{cobro[llave]}</Boton>
                  ) : llave === "clientes_idclientes" ? (
                    <Boton path={`/clientes/${cobro.clientes_idclientes}`}>{cobro[llave]}</Boton>
                  ) : (
                    cobro[llave]
                  )}
                </span>
              );
            })}
        </div>
      );
    });

  return (
    <div className="cobros__container">
      <div className="cobros__titulos">{titulos}</div>
      <div className="cobros__lista">{filas}</div>


      <div
        className={`cobros__flag ${
          modificado ? "cobros__flag--visible" : ""
        }`}
      >
        {modificado ? (
          <FlagModificado
            guardar={guardarCambios}
            descartar={descartarCambios}
            clasesLabel="cobros__flag__label"
            clasesBoton="cobros__flag__boton simple-hover"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
