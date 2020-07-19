export default function updateSounds() {
  if (this.enemy.anims.currentAnim) {
    const animKey = this.enemy.anims.currentAnim.key;
    const frameNumber = this.enemy.anims.currentFrame.textureFrame;
    if (animKey === 'walkLeft' || animKey === 'walkRight') {
      if (frameNumber === 15 || frameNumber === 20) {
        this.footstepSounds[0].play();
      }
      if (frameNumber === 17 || frameNumber === 22) {
        this.footstepSounds[1].play();
      }
    }
    if (animKey === 'walkLefts' || animKey === 'walkRights') {
      if ([38, 42, 30, 34].includes(frameNumber)) {
        this.footstepSounds[2].play();
      }
    }
  }
}
