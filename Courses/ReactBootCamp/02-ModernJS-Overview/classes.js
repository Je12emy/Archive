class Human {
    gender = 'male'

    printGender = () => {
        console.log(this.gender);
    }
}

// Create a class
class Person extends Human{
    name = 'Jeremy'
    
    //* Function in this class
    printMyName = () => {
        //? Log the name property defined in the constructor
        console.log(this.name);
        
    }
}

const person = new Person()
person.printMyName()
person.printGender()