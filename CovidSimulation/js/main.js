//To make 'import' this work, in html set type do module: <script src="js/main.js" type="module"></script>
import CoranaScene from './scene.js'

/**
 * The configuration for Phaser.
 * Just load a single scene, with 'matter' physics.
 */
const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'matter',
		matter: {
			gravity: { y: 0 }
		}
	},
	scene: [CoranaScene]
}

/** Making the actual game object */
const game = new Phaser.Game(config);