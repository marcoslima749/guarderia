INSERT INTO mensualidad (periodo, clientes_idclientes)
SELECT primero AS periodo, idcliente AS clientes_idclientes
FROM
primero_de_mes
CROSS JOIN (SELECT '6' AS idcliente) AS CL
WHERE
primero >= (
SELECT MIN(embarcaciones.contrato_fecha)
FROM
embarcaciones
JOIN embarcaciones_has_clientes ON embarcaciones_has_clientes.embarcaciones_idembarcaciones = embarcaciones.idembarcaciones
WHERE
embarcaciones_has_clientes.clientes_idclientes = '6'
)
AND
primero <= DATE(NOW());

SELECT * FROM detalle_mensualidad;

SELECT clientes.apellido, embarcaciones.nombre, forma_de_facturacion.numero_cliente,
forma_de_facturacion.razon_social, forma_de_pago.descripcion
FROM 
clientes
JOIN embarcaciones_has_clientes ON embarcaciones_has_clientes.clientes_idclientes = clientes.idclientes
JOIN embarcaciones ON embarcaciones.idembarcaciones = embarcaciones_has_clientes.embarcaciones_idembarcaciones
JOIN forma_de_pago_has_clientes ON forma_de_pago_has_clientes.clientes_idclientes = clientes.idclientes
JOIN forma_de_pago ON forma_de_pago.idforma_de_pago = forma_de_pago_has_clientes.forma_de_pago_idforma_de_pago
JOIN forma_de_facturacion ON forma_de_facturacion.clientes_idclientes = clientes.idclientes
WHERE
clientes.idclientes = '1';


SELECT * FROM primero_de_mes;


/*SELECCIONA TODOS LOS CAMPOS PARA INSERTAR EN DETALLE_MENSUALIDAD*/

SELECT
porcentaje_cuota, porcentaje_interes, mensualidad_idmensualidad, embarcaciones_idembarcaciones,
forma_de_facturacion_idforma_de_facturacion, valor_contingencia, observacion,
concepto_producto_idconcepto_producto
FROM detalle_mensualidad;

/*SELECCIONA TODAS LAS MENSUALIDADES DE UN CLIENTE*/
SELECT idmensualidad FROM mensualidad WHERE clientes_idclientes = '1';



/*INSERTAR EN DETALLE_MENSUALIDAD UN REGISTRO CON EL CONCEPTO CUOTA EN TODAS LAS MENSUALIDADES
DE UN CLIENTE SIN DATOS EXTRAORDINARIOS*/

INSERT INTO detalle_mensualidad (
porcentaje_cuota, porcentaje_interes, mensualidad_idmensualidad, embarcaciones_idembarcaciones,
forma_de_facturacion_idforma_de_facturacion, valor_contingencia, observacion,
concepto_producto_idconcepto_producto
)
VALUES (
'100', '0', '${mensualidadId}', '${embarcacionId}',
'${formaDeFacturacionId}', '${valor ? valor : null}', '${observacion ? observacion : null}',
'1'  
)
;

INSERT INTO detalle_mensualidad (
porcentaje_cuota, porcentaje_interes, concepto_producto_idconcepto_producto,
mensualidad_idmensualidad, embarcaciones_idembarcaciones,
forma_de_facturacion_idforma_de_facturacion)

SELECT
'100' AS porcentaje_cuota, '0' AS porcentaje_interes, '3' AS concepto_producto_idconcepto_producto,
mensualidad.idmensualidad, embarcaciones.idembarcaciones,
forma_de_facturacion.idforma_de_facturacion
FROM clientes
JOIN embarcaciones_has_clientes ON embarcaciones_has_clientes.clientes_idclientes = clientes.idclientes
JOIN embarcaciones ON embarcaciones.idembarcaciones = embarcaciones_has_clientes.embarcaciones_idembarcaciones
JOIN mensualidad ON mensualidad.clientes_idclientes = clientes.idclientes
JOIN forma_de_facturacion ON forma_de_facturacion.clientes_idclientes = clientes.idclientes
WHERE clientes.idclientes = '1'
ORDER BY mensualidad.idmensualidad ASC
;

