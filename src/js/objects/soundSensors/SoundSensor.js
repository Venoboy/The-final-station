/* eslint-disable linebreak-style */
export default class SoundSensor {
  constructor(config) {
    this.x = config.x;
    this.y = config.y;
    this.trigger = config.trigger;
    this.distanceThreshold = config.distanceThreshold || 100;
    this.sound = config.scene.sound.add(config.soundKey);
    this.sound.loop = true;
    this.sound.volume = 0;
    this.sound.play();
  }

  checkDistance() {
    let normalizedSound;
    const distanceYToObject = Math.abs(this.trigger.y - this.y);
    if (distanceYToObject > this.distanceThreshold.y) {
      normalizedSound = 0;
    } else {
      const distanceToObject = Math.abs(this.trigger.x - this.x);
      let distanceProportion = distanceToObject / this.distanceThreshold.x;
      if (distanceProportion > 1) {
        distanceProportion = 1;
      }
      normalizedSound = 1 - distanceProportion;
    }
    this.sound.volume = normalizedSound;
  }
}
