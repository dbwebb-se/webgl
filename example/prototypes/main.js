(function IIFE() {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }

    Person.prototype.output = function () {
        console.log(`Hi my name is ${this.name} and I'm ${this.age} old.`);
    };

    let person = new Person("Emil", 35);

    console.log(person);
    console.log(person.output());


    let myArray = [1, 2, 3];

    Array.prototype.myPushFunction = function (number) {
        this.push(number * 2);
    };

    console.log(myArray);

    myArray.myPushFunction(2);

    console.log(myArray);



})();