select * from detalle_mensualidad;

SELECT clientes.apellido, embarcaciones.nombre, mensualidad.periodo, rangos_precio.eslora,
concepto_producto.descripcion, MAX(tarifas.tarifa)

FROM 
clientes
JOIN embarcaciones_has_clientes ON embarcaciones_has_clientes.clientes_idclientes = clientes.idclientes
JOIN embarcaciones ON embarcaciones.idembarcaciones = embarcaciones_idembarcaciones  = embarcaciones.idembarcaciones
JOIN mensualidad ON mensualidad.clientes_idclientes = clientes.idclientes
JOIN detalle_mensualidad ON detalle_mensualidad.mensualidad_idmensualidad = mensualidad.idmensualidad
JOIN concepto_producto ON concepto_producto.idconcepto_producto = detalle_mensualidad.concepto_producto_idconcepto_producto
JOIN rangos_precio_has_embarcaciones ON rangos_precio_has_embarcaciones.embarcaciones_idembarcaciones = embarcaciones.idembarcaciones
JOIN rangos_precio ON rangos_precio.idrangos_precio = rangos_precio_has_embarcaciones.rangos_precio_idrangos_precio
JOIN tarifas ON tarifas.rangos_precio_idrangos_precio = rangos_precio.idrangos_precio
AND tarifas.vigencia <= mensualidad.periodo
AND tarifas.vigencia >= embarcaciones.contrato_fecha
JOIN categorias_has_embarcaciones ON categorias_has_embarcaciones.id_embarcaciones = embarcaciones.idembarcaciones
JOIN categorias ON categorias.idcategorias = categorias_has_embarcaciones.id_categorias
JOIN tasas ON tasas.categoria = categorias.idcategorias
AND tasas.vigencia <= mensualidad.periodo
AND tasas.vigencia >= embarcaciones.contrato_fecha

WHERE clientes.idclientes = '1'

GROUP BY mensualidad.periodo;


SELECT * FROM tasas;



SELECT mensualidad.periodo, concepto_producto.descripcion, tarifas.tarifa, tarifas.vigencia

FROM

mensualidad

JOIN detalle_mensualidad ON detalle_mensualidad.mensualidad_idmensualidad = mensualidad.idmensualidad
JOIN concepto_producto ON concepto_producto.idconcepto_producto = detalle_mensualidad.concepto_producto_idconcepto_producto
JOIN clientes ON clientes.idclientes = mensualidad.clientes_idclientes
JOIN embarcaciones ON embarcaciones.idembarcaciones = detalle_mensualidad.embarcaciones_idembarcaciones
JOIN rangos_precio_has_embarcaciones ON rangos_precio_has_embarcaciones.embarcaciones_idembarcaciones = embarcaciones.idembarcaciones
JOIN rangos_precio ON rangos_precio.idrangos_precio = rangos_precio_has_embarcaciones.rangos_precio_idrangos_precio
JOIN tarifas ON tarifas.rangos_precio_idrangos_precio = rangos_precio.idrangos_precio

WHERE clientes.idclientes = '1'


ORDER BY periodo

;



/*SELECCIONAR LA TARIFA VIGENTE PARA UNA FECHA DETERMINADA PARA UNA EMBARCACION DETERMINADA*/

SELECT embarcaciones.nombre, tarifas.tarifa, tarifas.vigencia
FROM
embarcaciones
JOIN rangos_precio_has_embarcaciones ON rangos_precio_has_embarcaciones.embarcaciones_idembarcaciones = embarcaciones.idembarcaciones
JOIN rangos_precio ON rangos_precio.idrangos_precio = rangos_precio_has_embarcaciones.rangos_precio_idrangos_precio
JOIN tarifas ON tarifas.rangos_precio_idrangos_precio = rangos_precio.idrangos_precio
WHERE embarcaciones.idembarcaciones = '1'
AND tarifas.vigencia <= '2020-07-13'
ORDER BY tarifas.vigencia DESC LIMIT 1;

/*SELECCIONAR LA TASA VIGENTE PARA UNA FECHA PARA UNA EMBARCACION*/

