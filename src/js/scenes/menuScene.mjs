/* MENU SCENE CLASS */
export class MenuScene extends Phaser.Scene
{
    constructor() {
        super({ key: 'MenuScene', active: true });
    }

    preload() {
        /* ASSETS MENU SCENE */
        console.log("Loading MenuScene...");

        // audio
        this.load.audio('menu', '/src/assets/audio/themes/a_rift_space.wav');
        // images
        this.load.image('space', '/src/assets/ui/space-bg.png');
        this.load.image('title', '/src/assets/ui/logo.png');
        this.load.image('startBtn', '/src/assets/ui/startBtn.png');
        this.load.image('earth', '/src/assets/images/earth.png');
        this.load.image('moon', '/src/assets/images/baren.png');
        this.load.image('ice', '/src/assets/images/ice.png');
    }
      
    create() {
        /* SCENE DESIGN */
        this.add.image(0, 300, 'space').setFlipX(true).setOrigin(0, 0.5)
        this.add.image(600, 390, 'earth').setScale(3).setFlip(true);
        this.add.image(520, 300, 'moon').setScale(0.8).setFlip(true);
        this.add.image(440, 200, 'ice').setScale(0.5).setAlpha(0.8);
        
        /* SCENE UI */
        const title = this.add.image(400, 170, 'title').setScale(0.52);
        const startBtn = this.add.image(400, 360, 'startBtn').setScale(0.25).setInteractive({ cursor: 'pointer' });

        /* Animation title */
        this.tweens.add({
            targets: title,
            scaleX: 0.6,
            scaleY: 0.6,
            duration: 900,
            repeat: -1,
            yoyo: true
        });

        /* Play the music background */
        const music = this.sound.add('menu');
        music.play();

        /* Event for hover effect to start button */
        startBtn.on('pointerover', pointer => {
            startBtn.setTint(0x0080FF);
            startBtn.setScale(0.29);
        });
        startBtn.on('pointerout', pointer => {
            startBtn.clearTint();
            startBtn.setScale(0.25);
        });
        startBtn.on('pointerup', pointer => {
            console.log("Start Game!");
            music.stop();
            this.scene.start('GameScene');
        });
    }
}