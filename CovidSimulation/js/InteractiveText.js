/**
 * Extension of the Text object that setups an interactive text.
 * The style changes on hover, object is made interactive and
 * their is a short hand for when it is clicked.
 */
export default class InteractiveText extends Phaser.GameObjects.Text{
    /**
     * Costructs a interactive text object.
     * @param {Object} scene Scene to create text in 
     * @param {Number} x Horizontal location 
     * @param {Number} y Vertical location
     * @param {Text} text Starting text 
     * @param {Object} defaultStyle Style when not hovering
     * @param {Object} hoverStyle Style when hovering
     */
    constructor(scene, x, y, text, defaultStyle, hoverStyle){
        super(scene,x,y,text,defaultStyle);
        //Add object to scene
        scene.add.existing(this);

        this.defaultStyle = defaultStyle;
        this.hoverStyle = hoverStyle;

        //Makes text object interavtive
        this.setInteractive();

        //Create a hover style for the button
        this.on("pointerover", () => {
            this.setStyle(this.hoverStyle);
        }, this)

        this.on("pointerout", () => {
            this.setStyle(this.defaultStyle);
        }, this)
    }

    /**
     * Shorthand for pointerdown event.
     * @param {Function} callback Callback function for when text is clicked.
     */
    onClick(callback, context){
        this.on("pointerdown", callback, context);
    }
}