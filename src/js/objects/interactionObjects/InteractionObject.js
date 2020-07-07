/* eslint-disable linebreak-style */
import Phaser from 'phaser';
import collisionCategories from '../../world/collisionCategories';

export default class InteractionObject extends Phaser.Physics.Matter.Image {
  constructor(config) {
    super(config.scene.matter.world, config.x, config.y, config.beforeTexture);
    this.scene = config.scene;
    this.id = config.id;
    if (config.afterTexture) {
      this.afterActionImage = config.scene.add.image(config.x, config.y, config.afterTexture || '')
        .setVisible(false);
    } else {
      this.afterActionImage = null;
    }
    if (config.soundKey) {
      this.sound = this.scene.sound.add(config.soundKey);
    } else {
      this.sound = null;
    }
    this.activated = false;
    this.interactCallbacks = config.interactCallbacks || [];

    const body = this.createCompoundBody();
    this.setCompoundBody(body, config.x, config.y);

    this.interactionInfo = {
      type: '',
    };
  }

  createCompoundBody() {
    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    const { width: w, height: h } = this;
    const sensors = {
      around: Bodies.rectangle(w * 0.5, h * 0.5, w, h, { isSensor: true }),
    };
    const compoundBody = Body.create({
      parts: [sensors.around],
    });
    compoundBody.collisionFilter.category = collisionCategories.ground;
    return compoundBody;
  }

  setCompoundBody(compoundBody, x, y) {
    this
      .setExistingBody(compoundBody)
      .setPosition(x, y);
    this.body.isStatic = true;
    this.scene.add.existing(this);
  }

  setActivated(value) {
    this.activated = value;
  }

  activate() {
    this.setPipeline('outline');
    this.pipeline.setFloat2(
      'uTextureSize',
      this.width,
      this.height,
    );
  }

  deactivate() {
    this.resetPipeline();
  }

  interact() {
    const info = this.interactionInfo;
    if (this.sound) {
      console.log('sound');
      this.sound.play();
    }
    if (this.afterActionImage) {
      this.afterActionImage.setVisible(true);
    }
    this.destroy(this.scene);
    return info;
  }

  addInteractCallbacks(...callbacks) {
    this.interactCallbacks.push(...callbacks);
  }
}
