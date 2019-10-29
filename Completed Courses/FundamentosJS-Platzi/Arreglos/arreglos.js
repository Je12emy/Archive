var jeremy = 
{
    nombre:'Jeremy',
    altura:1.71,
    cantidadDeLibros:15
}
var susan = 
{
    nombre:'Susan',
    altura:1.60,
    cantidadDeLibros:20
}
var julian = 
{
    nombre:'Julian',
    altura:1.80,
    cantidadDeLibros:8
}
var paula = 
{
    nombre:'Paula',
    altura:1.62,
    cantidadDeLibros:40
}
// Arreglo de tipo persona
var personas = [jeremy, susan, julian, paula]
// Filtar un array
// La function filter NO altera el array original
//const esAlta = persona =>  persona.altura > 1.7
const esAlta = ({altura}) =>  altura > 1.7
var personasAltas = personas.filter(esAlta)


// La funcion map siempre retorna un nuevo array
// Funcion para transformar
const pasarAlturaCM = persona => ({
    ...persona,
    altura: persona.altura * 100
})
/*
  return {...persona,
            altura: persona.altura * 100
        }
 */   
var personasCM = personas.map(pasarAlturaCM)

// Reduce, un acumulador.

const reducer = (acum, persona) => acum + persona.cantidadDeLibros
var totalLibros = personas.reduce(reducer,0)
// Ocupa una funcion y el valor inicial de acumulador
console.log(`En total se tienen ${totalLibros} libros`)