SELECT embarcaciones.nombre, tasas.tasa, tasas.vigencia
FROM embarcaciones
JOIN categorias_has_embarcaciones ON categorias_has_embarcaciones.id_embarcaciones = embarcaciones.idembarcaciones
JOIN categorias ON categorias.idcategorias = categorias_has_embarcaciones.id_categorias
JOIN tasas ON tasas.categoria = categorias.idcategorias
WHERE embarcaciones.idembarcaciones = '1'
AND tasas.vigencia <= '2020-01-01'
ORDER BY tasas.vigencia DESC LIMIT 1;

/*SELECCIONAR LA TASA Y TARIFA VIGENTES PARA UNA FECHA PARA UNA EMBARCACION*/

SELECT embarcaciones.nombre, tasas.tasa, tasas.vigencia, tarifas.tarifa, tarifas.vigencia
FROM embarcaciones
JOIN categorias_has_embarcaciones ON categorias_has_embarcaciones.id_embarcaciones = embarcaciones.idembarcaciones
JOIN categorias ON categorias.idcategorias = categorias_has_embarcaciones.id_categorias
JOIN tasas ON tasas.categoria = categorias.idcategorias
JOIN rangos_precio_has_embarcaciones ON rangos_precio_has_embarcaciones.embarcaciones_idembarcaciones = embarcaciones.idembarcaciones
JOIN rangos_precio ON rangos_precio.idrangos_precio = rangos_precio_has_embarcaciones.rangos_precio_idrangos_precio
JOIN tarifas ON tarifas.rangos_precio_idrangos_precio = rangos_precio.idrangos_precio

WHERE embarcaciones.idembarcaciones = '1'
AND tasas.vigencia <= '2020-07-13'
AND tarifas.vigencia <= '2020-07-13'
ORDER BY tarifas.vigencia DESC, tasas.vigencia DESC LIMIT 1;



/*SELECCIONAR TODAS LAS MENSUALIDADES DE UN CLIENTE*/

SELECT * FROM mensualidad WHERE mensualidad.clientes_idclientes = '1';

/*SELECCIONAR TODOS LOS DETALLES DE UNA MENSUALIDAD*/

SELECT * FROM detalle_mensualidad WHERE detalle_mensualidad.mensualidad_idmensualidad = '1';

/*SELECCIONAR LA DESCRIPCION DEL CONCEPTO DE UN DETALLE*/

SELECT concepto_producto.descripcion
FROM
detalle_mensualidad
JOIN concepto_producto ON concepto_producto.idconcepto_producto = detalle_mensualidad.concepto_producto_idconcepto_producto
WHERE detalle_mensualidad.iddetalle_mensualidad = '4';

/* SELECCIONAR TODOS LOS DETALLES DE UNA MENSUALIDAD CON SU DESCRIPCION */

SELECT mensualidad.periodo, concepto_producto.descripcion

FROM

mensualidad 

JOIN detalle_mensualidad ON detalle_mensualidad.mensualidad_idmensualidad = mensualidad.idmensualidad
JOIN concepto_producto ON concepto_producto.idconcepto_producto = detalle_mensualidad.concepto_producto_idconcepto_producto

WHERE mensualidad.idmensualidad = '1';

/* SELECCIONAR TODAS LAS MENSUALIDADES DE UN CLIENTE CON TODOS LOS DETALLES CON SU DESCRIPCION */

SELECT mensualidad.periodo, clientes.apellido, embarcaciones.nombre, concepto_producto.descripcion
FROM 
mensualidad
JOIN detalle_mensualidad ON detalle_mensualidad.mensualidad_idmensualidad = mensualidad.idmensualidad
JOIN concepto_producto ON concepto_producto.idconcepto_producto = detalle_mensualidad.concepto_producto_idconcepto_producto
JOIN clientes ON clientes.idclientes = mensualidad.clientes_idclientes
JOIN embarcaciones_has_clientes ON embarcaciones_has_clientes.clientes_idclientes = clientes.idclientes
JOIN embarcaciones ON embarcaciones.idembarcaciones = embarcaciones_has_clientes.embarcaciones_idembarcaciones

WHERE clientes.idclientes = '1'
ORDER BY mensualidad.periodo;

