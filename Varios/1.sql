SELECT mensualidad.idmensualidad AS IDm, detalle_mensualidad.iddetalle_mensualidad AS IDd, null AS IDp, mensualidad.periodo, clientes.idclientes AS IDcl, clientes.apellido, embarcaciones.idembarcaciones AS IDemb, embarcaciones.nombre, concepto_producto.descripcion,
detalle_mensualidad.valor_contingencia AS Debe, null AS Haber
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