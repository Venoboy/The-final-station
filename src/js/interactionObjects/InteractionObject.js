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
    this.scene.game.renderer.addPipeline('outline', new OutlinePipeline(this.scene.game));
    this.object.interactionObject = true;
    this.object.activate = this.activate;
    this.object.deactivate = this.deactivate;
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
}
