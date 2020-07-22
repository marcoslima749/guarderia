export const verificarCambios = (obj, snap)=> {

    return JSON.stringify(obj) !== JSON.stringify(snap)

}