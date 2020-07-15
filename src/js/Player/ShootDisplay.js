/* eslint-disable linebreak-style */
import { stats } from './playerStates/stats';
import { updateBulletsUI, updateMagazineUI } from '../interface/UIHelpers';

const textConfig = {
  fontFamily: 'font1',
  fontSize: 6,
};

class ShootDisplay {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
    this.activeWarnings = [];
  }

  shoot() {
    let shootIsSuccessed = false;
    if (stats.bullets > 0) {
      stats.bullets -= 1;
      updateMagazineUI(stats.bullets);
      shootIsSuccessed = true;
    } else {
      this.reload();
    }
    return shootIsSuccessed;
  }

  reload() {
    if (stats.bulletsInReserve > 0) {
      const bulletsNeeded = stats.magazineSize - stats.bullets;
      if (stats.bulletsInReserve >= bulletsNeeded) {
        stats.bulletsInReserve -= bulletsNeeded;
        stats.bullets += bulletsNeeded;
      } else {
        stats.bullets += stats.bulletsInReserve;
        stats.bulletsInReserve = 0;
      }
      updateMagazineUI(stats.bullets);
      updateBulletsUI(stats.bulletsInReserve);
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
      this.player.matterEnabledContainer.x,
      this.player.matterEnabledContainer.y - 15, 'EMPTY', textConfig,
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
