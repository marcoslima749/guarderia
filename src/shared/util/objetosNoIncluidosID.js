//verifica diferencias en dos arrays de objetos
//y devuelve un array con los objetos del primer array no includos en el segundo array comparando los ID


export const objetosNoIncluidosID = (arrObj, arrSnap, ID) => {
    let noIncluidos = [];
    arrObj.forEach((obj)=>{
        let incluido = false
        arrSnap.forEach((snap)=>{
            if(obj[ID] === snap[ID]) {
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

