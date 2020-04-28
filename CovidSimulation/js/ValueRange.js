import IText from "./InteractiveText.js"

/**
 * A container object for a value scroller (label, increase/decrease buttons and value)
 */
export default class ValueRange extends Phaser.GameObjects.GameObject{
    /**
     * Creates ValueRange
     * @param {Object} scene Scene to place it in
     * @param {Text} label Text of label 
     * @param {Number} value Start value 
     * @param {Number} x Horizontal position 
     * @param {Number} y Vertical position
     * @param {Number} width Width of container
     * @param {Number} min Minimum value of range
     * @param {Number} max Maximum value of range
     */
    constructor(scene, label, value, x, y, width, min, max){
        super(scene);
        this.min = min;
        this.max = max;

        //Add label
        scene.add.text(x, y, label);
        
        //Set start data
        this.setData('value', value);

        //Calculate position of interactive elements.
        var rightWidth = width * 0.2;
        var left = x + width - rightWidth;

        //Add decrease interactive elements
        this.decrease = new IText(scene, left, y, '<', {fill : '#aaa'}, {fill : '#fff'});
        left += 10;
        
        //Add value text element
        this.valueText = scene.add.text(x + width - 0.5 * rightWidth, y, value, {align : "center"});
        this.valueText.setOrigin(0.5, 0);

        //Add increase interactive element
        this.increase = new IText(scene, x + width - 10, y, '>', {fill : '#aaa'}, {fill : '#fff'});

        //Setup events
        this.increase.onClick(() => {
            this.data.values.value = Math.min(this.max, this.data.values.value + 1);
            this.valueText.text = this.data.values.value;
        }, this);

        this.decrease.onClick(() => {
            this.data.values.value = Math.max(this.min, this.data.values.value - 1);
            this.valueText.text = this.data.values.value;
        }, this);
    }
}