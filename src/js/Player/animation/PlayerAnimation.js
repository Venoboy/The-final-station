/* eslint-disable linebreak-style */
import Phaser from 'phaser';
import Player from '../Player';

let angle;
let person;
let body;
let climbDude;
let legs;
let gun;
let gunBack;
let cursors;
let playerOnStairs;
let turn;

function RightAngle(a) {
  let angleRight = a > 0.75 ? 0.75 : a;
  angleRight = angleRight < -0.75 ? -0.75 : angleRight;
  return angleRight;
}

function LeftAngle(a) {
  let angleLeft = a;
  if (a > -2.45 && a < 0) {
    angleLeft = -2.45;
  } else if (a < 2.45 && a > 0) {
    angleLeft = 2.45;
  }
  return angleLeft;
}

export default class PersonAnimation {
  constructor(scene) {
    this.scene = scene;
  }

  create() {
    body = this.scene.add.sprite(0, 0, 'dude');
    legs = this.scene.add.sprite(0, 0, 'dudeLegs');
    gun = this.scene.add.image(-1.5, 0.5, 'gun').setOrigin(0, 0.5);
    climbDude = this.scene.add.sprite(0, 0, 'climbing').setVisible(false);

    person = this.scene.add.container(109.36, 185.5, [
      legs,
      body,
      gun,
      climbDude,
    ]);

    this.playerInstance = new Player(this.scene, 109.36, 185.5, person);

    this.scene.anims.create({
      key: 'left',
      frames: this.scene.anims.generateFrameNumbers('dude', {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'leftl',
      frames: this.scene.anims.generateFrameNumbers('dudeLegs', {
        start: 10,
        end: 15,
      }),
      frameRate: 10,
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
      frameRate: 10,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'rightl',
      frames: this.scene.anims.generateFrameNumbers('dudeLegs', {
        start: 24,
        end: 29,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'backLeftl',
      frames: this.scene.anims.generateFrameNumbers('dudeLegs', {
        start: 2,
        end: 9,
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'backRightl',
      frames: this.scene.anims.generateFrameNumbers('dudeLegs', {
        start: 16,
        end: 23,
      }),
      frameRate: 8,
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
        angle = Phaser.Math.Angle.Between(
          person.list[2].parentContainer.x,
          person.list[2].parentContainer.y,
          pointer.x + this.scene.cameras.main.scrollX,
          pointer.y + this.scene.cameras.main.scrollY,
        );

        if (
          person.list[2].parentContainer.x > pointer.worldX
        ) {
          turn = false;
          gunBack = this.scene.add.image(1.5, 1, 'gunback').setOrigin(1, 0.5);
          person.replace(gun, gunBack);
          person.list[2].setRotation(LeftAngle(angle) - Math.PI);
        } else if (
          person.list[2].parentContainer.x < pointer.worldX
        ) {
          turn = true;
          person.replace(person.list[2], gun);
          person.list[2].setRotation(RightAngle(angle));
        }
      },
      this,
    );

    cursors = this.scene.cursors;

    const { scene } = this;

    /* animation sounds */
    this.sounds = {
      footstep: scene.sound.add('playerFootstep', { volume: 0.5 }),
      ladder: [
        scene.sound.add('ladder', { volume: 0.1 }),
        scene.sound.add('ladder2', { volume: 0.1 }),
        scene.sound.add('ladder3', { volume: 0.1 }),
        scene.sound.add('ladder4', { volume: 0.1 }),
        scene.sound.add('ladder5', { volume: 0.1 }),
        scene.sound.add('ladder6', { volume: 0.1 }),
      ],
    };

    this.currentAnim = [];
    this.changeCurrentAnims = (...anims) => {
      this.currentAnim = [];
      this.currentAnim.push(...anims);
    };

    return this.playerInstance;
  }

  update(stairsInf) {
    playerOnStairs = !stairsInf.playerInstance.isTouching.ground;
    gunBack = this.scene.add.image(1.5, 1, 'gunback').setOrigin(1, 0.5);

    function personClimb() {
      body.setVisible(false);
      legs.setVisible(false);
      person.list[2].setVisible(false);
      climbDude.setVisible(true);
    }

    function personNotClimb() {
      body.setVisible(true);
      legs.setVisible(true);
      person.list[2].setVisible(true);
      climbDude.setVisible(false);
    }

    if (!playerOnStairs) {
      personNotClimb();
    }

    /* sounds update */
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
    } else if (
      cursors.down.isDown()
      && playerOnStairs
      && stairsInf.st.label === 'stairs-right'
    ) {
      personClimb();
      climbDude.anims.play('Climb', true);
      this.changeCurrentAnims('Climb');
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
      body.anims.play('Lturn', true);
      legs.anims.play('backLeftl', true);
      this.changeCurrentAnims('Lturn', 'backLeftl');
    } else if (person.list[2].texture.key === 'gun') {
      body.anims.play('Lturn', true);
      legs.anims.play('Lturnleg', true);
      this.changeCurrentAnims('Lturn', 'Lturnleg');
    } else {
      body.anims.play('Rturn', true);
      legs.anims.play('Rturnleg', true);
      this.changeCurrentAnims('Rturn', 'Rturnleg');
    }
  }
}
