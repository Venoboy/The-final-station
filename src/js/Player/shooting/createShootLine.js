import Phaser from 'phaser';

const createShootLine = (scene, player) => {
  const LINE_DISTANCE = 100;
  const construct = (pointer) => {
    const person = player;
    const distance = Phaser.Math.Distance.Between(person.list[2].parentContainer.x,
      person.list[2].parentContainer.y, pointer.worldX, pointer.worldY);

    const shoot = scene.matter.add.rectangle((this.playerInstance.mainBody.position.x + pointer.worldX) / 2,
      (this.playerInstance.mainBody.position.y + pointer.worldY) / 2, distance, 0.01, { angle: angle });
//ситуативно —- можно по другому)
    setTimeout(() => {
      scene.matter.world.remove(shoot);
      shoot.visible = false;
    }, 100);

  }
  scene.input.on('pointerdown', (pointer) => construct(pointer));
};

export default createShootLine;
