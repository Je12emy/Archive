// This defines an object
var jeremy = {
    nombre:'Jeremy',
    apellido: 'Zelaya',
    edad: 21
}
var dio = {
    nombre: 'Dio',
    apellido : 'Brando',
    edad: 21
}
// Pass the object as a parameter
function ImprimirMayus(persona) {
    console.log(persona.nombre.toUpperCase())
}
// Pass a certain element from a object as a parameter
function ImprimirMayusNombre({nombre}) {
    console.log(nombre.toUpperCase())
}
// Object deestructure, this is thanks to modern JS
function ImprimirMayusNombreDes(persona) {
    var {nombre} = persona
    console.log(nombre.toUpperCase())
}
// We create a function which takes the persona object and returns a new object based on the parameter
function Cumpleaños(persona){
    return {
        // This creates a 'copy' of the parameter object
        ...persona,
        // We change the atribute
        edad: persona.edad +1
    }
}

ImprimirMayus(jeremy);
ImprimirMayusNombre(dio)
// We can also create a object atribute and pass it as a parameter
ImprimirMayusNombre({nombre : 'Jotaro'});
ImprimirMayusNombreDes(jeremy);