import Phaser from 'phaser';

import TemplateScene from './Scenes/TemplateScene';

new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 1600, // Change to 800 and
    height: 800, // 600 for smaller 4:3
    backgroundColor: "#897acf",
    scene: [
        TemplateScene
    ]
});