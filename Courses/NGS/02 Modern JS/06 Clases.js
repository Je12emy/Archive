//! Classes
//* Modern JS allows us to use class syntax
//? A class is a template or blueprint to define a group of shared structure and behaviour between objects
//? A constructor function is a class which is executed when we instantiate a new class
class Person {
    constructor(name){
        //* Store the variable in the instance using the this keyword
        this.name = name
    }
    greet(){
        console.log(`Hello ${this.name}`);
    }
};
//! Student class inherits/extends the Person class
class Student extends Person {
    constructor(name, level){
        //* It will call the super class with the name argument
        //! This invokes the person constructor and store the name
        super(name)
        this.level = level
    }
    greet(){
        console.log(`Hello ${this.name} from ${this.level}`);
        
    }
};

const o1 = new Person('Max')
const o2 = new Student('Tina','First Grade');
const o3 = new Student('Mary','2nd Grade')

//! We declare a new greet function in o3
o3.greet = () => console.log('I am special!');

o1.greet()
o2.greet()
o3.greet()


    //! Output:
    //?     Hello Max
    //*     Hello Tina from First Grade
    //!     I am special!
