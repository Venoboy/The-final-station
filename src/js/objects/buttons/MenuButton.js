const textConfig = {
  fontFamily: 'font2',
  fontSize: 20,
  color: '#3f3f3f',
};

export default class MenuButton {
  constructor(config) {
    this.button = config.scene.add.text(config.x, config.y, config.text, textConfig)
      .setOrigin(0.5)
      .setResolution(10)
      .setInteractive();
    this.hoverSign = config.scene.add.image(config.x + 60, config.y, 'menuButton');
    this.hoverSign.alpha = 0;

    this.button.on('pointerover', () => {
      this.button.setColor('#ffffff');
      this.hoverSign.alpha = 1;
    });
    this.button.on('pointerout', () => {
      this.button.setColor('#3f3f3f');
      this.hoverSign.alpha = 0;
    });
    this.button.on('pointerdown', config.callback);
  }
}
