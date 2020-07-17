/* eslint-disable linebreak-style */
import Phaser from 'phaser';
import PersonWithObjectAnimation from './PlayerWithStuffAnimation';
import PersonDeadAnimation from './PlayerDeadAnim';
import { stats } from '../playerStates/stats';
import PersonStartClimbAnimation from './PlayerRightStairClimbAnim';
import { AnimationActivity } from '../../objects/stairs/curvePlayerSetter';
import Player from '../Player';
import { leftAngle, rightAngle } from '../../helpers/setMaxAngle';


let person;
let body;
let climbDude;
let legs;
let gun;
let gunBack;
let cursors;
let playerOnStairs;
let turn;
let heal;
let dead;
let reload;
let healing = false;
let reloading = false;
let isAlive = true;
let corpse;
let startClimb;

const { PI } = Math;

export default class PersonAnimation {
  constructor(scene) {
    this.scene = scene;
    /* animation sounds */
    this.sounds = {
      footstep: this.scene.sound.add('playerFootstep', { volume: 1 }),
      ladder: [
        this.scene.sound.add('ladder', { volume: 0.1 }),
        this.scene.sound.add('ladder2', { volume: 0.1 }),
        this.scene.sound.add('ladder3', { volume: 0.1 }),
        this.scene.sound.add('ladder4', { volume: 0.1 }),
        this.scene.sound.add('ladder5', { volume: 0.1 }),
        this.scene.sound.add('ladder6', { volume: 0.1 }),
      ],
      heal: this.scene.sound.add('heroHeal', { volume: 1 }),
      reload: this.scene.sound.add('pistolReload', { volume: 1 }),
    };

    this.currentAnim = [];
  }