/* SELECCIONAR TODOS LOS DETALLE DE UN CLIENTE CON DESCRIPCION SALDO INICIAL Y SU VALOR*/

SELECT mensualidad.periodo, clientes.apellido, embarcaciones.nombre, concepto_producto.descripcion,
detalle_mensualidad.valor_contingencia
FROM 
mensualidad
JOIN detalle_mensualidad ON detalle_mensualidad.mensualidad_idmensualidad = mensualidad.idmensualidad
JOIN concepto_producto ON concepto_producto.idconcepto_producto = detalle_mensualidad.concepto_producto_idconcepto_producto
JOIN clientes ON clientes.idclientes = mensualidad.clientes_idclientes
JOIN embarcaciones_has_clientes ON embarcaciones_has_clientes.clientes_idclientes = clientes.idclientes
JOIN embarcaciones ON embarcaciones.idembarcaciones = embarcaciones_has_clientes.embarcaciones_idembarcaciones

WHERE clientes.idclientes = '1'
AND detalle_mensualidad.concepto_producto_idconcepto_producto = '1'
ORDER BY mensualidad.periodo;


/* SELECCIONAR TODAS LAS CUOTAS CON SU VALOR SEGUN VIGENCIA Y EMBARCACION DE TODAS LAS MENSUALIDADES
DE UN CLIENTE */

SELECT mensualidad.periodo, clientes.apellido, embarcaciones.nombre, concepto_producto.descripcion, MAX(tarifas.tarifa)
FROM 
mensualidad

/*JOINS PARA DESPLEGAR LOS DETALLES DE MENSUALIDAD*/
JOIN detalle_mensualidad ON detalle_mensualidad.mensualidad_idmensualidad = mensualidad.idmensualidad
JOIN concepto_producto ON concepto_producto.idconcepto_producto = detalle_mensualidad.concepto_producto_idconcepto_producto
JOIN clientes ON clientes.idclientes = mensualidad.clientes_idclientes
JOIN embarcaciones_has_clientes ON embarcaciones_has_clientes.clientes_idclientes = clientes.idclientes
JOIN embarcaciones ON embarcaciones.idembarcaciones = embarcaciones_has_clientes.embarcaciones_idembarcaciones

/*JOINS PARA CONSEGUIR LA TARIFA*/
JOIN rangos_precio_has_embarcaciones ON rangos_precio_has_embarcaciones.embarcaciones_idembarcaciones = embarcaciones.idembarcaciones
JOIN rangos_precio ON rangos_precio.idrangos_precio = rangos_precio_has_embarcaciones.rangos_precio_idrangos_precio
JOIN tarifas ON tarifas.rangos_precio_idrangos_precio = rangos_precio.idrangos_precio
AND tarifas.vigencia <= mensualidad.periodo
/* ESTO FUNCIONA SOLAMENTE PORQUE EL INGRESO ESTÁ JUSTO EN LA FECHA DE CAMBIO DE TARIFA PERO ESTÁ MAL
PROBAR MÁS HASTA QUE FALLE PARA VER CÓMO FALLA
*/
AND tarifas.vigencia >= embarcaciones.contrato_fecha

WHERE clientes.idclientes = '1'
AND detalle_mensualidad.concepto_producto_idconcepto_producto = '2'
GROUP BY mensualidad.periodo
ORDER BY mensualidad.periodo;

/* SELECCIONAR TODAS LAS TASAS CON SU VALOR SEGUN VIGENCIA Y EMBARCACION DE TODAS LAS MENSUALIDADES
DE UN CLIENTE */

SELECT mensualidad.periodo, clientes.apellido, embarcaciones.nombre, concepto_producto.descripcion, MAX(tasas.tasa)
FROM 
mensualidad

/*JOINS PARA DESPLEGAR LOS DETALLES DE MENSUALIDAD*/
JOIN detalle_mensualidad ON detalle_mensualidad.mensualidad_idmensualidad = mensualidad.idmensualidad
JOIN concepto_producto ON concepto_producto.idconcepto_producto = detalle_mensualidad.concepto_producto_idconcepto_producto
JOIN clientes ON clientes.idclientes = mensualidad.clientes_idclientes
JOIN embarcaciones_has_clientes ON embarcaciones_has_clientes.clientes_idclientes = clientes.idclientes
JOIN embarcaciones ON embarcaciones.idembarcaciones = embarcaciones_has_clientes.embarcaciones_idembarcaciones

