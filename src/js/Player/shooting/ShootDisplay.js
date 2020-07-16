/* eslint-disable linebreak-style */
import { useBullet, setBullets, isMagazineFull } from '../playerStates/stats';
import PersonAnimation from '../animation/PlayerAnimation';

const textConfig = {
  fontFamily: 'font1',
  fontSize: 6,
};

class ShootDisplay {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
    this.activeWarnings = [];
    this.animation = new PersonAnimation(scene);
  }

  shoot() {
    const bulletUsed = useBullet();
    if (!bulletUsed) {
      this.reload();
    }
    return bulletUsed;
  }

  reload() {
    const magazineFull = isMagazineFull();
    if (magazineFull) {
      return false;
    }
    const bulletsSetted = setBullets();
    if (!bulletsSetted) {
      this.displayWarning();
    } else {
      this.animation.reloadAnimation();
    }
    return bulletsSetted;
  }

  displayWarning() {
    if (this.activeWarnings.length) {
      const activeWarning = this.activeWarnings.pop();
      activeWarning.warningTimeline.destroy();
      activeWarning.warning.destroy();
    }
    const warning = this.scene.add.text(
      this.player.x,
      this.player.y - 15, 'EMPTY', textConfig,
    ).setOrigin(0.5)
      .setResolution(10);

    const warningTimeline = this.scene.tweens.createTimeline();
    warningTimeline.add({
      targets: warning,
      y: warning.y - 10,
      duration: 500,
    });
    warningTimeline.add({
      targets: warning,
      alpha: 0,
      duration: 300,
      delay: 100,
      onComplete: () => {
        this.activeWarnings.pop();
      },
    });
    this.activeWarnings.push({
      warning,
      warningTimeline,
    });
    warningTimeline.play();
  }
}

export default ShootDisplay;
