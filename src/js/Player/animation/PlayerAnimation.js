/* eslint-disable linebreak-style */
import Phaser from 'phaser';
import PersonWithObjectAnimation from './PlayerWithStuffAnimation';
import PersonDeadAnimation from './PlayerDeadAnim';
import { stats, HeroAttacking, playerActions } from '../playerStates/stats';
import PersonStartClimbAnimation from './PlayerRightStairClimbAnim';
import { AnimationActivity } from '../../objects/stairs/curvePlayerSetter';
import Player from '../Player';
import { leftAngle, rightAngle } from '../../helpers/setMaxAngle';
import addSounds from './animationSounds/addSounds';
import updateSounds from './animationSounds/updateSounds';

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
let isAlive = true;
let startClimb;
let damaged;

const { PI } = Math;

export default class PersonAnimation {
  constructor(scene) {
    this.scene = scene;
    this.sounds = addSounds(scene);
    this.currentAnim = [];
    this.updateSounds = updateSounds.bind(this);
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
    damaged = this.scene.add.sprite(0, 0, 'damage').setVisible(false);

    person = this.scene.add.container(109.36, 180.5, [
      legs,
      body,
      gun,
      climbDude,
      heal,
      reload,
      dead,
      startClimb,
      damaged,
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
      frameRate: 9,
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
      frameRate: 9,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'backLeftl',
      frames: this.scene.anims.generateFrameNumbers('dudeLegs', {
        start: 2,
        end: 9,
      }),
      frameRate: 12,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'backRightl',
      frames: this.scene.anims.generateFrameNumbers('dudeLegs', {
        start: 16,
        end: 23,
      }),
      frameRate: 12,
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
    this.scene.anims.create({
      key: 'DamageR',
      frames: this.scene.anims.generateFrameNumbers('damage', {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: 0,
    });
    this.scene.anims.create({
      key: 'DamageL',
      frames: this.scene.anims.generateFrameNumbers('damage', {
        start: 3,
        end: 5,
      }),
      frameRate: 10,
      repeat: 0,
    });
    this.scene.input.on('pointermove',
      (pointer) => {
        const angle = Phaser.Math.Angle.Between(
          pointer.worldX,
          pointer.worldY,
          person.body.position.x,
          person.body.position.y,
        );

        if (
          person.list[2].parentContainer.x > pointer.worldX
          && isAlive && !playerActions.healing && !playerActions.reloading
        ) {
          turn = false;
          gunBack = this.scene.add.image(1.5, 1, 'gunback').setOrigin(1, 0.5);
          person.replace(gun, gunBack);
          person.list[2].setRotation(leftAngle(angle, stats.MAX_ANGLE));
        } else if (
          person.list[2].parentContainer.x < pointer.worldX
          && isAlive && !playerActions.healing && !playerActions.reloading
        ) {
          turn = true;
          person.replace(person.list[2], gun);
          person.list[2].setRotation(rightAngle(angle, stats.MAX_ANGLE) - PI);
        }
      },
      this);

    cursors = this.scene.cursors;

    isAlive = true;
    return this.playerInstance;
  }

  changeCurrentAnims = (...anims) => {
    this.currentAnim = [];
    this.currentAnim.push(...anims);
  };

  healAnimation(callback) {
    if (isAlive && !playerActions.reloading && person.body.velocity.x === 0) {
      let anim;
      playerActions.healing = true;
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
        playerActions.healing = false;
        body.setVisible(true);
        person.list[2].setVisible(true);
      });
    }
  }

  reloadAnimation(callback) {
    if (isAlive && !playerActions.healing && person.body.velocity.x === 0) {
      let anim;
      playerActions.reloading = true;
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
        playerActions.reloading = false;
        body.setVisible(true);
        person.list[2].setVisible(true);
      });
    }
  }

  deadAnimation() {
    let anim;
    body.setVisible(false);
    legs.setVisible(false);
    person.list[2].setVisible(false);
    damaged.setVisible(false);
    dead.setVisible(true);

    if (legs.anims.currentAnim.key === 'Lturnleg') {
      anim = this.scene.anims.get('Dead');
      dead.anims.play('Dead', true);
    } else if (legs.anims.currentAnim.key === 'Rturnleg') {
      anim = this.scene.anims.get('DeadR');
      dead.anims.play('DeadR', true);
    }

    this.scene.input.off('pointermove');

    isAlive = false;
    anim.on('complete', () => {

    });
  }

  update(stairsInf) {
    const isHeroAlive = stats.health > 0;
    if (!isAlive) {
      return;
    }

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

    this.updateSounds(legs, climbDude);

    playerOnStairs = !stairsInf.playerInstance.isTouching.ground;
    gunBack = this.scene.add.image(1.5, 1, 'gunback').setOrigin(1, 0.5);
    if (!playerOnStairs && !playerActions.healing && !playerActions.reloading) {
      personNotClimb();
    }
    if (playerActions.healing) {
      body.setVisible(false);
    }
    if (playerActions.reloading) {
      body.setVisible(false);
    }
    if (stats.health <= 0) {
      this.deadAnimation(this.scene);
    }
    if (HeroAttacking.attacking && isHeroAlive) {
      let anim;
      personNotClimb();
      damaged.setVisible(true);
      body.setVisible(false);
      if (legs.anims.currentAnim.key === 'Rturnleg') {
        anim = this.scene.anims.get('DamageR');
        damaged.anims.play('DamageR', true);
      } else {
        anim = this.scene.anims.get('DamageL');
        damaged.anims.play('DamageL', true);
      }

      anim.on('complete', () => {
        HeroAttacking.attacking = false;
        body.setVisible(true);
        damaged.setVisible(false);
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
      if (playerActions.healing) {
        heal.setVisible(true);
      }
      if (playerActions.reloading) {
        reload.setVisible(true);
      }
      body.anims.play('Lturn', true);
      legs.anims.play('Lturnleg', true);
      this.changeCurrentAnims('Lturn', 'Lturnleg');
    } else {
      if (playerActions.healing) {
        heal.setVisible(true);
      }
      if (playerActions.reloading) {
        reload.setVisible(true);
      }
      body.anims.play('Rturn', true);
      legs.anims.play('Rturnleg', true);
      this.changeCurrentAnims('Rturn', 'Rturnleg');
    }
  }
}
