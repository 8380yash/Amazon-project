class Car {
    #brand;
    #model;
    #speed = 0;
    isTrunkOpen = Boolean;
    acceleration;


    constructor (carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
   
    }

    displayInfo () {
        const trunkStatus = this.isTrunkOpen ?'open' :'close';
        console.log(`${this.#brand} ${this.#model}, speed: ${this.#speed} km/h Trunk : ${trunkStatus} Acceleration: ${this.acceleration}`);
    }

    go () {
        if(!this.isTrunkOpen){
            this.#speed += 5;
        }

            if(this.#speed > 200){
                this.#speed = 200;
            } 
    }

    brake () {
       this.#speed -= 5;
       if(this.#speed < 0){
        this.#speed = 0
       }
    }

    openTrunk () {
        if(this.#speed === 0){
            this.isTrunkOpen = true;
        } else{
            console.log('cant open the trunk while is car is moving')
        }
    }

    closeTrunk () {
        this.isTrunkOpen = false;
    }

}

class RaceCar extends Car {
    acceleration;

    constructor(carDetails){
        super(carDetails);
        this.acceleration = carDetails.acceleration;

    }

    go(){
        this.speed += this.acceleration;
        
        if(this.speed > 300){
            this.speed = 300;
        } else {
            console.log('cant go the trunk is open');
        }
    }

    openTrunk(){
        this.isTrunkOpen = '';
    }

    closeTrunk(){
        this.isTrunkOpen = '';
    }
}

const raceCar1 = new RaceCar ({
    brand:'Mclaren',
    model:'F1',
    acceleration:50
});

console.log(raceCar1);

const car1 = new Car ({
    brand:'Toyota',
    model :'Model 1',
    
});

const car2 = new Car ({
    brand:'corolla',
    model:'Model 2',
    
})

const car3 = new Car ({
    brand:'Mercedes',
    model:'Model 3',
    
});

raceCar1.displayInfo();
raceCar1.go();
raceCar1.go();
raceCar1.go();
raceCar1.go();
raceCar1.displayInfo();
raceCar1.openTrunk();
raceCar1.displayInfo();
raceCar1.brake();
raceCar1.displayInfo();
raceCar1.brake();
raceCar1.brake();
raceCar1.brake();
raceCar1.brake();
raceCar1.brake();
raceCar1.displayInfo();

// car2.displayInfo();
// car2.go();
// car2.brake();
// car2.brake();
// car2.displayInfo();
// car2.openTrunk();
// car2.go();
// car2.displayInfo();
// car2.go();
// car2.go();
// car2.go();
// car2.displayInfo();