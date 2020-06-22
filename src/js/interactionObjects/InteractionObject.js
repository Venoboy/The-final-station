/* eslint-disable linebreak-style */
import OutlinePipeline from './OutlinePipeline';

export default class InteractionObject {
  constructor(scene, x, y, beforeActionTexture) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.object = this.scene.matter.add.image(
      this.x, this.y, beforeActionTexture, null, { isStatic: true },
    );
    this.isActive = false;
    this.scene.game.renderer.addPipeline('outline', new OutlinePipeline(this.scene.game));
  }

  activate() {
    this.object.setPipeline('outline');
    this.object.pipeline.setFloat2(
      'uTextureSize',
      this.object.width,
      this.object.height,
    );
  }

  deactivate() {
    this.object.resetPipeline();
  }
}
