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