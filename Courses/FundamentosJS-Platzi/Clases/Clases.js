class Persona {
    constructor(nombre, apellido, edad, altura) {
        // Desde ahora en adelante, en todo el codigo se pueden acceder a estar variables con el sufijo de this.
        this.nombre = nombre
        this.apellido = apellido
        // Aca definimos un valor predeterminado. Todo tienen 20 años
        //this.edad = 20
        this.edad = edad
        this.altura = altura
    }
    saludar(fn){
        var {nombre, apellido} = this;
        console.log(`Hola, me llamo: ${nombre} ${apellido}`)
        // Si la funcion existe
        if (fn) {
            // Llamar a la funcion
            fn(nombre,apellido, false)
        }
    }
    SoyAlto(){
        return this.altura < 1.7
    }
}
// Inherit = extend
class Desarrollador extends Persona{
    constructor (nombre, apellido, altura) {
        // Esto permite usar el this.
        super(nombre,apellido,altura)
        /*this.nombre = nombre
        this.apellido = apellido
        this.altura = altura*/
    }
    saludar(fn){
        var {nombre, apellido} = this;
        console.log(`Hola, me llamo: ${this.nombre} ${this.apellido} y soy desarrollador/a`)
        if (fn) {
            // Llamar a la funcion y pasar los parametros requeridos
            fn(nombre, apellido, true)
        }
    }
}
function responderSaludo(nombre,apellido, esDev){
    console.log(`Buen dia ${nombre} ${apellido}`)
    if (esDev) {
        console.log(`No sabia que eras desarollador/a`);       
    }   
}

var ericka = new Persona('Ericka', 'Luna', 19, 1.60)
var arturo = new Persona('Arturo', 'Martinez', 24, 1.85)
var viviana = new Desarrollador('Viviana','Perez')

ericka.saludar()
arturo.saludar(responderSaludo);
viviana.saludar(responderSaludo);

// Esto crea la clase mediante un constructor
/*function Persona(nombre, apellido, edad, altura) {
    // Desde ahora en adelante, en todo el codigo se pueden acceder a estar variables con el sufijo de this.
    this.nombre = nombre
    this.apellido = apellido
    // Aca definimos un valor predeterminado. Todo tienen 20 años
    //this.edad = 20
    this.edad = edad
    this.altura = altura
}*/
// Deberiamos poner los prototipos despues del constructor.
// Prototipo de Altura
/*Persona.prototype.SoyAlto = function () {
    return this.altura > 1.7
}*/
// No podemos usar arrow functions pues hacen referencia al this. global o windows
//Persona.prototype.SoyAlto = () => this.altura > 1.7

// Agregamos un prototipo de saludo a la clase
/*Persona.prototype.saludar = function () {
    console.log(`Hola, me llamo: ${this.nombre} ${this.apellido}`)
}*/

/*function Desarrollador(nombre, apellido) {
    this.nombre = nombre
    this.apellido = apellido
}*/
//heredaDe(Desarrollador, Persona)

/*Desarrollador.prototype.saludar = function () {
    console.log(`Hola, me llamo ${this.nombre} ${this.apellido} y soy desarrollador/a`)
}*/

/*function heredaDe(prototipoHijo, prototipoPadre)
{
    // Funcion que no hace nada, se puede nombrar noop
    var fn = function(){}
    fn.prototype = prototipoPadre.prototype
    // Creamos una nueva instancia de fn
    prototipoHijo.prototype = new fn
    prototipoHijo.prototype.constructor = prototipoHijo
}*/
//Persona.prototype.saludar = () => console.log(`Hola, me llamo: ${this.nombre} ${this.apellido}`)

// Creamos una nueva clase
/*var jeremy = new Persona('Jeremy', 'Zelaya', 21, 1.70)
// Invocamos el metodo de saludo.
//jeremy.saludar()
*/


