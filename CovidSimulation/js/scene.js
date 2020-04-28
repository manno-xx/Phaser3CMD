import Person from './person.js'
import ValueRange from './ValueRange.js'

/**
 * Extension of scene to contain all persons and UI elements.
 */
export default class CoranaScene extends Phaser.Scene
{
    /**
     * Construct scene.
     */
	constructor()
	{
        super('game-scene');

        //Set some initial values.
        this.initialPopulation = 50;
        this.initialInfectedPopulation = 0;
        this.initialInfectionChance = 10;
        this.initialSpontaniousInfectionChance = 1;
        this.initialInfectionDuration = 10;

        this.population = [];
	}

    /**
     * Prepare for initialization.
     */
	preload(){
        this.width = this.game.config.width;
        this.height= this.game.config.height;
        
        this.load.image('ball', 'assets/ball.png');
	}

    /**
     * Initialize scene. Setup physics, scene values, UI and populate with Persons.
     */
	create() {
        //Setup physics (same size as canvas)
        this.matter.world.setBounds(0, 0, this.width, this.height, 32, true, true, true, true);

        //Populdate with persons
        for(let i=0; i<this.initialPopulation; ++i){
            var person = new Person(this, Phaser.Math.Between(0, this.width), Phaser.Math.Between(0, this.height));

            if(i < this.initialInfectedPopulation){
                person.infect();
            }

            this.population.push(person);
        }

        //Setup start data and UI
        this.data.values.infectionChance = this.initialInfectionChance;
        this.data.values.spontaniousInfectionChance = this.initialSpontaniousInfectionChance;
        this.data.values.infectionDuration = this.initialInfectionDuration;

        this.populationValue = new ValueRange(this, "Population", this.initialPopulation, 10, 10, 300, 1, 100);
        this.populationValue.on("changedata-value", this.populationChanged, this);

        this.infectionChance = new ValueRange(this, "Infection Chance(%)", this.initialInfectionChance, 10, 30, 300, 1, 100);
        this.infectionChance.on("changedata-value", (parent, value, previousValue) =>
        {
            this.data.values.infectionChance = value;
        }, this);

        this.spontaniousInfectionChance = new ValueRange(this, "Spontanious Chance (%/s)", this.initialSpontaniousInfectionChance, 10, 50, 300, 1, 100);
        this.spontaniousInfectionChance.on("changedata-value", (parent, value, previousValue) =>
        {
            this.data.values.spontaniousInfectionChance = value;
        }, this);

        this.infectionDuration = new ValueRange(this, "Infection Duration (s)", this.initialInfectionDuration, 10, 70, 300, 1, 100);
        this.infectionDuration.on("changedata-value", (parent, value, previousValue) =>
        {
            this.data.values.infectionDuration = value;
        }, this);

        this.status = this.add.text(10, 100, "Infected Population: ");

        //Add update event.
        this.events.on("update", this.update, this);
    }

    /**
     * If population in UI change, update population in scene.
     * @param {Object} parent Object from which this event is called. 
     * @param {Number} value New value
     * @param {Number} previousValue Old value
     */
    populationChanged(parent, value, previousValue){
        //Remove persons.
        while(this.population.length > value) {
            var person = this.population.pop();
            person.remove();
        }

        //Add persons.
        while(this.population.length < value) {
            this.population.push(new Person(this, Phaser.Math.Between(0, this.width), Phaser.Math.Between(0, this.height)));
        }
    }

    /**
     * Update event counts and displayed percentage of population infected.
     */
    update(){
        var count = 0;
        for(var i=0; i<this.population.length; ++i)
            if(this.population[i].infected)
                ++count;

        this.status.text = "Infected Population: " + Math.round(100 * count / this.population.length) + "%";
    }
}