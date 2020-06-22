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

const tareas = {
    todo : todo('tareas'),
    eliminar : (id) => eliminar('tareas', 'idtareas', id),
    // INSERT INTO `guarderiadb`.`tareas` (`descripcion`, `nota`, `deadline`, `prioridad`, `completado`) VALUES ('nueva descr', 'nota de la desc', '2020-09-01', '3', '0');

    insertar : (campos, valores) => insertar('tareas', campos, valores),
    modificar: (campo, valor, id) => modificar('tareas', campo, valor, 'idtareas', id)
}

/*
console.log(tareas.todo);
console.log(tareas.insertar(['campo1','campo2'],['valor1','valor2']));
console.log(tareas.eliminar('idtareas','1'));
console.log(tareas.modificar('descripcion','Nuevo valor descripcion' ,'1'));
*/



module.exports = {
    tareas
}