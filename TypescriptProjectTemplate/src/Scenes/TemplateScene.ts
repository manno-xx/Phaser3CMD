import Phaser from 'phaser';

export default class TemplateScene extends Phaser.Scene {
	constructor() {
        super({
            key: 'TemplateScene'
		});
	}
    
	preload() {

	}

    create() {
        
    }
    
    update(time: number, delta: number) {
        super.update(time, delta);
    }
}