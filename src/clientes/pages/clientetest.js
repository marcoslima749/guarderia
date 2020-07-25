
let obj1 = [{a: 1}, {b: 2,}, {c: 3}, {d:5}];

let obj2 = [{a: 1}, {b: 2,}, {c: 4}];

const objetosNoIncluidos = (arrObj, arrSnap) => {
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



console.log('obj en obj1 no incluidos en obj2',objetosNoIncluidos(obj1, obj2));
console.log('obj en obj2 no incluidos en obj1',objetosNoIncluidos(obj2, obj1));
