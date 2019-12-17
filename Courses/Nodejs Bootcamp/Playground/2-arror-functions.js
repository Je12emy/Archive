const event = {
    name:'Birthday Party',
    guestList:['Jeremy','Elon','Bill'],
    //? With this short hand notation we have access to 'this'
    printGuestList(){
        console.log(`Guest list for ${this.name}`);

        //* This arrow function has access to the this.name property
        this.guestList.forEach(guest => {
            console.log(`${guest} is attending the ${this.name}`);
        })
    }
}
event.printGuestList()
//? Ouput:  Jeremy is attending the Birthday Party
//?         Elon is attending the Birthday Party
//?         Bill is attending the Birthday Party