/*JOINS PARA CONSEGUIR LA TASA*/
JOIN categorias_has_embarcaciones ON categorias_has_embarcaciones.id_embarcaciones = embarcaciones.idembarcaciones
JOIN categorias ON categorias.idcategorias = categorias_has_embarcaciones.id_categorias
JOIN tasas ON tasas.categoria = categorias.idcategorias
AND tasas.vigencia <= mensualidad.periodo
/* LAS TASAS CAMBIAN UNA VEZ POR AÑO POR ESO HAY QUE LLEVAR LA FECHA DE CONTRATO AL 1ERO DE ENERO*/
AND tasas.vigencia >= DATE(CONCAT(YEAR(embarcaciones.contrato_fecha), '-01-01'))

WHERE clientes.idclientes = '1'
AND detalle_mensualidad.concepto_producto_idconcepto_producto = '3'
GROUP BY mensualidad.periodo
ORDER BY mensualidad.periodo;


select tasas.tasa from
tasas
where
tasas.categoria = 'M2'
and
tasas.vigencia <= '2020-07-13' /* EL PERIODO ACTUAL */
and
tasas.vigencia >= DATE(CONCAT(YEAR('2019-10-01'), '-01-01')); /* LA FECHA DE CONTRATO */


/*SELECCIONAR UNION DE LAS TRES CONSULTAS ANTERIORES - CONSULTA TODOS DETALLES CON SUS VALORES*/


SELECT mensualidad.periodo periodo, clientes.apellido, embarcaciones.nombre, concepto_producto.descripcion,
detalle_mensualidad.valor_contingencia AS valor
FROM 
mensualidad
JOIN detalle_mensualidad ON detalle_mensualidad.mensualidad_idmensualidad = mensualidad.idmensualidad
JOIN concepto_producto ON concepto_producto.idconcepto_producto = detalle_mensualidad.concepto_producto_idconcepto_producto
JOIN clientes ON clientes.idclientes = mensualidad.clientes_idclientes
JOIN embarcaciones_has_clientes ON embarcaciones_has_clientes.clientes_idclientes = clientes.idclientes
JOIN embarcaciones ON embarcaciones.idembarcaciones = embarcaciones_has_clientes.embarcaciones_idembarcaciones

WHERE clientes.idclientes = '1'
AND detalle_mensualidad.concepto_producto_idconcepto_producto = '1'

UNION

(SELECT mensualidad.periodo, clientes.apellido, embarcaciones.nombre, concepto_producto.descripcion, MAX(tarifas.tarifa)
FROM 
mensualidad

/*JOINS PARA DESPLEGAR LOS DETALLES DE MENSUALIDAD*/
JOIN detalle_mensualidad ON detalle_mensualidad.mensualidad_idmensualidad = mensualidad.idmensualidad
JOIN concepto_producto ON concepto_producto.idconcepto_producto = detalle_mensualidad.concepto_producto_idconcepto_producto
JOIN clientes ON clientes.idclientes = mensualidad.clientes_idclientes
JOIN embarcaciones_has_clientes ON embarcaciones_has_clientes.clientes_idclientes = clientes.idclientes
JOIN embarcaciones ON embarcaciones.idembarcaciones = embarcaciones_has_clientes.embarcaciones_idembarcaciones

/*JOINS PARA CONSEGUIR LA TARIFA*/
JOIN rangos_precio_has_embarcaciones ON rangos_precio_has_embarcaciones.embarcaciones_idembarcaciones = embarcaciones.idembarcaciones
JOIN rangos_precio ON rangos_precio.idrangos_precio = rangos_precio_has_embarcaciones.rangos_precio_idrangos_precio
JOIN tarifas ON tarifas.rangos_precio_idrangos_precio = rangos_precio.idrangos_precio
AND tarifas.vigencia <= mensualidad.periodo
/* ESTO FUNCIONA SOLAMENTE PORQUE EL INGRESO ESTÁ JUSTO EN LA FECHA DE CAMBIO DE TARIFA PERO ESTÁ MAL
PROBAR MÁS HASTA QUE FALLE PARA VER CÓMO FALLA
*/
AND tarifas.vigencia >= embarcaciones.contrato_fecha

WHERE clientes.idclientes = '1'
AND detalle_mensualidad.concepto_producto_idconcepto_producto = '2'
GROUP BY mensualidad.periodo
ORDER BY mensualidad.periodo)

