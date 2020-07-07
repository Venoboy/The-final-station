import Phaser from 'phaser';
import Player from './Player';
import gunImage from '../../assets/Player/handwithgun.png';
import bulletImage from '../../assets/Player/bullet.png';
import gunbackImage from '../../assets/Player/handswithgunback.png';
import dudeImage from '../../assets/Player/spr.png';
import dudeLegsImage from '../../assets/Player/sprl.png';
import climb from '../../assets/Player/climb.png';

let angle;
let person;
let body;
let climbDude;
let legs;
let gun;
let bullet;
let gunBack;
let cursors;
let playerOnStairs;

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

  preload() {
    this.scene.load.image('gun', gunImage);
    this.scene.load.image('bullet', bulletImage);
    this.scene.load.image('gunback', gunbackImage);
    this.scene.load.spritesheet('dude', dudeImage, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.scene.load.spritesheet('dudeLegs', dudeLegsImage, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.scene.load.spritesheet('climbing', climb, {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    body = this.scene.add.sprite(0, 0, 'dude');
    legs = this.scene.add.sprite(0, 0, 'dudeLegs');
    gun = this.scene.add.image(0, 1, 'gun').setOrigin(0, 0.5);
    bullet = this.scene.matter.add.image(0, 0, 'bullet');
    climbDude = this.scene.add.sprite(0, 0, 'climbing').setVisible(false);

    person = this.scene.add.container(109.36, 180.5, [
      legs,
      body,
      gun,
      bullet,
      climbDude,
    ]);

    this.playerInstance = new Player(this.scene, 109.36, 180.5, person);

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
        start: 0,
        end: 5,
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
      frames: [{ key: 'dudeLegs', frame: 6 }],
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
      frames: [{ key: 'dudeLegs', frame: 3 }],
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
        start: 6,
        end: 13,
      }),
      frameRate: 10,
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
      function(pointer) {
        angle = Phaser.Math.Angle.Between(
          person.list[2].parentContainer.x,
          person.list[2].parentContainer.y,
          pointer.x + this.scene.cameras.main.scrollX,
          pointer.y + this.scene.cameras.main.scrollY
        );

        if (
          this.playerInstance.mainBody.velocity.x === 0 &&
          person.list[2].parentContainer.x > pointer.worldX
        ) {
          gunBack = this.scene.add.image(0, 1, 'gunback').setOrigin(1, 0.5);
          person.replace(gun, gunBack);
          body.anims.play('Rturn', true);
          legs.anims.play('Rturnleg', true);
          person.list[2].setRotation(LeftAngle(angle) - Math.PI);
        } else if (
          this.playerInstance.mainBody.velocity.x === 0 &&
          person.list[2].parentContainer.x < pointer.worldX
        ) {
          person.replace(person.list[2], gun);
          body.anims.play('Lturn', true);
          legs.anims.play('Lturnleg', true);
          person.list[2].setRotation(RightAngle(angle));
        }
      },
      this
    );

    cursors = this.scene.input.keyboard.createCursorKeys();

    return this.playerInstance;
  }

  update(stairsInf) {
    playerOnStairs = !stairsInf.playerInstance.isTouching.ground;
    gunBack = this.scene.add.image(0, 1, 'gunback').setOrigin(1, 0.5);
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

    if (cursors.left.isDown) {
      person.replace(gun, gunBack);
      body.anims.play('left', true);
      legs.anims.play('leftl', true);
      person.list[2].setRotation(LeftAngle(angle) - Math.PI);
    } else if (cursors.right.isDown) {
      person.replace(person.list[2], gun);

      body.anims.play('right', true);
      legs.anims.play('rightl', true);
      person.list[2].setRotation(RightAngle(angle));
    } else if (
      cursors.down.isDown &&
      playerOnStairs &&
      stairsInf.st.label === 'stairs-right'
    ) {
      personClimb();
      climbDude.anims.play('Climb', true);
    } else if (
      cursors.up.isDown &&
      playerOnStairs &&
      stairsInf.st.label === 'stairs-right'
    ) {
      personClimb();
      climbDude.anims.play('Climb', true);
    } else if (playerOnStairs && stairsInf.st.label === 'stairs-right') {
      personClimb();
      climbDude.anims.play('climbStay', true);
    } else if (playerOnStairs && (cursors.down.isDown || cursors.up.isDown)) {
      body.anims.play('Lturn', true);
      legs.anims.play('leftl', true);
    } else if (person.list[2].texture.key === 'gun') {
      person.list[2].setRotation(RightAngle(angle));
      body.anims.play('Lturn', true);
      legs.anims.play('Lturnleg', true);
    } else {
      person.list[2].setRotation(LeftAngle(angle) - Math.PI);

      body.anims.play('Rturn', true);
      legs.anims.play('Rturnleg', true);
    }
  }
}
