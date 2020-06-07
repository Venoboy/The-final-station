import Phaser from 'phaser'
import Level0 from './js/scenes/Level'

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
  },
  scene: [Level]
}

export default new Phaser.Game(config);

