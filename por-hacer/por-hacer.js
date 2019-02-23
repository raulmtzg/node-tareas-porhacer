

const fs = require('fs');


let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
        
      });


};

const  cargarDB = () =>{

    try {

        listadoPorHacer = require('../db/data.json');
    } catch(error){

        listadoPorHacer = [];
    }

        
}

const crear = ( descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push( porHacer);
    
    guardarDB();

    return porHacer;
}

const getListado = () =>{
    
    cargarDB();
    return listadoPorHacer;
}


const actualizar = (descripcion, completado = true) =>{

    cargarDB();

    //Busca el index a actualizar en la BD, si lo encuentra lo retorna, si regresa -1 es que no encontró la tarea
    let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion);

    if ( index >= 0 ){
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

let borrar = ( descripcion) => {
    
    cargarDB();

    //Esta funcion excluye del arreglo origen los valores que cumplan con la condicion
    let nuevoListado = listadoPorHacer.filter( tarea => tarea.descripcion !== descripcion);

    if ( listadoPorHacer.length === nuevoListado.length){
        return false;
    }else{
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}