UNION

(
SELECT mensualidad.periodo, clientes.apellido, embarcaciones.nombre, concepto_producto.descripcion, MAX(tasas.tasa)
FROM 
mensualidad

/*JOINS PARA DESPLEGAR LOS DETALLES DE MENSUALIDAD*/
JOIN detalle_mensualidad ON detalle_mensualidad.mensualidad_idmensualidad = mensualidad.idmensualidad
JOIN concepto_producto ON concepto_producto.idconcepto_producto = detalle_mensualidad.concepto_producto_idconcepto_producto
JOIN clientes ON clientes.idclientes = mensualidad.clientes_idclientes
JOIN embarcaciones_has_clientes ON embarcaciones_has_clientes.clientes_idclientes = clientes.idclientes
JOIN embarcaciones ON embarcaciones.idembarcaciones = embarcaciones_has_clientes.embarcaciones_idembarcaciones

/*JOINS PARA CONSEGUIR LA TASA*/
JOIN categorias_has_embarcaciones ON categorias_has_embarcaciones.id_embarcaciones = embarcaciones.idembarcaciones
JOIN categorias ON categorias.idcategorias = categorias_has_embarcaciones.id_categorias
JOIN tasas ON tasas.categoria = categorias.idcategorias
AND tasas.vigencia <= mensualidad.periodo
/* LAS TASAS CAMBIAN UNA VEZ POR AÑO POR ESO HAY QUE LLEVAR LA FECHA DE CONTRATO AL 1ERO DE ENERO*/
AND tasas.vigencia >= DATE(CONCAT(YEAR(embarcaciones.contrato_fecha), '-01-01'))

WHERE clientes.idclientes = '1'
AND detalle_mensualidad.concepto_producto_idconcepto_producto = '3'
GROUP BY mensualidad.periodo
ORDER BY mensualidad.periodo
)
ORDER BY periodo;


/*SELECCIONA TODOS LOS PAGOS*/
select * from pago;
SELECT * FROM categorias;

SELECT * FROM concepto_producto;

select * from clientes;


/*
SELECT * FROM forma_de_pago;

1	DEBITO VISA
2	DEBITO MASTER
3	TRANSFERENCIA
4	DEPOSITO
5	EFECTIVO
6	POSNET

*/

/* INSERTA PAGOS DE UN CLIENTE */

INSERT INTO pago
(
fecha_de_pago,
clientes_idclientes,
monto,
forma_de_pago_idforma_de_pago
)
VALUES
('2019-10-07','1','9400','5'),
('2019-10-07','1','20000','5'),
('2019-11-13','1','29190','5'),
('2019-12-09','1','500','5'),
('2019-12-09','1','29500','5'),
('2020-01-03','1','29060','5'),
('2020-01-03','1','500','5'),
('2020-02-03','1','32500','5'),
('2020-02-03','1','1500','5'),
('2020-03-05','1','35000','5'),
('2020-04-13','1','33860','3'),
('2020-05-04','1','33860','3'),
('2020-06-04','1','33860','3'),
('2020-07-05','1','33860','3')
;


/* SELECCIONAR TODAS LAS TASAS CON SU VALOR SEGUN VIGENCIA Y EMBARCACION DE TODAS LAS MENSUALIDADES
DE UN CLIENTE */

SELECT mensualidad.periodo, clientes.apellido, embarcaciones.nombre, concepto_producto.descripcion, MAX(tasas.tasa)
FROM 
mensualidad

