//Patrones comunes

const select = (tabla, campo, where) => {
    return `SELECT ${campo} FROM ${tabla}${where ? ' WHERE ' + where : ''}`;
};

const todo = (tabla) => {
    return select(tabla, '*');
};

const eliminar = (tabla, campo, valor) => {
    return `DELETE FROM ${tabla} WHERE (${campo} = '${valor}')`;
};

const insertar = (tabla, campos, valores) => {
    return `INSERT INTO ${tabla} ( ${campos.join(' , ')} ) VALUES ( '${valores.join("' , '")}' )`
};

const modificar = (tabla, campo, valor, ID, valorID) => {
    return `UPDATE ${tabla} SET ${campo} = '${valor}' WHERE (${ID} = '${valorID}')`
};

/*
console.log(select('tareas', 'descripcion',"idtareas = '1'"));
console.log(select('tareas', '*'));
console.log(todo('tareas'));
console.log(eliminar('tareas', 'idtareas','1'));
console.log(insertar('tareas', ['campo1', 'campo2', 'campo3'],['valor1', 'valor2', 'valor3']));
*/



//Tablas

//Tareas

const tareas = {
    todo : todo('tareas'),
    eliminar : (id) => eliminar('tareas', 'idtareas', id),
    
    // INSERT INTO `guarderiadb`.`tareas` (`descripcion`, `nota`, `deadline`, `prioridad`, `completado`) VALUES ('nueva descr', 'nota de la desc', '2020-09-01', '3', '0');

    insertar : (campos, valores) => insertar('tareas', campos, valores),
    modificar: (campo, valor, id) => modificar('tareas', campo, valor, 'idtareas', id)
}

//Embarcaciones

const embResumen =
`SELECT
embarcaciones.idembarcaciones AS ID,
embarcaciones.nombre AS Embarcacion,
categorias.idcategorias AS Cat,
CONCAT(clientes.apellido, ', ' , clientes.nombre) AS Cliente,
clientes.idclientes AS IDc,
embarcaciones_has_clientes.porcentaje_posesion AS '%',
'Al Día' as Estado,
'0' as Pendiente
FROM
embarcaciones
JOIN categorias_has_embarcaciones ON categorias_has_embarcaciones.id_embarcaciones = embarcaciones.idembarcaciones
JOIN categorias ON categorias.idcategorias = categorias_has_embarcaciones.id_categorias
JOIN embarcaciones_has_clientes ON embarcaciones_has_clientes.embarcaciones_idembarcaciones = embarcaciones.idembarcaciones
JOIN clientes ON clientes.idclientes = embarcaciones_has_clientes.clientes_idclientes
;`;

const embarcaciones = {
    todo : todo('embarcaciones'),
    resumen: embResumen,
    seleccionar : (id) => select('embarcaciones', '*', `idembarcaciones = '${id}'`)
}


const clientes = {
    todo: todo('clientes'),
    seleccionar : (id) => select('clientes', '*', `idclientes = '${id}'`)
}





module.exports = {
    tareas,
    embarcaciones,
    clientes
}