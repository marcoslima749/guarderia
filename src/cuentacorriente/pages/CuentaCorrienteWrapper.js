import React from 'react';

import {useParams} from 'react-router-dom'
import { Boton } from '../../shared/components/Boton';
import { Dashboard } from '../../shared/pages/dashboard';
import { CuentaCorriente } from './CuentaCorriente';

export const CuentaCorrienteWrapper = () => {
let id = useParams().id

return (
    <Dashboard nombre="CYNM" descripcion="clientes" side={true} panel={<Boton path={`/clientes/${id}/cta-cte/imprimir`} className="simple-hover embarcacion__boton-nuevo">Imprimir</Boton>} >
        <CuentaCorriente />
    </Dashboard>
)
}