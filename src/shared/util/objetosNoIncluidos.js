//verifica diferencias en dos arrays de objetos
//y devuelve un array con los objetos del primer array no includos en el segundo array


export const objetosNoIncluidos = (arrObj, arrSnap) => {
    let noIncluidos = [];
    arrObj.forEach((obj)=>{
        let incluido = false
        arrSnap.forEach((snap)=>{
            if(JSON.stringify(obj) === JSON.stringify(snap)) {
                incluido = true;
                return;
            }
        })
        if(!incluido){
            noIncluidos.push(obj)
        }
    })

    return noIncluidos;
}

