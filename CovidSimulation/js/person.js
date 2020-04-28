/**
 * Override Image from matter to make a simple person that moves by physics.
 */
export default class Person extends Phaser.Physics.Matter.Image{
    /**
     * Constructor, creates a new Person and adds it to the scene and physics
     * @param {Object} scene Scene in which to add this person
     * @param {Number} x Horizontal start location 
     * @param {Number} y Vertical start location
     */
    constructor(scene, x, y){
        //Call constructor of parent
        super(scene.matter.world, x, y, 'ball');

        //Add object to the scene and physics
        scene.add.existing(this);
        scene.matter.world.add(this);

        //Store size of the 'world' for later reference
        this.width = scene.game.config.width;
        this.height = scene.game.config.height;

        //Set intial state
        this.infected = false;
        this.timeInfected = 0;
        this.updateTarget();
        this.tint = 0xffffff;
        this.scene = scene;

        //Add update methode to the scene update event
        scene.events.on("update", this.update, this);

        //Set listener for collide
        this.setOnCollide(this.collide);
    }

    /**
     * Update function, in the constructor this is added to the update event of the scene
     */
    update(timestamp, elapsed){
        //Get position as a vector2
        var position = new Phaser.Math.Vector2(this.x, this.y);
        //Get target
        var delta = this.target.clone();
        //Delta towards target
        delta.subtract(position);

        //If close, find new target
        if(delta.length() < 50){
            this.updateTarget();
        }else{
            //Otherwise create a force towards target
            delta.normalize();
            this.applyForce(delta.scale(0.00001));
        }

        //If infect, increase timer.
        if(this.infected){
            this.timeInfected += elapsed / 1000;
        }else{
            //Otherwise, Check if this person should spontanious infect itself
            var spontaniousInfection = this.scene.data.values.spontaniousInfectionChance * (elapsed / 1000) * 0.01;

            if(Math.random() < spontaniousInfection)
                this.infect();
        }

        //If infection is passed. Cure
        if(this.timeInfected > this.scene.data.values.infectionDuration){
            this.cure();
        }

    }

    /**
     * Sets a new target for the person to walk to
     */
    updateTarget(){
        this.target = new Phaser.Math.Vector2(Phaser.Math.Between(0, this.width), Phaser.Math.Between(0, this.height));
    }

    /**
     * Called on collision (is set in constructor)
     * @param {Object} collisionData Data of the current collision.
     */
    collide(collisionData){
        //Check if it is a collision between two bodies
        if(collisionData.bodyA.gameObject != null && collisionData.bodyB.gameObject != null){
            
            //Get both game object
            var personA = collisionData.bodyA.gameObject;
            var personB = collisionData.bodyB.gameObject;

            if(personA instanceof Person && personB instanceof Person) {
                //Check if on is effect, in that case, infect the other!
                if(personA.infected)
                    personB.contact();
                if(personB.infected)
                    personA.contact();
            }
        }
    }

    /**
     * Called to determine if we should infect when hitting an infected person.
     */
    contact(){
        if(Phaser.Math.Between(0, 99) < this.scene.data.values.infectionChance) {
            this.infect();
        }
    }

    /**
     * Infect this person.
     */
    infect(){
            this.infected = true;
            this.tint = 0x00ff00;
            this.timeInfected = 0;
    }

    /**
     * Cure this person.
     */
    cure(){
        this.infected = false;
        this.tint = 0xffffff;
        this.timeInfected = 0;
    }

    /**
     * Remove this person from the scene.
     */
    remove(){
        this.scene.events.removeListener('update', this.update, this);
        this.destroy(this);
    }
}