/*JOINS PARA DESPLEGAR LOS DETALLES DE MENSUALIDAD*/
JOIN detalle_mensualidad ON detalle_mensualidad.mensualidad_idmensualidad = mensualidad.idmensualidad
JOIN concepto_producto ON concepto_producto.idconcepto_producto = detalle_mensualidad.concepto_producto_idconcepto_producto
JOIN clientes ON clientes.idclientes = mensualidad.clientes_idclientes
JOIN embarcaciones_has_clientes ON embarcaciones_has_clientes.clientes_idclientes = clientes.idclientes
JOIN embarcaciones ON embarcaciones.idembarcaciones = embarcaciones_has_clientes.embarcaciones_idembarcaciones

/*JOINS PARA CONSEGUIR LA TASA*/
JOIN categorias_has_embarcaciones ON categorias_has_embarcaciones.id_embarcaciones = embarcaciones.idembarcaciones
JOIN categorias ON categorias.idcategorias = categorias_has_embarcaciones.id_categorias
JOIN tasas ON tasas.categoria = categorias.idcategorias
AND tasas.vigencia <= mensualidad.periodo
/* LAS TASAS CAMBIAN UNA VEZ POR AÑO POR ESO HAY QUE LLEVAR LA FECHA DE CONTRATO AL 1ERO DE ENERO*/
AND tasas.vigencia >= DATE(CONCAT(YEAR(embarcaciones.contrato_fecha), '-01-01'))

WHERE clientes.idclientes = '1'
AND detalle_mensualidad.concepto_producto_idconcepto_producto = '3'
GROUP BY mensualidad.periodo
ORDER BY mensualidad.periodo;


select tasas.tasa from
tasas
where
tasas.categoria = 'M2'
and
tasas.vigencia <= '2020-07-13' /* EL PERIODO ACTUAL */
and
tasas.vigencia >= DATE(CONCAT(YEAR('2019-10-01'), '-01-01')); /* LA FECHA DE CONTRATO */

select * from detalle_mensualidad;


/*CUENTA CORRIENTE DE UN CLIENTE*/


SELECT mensualidad.idmensualidad AS IDm, detalle_mensualidad.iddetalle_mensualidad AS IDd, null AS IDp, mensualidad.periodo, clientes.idclientes AS IDcl, clientes.apellido, embarcaciones.idembarcaciones AS IDemb, embarcaciones.nombre, concepto_producto.descripcion,
detalle_mensualidad.valor_continge+ncia AS Debe, null AS Haber
FROM 
mensualidad
JOIN detalle_mensualidad ON detalle_mensualidad.mensualidad_idmensualidad = mensualidad.idmensualidad
JOIN concepto_producto ON concepto_producto.idconcepto_producto = detalle_mensualidad.concepto_producto_idconcepto_producto
JOIN clientes ON clientes.idclientes = mensualidad.clientes_idclientes
JOIN embarcaciones_has_clientes ON embarcaciones_has_clientes.clientes_idclientes = clientes.idclientes
JOIN embarcaciones ON embarcaciones.idembarcaciones = embarcaciones_has_clientes.embarcaciones_idembarcaciones

WHERE clientes.idclientes = '1'
AND detalle_mensualidad.concepto_producto_idconcepto_producto = '1'

UNION