  create() {
    this.PersonWithObjectAnimation = new PersonWithObjectAnimation(this.scene);
    this.PersonDeadAnimation = new PersonDeadAnimation(this.scene);
    this.PersonStartClimbAnimation = new PersonStartClimbAnimation(this.scene);
    const arrayWithAnimations = this.PersonWithObjectAnimation.create();
    [heal, reload] = arrayWithAnimations;
    dead = this.PersonDeadAnimation.create();
    startClimb = this.PersonStartClimbAnimation.create();
    body = this.scene.add.sprite(0, 0, 'dude');
    body.name = 'dudeBody';
    legs = this.scene.add.sprite(0, 0, 'dudeLegs');
    legs.name = 'dudeLegs';
    gun = this.scene.add.image(-1.5, 0.5, 'gun').setOrigin(0, 0.5);
    gun.name = 'dudeGun';
    climbDude = this.scene.add.sprite(0, 0, 'climbing').setVisible(false);
    climbDude.name = 'climbDude';

    person = this.scene.add.container(109.36, 180.5, [
      legs,
      body,
      gun,
      climbDude,
      heal,
      reload,
      dead,
      startClimb,
    ]);


    this.playerInstance = new Player(this.scene, 109.36, 180.5, person);

    this.scene.anims.create({
      key: 'left',
      frames: this.scene.anims.generateFrameNumbers('dude', {
        start: 0,
        end: 5,
      }),
      frameRate: 7,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'leftl',
      frames: this.scene.anims.generateFrameNumbers('dudeLegs', {
        start: 10,
        end: 15,
      }),
      frameRate: 7,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'Lturn',
      frames: this.scene.anims.generateFrameNumbers('dude', {
        start: 6,
        end: 8,
      }),
      frameRate: 4,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'Lturnleg',
      frames: [{ key: 'dudeLegs', frame: 1 }],
      frameRate: 20,
    });
    this.scene.anims.create({
      key: 'Rturn',
      frames: this.scene.anims.generateFrameNumbers('dude', {
        start: 3,
        end: 5,
      }),
      frameRate: 4,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'Rturnleg',
      frames: [{ key: 'dudeLegs', frame: 0 }],
      frameRate: 20,
    });

    this.scene.anims.create({
      key: 'right',
      frames: this.scene.anims.generateFrameNumbers('dude', {
        start: 6,
        end: 13,
      }),
      frameRate: 7,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'rightl',
      frames: this.scene.anims.generateFrameNumbers('dudeLegs', {
        start: 24,
        end: 29,
      }),
      frameRate: 7,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'backLeftl',
      frames: this.scene.anims.generateFrameNumbers('dudeLegs', {
        start: 2,
        end: 9,
      }),
      frameRate: 7,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'backRightl',
      frames: this.scene.anims.generateFrameNumbers('dudeLegs', {
        start: 16,
        end: 23,
      }),
      frameRate: 7,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'Climb',
      frames: this.scene.anims.generateFrameNumbers('climbing', {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'climbStay',
      frames: [{ key: 'climbing', frame: 3 }],
      frameRate: 20,
    });

    this.scene.input.on(
      'pointermove',
      function (pointer) {
        const angle = Phaser.Math.Angle.Between(
          pointer.worldX,
          pointer.worldY,
          person.body.position.x,
          person.body.position.y,
        );

        const isHeroAlive = stats.health > 0;

        if (
          person.list[2].parentContainer.x > pointer.worldX && isHeroAlive && !healing && !reloading
        ) {
          turn = false;
          gunBack = this.scene.add.image(1.5, 1, 'gunback').setOrigin(1, 0.5);
          person.replace(gun, gunBack);
          person.list[2].setRotation(leftAngle(angle, stats.MAX_ANGLE));
        } else if (
          person.list[2].parentContainer.x < pointer.worldX && isHeroAlive && !healing && !reloading
        ) {
          turn = true;
          person.replace(person.list[2], gun);
          person.list[2].setRotation(rightAngle(angle, stats.MAX_ANGLE) - PI);
        }
      },
      this,
    );

    cursors = this.scene.cursors;

    return this.playerInstance;
  }

  changeCurrentAnims = (...anims) => {
    this.currentAnim = [];
    this.currentAnim.push(...anims);
  };

  healAnimation(callback) {
    if (isAlive && !reloading && person.body.velocity.x === 0) {
      let anim;
      healing = true;
      person.list[2].setVisible(false);
      if (!this.sounds.heal.isPlaying) {
        this.sounds.heal.play();
      }
      if (legs.anims.currentAnim.key === 'Lturnleg') {
        heal.anims.play('Heal', true);
        anim = this.scene.anims.get('Heal');
      } else if (legs.anims.currentAnim.key === 'Rturnleg') {
        heal.anims.play('HealR', true);
        anim = this.scene.anims.get('HealR');
      }
      anim.on('complete', () => {
        callback();
        healing = false;
        body.setVisible(true);
        person.list[2].setVisible(true);
      });
    }
  }

  reloadAnimation(callback) {
    if (isAlive && !healing && person.body.velocity.x === 0) {
      let anim;
      reloading = true;
      person.list[2].setVisible(false);
      if (!this.sounds.reload.isPlaying) {
        this.sounds.reload.play();
      }
      if (legs.anims.currentAnim.key === 'Lturnleg') {
        reload.anims.play('Reload', true);
        anim = this.scene.anims.get('Reload');
      } else if (legs.anims.currentAnim.key === 'Rturnleg') {
        reload.anims.play('ReloadR', true);
        anim = this.scene.anims.get('ReloadR');
      }
      anim.on('complete', () => {
        callback();
        reloading = false;
        body.setVisible(true);
        person.list[2].setVisible(true);
      });
    }
  }

  update(stairsInf) {
    function personClimb() {
      body.setVisible(false);
      legs.setVisible(false);
      person.list[2].setVisible(false);
      startClimb.setVisible(false);
      climbDude.setVisible(true);
    }

    function personNotClimb() {
      body.setVisible(true);
      legs.setVisible(true);
      person.list[2].setVisible(true);
      climbDude.setVisible(false);
      startClimb.setVisible(false);
    }

    function personStartClimb() {
      body.setVisible(false);
      legs.setVisible(false);
      person.list[2].setVisible(false);
      climbDude.setVisible(false);
      startClimb.setVisible(true);
    }

    /* sounds update start */
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

    if (climbDude.anims.currentAnim) {
      if (climbDude.anims.currentAnim.key === 'Climb'
        && this.currentAnim.includes('Climb')
      ) {
        const ladderIndex = climbDude.anims.currentFrame.textureFrame;
        if (ladderIndex >= 0 && !this.sounds.ladder[ladderIndex].isPlaying) {
          this.sounds.ladder[ladderIndex].play();
        }
      }
    }
    /* sounds update end */

    if (isAlive) {
      playerOnStairs = !stairsInf.playerInstance.isTouching.ground;
      gunBack = this.scene.add.image(1.5, 1, 'gunback').setOrigin(1, 0.5);
      if (!playerOnStairs && !healing && !reloading) {
        personNotClimb();
      }
      if (healing) {
        body.setVisible(false);
      }
      if (reloading) {
        body.setVisible(false);
      }
      if (stats.health === 0) {
        let anim;
        body.setVisible(false);
        legs.setVisible(false);
        person.list[2].setVisible(false);
        dead.setVisible(true);
        if (legs.anims.currentAnim.key === 'Lturnleg') {
          anim = this.scene.anims.get('Dead');
          dead.anims.play('Dead', true);
          corpse = true;
        } else if (legs.anims.currentAnim.key === 'Rturnleg') {
          anim = this.scene.anims.get('DeadR');
          dead.anims.play('DeadR', true);
          corpse = false;
        }
        anim.on('complete', () => {
          isAlive = false;
        });
      }

      if (cursors.left.isDown()) {
        if (!turn) {
          legs.anims.play('backLeftl', true);
          body.anims.play('left', true);
          this.changeCurrentAnims('backLeftl', 'left');
        } else if (turn) {
          body.anims.play('right', true);
          legs.anims.play('backRightl', true);
          this.changeCurrentAnims('right', 'backRightl');
        }
      } else if (cursors.right.isDown()) {
        if (turn) {
          legs.anims.play('rightl', true);
          body.anims.play('right', true);
          this.changeCurrentAnims('rightl', 'right');
        } else if (!turn) {
          legs.anims.play('leftl', true);
          body.anims.play('left', true);
          this.changeCurrentAnims('leftl', 'left');
        }
      } else if (AnimationActivity.isAnimationActive && !AnimationActivity.directionUp) {
        personStartClimb();
        startClimb.anims.play('Down', true);
        this.changeCurrentAnims('Down');
      } else if (
        cursors.down.isDown()
        && playerOnStairs
        && stairsInf.st.label === 'stairs-right'
      ) {
        personClimb();
        climbDude.anims.play('Climb', true);
        this.changeCurrentAnims('Climb');
      } else if (AnimationActivity.isAnimationActive && AnimationActivity.directionUp) {
        personStartClimb();
        startClimb.anims.play('Up', true);
        this.changeCurrentAnims('Up');
      } else if (
        cursors.up.isDown()
        && playerOnStairs
        && stairsInf.st.label === 'stairs-right'
      ) {
        personClimb();
        climbDude.anims.play('Climb', true);
        this.changeCurrentAnims('Climb');
      } else if (playerOnStairs && stairsInf.st.label === 'stairs-right') {
        personClimb();
        climbDude.anims.play('climbStay', true);
        this.changeCurrentAnims('climbStay');
      } else if (playerOnStairs && (cursors.down.isDown() || cursors.up.isDown())) {
        if (this.scene.input.mousePointer.x + this.scene.cameras.main.scrollX < person.x) {
          body.anims.play('Rturn', true);
        } else {
          body.anims.play('Lturn', true);
        }
        legs.anims.play('leftl', true);
        this.changeCurrentAnims('Lturn', 'leftl');
      } else if (person.list[2].texture.key === 'gun') {
        if (healing) {
          heal.setVisible(true);
        }
        if (reloading) {
          reload.setVisible(true);
        }
        body.anims.play('Lturn', true);
        legs.anims.play('Lturnleg', true);
        this.changeCurrentAnims('Lturn', 'Lturnleg');
      } else {
        if (healing) {
          heal.setVisible(true);
        }
        if (reloading) {
          reload.setVisible(true);
        }
        body.anims.play('Rturn', true);
        legs.anims.play('Rturnleg', true);
        this.changeCurrentAnims('Rturn', 'Rturnleg');
      }
    } else {
      dead.setVisible(true);
      if (corpse) {
        dead.anims.play('end', true);
      } else {
        dead.anims.play('endR', true);
      }
    }
  }
}
