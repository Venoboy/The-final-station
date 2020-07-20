function updateSounds(legs, climbDude) {
  if (climbDude.anims.currentAnim) {
    if (climbDude.anims.currentAnim.key === 'Climb'
      && this.currentAnim.includes('Climb')
    ) {
      const ladderIndex = climbDude.anims.currentFrame.textureFrame;
      if (ladderIndex >= 0 && !this.sounds.ladder[ladderIndex].isPlaying) {
        this.sounds.ladder[ladderIndex].play();
      }
      return;
    }
    if (climbDude.anims.currentAnim.key === 'climbStay') {
      return;
    }
  }
  if (legs.anims.currentAnim) {
    if (legs.anims.currentAnim.key === 'rightl'
      && (
        legs.anims.currentFrame.textureFrame === 24
        || legs.anims.currentFrame.textureFrame === 27)
      && this.currentAnim.includes('rightl')
    ) {
      if (!this.sounds.footstep.isPlaying) {
        this.sounds.footstep.play();
      }
    }
    if (legs.anims.currentAnim.key === 'leftl'
      && (
        legs.anims.currentFrame.textureFrame === 10
        || legs.anims.currentFrame.textureFrame === 13)
      && this.currentAnim.includes('leftl')
    ) {
      if (!this.sounds.footstep.isPlaying) {
        this.sounds.footstep.play();
      }
    }
    if (legs.anims.currentAnim.key === 'backRightl'
      && (
        legs.anims.currentFrame.textureFrame === 18
        || legs.anims.currentFrame.textureFrame === 22)
      && this.currentAnim.includes('backRightl')
    ) {
      if (!this.sounds.footstep.isPlaying) {
        this.sounds.footstep.play();
      }
    }
    if (legs.anims.currentAnim.key === 'backLeftl'
      && (
        legs.anims.currentFrame.textureFrame === 4
        || legs.anims.currentFrame.textureFrame === 8)
      && this.currentAnim.includes('backLeftl')
    ) {
      if (!this.sounds.footstep.isPlaying) {
        this.sounds.footstep.play();
      }
    }
  }
};

export default updateSounds;

