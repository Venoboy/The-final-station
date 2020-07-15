import Phaser from 'phaser';
import Player from '../Player';
import { stats } from '../playerStates/stats';
import { rightAngle, leftAngle } from '../../helpers/setMaxAngle';

let person;
let body;
let climbDude;
let legs;
let gun;
let gunBack;
let cursors;
let playerOnStairs;
let turn;
const { PI } = Math;

export default class PersonAnimation {
  constructor(scene) {
    this.scene = scene;
  }

  create() {
    body = this.scene.add.sprite(0, 0, 'dude');
    body.name = 'dudeBody';
    legs = this.scene.add.sprite(0, 0, 'dudeLegs');
    legs.name = 'dudeLegs';
    gun = this.scene.add.image(-1.5, 0.5, 'gun').setOrigin(0, 0.5);
    gun.name = 'dudeGun';
    climbDude = this.scene.add.sprite(0, 0, 'climbing').setVisible(false);
    climbDude.name = 'climbDude';

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
        const angle = Phaser.Math.Angle.Between(
          pointer.worldX,
          pointer.worldY,
          person.body.position.x,
          person.body.position.y,
        );

        if (
          person.list[2].parentContainer.x > pointer.worldX
        ) {
          turn = false;
          gunBack = this.scene.add.image(1.5, 1, 'gunback').setOrigin(1, 0.5);
          person.replace(gun, gunBack);
          person.list[2].setRotation(leftAngle(angle, stats.MAX_ANGLE));
        } else if (
          person.list[2].parentContainer.x < pointer.worldX
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

    if (cursors.left.isDown()) {
      if (!turn) {
        legs.anims.play('backLeftl', true);
        body.anims.play('left', true);
      } else if (turn) {
        body.anims.play('right', true);
        legs.anims.play('backRightl', true);
      }
    } else if (cursors.right.isDown()) {
      if (turn) {
        legs.anims.play('rightl', true);
        body.anims.play('right', true);
      } else if (!turn) {
        legs.anims.play('leftl', true);
        body.anims.play('left', true);
      }
    } else if (
      cursors.down.isDown()
      && playerOnStairs
      && stairsInf.st.label === 'stairs-right'
    ) {
      personClimb();
      climbDude.anims.play('Climb', true);
    } else if (
      cursors.up.isDown()
      && playerOnStairs
      && stairsInf.st.label === 'stairs-right'
    ) {
      personClimb();
      climbDude.anims.play('Climb', true);
    } else if (playerOnStairs && stairsInf.st.label === 'stairs-right') {
      personClimb();
      climbDude.anims.play('climbStay', true);
    } else if (playerOnStairs && (cursors.down.isDown() || cursors.up.isDown())) {
      body.anims.play('Lturn', true);
      legs.anims.play('backLeftl', true);
    } else if (person.list[2].texture.key === 'gun') {
      body.anims.play('Lturn', true);
      legs.anims.play('Lturnleg', true);
    } else {
      body.anims.play('Rturn', true);
      legs.anims.play('Rturnleg', true);
    }
  }
}
