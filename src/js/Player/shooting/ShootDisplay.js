import {
  useBullet, setBullets, isMagazineFull, canShoot, canReload,
} from '../playerStates/stats';
import PersonAnimation from '../animation/PlayerAnimation';

const textConfig = {
  fontFamily: 'font1',
  fontSize: 6,
};

class ShootDisplay {
  constructor(scene, player, stairsInfo) {
    this.scene = scene;
    this.player = player;
    this.activeWarnings = [];
    this.stairsInfo = stairsInfo;
    this.animation = new PersonAnimation(scene);
  }

  onRightStairs() {
    return !this.stairsInfo.playerInstance.isTouching.ground && this.stairsInfo.st.label === 'stairs-right';
  }

  shoot() {
    if (this.onRightStairs()) {
      return false;
    }
    if (canShoot()) {
      useBullet();
      return true;
    }
    this.reload();
    return false;
  }

  reload() {
    if (this.onRightStairs()) {
      return;
    }
    if (isMagazineFull()) {
      return;
    }
    if (canReload()) {
      this.animation.reloadAnimation(setBullets);
    } else {
      this.displayWarning();
    }
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