(SELECT mensualidad.idmensualidad AS IDm, detalle_mensualidad.iddetalle_mensualidad AS IDd, null AS IDp, mensualidad.periodo, clientes.idclientes AS IDcl, clientes.apellido, embarcaciones.idembarcaciones AS IDemb, embarcaciones.nombre, concepto_producto.descripcion, MAX(tarifas.tarifa), null
FROM 
mensualidad

/*JOINS PARA DESPLEGAR LOS DETALLES DE MENSUALIDAD*/
JOIN detalle_mensualidad ON detalle_mensualidad.mensualidad_idmensualidad = mensualidad.idmensualidad
JOIN concepto_producto ON concepto_producto.idconcepto_producto = detalle_mensualidad.concepto_producto_idconcepto_producto
JOIN clientes ON clientes.idclientes = mensualidad.clientes_idclientes
JOIN embarcaciones_has_clientes ON embarcaciones_has_clientes.clientes_idclientes = clientes.idclientes
JOIN embarcaciones ON embarcaciones.idembarcaciones = embarcaciones_has_clientes.embarcaciones_idembarcaciones

/*JOINS PARA CONSEGUIR LA TARIFA*/
JOIN rangos_precio_has_embarcaciones ON rangos_precio_has_embarcaciones.embarcaciones_idembarcaciones = embarcaciones.idembarcaciones
JOIN rangos_precio ON rangos_precio.idrangos_precio = rangos_precio_has_embarcaciones.rangos_precio_idrangos_precio
JOIN tarifas ON tarifas.rangos_precio_idrangos_precio = rangos_precio.idrangos_precio
AND tarifas.vigencia <= mensualidad.periodo
/* ESTO FUNCIONA SOLAMENTE PORQUE EL INGRESO ESTÁ JUSTO EN LA FECHA DE CAMBIO DE TARIFA PERO ESTÁ MAL
PROBAR MÁS HASTA QUE FALLE PARA VER CÓMO FALLA
*/
AND tarifas.vigencia >= embarcaciones.contrato_fecha

WHERE clientes.idclientes = '1'
AND detalle_mensualidad.concepto_producto_idconcepto_producto = '2'
GROUP BY mensualidad.periodo
ORDER BY mensualidad.periodo)

UNION

/* QUERY DE LA MENSUALIDAD */

(
SELECT mensualidad.idmensualidad AS IDm, detalle_mensualidad.iddetalle_mensualidad AS IDd, null AS IDp, mensualidad.periodo, clientes.idclientes AS IDcl, clientes.apellido, embarcaciones.idembarcaciones AS IDemb, embarcaciones.nombre, concepto_producto.descripcion, MAX(tasas.tasa), null
FROM 
mensualidad

/*JOINS PARA DESPLEGAR LOS DETALLES DE MENSUALIDAD*/
JOIN detalle_mensualidad ON detalle_mensualidad.mensualidad_idmensualidad = mensualidad.idmensualidad
JOIN concepto_producto ON concepto_producto.idconcepto_producto = detalle_mensualidad.concepto_producto_idconcepto_producto
JOIN clientes ON clientes.idclientes = mensualidad.clientes_idclientes
JOIN embarcaciones_has_clientes ON embarcaciones_has_clientes.clientes_idclientes = clientes.idclientes
JOIN embarcaciones ON embarcaciones.idembarcaciones = embarcaciones_has_clientes.embarcaciones_idembarcaciones

/*JOINS PARA CONSEGUIR LA TASA*/
JOIN categorias_has_embarcaciones ON categorias_has_embarcaciones.id_embarcaciones = embarcaciones.idembarcaciones
JOIN categorias ON categorias.idcategorias = categorias_has_embarcaciones.id_categorias
JOIN tasas ON tasas.categoria = categorias.idcategorias
AND tasas.vigencia <= mensualidad.periodo
/* LAS TASAS CAMBIAN UNA VEZ POR AÑO POR ESO HAY QUE LLEVAR LA FECHA DE CONTRATO AL 1ERO DE ENERO*/
AND tasas.vigencia >= DATE(CONCAT(YEAR(embarcaciones.contrato_fecha), '-01-01'))

WHERE clientes.idclientes = '1'
AND detalle_mensualidad.concepto_producto_idconcepto_producto = '3'
GROUP BY mensualidad.periodo
ORDER BY mensualidad.periodo
)
UNION

/* QUERY DE LOS PAGOS */
(

SELECT null AS IDm, null AS IDd, pago.idpago AS IDp, pago.fecha_de_pago, clientes.idclientes AS IDcl, clientes.apellido, embarcaciones.idembarcaciones AS IDemb, embarcaciones.nombre, 'PAGO', null, pago.monto
FROM pago
JOIN clientes ON clientes.idclientes = pago.clientes_idclientes
JOIN embarcaciones_has_clientes ON embarcaciones_has_clientes.clientes_idclientes = clientes.idclientes
JOIN embarcaciones ON embarcaciones.idembarcaciones = embarcaciones_has_clientes.embarcaciones_idembarcaciones
WHERE pago.clientes_idclientes = '1'
)

ORDER BY periodo;



